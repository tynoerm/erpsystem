import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;


let accountspayableinvoiceSchema = new Schema({
 
    companyname: {
        type: String
    },

    contactdetails: {
        type: String
    },
    

    address: {
        type: String
    },

    itemdescription: {
        type: String
    },
    
    freightorshippingcost: {
        type: String
    },
     
      
    handlingcharges : {
        type: String
    },
    paymentmethods: {
        type: String
    },
    vatamount: {
        type: String
    },
    grosstotalamount: {
        type: String
    },
    discountapplied: {
        type: String
    },
    netamountpayable: {
        type: Number
    }

},{
    collection: 'accountspayableinvoice'
})

export default model('accountspayableinvoice',accountspayableinvoiceSchema)