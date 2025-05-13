import {Schema as _Schema, model} from 'mongoose';
const Schema = _Schema;

let leadmanagementSchema = new Schema ({

    date: {
        type: Date
    },
sendername: {
        type: String
    },
    recipient: {
        type: String
    },
    listofitems: {
        type: String
    },
    
    quantityofpackages: {
     type: Number
    },

    referencename: {
        type: String
    },

    referencenumber: {
        type: Number
    },
    
    paymentmethods: {
        type: String
    }
  
},{
    collection: 'leadmanagement'
})

export default model('leadmanagement',leadmanagementSchema)