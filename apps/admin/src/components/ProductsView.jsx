import React, { useState, useEffect } from 'react';
import { syncSingleCatalog } from '../services/idempiereSyncService';

export default function ProductsView({ session, onNotify }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const loadData = async () => {
    setLoading(true);
    try {
      const [prodRes, catRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/product-categories')
      ]);
      const prodData = await prodRes.json();
      const catData = await catRes.json();

      if (prodData.success) setProducts(prodData.data || []);
      if (catData.success) setCategories(catData.data || []);
    } catch (err) {
      console.error(err);
      if (onNotify) onNotify('error', 'Error cargando catálogo de productos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSync = async () => {
    if (!session) {
      if (onNotify) onNotify('warning', 'Inicie sesión en iDempiere para sincronizar este catálogo.');
      return;
    }
    setSyncing(true);
    try {
      const result = await syncSingleCatalog('products', session);
      if (onNotify) onNotify('success', `¡Sincronizado! Se procesaron ${result.count} productos desde iDempiere.`);
      loadData();
    } catch (err) {
      if (onNotify) onNotify('error', `Fallo al sincronizar productos: ${err.message}`);
    } finally {
      setSyncing(false);
    }
  };

  const filteredProducts = products.filter(p => {
    const q = searchTerm.toLowerCase();
    const matchesSearch = (
      (p.name && p.name.toLowerCase().includes(q)) ||
      (p.value && p.value.toLowerCase().includes(q)) ||
      (p.description && p.description.toLowerCase().includes(q)) ||
      String(p.id).includes(q)
    );
    const matchesCategory = selectedCategory === 'ALL' || String(p.category_id) === String(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ color: '#f8fafc' }}>
      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', padding: '4px 10px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: '700', marginBottom: '8px' }}>
            🔒 SOLO LECTURA &bull; MAESTRO ERP (FUENTE DE LA VERDAD: IDEMPIERE)
          </div>
          <h2 style={{ margin: '0 0 6px 0', fontSize: '1.6rem', fontWeight: '800' }}>
            📦 Catálogo Maestro de Productos (M_Product)
          </h2>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.9rem' }}>
            Este catálogo se sincroniza en una sola dirección desde el ERP iDempiere hacia la aplicación, manteniendo a iDempiere como la única fuente de la verdad. No permite mutaciones locales manuales.
          </p>
        </div>

        <div>
          <button
            onClick={handleSync}
            disabled={syncing}
            style={{
              padding: '10px 18px',
              background: syncing ? '#475569' : '#0284c7',
              border: 'none',
              borderRadius: '8px',
              color: '#ffffff',
              fontWeight: '700',
              fontSize: '0.88rem',
              cursor: syncing ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 12px rgba(2, 132, 199, 0.25)'
            }}
          >
            {syncing ? '🔄 Sincronizando...' : '⚡ Sincronizar Productos desde ERP'}
          </button>
        </div>
      </div>

      {/* Toolbar de Búsqueda y Filtrado */}
      <div style={{ marginBottom: '16px', display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="🔍 Buscar por nombre, SKU, código o ID..."
          style={{
            flex: 1,
            minWidth: '260px',
            maxWidth: '380px',
            padding: '10px 14px',
            background: '#111827',
            border: '1px solid #1f2937',
            borderRadius: '8px',
            color: '#ffffff',
            fontSize: '0.86rem'
          }}
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            padding: '10px 14px',
            background: '#111827',
            border: '1px solid #1f2937',
            borderRadius: '8px',
            color: '#38bdf8',
            fontSize: '0.86rem',
            fontWeight: '600'
          }}
        >
          <option value="ALL">Todas las Categorías ({categories.length})</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.name} (#{c.id})</option>
          ))}
        </select>

        <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
          Mostrando {filteredProducts.length} de {products.length} productos
        </span>
      </div>

      {/* Tabla Solo Lectura */}
      <div style={{ background: '#111827', border: '1px solid #1f2937', borderRadius: '14px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
          <thead>
            <tr style={{ background: '#1a2234', color: '#94a3b8', borderBottom: '1px solid #1f2937' }}>
              <th style={{ padding: '14px 18px' }}>ID ERP</th>
              <th style={{ padding: '14px 18px' }}>Código / SKU</th>
              <th style={{ padding: '14px 18px' }}>Producto</th>
              <th style={{ padding: '14px 18px' }}>Categoría</th>
              <th style={{ padding: '14px 18px' }}>Precio Estándar</th>
              <th style={{ padding: '14px 18px' }}>Stock</th>
              <th style={{ padding: '14px 18px' }}>Estado</th>
              <th style={{ padding: '14px 18px', textAlign: 'right' }}>Modo</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" style={{ padding: '36px', textAlign: 'center', color: '#64748b' }}>
                  Cargando catálogo maestro de productos desde SQLite...
                </td>
              </tr>
            ) : filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ padding: '36px', textAlign: 'center', color: '#64748b' }}>
                  {searchTerm || selectedCategory !== 'ALL'
                    ? 'No se encontraron productos con los filtros aplicados.'
                    : 'No hay productos sincronizados en SQLite. Haz clic en "Sincronizar Productos desde ERP".'}
                </td>
              </tr>
            ) : (
              filteredProducts.map((p) => (
                <tr key={p.id} style={{ borderBottom: '1px solid #1f2937', transition: 'background 0.15s' }}>
                  <td style={{ padding: '14px 18px', fontWeight: '700', color: '#cbd5e1' }}>#{p.id}</td>
                  <td style={{ padding: '14px 18px', color: '#38bdf8', fontFamily: 'monospace', fontWeight: '700' }}>
                    {p.value || '-'}
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      {p.image && (
                        <img
                          src={p.image}
                          alt={p.name}
                          style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover', border: '1px solid #374151' }}
                          onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                      )}
                      <div>
                        <div style={{ fontWeight: '700', color: '#f8fafc' }}>{p.name}</div>
                        {p.description && (
                          <div style={{ fontSize: '0.75rem', color: '#94a3b8', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {p.description}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    <span style={{
                      padding: '3px 8px',
                      background: 'rgba(56, 189, 248, 0.12)',
                      color: '#38bdf8',
                      borderRadius: '6px',
                      fontSize: '0.78rem',
                      fontWeight: '700'
                    }}>
                      {p.category_name || `Cat #${p.category_id}`}
                    </span>
                  </td>
                  <td style={{ padding: '14px 18px', fontWeight: '800', color: '#10b981', fontSize: '0.95rem' }}>
                    ${parseFloat(p.price || 0).toFixed(2)}
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      background: p.stock > 0 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                      color: p.stock > 0 ? '#34d399' : '#f87171'
                    }}>
                      {p.stock} u.
                    </span>
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      background: p.is_active ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                      color: p.is_active ? '#34d399' : '#f87171'
                    }}>
                      {p.is_active ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                    <span style={{
                      padding: '4px 8px',
                      background: '#1f2937',
                      color: '#94a3b8',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      border: '1px solid #374151'
                    }}>
                      👁️ Solo Lectura
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
