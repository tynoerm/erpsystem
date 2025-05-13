import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

let warehouseLocationSchema = new Schema({
  locationNumber: {
    type: String,
  },
  locationName: {
    type: String,
  },
}, {
  collection: 'warehouse_locations',
});

export default model('warehouse_locations', warehouseLocationSchema);
