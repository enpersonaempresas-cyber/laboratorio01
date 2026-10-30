const express = require('express');
const router = express.Router();
const db = require('../db');

// Health Check Endpoint (For Dokploy Health Checks & Admin Dashboard)
router.get('/health', (req, res) => {
  const dbStatus = db.getDbStatus();
  res.json({
    status: 'healthy',
    business: 'Hamburger Rapid',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: '1.0.0',
    platform: 'Hamburger Rapid Commercial v1',
    database: dbStatus
  });
});

// List burgers
router.get('/products', async (req, res) => {
  try {
    const products = await db.getProducts();
    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Add new burger
router.post('/products', async (req, res) => {
  try {
    const { name, category, price, stock, specialty_level, image, description } = req.body;
    if (!name || price === undefined) {
      return res.status(400).json({ success: false, error: 'Nombre y precio son requeridos.' });
    }
    const product = await db.addProduct({ name, category, price, stock, specialty_level, image, description });
    res.status(201).json({ success: true, message: 'Hamburguesa agregada exitosamente', data: product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete burger
router.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.deleteProduct(id);
    res.json({ success: true, message: `Hamburguesa ${id} eliminada.` });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Reset initial burgers
router.post('/reset', async (req, res) => {
  try {
    await db.resetProducts();
    res.json({ success: true, message: 'Catálogo de Hamburger Rapid restablecido.' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Consumers list & segments
router.get('/consumers', (req, res) => {
  try {
    const consumers = db.getConsumers();
    const analytics = db.getConsumerAnalytics();
    res.json({
      success: true,
      data: consumers,
      analytics
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Consumer analytics KPI summary
router.get('/consumers/analytics', (req, res) => {
  try {
    const analytics = db.getConsumerAnalytics();
    res.json({
      success: true,
      data: analytics
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Simulated Checkout Orders Endpoint
router.post('/orders', (req, res) => {
  try {
    const { items, customerName, address, paymentMethod, total } = req.body;
    const orderId = 'RAPID-' + Math.floor(100000 + Math.random() * 900000);
    const order = {
      orderId,
      items: items || [],
      customerName: customerName || 'Cliente Hamburger Rapid',
      address: address || 'Dirección de Entrega',
      paymentMethod: paymentMethod || 'Tarjeta RapidPay',
      total: parseFloat(total) || 0,
      status: 'Confirmada',
      eta: '20-25 minutos',
      createdAt: new Date().toISOString()
    };

    res.status(201).json({
      success: true,
      message: '¡Orden recibida en cocina! Estamos encendiendo la parrilla.',
      data: order
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
