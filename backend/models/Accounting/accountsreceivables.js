import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;


let accountsreceivablesSchema = new Schema({
 
    customer_information: {
        type: String
    },

    invoice_details: {
        type: String
    },
    

    payment_information: {
        type: String
    },

    accounting_codes: {
        type: Number
    },
    
    aging_information: {
        type: String
    },
     
      
    payment_history : {
        type: String
    }

},{
    collection: 'accountsreceivables'
})

export default model('accountsreceivables',accountsreceivablesSchema)