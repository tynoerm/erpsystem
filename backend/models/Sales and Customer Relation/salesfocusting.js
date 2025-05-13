import {Schema as _Schema, model} from 'mongoose';
const Schema = _Schema;

let salesfocustingSchema = new Schema ({

forcast_period: {
    type: String
},
product : {
    type: String
},

forecast_amount: {
    type: Number
},

sales_territory: {
    type: String
},
sales_representatives: {
    type: String
},

growth_rate: {
    type: String
},

seasonality: {
    type: String
},

forecast_approval_status: {
    type: String
}

}, {
    collection: 'salesfocusting'
})

export default model('salesfocusting', salesfocustingSchema)