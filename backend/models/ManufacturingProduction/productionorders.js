import {Schema as _Schema, model} from 'mongoose';
const Schema = _Schema;

let productionordersSchema = new Schema ({

    date: {
        type: Date
    },
    productname: {
        type: String
    },
    clientname: {
        type: String
    },
    clientaddress: {
        type: String
    },
    category: {
        type: String
    },
    itemdescription: {
        type: String
    },
    quantity: {
        type: Number
    },
    createdby: {
        type: String
    }


},{
    collection: 'productionorders'
})

export default model('productionorders',productionordersSchema)