import { Schema as _Schema, model} from 'mongoose';
const Schema = _Schema;


let accountsPayablesSchema =  new Schema ({
vendor_name: {
    type: String
},
vendor_address: {
 type: String
},
vendor_contactdetails: {
 type: Number
},
invoice_number: {
    type: Number
},
invoice_date: {
    type: String
},

invoice_amount: {
    type: Number
},
invoice_description: {
    type: String
}


}, {
   collection: 'accountspayables'
})

export default model('accountspayables', accountsPayablesSchema)

