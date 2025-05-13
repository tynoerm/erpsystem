import mongoose from "mongoose";
import express from "express";
import { Parser } from "json2csv";
import PDFDocument from "pdfkit";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import purchaseorderSchema from "../../models/SupplyChainManagement/purchaseorder.js";

const router = express.Router();

// Fetch all quotations
router.route("/").get(async (req, res, next) => {
  try {
    const result = await purchaseorderSchema.find();
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
router.route("/create-purchaseorder").post(async (req, res, next) => {
  try {
    const result = await  purchaseorderSchema.create(req.body);
    res.json({
      data: result,
      message: " created successfully",
      status: 200,
    });
  } catch (err) {
    return next(err);
  }
});
router.route('/purchaseorders/auth', async (req, res) => {
  const { id, status } = req.body;

  try {
    const updatedOrder = await PurchaseOrder.findOneAndUpdate(
      { purchaseordernumber: id },
      { status: status },
      { new: true }
    );

    if (updatedOrder) {
      res.status(200).json({ success: true, data: updatedOrder });
    } else {
      res.status(404).json({ success: false, message: 'Purchase order not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
});

router.route("/update-purchaseorder/:id").put(async (req, res, next) => {
  try {
    const result = await  purchaseorderSchema.findByIdAndUpdate(req.params.id, req.body, { new: true });
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

// Download selected quotations as PDF

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.post('/download-pdf', async (req, res) => {
  const { selectedPurchaseorder } = req.body;

  try {
    const purchaeseorder = await  purchaseorderSchema.find({ _id: { $in: selectedPurchaseorder } });

    const doc = new PDFDocument();
    const filePath = path.join(__dirname, 'quotations.pdf');
    const writeStream = fs.createWriteStream(filePath);

    doc.pipe(writeStream);
    
    doc.fontSize(20).text('FREIGHT MARKS PURCHASE ORDER', { align: 'center' });
    doc.moveDown();

    purchaeseorder.forEach(purchaeseorder => {
      doc.fontSize(12).text(`Purchase Order Number: ${purchaeseorder.purchaseordernumber}`);
      doc.text(`Current Date: ${purchaeseorder. date}`);
      doc.text('');
      doc.text(`Buyer Name: ${purchaeseorder.buyername}`);
      doc.text(`Purchase Order Details: ${purchaeseorder. purchaseorderdetails}`);
      doc.text(`Buyer Adddress: ${purchaeseorder. buyeraddress}`);
      doc.text(`Created By: ${purchaeseorder.createdby}`);
      doc.text(`Payment Methods: ${purchaeseorder.paymentmethods}`);
      doc.text(`Supplier Name: ${purchaeseorder.suppliername}`);
      doc.text(`Supplier Address: ${purchaeseorder.supplieraddress}`);
      doc.text(`Value added Tax: ${purchaeseorder. vat}`);
      doc.text(`Total Price: ${purchaeseorder.totalprice}`);
      doc.moveDown();
    });

    doc.end();

    writeStream.on('finish', () => {
      res.download(filePath, 'purchaseorder.pdf', (err) => {
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


export { router as PurchaseOrderRoutes };
