import { Schema as _Schema, model} from 'mongoose';
const Schema = _Schema;

const orderSchema = new Schema({
    customerName: {
        type: String,
        required: true,
    },
    product: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Shipped', 'Cancelled'],
        default: 'Pending',
    },
    orderDate: {
        type: Date,
        default: Date.now,
    }

 

},{
    collection: 'orders'
})


export default model('orders',orderSchema)