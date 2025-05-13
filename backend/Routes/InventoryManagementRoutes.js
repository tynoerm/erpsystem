import express from "express";
import InventorySchema from "../models/InventoryManagement.js";
import { Parser } from "json2csv";

let router = express.Router();

// CREATE Item
router.post("/create-inventory", async (req, res, next) => {
  try {
    const createdItem = await InventorySchema.create(req.body);

    if (createdItem.quantity < createdItem.min_threshold) {
      req.io.emit("alert", {
        message: `Low stock alert for ${createdItem.item_name}! Quantity below minimum threshold.`,
      });
    } else if (createdItem.quantity > createdItem.max_threshold) {
      req.io.emit("alert", {
        message: `Overstock alert for ${createdItem.item_name}! Quantity above maximum threshold.`,
      });
    }

    res.json({ data: createdItem, message: "Data successfully added!", status: 200 });
  } catch (err) {
    next(err);
  }
});

// READ all Items
router.get("/", async (req, res, next) => {
  try {
    const result = await InventorySchema.find();
    res.json({ data: result, message: "All items successfully fetched.", status: 200 });
  } catch (err) {
    next(err);
  }
});

// UPDATE Item
router.put("/update-inventory/:id", async (req, res) => {
  try {
    const result = await InventorySchema.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (result.quantity < result.min_threshold) {
      req.io.emit("alert", {
        message: `Low stock alert for ${result.item_name}! Quantity below minimum threshold.`,
      });
    } else if (result.quantity > result.max_threshold) {
      req.io.emit("alert", {
        message: `Overstock alert for ${result.item_name}! Quantity above maximum threshold.`,
      });
    }

    res.json({ data: result, msg: "Data successfully updated." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update data." });
  }
});

// UPDATE Location
router.put("/update-location/:id", async (req, res) => {
  const { id } = req.params;
  const { location } = req.body;

  try {
    const updatedItem = await InventorySchema.findByIdAndUpdate(
      id,
      { location },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ status: 404, message: "Item not found" });
    }

    res.status(200).json({ status: 200, message: "Location updated", data: updatedItem });
  } catch (error) {
    console.error("Error updating location:", error);
    res.status(500).json({ status: 500, message: "Server error" });
  }
});

// DELETE Item
router.delete("/delete-inventory/:id", async (req, res) => {
  try {
    const deletedItem = await InventorySchema.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ error: "Item not found" });
    res.json({ msg: "Data successfully deleted." });
  } catch (err) {
    res.status(500).json({ error: "Error deleting item" });
  }
});

// Generate CSV
router.get("/generate-csv", async (req, res) => {
  try {
    const data = await InventorySchema.find({}, { _id: 0 });
    const parser = new Parser();
    const csv = parser.parse(data);
    res.header("Content-Type", "text/csv");
    res.attachment("inventory_data.csv");
    res.send(csv);
  } catch (error) {
    console.error("Error generating CSV:", error);
    res.status(500).send("Error generating CSV");
  }
});

export { router as InventoryManagementRoutes };
