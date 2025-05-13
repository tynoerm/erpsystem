import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;


let quotationmanagementSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, auto: true },
    
    quotationnumber: {
        type: Number
    },

    currentdate: {
        type: Date
    },
   
expiryDate: {
    type: Date
},
    

    goodsdescription: {
        type: String
    },
    
    sendername: {
        type: String
    },
     
      
    createdby: {
        type: String
    },
    paymentmethods: {
        type: String
    },
    vatamount: {
        type: Number
    },
    taxes: {
        type:Number
    },
    insurancefees: {
        type: Number
    },
    totalfreightcharges: {
        type: Number
    }

},{
    collection: 'quotationmanagement'
})

export default model('quotationmanagement',quotationmanagementSchema)