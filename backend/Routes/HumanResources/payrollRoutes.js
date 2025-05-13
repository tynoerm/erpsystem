import mongoose from 'mongoose';
import express from 'express';
import payrollSchema from '../../models/Human Resources/payroll.js';
import { Parser } from 'json2csv';

let router = express.Router();

// Create payroll attribute
router.route('/create-payroll').post(async (req, res, next) => {
    try {
        const result = await payrollSchema.create(req.body);
        res.json({
            data: result,
            message: 'Payroll attribute contributed',
            status: 200,
        });
    } catch (err) {
        return next(err);
    }
});

// Get all payroll information
router.route('/').get(async (req, res, next) => {
    try {
        const result = await payrollSchema.find();
        res.json({
            data: result,
            message: 'Payroll information retrieved',
            status: 200,
        });
    } catch (err) {
        return next(err);
    }
});

// Update payroll
router.route('/update-payroll/:id').put(async (req, res, next) => {
    try {
        const result = await payrollSchema.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({
            data: result,
            msg: 'Data successfully updated.',
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to update data.' });
    }
});

// Delete payroll
router.route('/delete-payroll/:id').delete(async (req, res, next) => {
    try {
        const deletedUser = await payrollSchema.findOneAndDelete({ _id: req.params.id });
        if (!deletedUser) {
            return res.status(404).json({ error: 'Payroll entry not found' });
        }
        res.json({ msg: 'Data successfully deleted.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error deleting payroll entry' });
    }
});

// Generate CSV
router.route('/generate-csv').get(async (req, res) => {
    try {
        // Fetch data from MongoDB using Mongoose
        const data = await payrollSchema.find({}, { _id: 0 }); // Exclude _id field if needed

        // Define the fields for the CSV and their titles
        const fields = [
            { label: 'Employee Name', value: 'employee_name' },
            { label: 'Employee Status', value: 'employee_status' },
            { label: 'Job Title', value: 'job_title' },
            { label: 'Base Salary', value: 'base_salary' },
            { label: 'Bonuses', value: 'bonuses' },
            { label: 'Medical Contribution Deductions', value: 'deductions_medicalcontribution' },
            { label: 'Banking Details', value: 'banking_details' },
        ];
        const opts = { fields };

        // Convert data to CSV format using json2csv
        const parser = new Parser(opts);
        const csv = parser.parse(data);

        // Set response headers for CSV download
        res.header('Content-Type', 'text/csv');
        res.attachment('payroll_data.csv');
        res.send(csv);
    } catch (error) {
        console.error('Error generating CSV:', error);
        res.status(500).send('Error generating CSV');
    }
});

export { router as payrollRoutes };
