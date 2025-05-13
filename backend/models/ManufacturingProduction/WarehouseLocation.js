import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

let warehouseLocationSchema = new Schema({
  locationNumber: {
    type: Number,
  },
  locationName: {
    type: String,
  },
}, {
  collection: 'warehouselocations',
});

export default model('warehouselocations', warehouseLocationSchema);
