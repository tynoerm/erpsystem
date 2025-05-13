import mongoose from "mongoose";
import express from "express";
import orderSchema from "../../models/SupplyChainManagement/orders.js";

import { Parser } from "json2csv";

let router = express.Router();

// Get all orders
router.get('/', async (req, res) => {
    try {
        const orders = await orderSchema.find();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new order
router.post('/', async (req, res) => {
    const order = new orderSchema({
        customerName: req.body.customerName,
        product: req.body.product,
        quantity: req.body.quantity,
    });

    try {
        const newOrder = await order.save();
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update order status
router.put('/:id/status', async (req, res) => {
    try {
        const order = await orderSchema.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        order.status = req.body.status;
        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
export { router as ordersRoutes}

