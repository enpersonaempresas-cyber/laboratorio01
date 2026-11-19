import React, { useState, useEffect } from 'react';

// Catálogo base de hamburguesas para Hamburger Rapid PWA
const MENU_ITEMS = [
  {
    id: 1,
    name: 'Rey de las Burgers',
    category: 'Especialidades',
    price: 14.99,
    badge: 'Legendaria ⭐⭐⭐',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=80',
    description: 'Carne Angus 220g a la leña, panceta ahumada al roble, cheddar inglés 12m, cebolla al bourbon y mayonesa trufada.',
    calories: '860 kcal'
  },
  {
    id: 2,
    name: 'Burger Real Clásica',
    category: 'Clásicas',
    price: 10.99,
    badge: 'Clásica de la Casa 👑',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&auto=format&fit=crop&q=80',
    description: 'Medallón jugoso 160g, queso americano fundido, lechuga romana, tomate fresco, pepinillos y salsa Rapid.',
    calories: '650 kcal'
  },
  {
    id: 3,
    name: 'Burger Real Doble',
    category: 'Clásicas',
    price: 13.99,
    badge: 'Premium Doble 🍔',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=500&auto=format&fit=crop&q=80',
    description: 'Doble smash (2x120g) con costra dorada, doble cheddar fundido, cebolla morada brunoise y alioli suave.',
    calories: '790 kcal'
  },
  {
    id: 4,
    name: 'Burger Doble Especial',
    category: 'Especialidades',
    price: 15.50,
    badge: 'Edición Chef 🔥',
    image: '/images/burger-doble-especial.jpg',
    description: 'Doble corte Angus (300g), queso gouda ahumado, bacon crocante glaseado en maple y champiñones al tomillo.',
    calories: '920 kcal'
  },
  {
    id: 5,
    name: 'Burger Crispy Golden Chicken',
    category: 'Pollo Crispy',
    price: 12.50,
    badge: 'Extra Crunch 🍗',
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=500&auto=format&fit=crop&q=80',
    description: 'Suprema crujiente marinada 24h en buttermilk con especias, ensalada coleslaw fresca y salsa honey mustard.',
    calories: '680 kcal'
  },
  {
    id: 6,
    name: 'Truffle & Mushroom Artisan',
    category: 'Especialidades',
    price: 16.20,
    badge: 'Gourmet ✨',
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=500&auto=format&fit=crop&q=80',
    description: 'Carne Angus premium, salsa de trufa negra silvestre, portobellos salteados al vino y queso provolone.',
    calories: '740 kcal'
  },
  {
    id: 7,
    name: 'Spicy Jalapeño Inferno',
    category: 'Especialidades',
    price: 13.50,
    badge: 'Picante 🌶️',
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=500&auto=format&fit=crop&q=80',
    description: 'Medallón a la parrilla con pepper jack, jalapeños tempurizados crocantes y emulsión de chipotle ahumado.',
    calories: '760 kcal'
  },
  {
    id: 8,
    name: 'Smoky BBQ Monster',
    category: 'Especialidades',
    price: 15.90,
    badge: 'Ahumada 🪵',
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=500&auto=format&fit=crop&q=80',
    description: 'Carne de res coronada con pulled pork ahumado 12h, aros de cebolla caseros y salsa BBQ al whisky.',
    calories: '940 kcal'
  },
  {
    id: 9,
    name: 'Guacamole & Swiss Fresh',
    category: 'Clásicas',
    price: 13.80,
    badge: 'Frescura 🥑',
    image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=500&auto=format&fit=crop&q=80',
    description: 'Medallón jugoso con guacamole casero de aguacates Hass frescos, queso suizo Emmental y brotes tiernos.',
    calories: '690 kcal'
  },
  {
    id: 10,
    name: 'Triple Cheese Melt Supreme',
    category: 'Clásicas',
    price: 14.50,
    badge: 'Ultra Cheese 🧀',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&auto=format&fit=crop&q=80',
    description: 'Triple smash con costra caramelizada, queso Cheddar inglés, Mozzarella hilada y Provolone dulce fundido.',
    calories: '880 kcal'
  }
];

const SPECIAL_OFFERS = [
  {
    id: 'OFFER-1',
    title: '🔥 2x1 en Rey de las Burgers',
    subtitle: 'Nuestra burger estrella duplicada para compartir',
    price: 14.99,
    originalPrice: 29.98,
    tag: '50% OFF',
    items: ['Rey de las Burgers', 'Rey de las Burgers (Gratis)'],
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'OFFER-2',
    title: '👑 Combo Real Doble + Papas + Bebida',
    subtitle: 'Burger Real Doble + Papas Rústicas + Coca Cola Zero',
    price: 16.99,
    originalPrice: 21.50,
    tag: 'COMBO VIP',
    items: ['Burger Real Doble', 'Papas Rústicas de la Casa', 'Bebida 350ml'],
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'OFFER-3',
    title: '🍗 Combo Crispy Golden + Aros',
    subtitle: 'Pechuga crujiente en panko + aros de cebolla + dip',
    price: 14.50,
    originalPrice: 18.00,
    tag: 'CRUNCH DEAL',
    items: ['Burger Crispy Golden Chicken', 'Aros de Cebolla a la Cerveza'],
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=500&auto=format&fit=crop&q=80'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('menu'); // 'menu' | 'ofertas' | 'ordenes' | 'perfil'
  const [menuItems, setMenuItems] = useState(MENU_ITEMS);
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Cart state
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponMessage, setCouponMessage] = useState('');

  // Item customization modal
  const [customizingItem, setCustomizingItem] = useState(null);
  const [customExtras, setCustomExtras] = useState({
    extraCheddar: false,
    extraBacon: false,
    caramelizedOnions: false,
    friesSide: false
  });

  // Simulated Checkout state
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState('Av. Providencia 1420, Depto 402');
  const [paymentMethod, setPaymentMethod] = useState('Tarjeta RapidPay VIP (•••• 8920)');
  const [orderSuccess, setOrderSuccess] = useState(null);

  // Orders History
  const [orders, setOrders] = useState([
    {
      id: 'RAPID-781923',
      date: 'Hoy, hace 45 min',
      status: 'Entregado ✅',
      total: 28.98,
      items: [
        { name: 'Rey de las Burgers', qty: 1, price: 14.99 },
        { name: 'Burger Real Doble', qty: 1, price: 13.99 }
      ]
    },
    {
      id: 'RAPID-650192',
      date: 'Ayer, 20:15',
      status: 'Entregado ✅',
      total: 15.50,
      items: [
        { name: 'Burger Doble Especial', qty: 1, price: 15.50 }
      ]
    }
  ]);

  // Try fetching products from backend API if available
  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data && data.data.length > 0) {
          // Normalize
          const mapped = data.data.map(p => ({
            id: p.id,
            name: p.name,
            category: p.category.includes('Parrilla') || p.category.includes('Chef') ? 'Especialidades' : (p.category.includes('Pollo') ? 'Pollo Crispy' : 'Clásicas'),
            price: parseFloat(p.price) || 12.99,
            badge: p.specialty_level || 'Especialidad ⭐',
            image: p.image || 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=80',
            description: p.description || 'Hamburguesa artesanal de res con queso fundido y pan brioche.',
            calories: p.calories || '750 kcal'
          }));
          setMenuItems(mapped);
        }
      })
      .catch(() => {
        // Fallback gracefully to default MENU_ITEMS
      });
  }, []);

  // Filtered menu
  const filteredMenu = menuItems.filter(item => {
    const matchesCat = selectedCategory === 'Todas' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Cart calculations
  const totalItemsCount = cart.reduce((acc, item) => acc + item.qty, 0);
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const discountAmount = subtotal * (discountPercent / 100);
  const deliveryFee = subtotal > 25 || discountPercent > 0 ? 0.00 : 2.50;
  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee);

  // Add Item to Cart
  const handleOpenCustomize = (item) => {
    setCustomizingItem(item);
    setCustomExtras({
      extraCheddar: false,
      extraBacon: false,
      caramelizedOnions: false,
      friesSide: false
    });
  };

  const handleConfirmAddToCart = () => {
    if (!customizingItem) return;
    let extraCost = 0;
    const notesList = [];
    if (customExtras.extraCheddar) { extraCost += 1.50; notesList.push('+ Cheddar Extra'); }
    if (customExtras.extraBacon) { extraCost += 2.00; notesList.push('+ Bacon Crocante'); }
    if (customExtras.caramelizedOnions) { extraCost += 1.20; notesList.push('+ Cebolla Caramelizada'); }
    if (customExtras.friesSide) { extraCost += 2.90; notesList.push('+ Papas Rústicas'); }

    const itemPrice = customizingItem.price + extraCost;
    const itemKey = `${customizingItem.id}-${notesList.join('-')}`;

    setCart(prev => {
      const existing = prev.find(i => i.key === itemKey);
      if (existing) {
        return prev.map(i => i.key === itemKey ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, {
        ...customizingItem,
        key: itemKey,
        price: itemPrice,
        notes: notesList.join(', '),
        qty: 1
      }];
    });

    setCustomizingItem(null);
  };

  const handleAddOfferToCart = (offer) => {
    const itemKey = `offer-${offer.id}`;
    setCart(prev => {
      const existing = prev.find(i => i.key === itemKey);
      if (existing) {
        return prev.map(i => i.key === itemKey ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, {
        id: offer.id,
        key: itemKey,
        name: offer.title,
        price: offer.price,
        image: offer.image,
        notes: offer.items.join(', '),
        qty: 1
      }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQty = (key, delta) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.key === key) {
          const newQty = item.qty + delta;
          return newQty > 0 ? { ...item, qty: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (code === 'RAPID20' || code === 'RAPID2026') {
      setDiscountPercent(20);
      setCouponMessage('🎉 ¡20% de descuento aplicado con éxito!');
    } else if (code === 'RAPIDFREE') {
      setDiscountPercent(10);
      setCouponMessage('🚀 ¡Envío gratis + 10% de descuento aplicado!');
    } else {
      setCouponMessage('❌ Cupón inválido. Prueba con RAPID20 o RAPIDFREE');
    }
  };

  // Simular la compra
  const handleExecuteCheckout = () => {
    if (cart.length === 0) return;
    setIsCheckingOut(true);

    // Call simulated backend endpoint or simulate
    const newOrderId = 'RAPID-' + Math.floor(100000 + Math.random() * 900000);
    const orderRecord = {
      id: newOrderId,
      date: 'Ahora mismo',
      status: 'En Parrilla 👨‍🍳',
      total: grandTotal,
      address: deliveryAddress,
      paymentMethod,
      items: cart.map(c => ({ name: c.name, qty: c.qty, price: c.price, notes: c.notes }))
    };

    fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderId: newOrderId,
        total: grandTotal,
        items: cart,
        address: deliveryAddress,
        customerName: 'Carlos Mendoza'
      })
    }).catch(() => {});

    setTimeout(() => {
      setOrders(prev => [orderRecord, ...prev]);
      setOrderSuccess(orderRecord);
      setCart([]);
      setIsCheckingOut(false);
      setIsCartOpen(false);
      setActiveTab('ordenes');
    }, 1200);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#F8FAFC', position: 'relative' }}>
      
      {/* Top Mobile App Header */}
      <header style={{
        background: '#FFFFFF',
        borderBottom: '1px solid #E2E8F0',
        padding: '14px 20px',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #FFE4E6, #FECDD3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.25rem',
            border: '1px solid #FDA4AF'
          }}>
            🍔
          </div>
          <div>
            <div style={{ fontWeight: '800', fontSize: '1.05rem', color: '#0F172A', lineHeight: '1.1' }}>
              Hamburger Rapid
            </div>
            <div style={{ fontSize: '0.72rem', color: '#059669', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981' }}></span>
              Abierto &bull; 18-22 min entrega
            </div>
          </div>
        </div>

        {/* Floating Cart Icon Button */}
        <button
          onClick={() => setIsCartOpen(true)}
          style={{
            background: '#FFF1F2',
            border: '1px solid #FFE4E6',
            color: '#E11D48',
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            cursor: 'pointer',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.15rem',
            transition: 'all 0.2s'
          }}
          title="Ver Carrito de Compra"
        >
          🛒
          {totalItemsCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-3px',
              right: '-3px',
              background: '#E11D48',
              color: 'white',
              fontSize: '0.7rem',
              fontWeight: '800',
              borderRadius: '9999px',
              width: '19px',
              height: '19px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid white'
            }}>
              {totalItemsCount}
            </span>
          )}
        </button>
      </header>

      {/* Main Tab Content View */}
      <main style={{ flex: 1, paddingBottom: totalItemsCount > 0 ? '140px' : '90px', overflowY: 'auto' }} className="fade-in">
        
        {/* ===================== TAB 1: MENÚ ===================== */}
        {activeTab === 'menu' && (
          <div>
            {/* Search & Location Bar */}
            <div style={{ padding: '16px 20px 10px', background: '#FFFFFF', borderBottom: '1px solid #F1F5F9' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: '#F1F5F9',
                borderRadius: '12px',
                padding: '10px 14px',
                marginBottom: '12px'
              }}>
                <span style={{ fontSize: '1rem', color: '#64748B' }}>🔍</span>
                <input
                  type="text"
                  placeholder="Buscar hamburguesa, ingredientes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    width: '100%',
                    fontSize: '0.9rem',
                    color: '#0F172A',
                    fontFamily: 'inherit'
                  }}
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}>
                    ✕
                  </button>
                )}
              </div>

              {/* Category Pills */}
              <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '6px' }}>
                {['Todas', 'Especialidades', 'Clásicas', 'Pollo Crispy'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    style={{
                      background: selectedCategory === cat ? '#0F172A' : '#F1F5F9',
                      color: selectedCategory === cat ? '#FFFFFF' : '#475569',
                      border: 'none',
                      padding: '7px 15px',
                      borderRadius: '9999px',
                      fontSize: '0.82rem',
                      fontWeight: '700',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.15s'
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Menu List */}
            <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: '800', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Hamburguesas Disponibles ({filteredMenu.length})
                </span>
                <span style={{ fontSize: '0.78rem', color: '#E11D48', fontWeight: '700' }}>
                  ✨ Carne 100% Angus
                </span>
              </div>

              {filteredMenu.map(burger => (
                <div
                  key={burger.id}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '16px',
                    padding: '14px',
                    display: 'flex',
                    gap: '14px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                    alignItems: 'center'
                  }}
                >
                  <img
                    src={burger.image}
                    alt={burger.name}
                    style={{
                      width: '92px',
                      height: '92px',
                      borderRadius: '12px',
                      objectFit: 'cover',
                      flexShrink: 0
                    }}
                  />

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                      <span style={{
                        background: '#FEF3C7',
                        color: '#92400E',
                        fontSize: '0.68rem',
                        fontWeight: '800',
                        padding: '2px 7px',
                        borderRadius: '9999px'
                      }}>
                        {burger.badge}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '0.98rem', fontWeight: '800', color: '#0F172A', marginBottom: '4px', lineHeight: '1.2' }}>
                      {burger.name}
                    </h3>
                    
                    <p style={{
                      fontSize: '0.78rem',
                      color: '#64748B',
                      lineHeight: '1.4',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      marginBottom: '8px'
                    }}>
                      {burger.description}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0F172A' }}>
                        ${burger.price.toFixed(2)}
                      </span>

                      <button
                        onClick={() => handleOpenCustomize(burger)}
                        style={{
                          background: '#E11D48',
                          color: '#FFFFFF',
                          border: 'none',
                          padding: '6px 14px',
                          borderRadius: '8px',
                          fontSize: '0.8rem',
                          fontWeight: '700',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          boxShadow: '0 2px 6px rgba(225, 29, 72, 0.25)'
                        }}
                      >
                        <span>+</span> Agregar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================== TAB 2: OFERTAS ===================== */}
        {activeTab === 'ofertas' && (
          <div style={{ padding: '20px' }}>
            <div style={{ marginBottom: '16px' }}>
              <span style={{
                background: '#FFF1F2',
                color: '#E11D48',
                fontSize: '0.75rem',
                fontWeight: '800',
                padding: '4px 10px',
                borderRadius: '9999px',
                textTransform: 'uppercase'
              }}>
                Promociones de Temporada
              </span>
              <h2 style={{ fontSize: '1.45rem', fontWeight: '800', color: '#0F172A', marginTop: '6px' }}>
                Combos & Cupones Rapid
              </h2>
              <p style={{ fontSize: '0.85rem', color: '#64748B' }}>
                Ahorra hasta un 50% con nuestros combos seleccionados y códigos exclusivos.
              </p>
            </div>

            {/* Coupon Card Promo */}
            <div style={{
              background: 'linear-gradient(135deg, #1E293B, #0F172A)',
              color: 'white',
              borderRadius: '16px',
              padding: '18px',
              marginBottom: '20px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <span style={{ background: '#E11D48', fontSize: '0.7rem', fontWeight: '800', padding: '3px 8px', borderRadius: '4px' }}>
                CUPÓN ACTIVO
              </span>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', margin: '8px 0 4px' }}>
                20% OFF en todo tu pedido
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#94A3B8', marginBottom: '12px' }}>
                Usa el código en el carrito para activar tu descuento inmediato.
              </p>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255,255,255,0.1)',
                border: '1px dashed rgba(255,255,255,0.3)',
                padding: '6px 14px',
                borderRadius: '8px',
                fontWeight: '800',
                fontSize: '0.9rem',
                letterSpacing: '0.05em',
                color: '#FEF08A'
              }}>
                RAPID20
              </div>
            </div>

            {/* Special Offers List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {SPECIAL_OFFERS.map(offer => (
                <div
                  key={offer.id}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.04)'
                  }}
                >
                  <div style={{ position: 'relative', height: '140px' }}>
                    <img src={offer.image} alt={offer.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <span style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      background: '#E11D48',
                      color: 'white',
                      fontWeight: '800',
                      fontSize: '0.72rem',
                      padding: '4px 9px',
                      borderRadius: '9999px'
                    }}>
                      {offer.tag}
                    </span>
                  </div>

                  <div style={{ padding: '16px' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0F172A', marginBottom: '4px' }}>
                      {offer.title}
                    </h3>
                    <p style={{ fontSize: '0.82rem', color: '#64748B', marginBottom: '12px' }}>
                      {offer.subtitle}
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #F1F5F9', paddingTop: '12px' }}>
                      <div>
                        <span style={{ fontSize: '1.3rem', fontWeight: '800', color: '#0F172A' }}>
                          ${offer.price.toFixed(2)}
                        </span>
                        <span style={{ fontSize: '0.85rem', color: '#94A3B8', textDecoration: 'line-through', marginLeft: '6px' }}>
                          ${offer.originalPrice.toFixed(2)}
                        </span>
                      </div>

                      <button
                        onClick={() => handleAddOfferToCart(offer)}
                        style={{
                          background: '#E11D48',
                          color: 'white',
                          border: 'none',
                          padding: '8px 16px',
                          borderRadius: '8px',
                          fontWeight: '700',
                          fontSize: '0.82rem',
                          cursor: 'pointer'
                        }}
                      >
                        Añadir Oferta
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================== TAB 3: ORDENES ===================== */}
        {activeTab === 'ordenes' && (
          <div style={{ padding: '20px' }}>
            <div style={{ marginBottom: '18px' }}>
              <span style={{
                background: '#ECFDF5',
                color: '#065F46',
                fontSize: '0.75rem',
                fontWeight: '800',
                padding: '4px 10px',
                borderRadius: '9999px',
                textTransform: 'uppercase'
              }}>
                Seguimiento en Vivo
              </span>
              <h2 style={{ fontSize: '1.45rem', fontWeight: '800', color: '#0F172A', marginTop: '6px' }}>
                Tus Órdenes Rápidas
              </h2>
              <p style={{ fontSize: '0.85rem', color: '#64748B' }}>
                Historial de compras y simulación de despacho en tiempo real.
              </p>
            </div>

            {/* Active Live Order Animation if just purchased */}
            {orderSuccess && (
              <div style={{
                background: '#FFFFFF',
                border: '2px solid #E11D48',
                borderRadius: '18px',
                padding: '20px',
                marginBottom: '22px',
                boxShadow: '0 8px 24px rgba(225, 29, 72, 0.12)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#E11D48', textTransform: 'uppercase' }}>
                    🚨 PEDIDO SIMULADO EN VIVO
                  </span>
                  <span style={{ fontWeight: '800', fontSize: '0.85rem', color: '#0F172A' }}>
                    #{orderSuccess.id}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <div style={{ fontSize: '2.4rem' }}>👨‍🍳</div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0F172A' }}>
                      En la Parrilla a Fuego Vivo
                    </h4>
                    <p style={{ fontSize: '0.8rem', color: '#64748B' }}>
                      Tiempo estimado de llegada: 18 minutos
                    </p>
                  </div>
                </div>

                {/* Stepper */}
                <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', margin: '14px 0 8px' }}>
                  <div style={{ textAlign: 'center', flex: 1 }}>
                    <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#10B981', color: 'white', margin: '0 auto 4px', fontSize: '0.7rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</div>
                    <span style={{ fontSize: '0.68rem', fontWeight: '700', color: '#0F172A' }}>Recibido</span>
                  </div>
                  <div style={{ textAlign: 'center', flex: 1 }}>
                    <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#E11D48', color: 'white', margin: '0 auto 4px', fontSize: '0.7rem', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'pulse 1s infinite' }}>🔥</div>
                    <span style={{ fontSize: '0.68rem', fontWeight: '800', color: '#E11D48' }}>Parrilla</span>
                  </div>
                  <div style={{ textAlign: 'center', flex: 1 }}>
                    <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#E2E8F0', color: '#94A3B8', margin: '0 auto 4px', fontSize: '0.7rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🛵</div>
                    <span style={{ fontSize: '0.68rem', fontWeight: '600', color: '#94A3B8' }}>En Camino</span>
                  </div>
                  <div style={{ textAlign: 'center', flex: 1 }}>
                    <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#E2E8F0', color: '#94A3B8', margin: '0 auto 4px', fontSize: '0.7rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🏁</div>
                    <span style={{ fontSize: '0.68rem', fontWeight: '600', color: '#94A3B8' }}>Entregado</span>
                  </div>
                </div>
              </div>
            )}

            {/* List of Orders */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {orders.map(order => (
                <div
                  key={order.id}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '16px',
                    padding: '16px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div>
                      <span style={{ fontSize: '0.88rem', fontWeight: '800', color: '#0F172A' }}>
                        Orden #{order.id}
                      </span>
                      <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{order.date}</div>
                    </div>
                    <span style={{
                      background: order.status.includes('Parrilla') ? '#FFF1F2' : '#ECFDF5',
                      color: order.status.includes('Parrilla') ? '#E11D48' : '#059669',
                      fontSize: '0.72rem',
                      fontWeight: '800',
                      padding: '3px 8px',
                      borderRadius: '8px'
                    }}>
                      {order.status}
                    </span>
                  </div>

                  <div style={{ borderTop: '1px solid #F1F5F9', borderBottom: '1px solid #F1F5F9', padding: '10px 0', margin: '8px 0', fontSize: '0.82rem', color: '#475569' }}>
                    {order.items.map((it, idx) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                        <span>{it.qty}x {it.name}</span>
                        <span style={{ fontWeight: '700' }}>${(it.price * it.qty).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                    <span style={{ fontSize: '0.85rem', color: '#64748B' }}>Total Pagado</span>
                    <span style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0F172A' }}>
                      ${order.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================== TAB 4: PERFIL ===================== */}
        {activeTab === 'perfil' && (
          <div style={{ padding: '20px' }}>
            {/* User Card */}
            <div style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '20px',
              padding: '24px 20px',
              textAlign: 'center',
              boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
              marginBottom: '20px'
            }}>
              <div style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #FFE4E6, #FECDD3)',
                border: '3px solid #E11D48',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                margin: '0 auto 12px'
              }}>
                👨‍💼
              </div>

              <h2 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#0F172A' }}>Carlos Mendoza</h2>
              <p style={{ fontSize: '0.82rem', color: '#64748B', marginBottom: '12px' }}>carlos.mendoza@empresa.com</p>

              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#FEF3C7', color: '#92400E', padding: '4px 14px', borderRadius: '9999px', fontSize: '0.78rem', fontWeight: '800' }}>
                👑 SOCIO RAPID VIP GOLD
              </div>

              {/* Stats Bar */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', borderTop: '1px solid #F1F5F9', marginTop: '18px', paddingTop: '16px' }}>
                <div>
                  <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0F172A' }}>450</div>
                  <div style={{ fontSize: '0.72rem', color: '#94A3B8', fontWeight: '700' }}>Rapid Coins</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0F172A' }}>18</div>
                  <div style={{ fontSize: '0.72rem', color: '#94A3B8', fontWeight: '700' }}>Pedidos</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#059669' }}>$342.50</div>
                  <div style={{ fontSize: '0.72rem', color: '#94A3B8', fontWeight: '700' }}>Consumo Total</div>
                </div>
              </div>
            </div>

            {/* Profile Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span>📍</span>
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: '700', color: '#0F172A' }}>Dirección Guardada</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{deliveryAddress}</div>
                  </div>
                </div>
                <span style={{ color: '#CBD5E1' }}>&rsaquo;</span>
              </div>

              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span>💳</span>
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: '700', color: '#0F172A' }}>Método de Pago Predeterminado</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748B' }}>RapidPay VIP Express</div>
                  </div>
                </div>
                <span style={{ color: '#CBD5E1' }}>&rsaquo;</span>
              </div>

              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span>📲</span>
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: '700', color: '#0F172A' }}>Instalación PWA</div>
                    <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: '600' }}>Disponible para pantalla de inicio</div>
                  </div>
                </div>
                <span style={{ color: '#CBD5E1' }}>&rsaquo;</span>
              </div>
            </div>

            {/* Quick Links to other modules */}
            <div style={{ background: '#F1F5F9', borderRadius: '14px', padding: '14px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: '700', marginBottom: '8px' }}>
                NAVEGACIÓN DE PLATAFORMA
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <a href="/" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', padding: '8px 14px', borderRadius: '8px', color: '#0F172A', textDecoration: 'none', fontSize: '0.82rem', fontWeight: '700' }}>
                  🌐 E-commerce
                </a>
                <a href="/admin" style={{ background: '#0F172A', color: 'white', padding: '8px 14px', borderRadius: '8px', textDecoration: 'none', fontSize: '0.82rem', fontWeight: '700' }}>
                  ⚙️ Panel Admin
                </a>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Floating Bottom Cart Bar (if cart has items and modal is closed) */}
      {totalItemsCount > 0 && !isCartOpen && (
        <div style={{
          position: 'fixed',
          bottom: '76px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'calc(100% - 32px)',
          maxWidth: '448px',
          background: '#0F172A',
          color: 'white',
          borderRadius: '16px',
          padding: '12px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 12px 30px rgba(15, 23, 42, 0.35)',
          zIndex: 60,
          cursor: 'pointer'
        }}
        onClick={() => setIsCartOpen(true)}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{
              background: '#E11D48',
              color: 'white',
              fontSize: '0.8rem',
              fontWeight: '800',
              padding: '2px 8px',
              borderRadius: '9999px'
            }}>
              {totalItemsCount}
            </span>
            <span style={{ fontWeight: '700', fontSize: '0.92rem' }}>Ver Tu Orden</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontWeight: '800', fontSize: '1.05rem', color: '#FEF08A' }}>
              ${grandTotal.toFixed(2)}
            </span>
            <span style={{ fontSize: '1.1rem' }}>&rarr;</span>
          </div>
        </div>
      )}

      {/* Bottom Navigation Tabs */}
      <nav style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '480px',
        background: '#FFFFFF',
        borderTop: '1px solid #E2E8F0',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        padding: '8px 0 12px',
        zIndex: 70,
        boxShadow: '0 -4px 15px rgba(0, 0, 0, 0.04)'
      }}>
        <button
          onClick={() => setActiveTab('menu')}
          style={{
            background: 'none',
            border: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px',
            color: activeTab === 'menu' ? '#E11D48' : '#64748B',
            cursor: 'pointer',
            padding: '4px'
          }}
        >
          <span style={{ fontSize: '1.3rem' }}>🍔</span>
          <span style={{ fontSize: '0.72rem', fontWeight: activeTab === 'menu' ? '800' : '600' }}>Menú</span>
        </button>

        <button
          onClick={() => setActiveTab('ofertas')}
          style={{
            background: 'none',
            border: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px',
            color: activeTab === 'ofertas' ? '#E11D48' : '#64748B',
            cursor: 'pointer',
            padding: '4px'
          }}
        >
          <span style={{ fontSize: '1.3rem' }}>🏷️</span>
          <span style={{ fontSize: '0.72rem', fontWeight: activeTab === 'ofertas' ? '800' : '600' }}>Ofertas</span>
        </button>

        <button
          onClick={() => setActiveTab('ordenes')}
          style={{
            background: 'none',
            border: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px',
            color: activeTab === 'ordenes' ? '#E11D48' : '#64748B',
            cursor: 'pointer',
            padding: '4px',
            position: 'relative'
          }}
        >
          <span style={{ fontSize: '1.3rem' }}>📋</span>
          <span style={{ fontSize: '0.72rem', fontWeight: activeTab === 'ordenes' ? '800' : '600' }}>Ordenes</span>
          {orders.length > 0 && (
            <span style={{
              position: 'absolute',
              top: '4px',
              right: '28%',
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: '#10B981'
            }}></span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('perfil')}
          style={{
            background: 'none',
            border: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px',
            color: activeTab === 'perfil' ? '#E11D48' : '#64748B',
            cursor: 'pointer',
            padding: '4px'
          }}
        >
          <span style={{ fontSize: '1.3rem' }}>👤</span>
          <span style={{ fontSize: '0.72rem', fontWeight: activeTab === 'perfil' ? '800' : '600' }}>Perfil</span>
        </button>
      </nav>

      {/* Item Customization Modal */}
      {customizingItem && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(6px)',
          zIndex: 100,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center'
        }}
        onClick={() => setCustomizingItem(null)}
        >
          <div
            style={{
              background: '#FFFFFF',
              width: '100%',
              maxWidth: '480px',
              borderTopLeftRadius: '24px',
              borderTopRightRadius: '24px',
              padding: '24px',
              maxHeight: '85vh',
              overflowY: 'auto',
              boxShadow: '0 -10px 40px rgba(0,0,0,0.15)'
            }}
            onClick={(e) => e.stopPropagation()}
            className="fade-in"
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <span style={{ background: '#FEF3C7', color: '#92400E', fontSize: '0.7rem', fontWeight: '800', padding: '3px 8px', borderRadius: '9999px' }}>
                  {customizingItem.badge}
                </span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#0F172A', marginTop: '6px' }}>
                  {customizingItem.name}
                </h3>
                <span style={{ fontSize: '1.2rem', fontWeight: '800', color: '#E11D48' }}>
                  ${customizingItem.price.toFixed(2)}
                </span>
              </div>
              <button
                onClick={() => setCustomizingItem(null)}
                style={{ background: '#F1F5F9', border: 'none', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', fontWeight: '700' }}
              >
                ✕
              </button>
            </div>

            <p style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: '1.5', marginBottom: '20px' }}>
              {customizingItem.description}
            </p>

            <h4 style={{ fontSize: '0.88rem', fontWeight: '800', color: '#0F172A', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Personaliza tu Burger
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                background: customExtras.extraCheddar ? '#FFF1F2' : '#F8FAFC',
                border: `1px solid ${customExtras.extraCheddar ? '#FDA4AF' : '#E2E8F0'}`,
                borderRadius: '12px',
                cursor: 'pointer'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="checkbox"
                    checked={customExtras.extraCheddar}
                    onChange={(e) => setCustomExtras({ ...customExtras, extraCheddar: e.target.checked })}
                  />
                  <span style={{ fontSize: '0.88rem', fontWeight: '600' }}>🧀 Extra Queso Cheddar Fundido</span>
                </div>
                <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#E11D48' }}>+$1.50</span>
              </label>

              <label style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                background: customExtras.extraBacon ? '#FFF1F2' : '#F8FAFC',
                border: `1px solid ${customExtras.extraBacon ? '#FDA4AF' : '#E2E8F0'}`,
                borderRadius: '12px',
                cursor: 'pointer'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="checkbox"
                    checked={customExtras.extraBacon}
                    onChange={(e) => setCustomExtras({ ...customExtras, extraBacon: e.target.checked })}
                  />
                  <span style={{ fontSize: '0.88rem', fontWeight: '600' }}>🥓 Bacon Crocante al Roble</span>
                </div>
                <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#E11D48' }}>+$2.00</span>
              </label>

              <label style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                background: customExtras.caramelizedOnions ? '#FFF1F2' : '#F8FAFC',
                border: `1px solid ${customExtras.caramelizedOnions ? '#FDA4AF' : '#E2E8F0'}`,
                borderRadius: '12px',
                cursor: 'pointer'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="checkbox"
                    checked={customExtras.caramelizedOnions}
                    onChange={(e) => setCustomExtras({ ...customExtras, caramelizedOnions: e.target.checked })}
                  />
                  <span style={{ fontSize: '0.88rem', fontWeight: '600' }}>🧅 Cebolla Caramelizada al Bourbon</span>
                </div>
                <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#E11D48' }}>+$1.20</span>
              </label>

              <label style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                background: customExtras.friesSide ? '#FFF1F2' : '#F8FAFC',
                border: `1px solid ${customExtras.friesSide ? '#FDA4AF' : '#E2E8F0'}`,
                borderRadius: '12px',
                cursor: 'pointer'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="checkbox"
                    checked={customExtras.friesSide}
                    onChange={(e) => setCustomExtras({ ...customExtras, friesSide: e.target.checked })}
                  />
                  <span style={{ fontSize: '0.88rem', fontWeight: '600' }}>🍟 Acompañamiento Papas Rústicas</span>
                </div>
                <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#E11D48' }}>+$2.90</span>
              </label>
            </div>

            <button
              onClick={handleConfirmAddToCart}
              style={{
                width: '100%',
                background: '#E11D48',
                color: 'white',
                border: 'none',
                padding: '14px',
                borderRadius: '12px',
                fontWeight: '800',
                fontSize: '0.95rem',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(225, 29, 72, 0.3)'
              }}
            >
              Agregar al Pedido
            </button>
          </div>
        </div>
      )}

      {/* Shopping Cart & Simulated Checkout Drawer */}
      {isCartOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(6px)',
          zIndex: 110,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center'
        }}
        onClick={() => setIsCartOpen(false)}
        >
          <div
            style={{
              background: '#FFFFFF',
              width: '100%',
              maxWidth: '480px',
              borderTopLeftRadius: '24px',
              borderTopRightRadius: '24px',
              padding: '24px',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 -10px 40px rgba(0,0,0,0.15)'
            }}
            onClick={(e) => e.stopPropagation()}
            className="fade-in"
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.4rem' }}>🛒</span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#0F172A' }}>
                  Tu Pedido Rapid
                </h3>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                style={{ background: '#F1F5F9', border: 'none', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', fontWeight: '700' }}
              >
                ✕
              </button>
            </div>

            {cart.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '30px 10px' }}>
                <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🍔💨</div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0F172A', marginBottom: '6px' }}>Tu carrito está vacío</h4>
                <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '18px' }}>Explora el menú y agrega tus hamburguesas favoritas.</p>
                <button
                  onClick={() => { setIsCartOpen(false); setActiveTab('menu'); }}
                  style={{ background: '#E11D48', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: '700' }}
                >
                  Ir al Menú
                </button>
              </div>
            ) : (
              <div>
                {/* Cart Items List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '18px' }}>
                  {cart.map(item => (
                    <div
                      key={item.key}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 12px',
                        background: '#F8FAFC',
                        borderRadius: '12px',
                        border: '1px solid #E2E8F0'
                      }}
                    >
                      <div style={{ flex: 1, minWidth: 0, marginRight: '10px' }}>
                        <div style={{ fontWeight: '700', fontSize: '0.9rem', color: '#0F172A' }}>{item.name}</div>
                        {item.notes && (
                          <div style={{ fontSize: '0.72rem', color: '#E11D48', fontWeight: '600' }}>{item.notes}</div>
                        )}
                        <div style={{ fontSize: '0.85rem', fontWeight: '800', color: '#64748B', marginTop: '2px' }}>
                          ${item.price.toFixed(2)}
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button
                          onClick={() => handleUpdateQty(item.key, -1)}
                          style={{ width: '28px', height: '28px', borderRadius: '6px', border: '1px solid #CBD5E1', background: '#FFFFFF', fontWeight: '800', cursor: 'pointer' }}
                        >
                          -
                        </button>
                        <span style={{ fontSize: '0.9rem', fontWeight: '800', minWidth: '18px', textAlign: 'center' }}>
                          {item.qty}
                        </span>
                        <button
                          onClick={() => handleUpdateQty(item.key, 1)}
                          style={{ width: '28px', height: '28px', borderRadius: '6px', border: 'none', background: '#E11D48', color: 'white', fontWeight: '800', cursor: 'pointer' }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Coupon Input */}
                <div style={{ marginBottom: '18px', background: '#F1F5F9', padding: '12px', borderRadius: '12px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      placeholder="Código Cupón (ej: RAPID20)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      style={{
                        flex: 1,
                        background: '#FFFFFF',
                        border: '1px solid #CBD5E1',
                        borderRadius: '8px',
                        padding: '8px 12px',
                        fontSize: '0.85rem',
                        fontWeight: '700',
                        textTransform: 'uppercase'
                      }}
                    />
                    <button
                      onClick={handleApplyCoupon}
                      style={{
                        background: '#0F172A',
                        color: 'white',
                        border: 'none',
                        padding: '8px 14px',
                        borderRadius: '8px',
                        fontWeight: '700',
                        fontSize: '0.82rem',
                        cursor: 'pointer'
                      }}
                    >
                      Aplicar
                    </button>
                  </div>
                  {couponMessage && (
                    <div style={{ fontSize: '0.75rem', fontWeight: '700', color: discountPercent > 0 ? '#059669' : '#DC2626', marginTop: '6px' }}>
                      {couponMessage}
                    </div>
                  )}
                </div>

                {/* Delivery & Payment Selection for Simulation */}
                <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '14px', marginBottom: '18px' }}>
                  <div style={{ marginBottom: '10px' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: '800', color: '#64748B', textTransform: 'uppercase' }}>
                      Dirección de Entrega
                    </label>
                    <input
                      type="text"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        border: '1px solid #CBD5E1',
                        fontSize: '0.85rem',
                        marginTop: '4px'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: '800', color: '#64748B', textTransform: 'uppercase' }}>
                      Método de Pago
                    </label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        border: '1px solid #CBD5E1',
                        fontSize: '0.85rem',
                        marginTop: '4px',
                        background: '#FFFFFF'
                      }}
                    >
                      <option>Tarjeta RapidPay VIP (•••• 8920)</option>
                      <option>Apple Pay / Google Pay</option>
                      <option>Efectivo contra entrega</option>
                    </select>
                  </div>
                </div>

                {/* Bill Breakdown */}
                <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem', marginBottom: '18px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B' }}>
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {discountPercent > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#059669', fontWeight: '700' }}>
                      <span>Descuento ({discountPercent}%)</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B' }}>
                    <span>Envío Rapid 20m</span>
                    <span>{deliveryFee === 0 ? 'GRATIS 🚀' : `$${deliveryFee.toFixed(2)}`}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: '800', color: '#0F172A', marginTop: '6px', borderTop: '1px solid #E2E8F0', paddingTop: '8px' }}>
                    <span>Total a Pagar</span>
                    <span style={{ color: '#E11D48' }}>${grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Confirm & Simulate Button */}
                <button
                  disabled={isCheckingOut}
                  onClick={handleExecuteCheckout}
                  style={{
                    width: '100%',
                    background: isCheckingOut ? '#94A3B8' : '#E11D48',
                    color: 'white',
                    border: 'none',
                    padding: '16px',
                    borderRadius: '14px',
                    fontWeight: '800',
                    fontSize: '1rem',
                    cursor: isCheckingOut ? 'not-allowed' : 'pointer',
                    boxShadow: '0 6px 20px rgba(225, 29, 72, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  {isCheckingOut ? (
                    <span>Enviando orden a la parrilla... ⏳</span>
                  ) : (
                    <span>Confirmar y Simular Compra 🍔🚀</span>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
