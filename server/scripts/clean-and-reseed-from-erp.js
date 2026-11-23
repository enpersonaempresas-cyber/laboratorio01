const https = require('https');
const db = require('../src/db');

function post(url, data) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const body = JSON.stringify(data);
    const req = https.request({
      hostname: u.hostname,
      port: 443,
      path: u.pathname + u.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Content-Length': Buffer.byteLength(body)
      },
      rejectUnauthorized: false
    }, (res) => {
      let d = '';
      res.on('data', chunk => d += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data: JSON.parse(d || '{}') }));
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function get(url, token) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const req = https.request({
      hostname: u.hostname,
      port: 443,
      path: u.pathname + u.search,
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      rejectUnauthorized: false
    }, (res) => {
      let d = '';
      res.on('data', chunk => d += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data: JSON.parse(d || '{}') }));
    });
    req.on('error', reject);
    req.end();
  });
}

async function run() {
  console.log('====================================================');
  console.log('🔄 LIMPIEZA Y RE-POBLACIÓN DE PRODUCTOS DESDE IDEMPIERE');
  console.log('====================================================');

  console.log('\n1. Autenticando contra iDempiere ERP (https://test.idempiere.org)...');
  const loginRes = await post('https://test.idempiere.org/api/v1/auth/tokens', {
    userName: 'admin @ gardenworld.com',
    password: 'GardenAdmin',
    parameters: {
      clientId: 11,
      roleId: 102,
      organizationId: 11,
      warehouseId: 103,
      language: 'es_PE'
    }
  });

  if (loginRes.status !== 200 || !loginRes.data.token) {
    throw new Error(`Error de autenticación con iDempiere (HTTP ${loginRes.status}): ${JSON.stringify(loginRes.data)}`);
  }

  const token = loginRes.data.token;
  console.log('✅ Autenticado exitosamente en iDempiere ERP.');

  console.log('\n2. Descargando Categorías de Productos (M_Product_Category)...');
  const catRes = await get('https://test.idempiere.org/api/v1/models/m_product_category?$top=100', token);
  const categories = catRes.data?.records || [];
  console.log(`✅ ${categories.length} categorías obtenidas de iDempiere.`);

  console.log('\n3. Descargando Catálogo de Productos (M_Product)...');
  const prodRes = await get('https://test.idempiere.org/api/v1/models/m_product?$top=100', token);
  const products = prodRes.data?.records || [];
  console.log(`✅ ${products.length} productos obtenidos de iDempiere.`);

  console.log('\n4. Limpiando productos, precios y categorías existentes en SQLite...');
  db.clearProductsAndCategories();
  console.log('✅ Base de datos SQLite limpiada (productos y categorías previos eliminados).');

  console.log('\n5. Insertando Categorías de Productos en SQLite...');
  const catResult = db.syncCatalogFromERP('product_categories', categories);
  console.log(`✅ ${catResult.count} categorías insertadas exitosamente.`);

  console.log('\n6. Insertando Productos en SQLite...');
  const prodResult = db.syncCatalogFromERP('products', products);
  console.log(`✅ ${prodResult.count} productos insertados exitosamente.`);

  console.log('\n7. Descargando Precios de Productos (M_ProductPrice)...');
  try {
    const priceRes = await get('https://test.idempiere.org/api/v1/models/m_productprice?$top=100', token);
    const d = db.getDatabase();
    let priceCount = 0;
    for (const p of (priceRes.data?.records || [])) {
      if (p.M_Product_ID?.id && p.PriceStd) {
        const res = d.prepare('UPDATE products SET price = ? WHERE id = ?').run(parseFloat(p.PriceStd), p.M_Product_ID.id);
        if (res.changes > 0) priceCount++;
      }
    }
    console.log(`✅ Precios actualizados para ${priceCount} productos desde iDempiere.`);
  } catch (priceErr) {
    console.warn('Aviso sincronizando precios complementarios:', priceErr.message);
  }

  // Verificación
  console.log('\n====================================================');
  console.log('📊 VERIFICACIÓN DE DATOS EN SQLITE:');
  const currentCats = db.getProductCategories();
  const currentProds = db.getProducts();
  console.log(`Total Categorías en SQLite: ${currentCats.length}`);
  console.log(`Total Productos en SQLite:  ${currentProds.length}`);

  console.log('\nMuestra de Categorías en SQLite:');
  currentCats.slice(0, 5).forEach(c => console.log(`  [#${c.id}] ${c.value} - ${c.name}`));

  console.log('\nMuestra de Productos en SQLite:');
  currentProds.slice(0, 5).forEach(p => console.log(`  [#${p.id}] ${p.value} - ${p.name} (Cat: ${p.category_name}) - $${p.price}`));
  console.log('====================================================');
  console.log('🎉 Operación completada con éxito.');
}

run().catch((err) => {
  console.error('❌ Error durante la limpieza y repoblación:', err);
  process.exit(1);
});
