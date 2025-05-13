import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

let materialsSchema = new Schema ({

    component_id : {
        type: String
    },
    quantity: {
        type: Number
    },
    scrap_factor: {
        type: String
    },
    unit_ofmeasure: {
        type: String
    },
    valid_from: {
        type: String
    },
    valid_to: {
        type: String
    }
   




},{
    collection: 'materials'  
})

export default model('materials', materialsSchema)