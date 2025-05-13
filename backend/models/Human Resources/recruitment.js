import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

let recruitmentSchema = new Schema ({
  name: {
    type: String
  },
  
 position: {
    type: String
  },

 email: {
    type: Number
  },

  phonenumber: {
    type: String
  },

 address: {
    type: String 
  },

  gender: {
    type: String
  },
  maritalstatus: {
    type: String
  }

}, {
    collection: 'recruitment'
  })

export default model('recruitment',  recruitmentSchema)