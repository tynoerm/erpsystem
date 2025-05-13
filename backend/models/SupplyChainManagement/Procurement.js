import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

let PurchaseOrderSchema = new Schema({
    suppliername: {
        type: String,
        required: true,
    },

    address: {
        type: String,
        required: true,
    },

    contactdetails: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /\+?[1-9]\d{1,14}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },

    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },

    qualityratings: {
        type: String,
        required: true,
    },

    deliveryperformance: {
        type: String,
        required: true,
    },

    categoryproducts: {
        type: String,
        required: true,
    },

    // ✅ New Fields Below
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'],
        default: 'Pending',
        required: true,
    },

    orderDate: {
        type: Date,
        required: true,
    }

}, {
    collection: 'procurement',
    timestamps: true
});

// Indexing for performance
PurchaseOrderSchema.index({ email: 1 });
PurchaseOrderSchema.index({ suppliername: 1 });

export default model('purchaseorder', PurchaseOrderSchema);
