import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;


let purchaseorderSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, auto: true },
    
    purchaseordernumber: {
        type: Number
    },

    date: {
        type: Date
    },
   
    buyername: {
    type: String
},
    

purchaseorderdetails: {
        type: String
    },
    
    buyeraddress: {
        type: String
    },
     
      
    createdby: {
        type: String
    },
    paymentmethods: {
        type: String
    },
    suppliername: {
        type: String
    },
    supplieraddress: {
        type:String
    },
    status: {
        type: String,
        enum: ['authorised', 'unauthorised'],
        default: 'unauthorised' // Default status when not specified
      },
    vat: {
        type: Number
    },
    totalprice: {
        type: Number
    }

},{
    collection: 'purchaseorders'
})

export default model('purchaseorders', purchaseorderSchema)