import {Schema as _Schema, model} from 'mongoose';
const Schema = _Schema;

let opportunitytrackingSchema = new Schema ({
     
      opportunity_name: {
        type: String
      },
      opportunity_owner: {
        type: String
      },
      opportunity_stage: {
        type: String
      },
      opportunity_value: {
        type: Number
      },
      probability_ofsuccess: {
        type: String
      },
      expected_close_date: {
        type: String
      },
      customer_information: {
        type: String
      },
      opportunity_source: {
        type: String
      }



}, {
    collection: 'opportunitytracking'
})

export default model('opportunitytracking', opportunitytrackingSchema)