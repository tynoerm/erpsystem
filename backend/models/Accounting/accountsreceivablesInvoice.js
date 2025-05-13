import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;


let accountsreceivablesinvoiceSchema = new Schema({
 
    dateofinvoice: {
        type: Date
    },

    customername: {
        type: String
    },
    

    address: {
        type: String
    },

    itemdescription: {
        type: String
    },
    
    customercontact: {
        type: String
    },
     
      
    sellername : {
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
    discountapplied: {
        type: Number
    },
    totalamountdue: {
        type: Number
    }

},{
    collection: 'accountsreceivablesinvoice'
})

export default model('accountsreceivablesinvoice',accountsreceivablesinvoiceSchema)