import mongoose from "mongoose";
import express from "express";
import SupplierSchema from "../../models/SupplyChainManagement/Procurement.js";
import { Parser } from "json2csv";

let router = express.Router();

// Create purchase order
router.route("/create-procurement").post(async (req, res, next) => {
  try {
      const result = await SupplierSchema.create(req.body);
      res.json({
          data: result,
          message: "Purchase order successfully created!",
          status: 200,
      });
  } catch (err) {
      return next(err); // Pass the error to the error handler middleware
  }
});

// Update purchase order
router.route("/update-procurement/:id").put(async (req, res, next) => {
  try {
      const result = await SupplierSchema.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
      if (!result) {
          return res.status(404).json({ message: "Procurement order not found", status: 404 });
      }
      res.json({
          data: result,
          message: "Procurement order successfully updated",
          status: 200,
      });
  } catch (err) {
      return next(err);
  }
});

// Delete procurement order
router.route("/delete-procurement/:id").delete(async (req, res, next) => {
  try {
      const deletedUser = await SupplierSchema.findOneAndDelete({ _id: req.params.id });
      if (!deletedUser) {
          return res.status(404).json({ message: "Procurement order not found", status: 404 });
      }
      res.json({ message: "Procurement order successfully deleted", status: 200 });
  } catch (err) {
      return next(err);
  }
});

// Fetch all procurement orders
router.route("/").get(async (req, res, next) => {
  try {
      const procurementOrders = await SupplierSchema.find();
      res.json({
          data: procurementOrders,
          status: 200
      });
  } catch (err) {
      return next(err);
  }
});

// Generate CSV report
router.route("/generate-csv").get(async (req, res, next) => {
  try {
      const procurementOrders = await SupplierSchema.find();
      const json2csvParser = new Parser();
      const csv = json2csvParser.parse(procurementOrders);
      res.header("Content-Type", "text/csv");
      res.attachment("procurement_data.csv");
      return res.send(csv);
  } catch (err) {
      return next(err);
  }
});

export { router as ProcurementRoutes };
