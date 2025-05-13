import mongoose from 'mongoose';
import express from 'express';
import warehouseLocationSchema from '../../models/ManufacturingProduction/WarehouseLocation.js';
import { Parser } from 'json2csv';

let router = express.Router();

// Create payroll attribute
router.route('/create-location').post(async (req, res, next) => {
    try {
        const result = await warehouseLocationSchema.create(req.body);
        res.json({
            data: result,
            message: 'location attribute contributed',
            status: 200,
        });
    } catch (err) {
        return next(err);
    }
});


router.route('/').get(async (req, res, next) => {
    try {
        const result = await warehouseLocationSchema.find();
        res.json({
            data: result,
            message: 'information retrieved',
            status: 200,
        });
    } catch (err) {
        return next(err);
    }
});









export { router as warehouseLocationRoutes };
