import mongoose from "mongoose";
import express from "express";
import { Parser } from "json2csv";
import PDFDocument from "pdfkit";
import path from "path";
import fs from "fs";
import 'pdfkit-table';
import { fileURLToPath } from "url";

import quotationmanagementSchema from "../../models/Sales and Customer Relation/quotationmanagement.js";

const router = express.Router();

// Fetch all quotations
router.route("/").get(async (req, res, next) => {
  try {
    const result = await quotationmanagementSchema.find();
    res.json({
      data: result,
      message: "quotations fetched",
      status: 200,
    });
  } catch (err) {
    return next(err);
  }
});

// Create a new quotation
router.route("/create-quotation").post(async (req, res, next) => {
  try {
    const result = await quotationmanagementSchema.create(req.body);
    res.json({
      data: result,
      message: "quotation created successfully",
      status: 200,
    });
  } catch (err) {
    return next(err);
  }
});

router.route("/update-quotation/:id").put(async (req, res, next) => {
  try {
    const result = await quotationmanagementSchema.findByIdAndUpdate(req.params.id, req.body, { new: true });
    console.log(result);
    res.json({
      data: result,
      msg: "Data successfully updated.",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to update data." });
  }
});

router.route("/delete-quotationmanagement/:id").delete(async (req, res, next) => {
  try {
    const deletedUser = await quotationmanagementSchema.findOneAndDelete({ _id: req.params.id });
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ msg: "Data successfully deleted." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting user' });
  }
});




// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.post('/download-pdf', async (req, res) => {
  const { selectedQuotations } = req.body;

  try {
    const quotations = await quotationmanagementSchema.find({ _id: { $in: selectedQuotations } });

    const doc = new PDFDocument();
    const filePath = path.join(__dirname, 'quotations.pdf');
    const writeStream = fs.createWriteStream(filePath);

    doc.pipe(writeStream);

    // Add logo image
    const logoPath = path.join(__dirname, '../../images/updatedlog.jpeg'); // Replace with the path to your logo
    doc.image(logoPath, 50, 40, { width: 50, height: 50 }); // Adjust the position and size as needed

    // Title
    doc.fontSize(20).text('Freight Marks Logistics', 110, 50); // Adjust the position to fit next to the logo
    doc.fontSize(20).text('Quotation', 110, 80); // Adjust the position to fit next to the logo
    doc.moveDown(2);

    // Table headers
    const headers = [
      'Quotation Number',
      'Current Date',
      'Expiry Date',
      'Goods Description',
      'Sender Name',
      'Created By',
      'Payment Methods',
      'VAT Amount',
      'Gross Total Amount',
      'Discount Applied',
      'Total Freight Charges'
    ];

    // Table
    const table = {
      headers,
      rows: quotations.map(quotation => [
        quotation.quotationnumber,
        quotation.currentdate,
        quotation.expirydate,
        quotation.goodsdescription,
        quotation.sendername,
        quotation.createdby,
        quotation.paymentmethods,
        quotation.vatamount,
        quotation.taxes,
        quotation.insurancefees,
        quotation.totalfreightcharges
      ])
    };

    // Calculate column widths
    const columnWidths = [80, 80, 80, 100, 80, 80, 100, 80, 100, 100, 100];
    const startX = 50;
    const startY = 150;
    const rowHeight = 20;

    // Render table headers
    doc.font('Helvetica-Bold').fontSize(10);
    headers.forEach((header, i) => {
      doc.text(header, startX + columnWidths.slice(0, i).reduce((a, b) => a + b, 0), startY, {
        width: columnWidths[i],
        align: 'left'
      });
    });

    // Render table rows
    doc.font('Helvetica').fontSize(10);
    table.rows.forEach((row, rowIndex) => {
      const rowY = startY + (rowIndex + 1) * rowHeight;
      row.forEach((cell, cellIndex) => {
        doc.text(cell, startX + columnWidths.slice(0, cellIndex).reduce((a, b) => a + b, 0), rowY, {
          width: columnWidths[cellIndex],
          align: 'left'
        });
      });
    });

    doc.end();

    writeStream.on('finish', () => {
      res.download(filePath, 'quotations.pdf', (err) => {
        if (err) {
          console.error('Error downloading the file:', err);
          res.status(500).send('Error downloading the file');
        } else {
          fs.unlink(filePath, (unlinkErr) => {
            if (unlinkErr) {
              console.error('Error deleting the file:', unlinkErr);
            }
          });
        }
      });
    });

    writeStream.on('error', (err) => {
      console.error('Error writing the PDF file:', err);
      res.status(500).send('Error writing the PDF file');
    });

  } catch (error) {
    console.error('Error fetching quotations:', error);
    res.status(500).send('Error fetching quotations');
  }
});

export default router;


export { router as quotationmanagementRoutes };
