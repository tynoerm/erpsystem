import mongoose from "mongoose";
import express from "express";
import logisticsandShippingShema from "../../models/SupplyChainManagement/logisticsandShipping.js"

import { Parser } from "json2csv";

let router = express.Router();

//create logisticsandshippiment activity

router.route("/create-logisticsactivity").post(async (req, res, next) => {
    await logisticsandShippingShema
        .create(req.body)
        .then((result) => {
            res.json({
                data: result,
                message: "Activity created successfully!",
                status: 200,
            });
        })
        .catch((err) => {
            return next(err);
        });
});

//get all activities from the database

router.route("/").get(async ( req, res, next) => {
    await logisticsandShippingShema 
      .find()
      .then ((result) => {
        res.json({
            data: result,
            message: "all logistics activity selected",
            status: 200,
        });
      })

      .catch((err) => {
        return next(err);
      });
});

router.route("/update-logistics/:id").put(async (req, res, next) => {
  try {
    const result = await logisticsandShippingShema.findByIdAndUpdate(req.params.id, req.body, { new: true });
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

// Endpoint to fetch data and generate CSV
router.route('/generate-csv').get(async (req, res) => {
  try {
    // Fetch data from MongoDB using Mongoose
    const data = await logisticsandShippingShema.find({}, { _id: 0 }); // Exclude _id field if needed

    // Convert data to CSV format using json2csv
    const parser = new Parser();
    const csv = parser.parse(data);

    // Set response headers for CSV download
    res.header('Content-Type', 'text/csv');
    res.attachment('data.csv');
    res.send(csv);
  } catch (error) {
    console.error('Error generating CSV:', error);
    res.status(500).send('Error generating CSV');
  }
});


router.route("/delete-logistics/:id").delete(async (req, res, next) => {
  try {
    const deletedUser = await logisticsandShippingShema.findOneAndDelete({ _id: req.params.id });
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ msg: "Data successfully deleted." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting user' });
  }
});




export { router as logisticsandShippingRoutes}