import mongoose from "mongoose";
import express from "express";
import perfomancemanagementSchema from "../../models/Human Resources/perfomancemanagement.js";
import { Parser } from "json2csv";
let router =  express.Router();

//create

router.route("/create-assesment").post(async (req, res, next ) => {
    await perfomancemanagementSchema 
    .create(req.body)
    .then((result) => {
        res.json({
            data: result,
            message: "recuitment created",
            status: 200,
        });
    })

    .catch((err) => {
        return next(err);
    });
});


//get all 

router.route("/").get(async (req, res, next) => {
    await perfomancemanagementSchema 
    .find()
    .then((result) => {
            res.json({
                data: result,
                message: "data restored",
            });
        })
        .catch((err) => {
            console.log(err);
        });
    
});


router.route("/update-perfomancemanagement/:id").put(async (req, res, next) => {
    try {
      const result = await perfomancemanagementSchema.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
  

  
router.route("/delete-perfomancemanagement/:id").delete(async (req, res, next) => {
    try {
      const deletedUser = await perfomancemanagementSchema.findOneAndDelete({ _id: req.params.id });
      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ msg: "Data successfully deleted." });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error deleting user' });
    }
  });

  // Endpoint to fetch data and generate CSV
router.route('/generate-csv').get(async (req, res) => {
    try {
      // Fetch data from MongoDB using Mongoose
      const data = await perfomancemanagementSchema.find({}, { _id: 0 }); // Exclude _id field if needed
  
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
  
export { router as perfomancemanagementRoutes}
