import React, { useState, useEffect } from 'react';
import { syncSingleCatalog } from '../services/idempiereSyncService';

export default function ProductCategoriesView({ session, onNotify }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const loadCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/product-categories');
      const data = await res.json();
      if (data.success) {
        setCategories(data.data || []);
      }
    } catch (err) {
      console.error(err);
      if (onNotify) onNotify('error', 'Error al cargar categorías de productos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleSync = async () => {
    if (!session) {
      if (onNotify) onNotify('warning', 'Inicie sesión en iDempiere para sincronizar este catálogo.');
      return;
    }
    setSyncing(true);
    try {
      const result = await syncSingleCatalog('product_categories', session);
      if (onNotify) onNotify('success', `¡Sincronizado! Se procesaron ${result.count} categorías desde iDempiere.`);
      loadCategories();
    } catch (err) {
      if (onNotify) onNotify('error', `Fallo al sincronizar: ${err.message}`);
    } finally {
      setSyncing(false);
    }
  };

  const filteredCategories = categories.filter(c => {
    const q = searchTerm.toLowerCase();
    return (
      (c.name && c.name.toLowerCase().includes(q)) ||
      (c.value && c.value.toLowerCase().includes(q)) ||
      (c.description && c.description.toLowerCase().includes(q)) ||
      String(c.id).includes(q)
    );
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
            📁 Catálogo de Categorías de Productos (M_Product_Category)
          </h2>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.9rem' }}>
            Este catálogo se sincroniza en una sola dirección desde el ERP iDempiere hacia la aplicación, garantizando que iDempiere sea la única fuente de la verdad. No permite mutaciones locales manuales.
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
            {syncing ? '🔄 Sincronizando...' : '⚡ Sincronizar Categorías desde ERP'}
          </button>
        </div>
      </div>

      {/* Barra de Filtro / Búsqueda */}
      <div style={{ marginBottom: '16px', display: 'flex', gap: '10px', alignItems: 'center' }}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="🔍 Buscar categoría por nombre, código o ID..."
          style={{
            flex: 1,
            maxWidth: '400px',
            padding: '10px 14px',
            background: '#111827',
            border: '1px solid #1f2937',
            borderRadius: '8px',
            color: '#ffffff',
            fontSize: '0.86rem'
          }}
        />
        <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
          Mostrando {filteredCategories.length} de {categories.length} categorías
        </span>
      </div>

      {/* Tabla Solo Lectura */}
      <div style={{ background: '#111827', border: '1px solid #1f2937', borderRadius: '14px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
          <thead>
            <tr style={{ background: '#1a2234', color: '#94a3b8', borderBottom: '1px solid #1f2937' }}>
              <th style={{ padding: '14px 18px' }}>ID ERP</th>
              <th style={{ padding: '14px 18px' }}>Código (Value)</th>
              <th style={{ padding: '14px 18px' }}>Nombre de la Categoría</th>
              <th style={{ padding: '14px 18px' }}>Descripción</th>
              <th style={{ padding: '14px 18px' }}>Estado</th>
              <th style={{ padding: '14px 18px', textAlign: 'right' }}>Modo</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" style={{ padding: '36px', textAlign: 'center', color: '#64748b' }}>
                  Cargando catálogo de categorías desde SQLite...
                </td>
              </tr>
            ) : filteredCategories.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ padding: '36px', textAlign: 'center', color: '#64748b' }}>
                  {searchTerm ? 'No se encontraron categorías que coincidan con la búsqueda.' : 'No hay categorías sincronizadas en SQLite. Haz clic en "Sincronizar Categorías desde ERP".'}
                </td>
              </tr>
            ) : (
              filteredCategories.map((c) => (
                <tr key={c.id} style={{ borderBottom: '1px solid #1f2937', transition: 'background 0.15s' }}>
                  <td style={{ padding: '14px 18px', fontWeight: '700', color: '#cbd5e1' }}>#{c.id}</td>
                  <td style={{ padding: '14px 18px', color: '#38bdf8', fontFamily: 'monospace', fontWeight: '700' }}>
                    {c.value || '-'}
                  </td>
                  <td style={{ padding: '14px 18px', fontWeight: '600' }}>{c.name}</td>
                  <td style={{ padding: '14px 18px', color: '#94a3b8' }}>{c.description || '-'}</td>
                  <td style={{ padding: '14px 18px' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      background: c.is_active ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                      color: c.is_active ? '#34d399' : '#f87171'
                    }}>
                      {c.is_active ? 'Activo' : 'Inactivo'}
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
