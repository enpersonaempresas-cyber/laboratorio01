const mysql = require('mysql2/promise');

const INITIAL_HAMBURGERS = [
  {
    id: 1,
    name: 'Rey de las Burgers',
    category: 'Especialidades del Chef',
    price: 14.99,
    stock: 45,
    specialty_level: 'Legendaria ⭐⭐⭐',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=700&auto=format&fit=crop&q=80',
    description: 'Nuestra creación más aclamada: 220g de carne Angus seleccionada a la brasa, panceta crujiente ahumada al roble, queso cheddar inglés madurado, cebolla caramelizada al bourbon y mayonesa trufada en pan brioche artesanal dorado a la mantequilla.',
    ingredients: ['Carne Angus 220g', 'Panceta ahumada al roble', 'Cheddar inglés 12 meses', 'Cebolla al bourbon', 'Pan brioche artesanal', 'Mayonesa trufada'],
    prepTime: '12-15 min',
    calories: '860 kcal'
  },
  {
    id: 2,
    name: 'Burger Real Clásica',
    category: 'Clásicas Reales',
    price: 10.99,
    stock: 60,
    specialty_level: 'Clásica de la Casa 👑',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=700&auto=format&fit=crop&q=80',
    description: 'La receta icónica que define a Hamburger Rapid: medallón de res 160g jugoso, queso americano fundido, lechuga romana crocante, tomate maduro de huerta, pepinillos encurtidos y salsa secreta Rapid sobre pan de sésamo.',
    ingredients: ['Medallón de res 160g', 'Queso americano artesanal', 'Lechuga romana', 'Tomate fresco', 'Pepinillos agridulces', 'Salsa secreta Rapid'],
    prepTime: '10 min',
    calories: '650 kcal'
  },
  {
    id: 3,
    name: 'Burger Real Doble',
    category: 'Clásicas Reales',
    price: 13.99,
    stock: 50,
    specialty_level: 'Premium Doble 🍔',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=700&auto=format&fit=crop&q=80',
    description: 'Doble satisfacción con dos medallones smash de 120g con costra caramelizada al fuego, doble queso cheddar fundido, cebolla morada brunoise, ketchup artesanal y mostaza dijon en pan brioche extra suave.',
    ingredients: ['Doble medallón smash (2x120g)', 'Doble cheddar derretido', 'Cebolla morada crujiente', 'Ketchup artesanal', 'Mostaza Dijon', 'Pan brioche tostado'],
    prepTime: '11 min',
    calories: '790 kcal'
  },
  {
    id: 4,
    name: 'Burger Doble Especial',
    category: 'Especialidades del Chef',
    price: 15.50,
    stock: 35,
    specialty_level: 'Edición Especial del Chef 🔥',
    image: '/images/burger-doble-especial.jpg',
    description: 'Una experiencia gastronómica sublime: dos piezas de carne Angus premium (300g totales), queso gouda ahumado, bacon crocante glaseado en miel de maple, champiñones al tomillo silvestre y emulsión de alioli tostado.',
    ingredients: ['Doble corte Angus (300g)', 'Queso Gouda ahumado', 'Bacon crujiente a la miel', 'Champiñones salteados', 'Alioli de ajo asado', 'Pan brioche'],
    prepTime: '14 min',
    calories: '920 kcal'
  },
  {
    id: 5,
    name: 'Burger Crispy Golden Chicken',
    category: 'Pollo Crispy',
    price: 12.50,
    stock: 40,
    specialty_level: 'Extra Crunch 🍗',
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=700&auto=format&fit=crop&q=80',
    description: 'Suprema de pechuga fresca marinada 24h en buttermilk y rebozada en panko con 11 especias secretas. Crujiente por fuera, extremadamente jugosa por dentro, con ensalada coleslaw fresca y salsa honey-mustard.',
    ingredients: ['Pechuga marinada 180g en buttermilk', 'Rebozado panko crujiente', 'Ensalada Coleslaw ácida', 'Pepinillos dulces', 'Salsa Honey Mustard', 'Pan de patata'],
    prepTime: '12 min',
    calories: '680 kcal'
  },
  {
    id: 6,
    name: 'Truffle & Mushroom Artisan',
    category: 'Gourmet Signature',
    price: 16.20,
    stock: 25,
    specialty_level: 'Gourmet Signature ✨',
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=700&auto=format&fit=crop&q=80',
    description: 'Elegancia y sabor terroso incomparable: carne Angus premium con reducción de trufas negras silvestres, setas portobello salteadas al vino blanco, queso provolone fundido y rúcula selvática en pan artesanal.',
    ingredients: ['Carne Angus 200g', 'Crema de trufa negra silvestre', 'Portobellos salteados al vino', 'Queso provolone fundido', 'Rúcula selvática', 'Pan brioche rústico'],
    prepTime: '15 min',
    calories: '740 kcal'
  },
  {
    id: 7,
    name: 'Spicy Jalapeño Inferno',
    category: 'Picante Artesanal',
    price: 13.50,
    stock: 30,
    specialty_level: 'Picante Fuego 🌶️',
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=700&auto=format&fit=crop&q=80',
    description: 'Para los amantes del picante con clase: medallón a la parrilla con queso pepper jack picante, rodajas de jalapeños tempurizados crocantes, cebolla frita y emulsión de chipotle ahumado en adobo.',
    ingredients: ['Carne de res 180g', 'Queso Pepper Jack fundido', 'Jalapeños en tempura crujiente', 'Cebolla frita crocante', 'Mayonesa de chipotle ahumado'],
    prepTime: '11 min',
    calories: '760 kcal'
  },
  {
    id: 8,
    name: 'Smoky BBQ Monster',
    category: 'Gigantes BBQ',
    price: 15.90,
    stock: 28,
    specialty_level: 'Ahumada al Roble 🪵',
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=700&auto=format&fit=crop&q=80',
    description: 'La reina de los ahumados: carne de res coronada con pulled pork desmechado a baja temperatura durante 12 horas, aros de cebolla caseros al rebozado cervecero y salsa barbacoa al whisky ahumado.',
    ingredients: ['Carne de res 160g', 'Pulled pork 100g ahumado 12h', 'Aros de cebolla a la cerveza', 'Queso Monterey Jack', 'Salsa BBQ al whisky'],
    prepTime: '13 min',
    calories: '940 kcal'
  },
  {
    id: 9,
    name: 'Guacamole & Swiss Fresh',
    category: 'Fusión Fresca',
    price: 13.80,
    stock: 38,
    specialty_level: 'Frescura Suprema 🥑',
    image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=700&auto=format&fit=crop&q=80',
    description: 'Frescura vibrante: medallón jugoso con guacamole elaborado a diario con aguacates Hass maduros, queso suizo Emmental fundido, brotes tiernos de espinaca y un toque cítrico de lima con cilantro.',
    ingredients: ['Carne jugosa 170g', 'Guacamole casero de aguacate Hass', 'Queso suizo Emmental', 'Brotes tiernos de espinaca', 'Mayonesa de cilantro y lima'],
    prepTime: '10 min',
    calories: '690 kcal'
  },
  {
    id: 10,
    name: 'Triple Cheese Melt Supreme',
    category: 'Smash Burgers',
    price: 14.50,
    stock: 42,
    specialty_level: 'Máxima Adicción 🧀',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=700&auto=format&fit=crop&q=80',
    description: 'La cumbre del queso: triple medallón smash con costra caramelizada, triple capa de quesos fundidos (Cheddar maduro, Mozzarella artesanal hilada y Provolone dulce), con salsa especial Rapid Melt.',
    ingredients: ['Triple smash de res (3x80g)', 'Cheddar maduro', 'Mozzarella artesanal hilada', 'Provolone dulce', 'Salsa Rapid Melt especial'],
    prepTime: '12 min',
    calories: '880 kcal'
  }
];

// Datos analíticos de consumidores según su consumo
const INITIAL_CONSUMERS = [
  {
    id: 'CUST-001',
    name: 'Roberto González',
    email: 'roberto.gonzalez@empresa.com',
    segment: 'VIP Gold',
    tier: 'vip',
    totalSpent: 342.50,
    ordersCount: 18,
    favoriteBurger: 'Rey de las Burgers',
    lastOrder: '2026-10-29',
    status: 'Activo Frecuente',
    avatar: '👨‍💼'
  },
  {
    id: 'CUST-002',
    name: 'Camila Ferraro',
    email: 'camila.ferraro@techcorp.io',
    segment: 'VIP Platinum',
    tier: 'vip',
    totalSpent: 289.00,
    ordersCount: 15,
    favoriteBurger: 'Burger Real Doble',
    lastOrder: '2026-10-30',
    status: 'Activo Frecuente',
    avatar: '👩‍💻'
  },
  {
    id: 'CUST-003',
    name: 'Andrés Villalobos',
    email: 'andres.v@gmail.com',
    segment: 'VIP Silver',
    tier: 'vip',
    totalSpent: 234.80,
    ordersCount: 12,
    favoriteBurger: 'Burger Doble Especial',
    lastOrder: '2026-10-28',
    status: 'Activo Frecuente',
    avatar: '👨‍🎨'
  },
  {
    id: 'CUST-004',
    name: 'Mariana Soto',
    email: 'mariana.soto@studio.design',
    segment: 'Consumidor Frecuente',
    tier: 'frequent',
    totalSpent: 148.20,
    ordersCount: 8,
    favoriteBurger: 'Truffle & Mushroom Artisan',
    lastOrder: '2026-10-27',
    status: 'Frecuente',
    avatar: '👩‍🎨'
  },
  {
    id: 'CUST-005',
    name: 'Diego Alarcón',
    email: 'diego.alarcon@innova.cl',
    segment: 'Consumidor Frecuente',
    tier: 'frequent',
    totalSpent: 112.50,
    ordersCount: 6,
    favoriteBurger: 'Burger Real Clásica',
    lastOrder: '2026-10-25',
    status: 'Frecuente',
    avatar: '👨‍🔬'
  },
  {
    id: 'CUST-006',
    name: 'Sofía Valenzuela',
    email: 'sofia.valenzuela@agencia.com',
    segment: 'Consumidor Frecuente',
    tier: 'frequent',
    totalSpent: 94.00,
    ordersCount: 5,
    favoriteBurger: 'Burger Crispy Golden Chicken',
    lastOrder: '2026-10-22',
    status: 'Frecuente',
    avatar: '👩‍💼'
  },
  {
    id: 'CUST-007',
    name: 'Javier Morales',
    email: 'javi.morales@outlook.com',
    segment: 'Consumidor Ocasional',
    tier: 'occasional',
    totalSpent: 42.50,
    ordersCount: 2,
    favoriteBurger: 'Smoky BBQ Monster',
    lastOrder: '2026-10-15',
    status: 'Ocasional',
    avatar: '👨‍🚀'
  },
  {
    id: 'CUST-008',
    name: 'Valentina Ríos',
    email: 'valen.rios@gmail.com',
    segment: 'Consumidor Ocasional',
    tier: 'occasional',
    totalSpent: 28.50,
    ordersCount: 2,
    favoriteBurger: 'Guacamole & Swiss Fresh',
    lastOrder: '2026-10-12',
    status: 'Ocasional',
    avatar: '👩‍⚕️'
  },
  {
    id: 'CUST-009',
    name: 'Martín Paredes',
    email: 'martin.paredes@dev.net',
    segment: 'Cliente Nuevo',
    tier: 'occasional',
    totalSpent: 14.50,
    ordersCount: 1,
    favoriteBurger: 'Triple Cheese Melt Supreme',
    lastOrder: '2026-10-30',
    status: 'Nuevo',
    avatar: '🧑‍💻'
  }
];

let inMemoryProducts = [...INITIAL_HAMBURGERS];
let inMemoryConsumers = [...INITIAL_CONSUMERS];
let pool = null;
let isConnectedToMySQL = false;
let lastDbError = null;

async function initDB() {
  const databaseUrl = process.env.DATABASE_URL || process.env.MYSQL_URL;
  const host = process.env.DB_HOST || process.env.MYSQL_HOST;
  const user = process.env.DB_USER || process.env.MYSQL_USER || 'root';
  const password = process.env.DB_PASSWORD || process.env.MYSQL_PASSWORD || '';
  const database = process.env.DB_NAME || process.env.MYSQL_DATABASE || 'demo';
  const port = parseInt(process.env.DB_PORT || '3306', 10);

  if (!databaseUrl && !host) {
    lastDbError = 'Variables DB_HOST ni DATABASE_URL configuradas en el entorno.';
    console.log(`ℹ️ [DB] ${lastDbError} Operando en modo In-Memory para Hamburger Rapid.`);
    return;
  }

  try {
    if (databaseUrl) {
      console.log(`🔄 [DB] Intentando conectar a MySQL vía DATABASE_URL...`);
      pool = mysql.createPool(databaseUrl);
    } else {
      console.log(`🔄 [DB] Intentando conectar a MySQL en ${host}:${port} con usuario "${user}" a la BD "${database}"...`);
      pool = mysql.createPool({
        host,
        user,
        password,
        database,
        port,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        connectTimeout: 8000
      });
    }

    // Probar conexión inmediata
    const connection = await pool.getConnection();
    console.log(`✅ [DB] Conectado exitosamente a MySQL (${host || 'URL'} - BD: ${database})`);

    // Crear tabla si no existe
    await connection.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        stock INT NOT NULL DEFAULT 0,
        specialty_level VARCHAR(100) DEFAULT 'Clásica',
        image VARCHAR(500),
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Sembrar datos iniciales si la tabla está vacía
    const [rows] = await connection.query('SELECT COUNT(*) as count FROM products');
    if (rows[0].count === 0) {
      console.log('🌱 [DB] Inicializando catálogo de Hamburger Rapid en MySQL (10 hamburguesas)...');
      for (const p of INITIAL_HAMBURGERS) {
        await connection.query(
          'INSERT INTO products (name, category, price, stock, specialty_level, image, description) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [p.name, p.category, p.price, p.stock, p.specialty_level, p.image, p.description]
        );
      }
    }

    connection.release();
    isConnectedToMySQL = true;
    lastDbError = null;
  } catch (error) {
    lastDbError = error.message;
    console.warn(`⚠️ [DB] No se pudo conectar a MySQL: ${error.message}. Operando en modo In-Memory.`);
    isConnectedToMySQL = false;
  }
}

async function getProducts() {
  if (!isConnectedToMySQL && (process.env.DB_HOST || process.env.DATABASE_URL)) {
    await initDB();
  }

  if (isConnectedToMySQL && pool) {
    try {
      const [rows] = await pool.query('SELECT * FROM products ORDER BY id ASC');
      // Merge extra frontend details like ingredients, prepTime if not in db
      return rows.map(r => {
        const found = INITIAL_HAMBURGERS.find(p => p.name.toLowerCase() === r.name.toLowerCase()) || {};
        return {
          ...found,
          ...r,
          price: parseFloat(r.price)
        };
      });
    } catch (err) {
      console.error('Error consultando MySQL, recurriendo a memoria temporal:', err.message);
      lastDbError = err.message;
    }
  }
  return inMemoryProducts;
}

async function addProduct({ name, category, price, stock, specialty_level, image, description }) {
  if (!isConnectedToMySQL && (process.env.DB_HOST || process.env.DATABASE_URL)) {
    await initDB();
  }

  const cleanPrice = parseFloat(price) || 0;
  const cleanStock = parseInt(stock, 10) || 0;
  const cleanSpecialty = specialty_level || 'Especialidad Hamburger Rapid';

  if (isConnectedToMySQL && pool) {
    const [result] = await pool.query(
      'INSERT INTO products (name, category, price, stock, specialty_level, image, description) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, category, cleanPrice, cleanStock, cleanSpecialty, image || '', description || '']
    );
    return {
      id: result.insertId,
      name,
      category,
      price: cleanPrice,
      stock: cleanStock,
      specialty_level: cleanSpecialty,
      image,
      description
    };
  }

  const newProduct = {
    id: Date.now(),
    name,
    category: category || 'Especialidades',
    price: cleanPrice,
    stock: cleanStock,
    specialty_level: cleanSpecialty,
    image: image || 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=700&auto=format&fit=crop&q=80',
    description: description || 'Hamburguesa artesanal recién añadida.',
    ingredients: ['Carne Angus seleccionada', 'Pan brioche', 'Queso fundido'],
    prepTime: '12 min',
    calories: '750 kcal'
  };
  inMemoryProducts.unshift(newProduct);
  return newProduct;
}

async function deleteProduct(id) {
  const numId = parseInt(id, 10);
  if (isConnectedToMySQL && pool) {
    await pool.query('DELETE FROM products WHERE id = ?', [numId]);
    return true;
  }
  inMemoryProducts = inMemoryProducts.filter(p => p.id !== numId);
  return true;
}

async function resetProducts() {
  if (isConnectedToMySQL && pool) {
    await pool.query('TRUNCATE TABLE products');
    for (const p of INITIAL_HAMBURGERS) {
      await pool.query(
        'INSERT INTO products (name, category, price, stock, specialty_level, image, description) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [p.name, p.category, p.price, p.stock, p.specialty_level, p.image, p.description]
      );
    }
    return;
  }
  inMemoryProducts = [...INITIAL_HAMBURGERS];
}

function getConsumers() {
  return inMemoryConsumers;
}

function getConsumerAnalytics() {
  const totalConsumers = inMemoryConsumers.length;
  const totalSpentAll = inMemoryConsumers.reduce((acc, c) => acc + c.totalSpent, 0);
  const totalOrdersAll = inMemoryConsumers.reduce((acc, c) => acc + c.ordersCount, 0);
  const avgTicket = totalOrdersAll > 0 ? (totalSpentAll / totalOrdersAll).toFixed(2) : '0.00';
  
  const vipCount = inMemoryConsumers.filter(c => c.tier === 'vip').length;
  const frequentCount = inMemoryConsumers.filter(c => c.tier === 'frequent').length;
  const occasionalCount = inMemoryConsumers.filter(c => c.tier === 'occasional').length;

  return {
    totalConsumers,
    totalSpentAll: totalSpentAll.toFixed(2),
    totalOrdersAll,
    avgTicket,
    segments: {
      vip: { count: vipCount, label: 'VIP (> $200)', sharePct: Math.round((vipCount / totalConsumers) * 100) },
      frequent: { count: frequentCount, label: 'Frecuentes ($60 - $199)', sharePct: Math.round((frequentCount / totalConsumers) * 100) },
      occasional: { count: occasionalCount, label: 'Ocasionales (< $60)', sharePct: Math.round((occasionalCount / totalConsumers) * 100) }
    },
    topSellingBurger: 'Rey de las Burgers',
    topCustomer: inMemoryConsumers[0]
  };
}

function getDbStatus() {
  return {
    mode: isConnectedToMySQL ? 'mysql' : 'in-memory',
    connected: isConnectedToMySQL,
    host: process.env.DB_HOST || (process.env.DATABASE_URL ? 'via-database-url' : 'in-memory-local'),
    database: process.env.DB_NAME || 'hamburger_rapid_db',
    user: process.env.DB_USER || 'admin',
    itemCount: inMemoryProducts.length,
    consumersCount: inMemoryConsumers.length,
    error: lastDbError
  };
}

module.exports = {
  initDB,
  getProducts,
  addProduct,
  deleteProduct,
  resetProducts,
  getConsumers,
  getConsumerAnalytics,
  getDbStatus
};
