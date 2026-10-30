# 🍔 Hamburger Rapid — Primera Versión Comercial

Plataforma comercial completa para el negocio de comida rápida gourmet **Hamburger Rapid**, construida con arquitectura multi-aplicación optimizada para entrega continua (CI/CD) en Dokploy.

---

## 🏛️ Arquitectura del Sistema

El proyecto está organizado como un monorepo modular con 3 capas front-end y un backend centralizado:

1. **`apps/ecommerce` (Landing Page Comercial en Astro v4)**
   - Landing page moderna con paleta clara premium (fondos marfil/blancos, acentos carmesí y dorados artesanales).
   - Catálogo de **10 variantes destacadas** con badges de especialidad:
     - 👑 *Rey de las Burgers* (Especialidad: Legendaria ⭐⭐⭐)
     - 👑 *Burger Real Clásica* (Especialidad: Clásica de la Casa 👑)
     - 🍔 *Burger Real Doble* (Especialidad: Premium Doble 🍔)
     - 🔥 *Burger Doble Especial* (Especialidad: Edición Especial del Chef 🔥)
     - 🍗 *Burger Crispy Golden Chicken* (Especialidad: Extra Crunch 🍗)
     - ✨ *Truffle & Mushroom Artisan* (Especialidad: Gourmet Signature ✨)
     - 🌶️ *Spicy Jalapeño Inferno* (Especialidad: Picante Fuego 🌶️)
     - 🪵 *Smoky BBQ Monster* (Especialidad: Ahumada al Roble 🪵)
     - 🥑 *Guacamole & Swiss Fresh* (Especialidad: Frescura Suprema 🥑)
     - 🧀 *Triple Cheese Melt Supreme* (Especialidad: Máxima Adicción 🧀)
   - Modal interactivo con ingredientes, tiempo de preparación, calorías y llamada a la acción para ordenar.

2. **`apps/pwa` (Aplicación Móvil PWA en React 18 + Vite)**
   - Barra de navegación inferior fija con 4 pestañas:
     - 🍔 **Menú**: Catálogo interactivo, filtrado por categorías, buscador y modal de personalización (ingredientes extra, tipos de pan, acompañamientos).
     - 🏷️ **Ofertas**: Combos 2x1, paquetes especiales y cupones de descuento interactivos (`RAPID20`, `RAPIDFREE`).
     - 📋 **Ordenes**: Historial de órdenes y seguimiento en tiempo real del pedido simulado con stepper animado (*En Cocina -> En Parrilla -> En Camino -> Entregado*).
     - 👤 **Perfil**: Ficha del cliente (*Carlos Mendoza - VIP Gold*), puntos Rapid Coins y accesos directos.
   - Flujo completo de simulación de compra con carrito flotante, desglose de costos y confirmación instantánea.

3. **`apps/admin` (Panel Administrativo en React 18 + Vite)**
   - Dashboard ejecutivo con paleta clara premium.
   - **Gestión de Hamburguesas Disponibles**: Tabla interactiva con badges de nivel de especialidad, precios, control de stock y modal para añadir nuevas variantes comerciales.
   - **Métricas de Consumidores**: Análisis por nivel de consumo (*VIP > $200*, *Frecuentes $60-$199*, *Ocasionales < $60*), ticket promedio y distribución visual del volumen de facturación.
   - **Monitor de Base de Datos**: Estado de conexión en tiempo real (*MySQL / In-Memory Fallback*), host, latencia, uptime y herramienta de re-siembra oficial.

4. **`server` (Backend Runtime en Node.js + Express + MySQL2)**
   - API RESTful unificada bajo `/api`:
     - `GET /api/health`: Chequeo de salud del servicio y de la BD.
     - `GET /api/products`: Lista de hamburguesas disponibles.
     - `POST /api/products`: Creación de nuevas hamburguesas.
     - `DELETE /api/products/:id`: Eliminación de hamburguesas.
     - `GET /api/consumers`: Listado y segmentos de consumidores.
     - `GET /api/consumers/analytics`: Métricas KPI de consumo.
     - `POST /api/orders`: Recepción y simulación de órdenes.
     - `POST /api/reset`: Re-siembra del catálogo inicial.
   - Servidor estático optimizado para servir:
     - `/`: Landing E-commerce.
     - `/app`: PWA Mobile.
     - `/admin`: Panel Administrativo.

---

## 🚀 Comandos de Ejecución

```bash
# 1. Instalar todas las dependencias
npm run install:all

# 2. Compilar todas las aplicaciones y sincronizar en server/public
npm run build:all

# 3. Iniciar el servidor backend unificado
npm start
```

---

## 🐳 Despliegue con Docker & Dokploy

El proyecto incluye un `Dockerfile` multi-stage que compila las 3 aplicaciones de forma paralela y empaqueta el backend listo para producción.
