import mongoose  from "mongoose";
import express from "express";
import leadmanagementSchema from "../../models/Sales and Customer Relation/leadmanagement.js"

import { Parser } from "json2csv";
import PDFDocument from "pdfkit";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

let router = express.Router();


//creating a leadmanagementactivity

router.route("/create-lead").post(async (req, res, next) => {
    await  leadmanagementSchema
    .create(req.body)
    .then((result) => {
        res.json({
            data:result,
            message: "activity created",
            status: 200,
        });

    })
        .catch((err) => {
            return next(err);
        });
    });


    //get all leads


router.route("/").get(async (req, res, next) => {
    await leadmanagementSchema
     .find()
     .then ((result) => {
        res.json({
            data: result, 
            message: "leads information selected",
            status: 200,
        });
     })

     .catch((err) => {
        return next(err);
     });
});



router.route("/update-leadmanagement/:id").put(async (req, res, next) => {
    try {
      const result = await leadmanagementSchema.findByIdAndUpdate(req.params.id, req.body, { new: true });
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

  router.route("/delete-leadmanagement/:id").delete(async (req, res, next) => {
    try {
      const deletedUser = await leadmanagementSchema.findOneAndDelete({ _id: req.params.id });
      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ msg: "Data successfully deleted." });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error deleting user' });
    }
  });

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
// Define the route to fetch data and generate CSV
router.route('/generate-csv').get(async (req, res) => {
  try {
      // Fetch data from MongoDB using Mongoose
      // Specify the fields to include/exclude in the projection (excluding _id here)
      const data = await leadmanagementSchema.find({}, { _id: 0 });

      // Convert data to CSV format using json2csv
      const fields = ['date', 'sendername', ' recipient','listofitems',' quantityofpackages','referencename',' referencenumber']; // Define your CSV headers here
      const opts = { fields };
      const parser = new Parser(opts);
      const csvData = parser.parse(data);

      // Add overall header
      const overallHeader = 'Freight Marks Logistics Delivery Note\n\n'; // Two newlines to separate from the column headers
      const csv = overallHeader + csvData;

      // Set response headers for CSV download
      res.header('Content-Type', 'text/csv');
      res.attachment('data.csv');
      res.send(csv);
  } catch (error) {
      // Log and send error response
      console.error('Error generating CSV:', error);
      res.status(500).send('Error generating CSV');
  }
});

// Download selected quotations as PDF
router.post('/download-pdf', async (req, res) => {
  const { selectedLeadmanagement } = req.body;

  try {
    const leadmanagement = await leadmanagementSchema.find({ _id: { $in: selectedLeadmanagement } });

    const doc = new PDFDocument({ margin: 40, size: 'A4' });
    const filePath = path.join(__dirname, 'quotations.pdf');
    const writeStream = fs.createWriteStream(filePath);

    doc.pipe(writeStream);

    // Add logo image
    const logoPath = path.join(__dirname, '../../images/fmclog.png'); // Replace with the path to your logo
    const headerYPosition = 20;
    doc.image(logoPath, 40, headerYPosition, { width: 80 }); // Adjust width and position as needed

    // Add main header beside the logo
    doc.fontSize(14).text('Freight Marks Logistics Delivery Note', 130, headerYPosition, {
      align: 'left'
    });
    doc.moveDown(2); // Add space below the header

    // Table headers
    const tableTop = 100;
    const itemTop = (index) => tableTop + (index + 1) * 15; // Reduce row height to fit more rows

    doc.fontSize(8);
    doc.text('Date', 40, tableTop);
    doc.text('Sender Name', 90, tableTop);
    doc.text('Recipient', 150, tableTop);
    doc.text('List of Items', 230, tableTop);
    doc.text('Quantity', 310, tableTop);
    doc.text('Reference Name', 350, tableTop);
    doc.text('Reference Phone', 420, tableTop);
    doc.text('Payment Methods', 490, tableTop);

    // Draw table rows
    leadmanagement.forEach((lead, index) => {
      const y = itemTop(index);
      const formattedDate = lead.date.toISOString().slice(0, 10); // Format date as "yyyy-mm-dd"
      doc.text(formattedDate, 40, y); // Display formatted date without time
      doc.text(lead.sendername, 90, y);
      doc.text(lead.recipient, 150, y);
      doc.text(lead.listofitems, 230, y, { width: 70, ellipsis: true }); // Adjust width and add ellipsis for overflow
      doc.text(lead.quantityofpackages.toString(), 310, y); // Convert quantity to string if it's a number
      doc.text(lead.referencename, 350, y, { width: 70, ellipsis: true });
      doc.text(lead.referencenumber, 420, y);
      doc.text(lead.paymentmethods, 490, y, { width: 70, ellipsis: true });
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

export { router as leadmanagementRoutes}