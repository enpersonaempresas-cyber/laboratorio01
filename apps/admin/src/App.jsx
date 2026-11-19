import React, { useState, useEffect } from 'react';

// Datos predeterminados de hamburguesas
const DEFAULT_BURGER_LIST = [
  {
    id: 1,
    name: 'Rey de las Burgers',
    category: 'Especialidades del Chef',
    price: 14.99,
    stock: 45,
    specialty_level: 'Legendaria ⭐⭐⭐',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=80',
    description: 'Carne Angus 220g a la leña, cheddar inglés 12m, panceta al roble y mayonesa trufada.'
  },
  {
    id: 2,
    name: 'Burger Real Clásica',
    category: 'Clásicas Reales',
    price: 10.99,
    stock: 60,
    specialty_level: 'Clásica de la Casa 👑',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&auto=format&fit=crop&q=80',
    description: 'Medallón jugoso 160g, queso americano fundido, lechuga romana, tomate y salsa Rapid.'
  },
  {
    id: 3,
    name: 'Burger Real Doble',
    category: 'Clásicas Reales',
    price: 13.99,
    stock: 50,
    specialty_level: 'Premium Doble 🍔',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=500&auto=format&fit=crop&q=80',
    description: 'Doble medallón smash con costra caramelizada, doble queso cheddar fundido y cebolla brunoise.'
  },
  {
    id: 4,
    name: 'Burger Doble Especial',
    category: 'Especialidades del Chef',
    price: 15.50,
    stock: 35,
    specialty_level: 'Edición Especial del Chef 🔥',
    image: '/images/burger-doble-especial.jpg',
    description: 'Doble corte Angus (300g), queso gouda ahumado, bacon crocante glaseado en maple y champiñones.'
  },
  {
    id: 5,
    name: 'Burger Crispy Golden Chicken',
    category: 'Pollo Crispy',
    price: 12.50,
    stock: 40,
    specialty_level: 'Extra Crunch 🍗',
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=500&auto=format&fit=crop&q=80',
    description: 'Pechuga marinada 24h en buttermilk, rebozado panko crujiente y salsa honey mustard.'
  },
  {
    id: 6,
    name: 'Truffle & Mushroom Artisan',
    category: 'Especialidades del Chef',
    price: 16.20,
    stock: 25,
    specialty_level: 'Gourmet Signature ✨',
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=500&auto=format&fit=crop&q=80',
    description: 'Carne Angus premium, salsa de trufa silvestre, portobellos al vino y provolone fundido.'
  },
  {
    id: 7,
    name: 'Spicy Jalapeño Inferno',
    category: 'Especialidades del Chef',
    price: 13.50,
    stock: 30,
    specialty_level: 'Picante Fuego 🌶️',
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=500&auto=format&fit=crop&q=80',
    description: 'Carne a la parrilla con pepper jack, jalapeños tempurizados crocantes y chipotle mayo.'
  },
  {
    id: 8,
    name: 'Smoky BBQ Monster',
    category: 'Especialidades del Chef',
    price: 15.90,
    stock: 28,
    specialty_level: 'Ahumada al Roble 🪵',
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=500&auto=format&fit=crop&q=80',
    description: 'Carne de res con pulled pork ahumado 12h, aros de cebolla caseros y salsa BBQ al whisky.'
  },
  {
    id: 9,
    name: 'Guacamole & Swiss Fresh',
    category: 'Clásicas Reales',
    price: 13.80,
    stock: 38,
    specialty_level: 'Frescura Suprema 🥑',
    image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=500&auto=format&fit=crop&q=80',
    description: 'Medallón jugoso con guacamole casero de aguacate Hass fresco, queso suizo Emmental y brotes.'
  },
  {
    id: 10,
    name: 'Triple Cheese Melt Supreme',
    category: 'Clásicas Reales',
    price: 14.50,
    stock: 42,
    specialty_level: 'Máxima Adicción 🧀',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&auto=format&fit=crop&q=80',
    description: 'Triple smash con costra, triple queso fundido (Cheddar, Mozzarella y Provolone dulce).'
  }
];

const DEFAULT_CONSUMERS = [
  {
    id: 'CUST-001',
    name: 'Roberto González',
    email: 'roberto.gonzalez@empresa.com',
    tier: 'vip',
    segment: 'VIP Gold',
    totalSpent: 342.50,
    ordersCount: 18,
    favoriteBurger: 'Rey de las Burgers',
    lastOrder: 'Hoy, 13:40',
    status: 'Cliente Estrella'
  },
  {
    id: 'CUST-002',
    name: 'Camila Ferraro',
    email: 'camila.ferraro@techcorp.io',
    tier: 'vip',
    segment: 'VIP Platinum',
    totalSpent: 289.00,
    ordersCount: 15,
    favoriteBurger: 'Burger Real Doble',
    lastOrder: 'Hoy, 12:15',
    status: 'Cliente Estrella'
  },
  {
    id: 'CUST-003',
    name: 'Andrés Villalobos',
    email: 'andres.v@gmail.com',
    tier: 'vip',
    segment: 'VIP Silver',
    totalSpent: 234.80,
    ordersCount: 12,
    favoriteBurger: 'Burger Doble Especial',
    lastOrder: 'Ayer, 20:30',
    status: 'Cliente Frecuente'
  },
  {
    id: 'CUST-004',
    name: 'Mariana Soto',
    email: 'mariana.soto@studio.design',
    tier: 'frequent',
    segment: 'Consumidor Frecuente',
    totalSpent: 148.20,
    ordersCount: 8,
    favoriteBurger: 'Truffle & Mushroom Artisan',
    lastOrder: '27 Oct 2026',
    status: 'Activo'
  },
  {
    id: 'CUST-005',
    name: 'Diego Alarcón',
    email: 'diego.alarcon@innova.cl',
    tier: 'frequent',
    segment: 'Consumidor Frecuente',
    totalSpent: 112.50,
    ordersCount: 6,
    favoriteBurger: 'Burger Real Clásica',
    lastOrder: '25 Oct 2026',
    status: 'Activo'
  },
  {
    id: 'CUST-006',
    name: 'Sofía Valenzuela',
    email: 'sofia.valenzuela@agencia.com',
    tier: 'frequent',
    segment: 'Consumidor Frecuente',
    totalSpent: 94.00,
    ordersCount: 5,
    favoriteBurger: 'Burger Crispy Golden Chicken',
    lastOrder: '22 Oct 2026',
    status: 'Activo'
  },
  {
    id: 'CUST-007',
    name: 'Javier Morales',
    email: 'javi.morales@outlook.com',
    tier: 'occasional',
    segment: 'Consumidor Ocasional',
    totalSpent: 42.50,
    ordersCount: 2,
    favoriteBurger: 'Smoky BBQ Monster',
    lastOrder: '15 Oct 2026',
    status: 'En Reactivación'
  },
  {
    id: 'CUST-008',
    name: 'Valentina Ríos',
    email: 'valen.rios@gmail.com',
    tier: 'occasional',
    segment: 'Consumidor Ocasional',
    totalSpent: 28.50,
    ordersCount: 2,
    favoriteBurger: 'Guacamole & Swiss Fresh',
    lastOrder: '12 Oct 2026',
    status: 'En Reactivación'
  },
  {
    id: 'CUST-009',
    name: 'Martín Paredes',
    email: 'martin.paredes@dev.net',
    tier: 'occasional',
    segment: 'Cliente Nuevo',
    totalSpent: 14.50,
    ordersCount: 1,
    favoriteBurger: 'Triple Cheese Melt Supreme',
    lastOrder: 'Hoy, 15:20',
    status: 'Nuevo'
  }
];

export default function App() {
  const [burgers, setBurgers] = useState(DEFAULT_BURGER_LIST);
  const [consumers, setConsumers] = useState(DEFAULT_CONSUMERS);
  const [serverHealth, setServerHealth] = useState(null);
  const [activeTab, setActiveTab] = useState('burgers'); // 'burgers' | 'consumers' | 'db'
  const [consumerFilter, setConsumerFilter] = useState('all'); // 'all' | 'vip' | 'frequent' | 'occasional'
  const [searchBurger, setSearchBurger] = useState('');
  
  // New burger modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newBurgerForm, setNewBurgerForm] = useState({
    name: '',
    category: 'Especialidades del Chef',
    price: '',
    stock: '',
    specialty_level: 'Edición Especial del Chef 🔥',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=80',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch initial data
  const fetchData = () => {
    // 1. Health check
    fetch('/api/health')
      .then(res => res.json())
      .then(data => setServerHealth(data))
      .catch(err => console.error('Error fetching health:', err));

    // 2. Products
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data && data.data.length > 0) {
          setBurgers(data.data);
        }
      })
      .catch(() => {});

    // 3. Consumers
    fetch('/api/consumers')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data && data.data.length > 0) {
          setConsumers(data.data);
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filtered consumers
  const filteredConsumers = consumers.filter(c => {
    if (consumerFilter === 'all') return true;
    return c.tier === consumerFilter;
  });

  // Filtered burgers
  const filteredBurgers = burgers.filter(b => {
    return b.name.toLowerCase().includes(searchBurger.toLowerCase()) ||
           b.category.toLowerCase().includes(searchBurger.toLowerCase()) ||
           (b.specialty_level && b.specialty_level.toLowerCase().includes(searchBurger.toLowerCase()));
  });

  // KPI calculations
  const totalStock = burgers.reduce((acc, b) => acc + (parseInt(b.stock, 10) || 0), 0);
  const totalRevenue = consumers.reduce((acc, c) => acc + (parseFloat(c.totalSpent) || 0), 0);
  const totalOrders = consumers.reduce((acc, c) => acc + (parseInt(c.ordersCount, 10) || 0), 0);
  const avgTicket = totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : '0.00';
  const vipCount = consumers.filter(c => c.tier === 'vip').length;

  // Add new burger handler
  const handleAddBurger = async (e) => {
    e.preventDefault();
    if (!newBurgerForm.name || !newBurgerForm.price) return;
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBurgerForm)
      });
      const data = await res.json();
      if (data.success) {
        setBurgers([data.data, ...burgers]);
        setMessage('✅ ¡Hamburguesa agregada exitosamente al catálogo comercial!');
      } else {
        // Fallback local
        const localItem = { ...newBurgerForm, id: Date.now(), price: parseFloat(newBurgerForm.price), stock: parseInt(newBurgerForm.stock, 10) || 10 };
        setBurgers([localItem, ...burgers]);
        setMessage('✅ Hamburguesa guardada localmente.');
      }
    } catch {
      const localItem = { ...newBurgerForm, id: Date.now(), price: parseFloat(newBurgerForm.price), stock: parseInt(newBurgerForm.stock, 10) || 10 };
      setBurgers([localItem, ...burgers]);
      setMessage('✅ Hamburguesa guardada localmente.');
    } finally {
      setIsSubmitting(false);
      setIsAddModalOpen(false);
      setNewBurgerForm({
        name: '',
        category: 'Especialidades del Chef',
        price: '',
        stock: '',
        specialty_level: 'Edición Especial del Chef 🔥',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=80',
        description: ''
      });
      setTimeout(() => setMessage(''), 4000);
    }
  };

  // Delete burger
  const handleDeleteBurger = async (id) => {
    if (!window.confirm('¿Deseas retirar esta hamburguesa del catálogo comercial?')) return;
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
    } catch {}
    setBurgers(burgers.filter(b => b.id !== id));
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC', color: '#0F172A', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Admin Navbar */}
      <header style={{
        background: '#FFFFFF',
        borderBottom: '1px solid #E2E8F0',
        padding: '16px 32px',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #FFE4E6, #FECDD3)',
            border: '1px solid #FDA4AF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.4rem'
          }}>
            🍔
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0F172A', lineHeight: '1.1' }}>
                Hamburger Rapid
              </h1>
              <span style={{
                background: '#FFF1F2',
                color: '#E11D48',
                fontSize: '0.7rem',
                fontWeight: '800',
                padding: '3px 8px',
                borderRadius: '9999px',
                textTransform: 'uppercase'
              }}>
                Panel Administrativo
              </span>
            </div>
            <p style={{ fontSize: '0.78rem', color: '#64748B' }}>
              Centro de Operaciones &bull; Catálogo, Consumidores & Base de Datos
            </p>
          </div>
        </div>

        {/* Database Status Quick Badge & Nav Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: serverHealth?.database?.connected ? '#ECFDF5' : '#FEF3C7',
            border: `1px solid ${serverHealth?.database?.connected ? '#A7F3D0' : '#FDE68A'}`,
            padding: '6px 14px',
            borderRadius: '9999px',
            fontSize: '0.8rem',
            fontWeight: '700',
            color: serverHealth?.database?.connected ? '#065F46' : '#92400E'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: serverHealth?.database?.connected ? '#10B981' : '#F59E0B'
            }}></span>
            {serverHealth?.database?.mode === 'mysql' ? '🐬 MySQL Conectado' : '⚡ Modo In-Memory Activo'}
          </div>

          <a
            href="/"
            style={{
              background: '#F1F5F9',
              color: '#0F172A',
              textDecoration: 'none',
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '0.85rem',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            🌐 <span>E-commerce</span>
          </a>

          <a
            href="/app"
            style={{
              background: '#E11D48',
              color: 'white',
              textDecoration: 'none',
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '0.85rem',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 8px rgba(225, 29, 72, 0.25)'
            }}
          >
            📱 <span>PWA Móvil</span>
          </a>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ maxWidth: '1280px', width: '100%', margin: '0 auto', padding: '32px 24px', flex: 1 }}>
        
        {/* Global Notifications */}
        {message && (
          <div style={{
            background: '#ECFDF5',
            border: '1px solid #A7F3D0',
            color: '#065F46',
            padding: '12px 18px',
            borderRadius: '12px',
            marginBottom: '20px',
            fontWeight: '700',
            fontSize: '0.9rem'
          }}>
            {message}
          </div>
        )}

        {/* 4 Executive KPI Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px',
          marginBottom: '32px'
        }}>
          {/* Card 1: Total Burgers */}
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '16px',
            padding: '22px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Variantes Disponibles
              </span>
              <span style={{ fontSize: '1.4rem' }}>🍔</span>
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: '800', color: '#0F172A', lineHeight: '1.1' }}>
              {burgers.length}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#059669', fontWeight: '700', marginTop: '6px' }}>
              ✓ {totalStock} unidades en stock total
            </div>
          </div>

          {/* Card 2: Consumer Revenue */}
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '16px',
            padding: '22px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Consumo Total Acumulado
              </span>
              <span style={{ fontSize: '1.4rem' }}>💰</span>
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: '800', color: '#0F172A', lineHeight: '1.1' }}>
              ${totalRevenue.toFixed(2)}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#059669', fontWeight: '700', marginTop: '6px' }}>
              ↑ +18.4% vs semana anterior
            </div>
          </div>

          {/* Card 3: Clientes Activos */}
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '16px',
            padding: '22px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Base de Consumidores
              </span>
              <span style={{ fontSize: '1.4rem' }}>👥</span>
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: '800', color: '#0F172A', lineHeight: '1.1' }}>
              {consumers.length}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#E11D48', fontWeight: '700', marginTop: '6px' }}>
              👑 {vipCount} Clientes VIP de alto volumen
            </div>
          </div>

          {/* Card 4: Ticket Promedio */}
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '16px',
            padding: '22px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Ticket Promedio
              </span>
              <span style={{ fontSize: '1.4rem' }}>🧾</span>
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: '800', color: '#0F172A', lineHeight: '1.1' }}>
              ${avgTicket}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#D97706', fontWeight: '700', marginTop: '6px' }}>
              ★ Best Seller: Rey de las Burgers
            </div>
          </div>
        </div>

        {/* Tab Selector Buttons */}
        <div style={{
          display: 'flex',
          gap: '12px',
          borderBottom: '1px solid #E2E8F0',
          paddingBottom: '14px',
          marginBottom: '28px',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => setActiveTab('burgers')}
            style={{
              background: activeTab === 'burgers' ? '#0F172A' : '#FFFFFF',
              color: activeTab === 'burgers' ? '#FFFFFF' : '#475569',
              border: '1px solid #E2E8F0',
              padding: '10px 20px',
              borderRadius: '12px',
              fontSize: '0.9rem',
              fontWeight: '800',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.15s'
            }}
          >
            <span>🍔</span> Hamburguesas Disponibles ({burgers.length})
          </button>

          <button
            onClick={() => setActiveTab('consumers')}
            style={{
              background: activeTab === 'consumers' ? '#0F172A' : '#FFFFFF',
              color: activeTab === 'consumers' ? '#FFFFFF' : '#475569',
              border: '1px solid #E2E8F0',
              padding: '10px 20px',
              borderRadius: '12px',
              fontSize: '0.9rem',
              fontWeight: '800',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.15s'
            }}
          >
            <span>📊</span> Métricas de Consumidores ({consumers.length})
          </button>

          <button
            onClick={() => setActiveTab('db')}
            style={{
              background: activeTab === 'db' ? '#0F172A' : '#FFFFFF',
              color: activeTab === 'db' ? '#FFFFFF' : '#475569',
              border: '1px solid #E2E8F0',
              padding: '10px 20px',
              borderRadius: '12px',
              fontSize: '0.9rem',
              fontWeight: '800',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.15s'
            }}
          >
            <span>🗄️</span> Estado de la Base de Datos
          </button>
        </div>

        {/* ===================== TAB 1: HAMBURGUESAS DISPONIBLES ===================== */}
        {activeTab === 'burgers' && (
          <div>
            {/* Top Toolbar */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
              gap: '16px',
              flexWrap: 'wrap'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                padding: '8px 14px',
                borderRadius: '10px',
                width: '320px',
                maxWidth: '100%'
              }}>
                <span>🔍</span>
                <input
                  type="text"
                  placeholder="Buscar por nombre o especialidad..."
                  value={searchBurger}
                  onChange={(e) => setSearchBurger(e.target.value)}
                  style={{
                    border: 'none',
                    outline: 'none',
                    width: '100%',
                    fontFamily: 'inherit',
                    fontSize: '0.88rem',
                    color: '#0F172A'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={fetchData}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    color: '#0F172A',
                    padding: '9px 16px',
                    borderRadius: '10px',
                    fontSize: '0.85rem',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  🔄 Actualizar
                </button>

                <button
                  onClick={() => setIsAddModalOpen(true)}
                  style={{
                    background: '#E11D48',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '9px 18px',
                    borderRadius: '10px',
                    fontSize: '0.85rem',
                    fontWeight: '800',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 2px 8px rgba(225, 29, 72, 0.25)'
                  }}
                >
                  <span>+</span> Nueva Hamburguesa
                </button>
              </div>
            </div>

            {/* Burgers Table */}
            <div style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 2px 12px rgba(0,0,0,0.03)'
            }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#64748B' }}>
                      <th style={{ padding: '14px 20px', fontWeight: '800', textTransform: 'uppercase', fontSize: '0.75rem' }}>Hamburguesa</th>
                      <th style={{ padding: '14px 20px', fontWeight: '800', textTransform: 'uppercase', fontSize: '0.75rem' }}>Categoría</th>
                      <th style={{ padding: '14px 20px', fontWeight: '800', textTransform: 'uppercase', fontSize: '0.75rem' }}>Nivel de Especialidad</th>
                      <th style={{ padding: '14px 20px', fontWeight: '800', textTransform: 'uppercase', fontSize: '0.75rem' }}>Precio</th>
                      <th style={{ padding: '14px 20px', fontWeight: '800', textTransform: 'uppercase', fontSize: '0.75rem' }}>Stock</th>
                      <th style={{ padding: '14px 20px', fontWeight: '800', textTransform: 'uppercase', fontSize: '0.75rem' }}>Estado</th>
                      <th style={{ padding: '14px 20px', fontWeight: '800', textTransform: 'uppercase', fontSize: '0.75rem', textAlign: 'right' }}>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBurgers.map(b => (
                      <tr key={b.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                        <td style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <img
                            src={b.image}
                            alt={b.name}
                            style={{ width: '48px', height: '48px', borderRadius: '10px', objectFit: 'cover' }}
                          />
                          <div>
                            <div style={{ fontWeight: '800', color: '#0F172A' }}>{b.name}</div>
                            <div style={{ fontSize: '0.75rem', color: '#64748B', maxWidth: '280px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {b.description}
                            </div>
                          </div>
                        </td>

                        <td style={{ padding: '14px 20px', color: '#475569', fontWeight: '600' }}>
                          {b.category}
                        </td>

                        <td style={{ padding: '14px 20px' }}>
                          <span style={{
                            background: '#FEF3C7',
                            color: '#92400E',
                            padding: '4px 10px',
                            borderRadius: '9999px',
                            fontSize: '0.75rem',
                            fontWeight: '800',
                            border: '1px solid #FDE68A'
                          }}>
                            {b.specialty_level || 'Especialidad'}
                          </span>
                        </td>

                        <td style={{ padding: '14px 20px', fontWeight: '800', color: '#0F172A', fontSize: '1rem' }}>
                          ${parseFloat(b.price).toFixed(2)}
                        </td>

                        <td style={{ padding: '14px 20px', fontWeight: '700' }}>
                          {b.stock} u.
                        </td>

                        <td style={{ padding: '14px 20px' }}>
                          <span style={{
                            background: b.stock > 20 ? '#ECFDF5' : '#FFF1F2',
                            color: b.stock > 20 ? '#065F46' : '#9F1239',
                            padding: '3px 9px',
                            borderRadius: '8px',
                            fontSize: '0.72rem',
                            fontWeight: '800'
                          }}>
                            {b.stock > 20 ? '🟢 Disponible' : '🟡 Stock Crítico'}
                          </span>
                        </td>

                        <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                          <button
                            onClick={() => handleDeleteBurger(b.id)}
                            style={{
                              background: '#FEE2E2',
                              border: 'none',
                              color: '#DC2626',
                              padding: '6px 12px',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontWeight: '700',
                              fontSize: '0.75rem'
                            }}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ===================== TAB 2: MÉTRICAS DE CONSUMIDORES ===================== */}
        {activeTab === 'consumers' && (
          <div>
            {/* Visual Consumption Distribution Bar */}
            <div style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '16px',
              padding: '24px',
              marginBottom: '24px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
            }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '8px', color: '#0F172A' }}>
                Distribución de Consumo por Segmento de Clientes
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '18px' }}>
                Análisis de valor de vida del cliente (LTV) y concentración de demanda comercial.
              </p>

              {/* Progress Distribution Bar */}
              <div style={{ display: 'flex', height: '18px', borderRadius: '9999px', overflow: 'hidden', marginBottom: '14px' }}>
                <div style={{ width: '64%', background: '#E11D48' }} title="VIP (64% Facturación)"></div>
                <div style={{ width: '26%', background: '#D97706' }} title="Frecuente (26% Facturación)"></div>
                <div style={{ width: '10%', background: '#059669' }} title="Ocasional (10% Facturación)"></div>
              </div>

              {/* Legend */}
              <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', fontSize: '0.82rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#E11D48' }}></span>
                  <span style={{ fontWeight: '700', color: '#0F172A' }}>VIP (&gt; $200):</span>
                  <span style={{ color: '#64748B' }}>64% facturación &bull; 3 clientes</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#D97706' }}></span>
                  <span style={{ fontWeight: '700', color: '#0F172A' }}>Frecuentes ($60 - $199):</span>
                  <span style={{ color: '#64748B' }}>26% facturación &bull; 3 clientes</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#059669' }}></span>
                  <span style={{ fontWeight: '700', color: '#0F172A' }}>Ocasionales (&lt; $60):</span>
                  <span style={{ color: '#64748B' }}>10% facturación &bull; 3 clientes</span>
                </div>
              </div>
            </div>

            {/* Filter Buttons for Consumer Tiers */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '18px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setConsumerFilter('all')}
                style={{
                  background: consumerFilter === 'all' ? '#0F172A' : '#FFFFFF',
                  color: consumerFilter === 'all' ? 'white' : '#475569',
                  border: '1px solid #E2E8F0',
                  padding: '8px 16px',
                  borderRadius: '9999px',
                  fontSize: '0.82rem',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                Todos los Clientes ({consumers.length})
              </button>

              <button
                onClick={() => setConsumerFilter('vip')}
                style={{
                  background: consumerFilter === 'vip' ? '#E11D48' : '#FFFFFF',
                  color: consumerFilter === 'vip' ? 'white' : '#475569',
                  border: '1px solid #E2E8F0',
                  padding: '8px 16px',
                  borderRadius: '9999px',
                  fontSize: '0.82rem',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                👑 Clientes VIP (&gt; $200)
              </button>

              <button
                onClick={() => setConsumerFilter('frequent')}
                style={{
                  background: consumerFilter === 'frequent' ? '#D97706' : '#FFFFFF',
                  color: consumerFilter === 'frequent' ? 'white' : '#475569',
                  border: '1px solid #E2E8F0',
                  padding: '8px 16px',
                  borderRadius: '9999px',
                  fontSize: '0.82rem',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                🥈 Frecuentes ($60 - $199)
              </button>

              <button
                onClick={() => setConsumerFilter('occasional')}
                style={{
                  background: consumerFilter === 'occasional' ? '#059669' : '#FFFFFF',
                  color: consumerFilter === 'occasional' ? 'white' : '#475569',
                  border: '1px solid #E2E8F0',
                  padding: '8px 16px',
                  borderRadius: '9999px',
                  fontSize: '0.82rem',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                🥉 Ocasionales (&lt; $60)
              </button>
            </div>

            {/* Consumers Table */}
            <div style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 2px 12px rgba(0,0,0,0.03)'
            }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#64748B' }}>
                      <th style={{ padding: '14px 20px', fontWeight: '800', textTransform: 'uppercase', fontSize: '0.75rem' }}>Consumidor</th>
                      <th style={{ padding: '14px 20px', fontWeight: '800', textTransform: 'uppercase', fontSize: '0.75rem' }}>Segmento</th>
                      <th style={{ padding: '14px 20px', fontWeight: '800', textTransform: 'uppercase', fontSize: '0.75rem' }}>Consumo Total ($)</th>
                      <th style={{ padding: '14px 20px', fontWeight: '800', textTransform: 'uppercase', fontSize: '0.75rem' }}>Órdenes</th>
                      <th style={{ padding: '14px 20px', fontWeight: '800', textTransform: 'uppercase', fontSize: '0.75rem' }}>Burger Favorita</th>
                      <th style={{ padding: '14px 20px', fontWeight: '800', textTransform: 'uppercase', fontSize: '0.75rem' }}>Última Compra</th>
                      <th style={{ padding: '14px 20px', fontWeight: '800', textTransform: 'uppercase', fontSize: '0.75rem' }}>Estatus</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredConsumers.map(c => (
                      <tr key={c.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                        <td style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ fontSize: '1.4rem' }}>{c.avatar || '👤'}</span>
                          <div>
                            <div style={{ fontWeight: '800', color: '#0F172A' }}>{c.name}</div>
                            <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{c.email}</div>
                          </div>
                        </td>

                        <td style={{ padding: '14px 20px' }}>
                          <span style={{
                            background: c.tier === 'vip' ? '#FFF1F2' : (c.tier === 'frequent' ? '#FEF3C7' : '#F1F5F9'),
                            color: c.tier === 'vip' ? '#E11D48' : (c.tier === 'frequent' ? '#92400E' : '#475569'),
                            padding: '4px 10px',
                            borderRadius: '9999px',
                            fontSize: '0.75rem',
                            fontWeight: '800'
                          }}>
                            {c.segment}
                          </span>
                        </td>

                        <td style={{ padding: '14px 20px', fontWeight: '800', color: '#0F172A', fontSize: '1.05rem' }}>
                          ${c.totalSpent.toFixed(2)}
                        </td>

                        <td style={{ padding: '14px 20px', fontWeight: '700' }}>
                          {c.ordersCount} compras
                        </td>

                        <td style={{ padding: '14px 20px', color: '#0F172A', fontWeight: '600' }}>
                          🍔 {c.favoriteBurger}
                        </td>

                        <td style={{ padding: '14px 20px', color: '#64748B', fontSize: '0.8rem' }}>
                          {c.lastOrder}
                        </td>

                        <td style={{ padding: '14px 20px' }}>
                          <span style={{
                            background: '#ECFDF5',
                            color: '#065F46',
                            padding: '3px 8px',
                            borderRadius: '6px',
                            fontSize: '0.72rem',
                            fontWeight: '800'
                          }}>
                            {c.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ===================== TAB 3: ESTADO DE LA BASE DE DATOS ===================== */}
        {activeTab === 'db' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            {/* Live Connection Card */}
            <div style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '20px',
              padding: '28px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.03)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <span style={{ fontSize: '1.8rem' }}>🗄️</span>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0F172A' }}>
                    Motor de Base de Datos
                  </h3>
                  <span style={{ fontSize: '0.78rem', color: '#64748B' }}>
                    Infraestructura de almacenamiento y sincronización
                  </span>
                </div>
              </div>

              <div style={{
                background: serverHealth?.database?.connected ? '#ECFDF5' : '#FFFBEB',
                border: `1px solid ${serverHealth?.database?.connected ? '#A7F3D0' : '#FDE68A'}`,
                borderRadius: '14px',
                padding: '18px',
                marginBottom: '20px'
              }}>
                <div style={{ fontSize: '0.75rem', fontWeight: '800', color: '#64748B', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Estado Actual de Conexión
                </div>
                <div style={{ fontSize: '1.35rem', fontWeight: '800', color: serverHealth?.database?.connected ? '#065F46' : '#92400E' }}>
                  {serverHealth?.database?.mode === 'mysql' ? '🐬 Conectado a Servidor MySQL' : '⚡ Modo In-Memory Activo (Alta Disponibilidad)'}
                </div>
                <p style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '6px' }}>
                  {serverHealth?.database?.connected
                    ? 'La base de datos MySQL responde de forma óptima a las transacciones de Hamburger Rapid.'
                    : 'Operando en memoria volátil de alto rendimiento. Las órdenes y productos se sirven con latencia sub-milisegundo.'}
                </p>
              </div>

              {/* Technical specs table */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9', paddingBottom: '8px' }}>
                  <span style={{ color: '#64748B', fontWeight: '600' }}>Host Conectado</span>
                  <span style={{ fontWeight: '800', color: '#0F172A' }}>{serverHealth?.database?.host || 'Localhost / Memory'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9', paddingBottom: '8px' }}>
                  <span style={{ color: '#64748B', fontWeight: '600' }}>Base de Datos</span>
                  <span style={{ fontWeight: '800', color: '#0F172A' }}>{serverHealth?.database?.database || 'hamburger_rapid_db'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9', paddingBottom: '8px' }}>
                  <span style={{ color: '#64748B', fontWeight: '600' }}>Uptime del Servidor</span>
                  <span style={{ fontWeight: '800', color: '#059669' }}>{serverHealth?.uptime ? `${Math.floor(serverHealth.uptime)} seg` : 'Activo'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9', paddingBottom: '8px' }}>
                  <span style={{ color: '#64748B', fontWeight: '600' }}>Registros Hamburguesas</span>
                  <span style={{ fontWeight: '800', color: '#0F172A' }}>{burgers.length} productos</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '4px' }}>
                  <span style={{ color: '#64748B', fontWeight: '600' }}>Registros Clientes</span>
                  <span style={{ fontWeight: '800', color: '#0F172A' }}>{consumers.length} clientes</span>
                </div>
              </div>
            </div>

            {/* Health & Diagnostic Actions */}
            <div style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '20px',
              padding: '28px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.03)'
            }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0F172A', marginBottom: '8px' }}>
                Acciones de Mantenimiento & Health Check
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '20px' }}>
                Herramientas directas para el administrador de sistemas y DevOps en Dokploy.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <button
                  onClick={fetchData}
                  style={{
                    background: '#0F172A',
                    color: 'white',
                    border: 'none',
                    padding: '14px 20px',
                    borderRadius: '12px',
                    fontWeight: '800',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <span>🔄</span> Probar Conexión & Refrescar Métricas
                </button>

                <a
                  href="/api/health"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    background: '#F1F5F9',
                    color: '#0F172A',
                    border: '1px solid #CBD5E1',
                    padding: '14px 20px',
                    borderRadius: '12px',
                    fontWeight: '800',
                    fontSize: '0.9rem',
                    textDecoration: 'none',
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <span>🩺</span> Ver Endpoint JSON /api/health
                </a>

                <div style={{
                  background: '#FFF1F2',
                  border: '1px solid #FFE4E6',
                  borderRadius: '12px',
                  padding: '16px',
                  marginTop: '10px'
                }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: '800', color: '#E11D48', marginBottom: '4px' }}>
                    RESTAURACIÓN DE FÁBRICA
                  </div>
                  <p style={{ fontSize: '0.78rem', color: '#64748B', marginBottom: '12px' }}>
                    Restaura las 10 hamburguesas oficiales iniciales de Hamburger Rapid en la base de datos.
                  </p>
                  <button
                    onClick={async () => {
                      if (!window.confirm('¿Restablecer el catálogo oficial de Hamburger Rapid?')) return;
                      try {
                        await fetch('/api/reset', { method: 'POST' });
                        fetchData();
                        setMessage('🌱 Catálogo de Hamburger Rapid re-sembrado exitosamente.');
                      } catch {}
                    }}
                    style={{
                      background: '#FFFFFF',
                      border: '1px solid #FDA4AF',
                      color: '#E11D48',
                      padding: '8px 14px',
                      borderRadius: '8px',
                      fontWeight: '800',
                      fontSize: '0.8rem',
                      cursor: 'pointer'
                    }}
                  >
                    🌱 Re-sembrar Datos Demo Oficiales
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Modal: Agregar Nueva Hamburguesa */}
      {isAddModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(6px)',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            maxWidth: '560px',
            width: '100%',
            padding: '28px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
            border: '1px solid #E2E8F0'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#0F172A' }}>
                Nueva Hamburguesa Comercial
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                style={{ background: '#F1F5F9', border: 'none', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', fontWeight: '700' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddBurger} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: '800', color: '#64748B', textTransform: 'uppercase' }}>Nombre</label>
                <input
                  type="text"
                  required
                  placeholder="ej: Burger Monster Doble Queso"
                  value={newBurgerForm.name}
                  onChange={(e) => setNewBurgerForm({ ...newBurgerForm, name: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem', marginTop: '4px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: '800', color: '#64748B', textTransform: 'uppercase' }}>Categoría</label>
                  <select
                    value={newBurgerForm.category}
                    onChange={(e) => setNewBurgerForm({ ...newBurgerForm, category: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem', marginTop: '4px', background: '#FFFFFF' }}
                  >
                    <option>Especialidades del Chef</option>
                    <option>Clásicas Reales</option>
                    <option>Pollo Crispy</option>
                    <option>Smash Burgers</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: '800', color: '#64748B', textTransform: 'uppercase' }}>Badge de Especialidad</label>
                  <input
                    type="text"
                    placeholder="ej: Chef Signature ⭐"
                    value={newBurgerForm.specialty_level}
                    onChange={(e) => setNewBurgerForm({ ...newBurgerForm, specialty_level: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem', marginTop: '4px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: '800', color: '#64748B', textTransform: 'uppercase' }}>Precio ($ USD)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="14.99"
                    value={newBurgerForm.price}
                    onChange={(e) => setNewBurgerForm({ ...newBurgerForm, price: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem', marginTop: '4px' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: '800', color: '#64748B', textTransform: 'uppercase' }}>Stock Inicial</label>
                  <input
                    type="number"
                    required
                    placeholder="40"
                    value={newBurgerForm.stock}
                    onChange={(e) => setNewBurgerForm({ ...newBurgerForm, stock: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem', marginTop: '4px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: '800', color: '#64748B', textTransform: 'uppercase' }}>URL de Imagen</label>
                <input
                  type="url"
                  value={newBurgerForm.image}
                  onChange={(e) => setNewBurgerForm({ ...newBurgerForm, image: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem', marginTop: '4px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: '800', color: '#64748B', textTransform: 'uppercase' }}>Descripción Comercial</label>
                <textarea
                  rows="3"
                  placeholder="Describe los ingredientes, punto de cocción y sabor..."
                  value={newBurgerForm.description}
                  onChange={(e) => setNewBurgerForm({ ...newBurgerForm, description: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem', marginTop: '4px', fontFamily: 'inherit' }}
                ></textarea>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    flex: 1,
                    background: '#E11D48',
                    color: 'white',
                    border: 'none',
                    padding: '12px',
                    borderRadius: '10px',
                    fontWeight: '800',
                    fontSize: '0.95rem',
                    cursor: 'pointer'
                  }}
                >
                  {isSubmitting ? 'Guardando...' : 'Guardar y Publicar'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  style={{
                    background: '#F1F5F9',
                    color: '#0F172A',
                    border: 'none',
                    padding: '12px 20px',
                    borderRadius: '10px',
                    fontWeight: '700',
                    fontSize: '0.95rem',
                    cursor: 'pointer'
                  }}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{
        background: '#FFFFFF',
        borderTop: '1px solid #E2E8F0',
        padding: '20px 32px',
        textAlign: 'center',
        fontSize: '0.82rem',
        color: '#64748B'
      }}>
        Hamburger Rapid &bull; Panel de Operaciones Comerciales v1.0 &bull; Arquitectura React + Astro + Node.js + Dokploy
      </footer>

    </div>
  );
}
