import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

let InventorySchema = new Schema({
  item_name: String,
  category: String,
  quantity: Number,
  cost_price: Number,
  selling_price: Number,
  supplier_name: String,
  last_updated: { type: Date, default: Date.now },
  min_threshold: { type: Number, default: 10 },
  max_threshold: { type: Number, default: 100 },
  location: String,
}, {
  collection: 'inventorymanagement'
});

export default model('inventory', InventorySchema);
