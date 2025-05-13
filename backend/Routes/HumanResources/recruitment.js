import mongoose  from "mongoose";
import express from "express";
import recruitmentSchema from "../../models/Human Resources/recruitment.js";
import { Parser } from "json2csv";

let router = express.Router();

//creating recruitment  activity 

router.route("/create-newrecuitment").post(async (req, res, next ) => {
    await recruitmentSchema 
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


//get all recruitments

router.route("/").get(async (req, res, next) => {
    await recruitmentSchema 
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

router.route("/update-recruitment/:id").put(async (req, res, next) => {
    try {
      const result = await recruitmentSchema.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
  
  router.route("/delete-recruitment/:id").delete(async (req, res, next) => {
    try {
      const deletedUser = await recruitmentSchema.findOneAndDelete({ _id: req.params.id });
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
      const data = await recruitmentSchema.find({}, { _id: 0 }); // Exclude _id field if needed
  
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
  
  
  

export { router as recruitmentRoutes}