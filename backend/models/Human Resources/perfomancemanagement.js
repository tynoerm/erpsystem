import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;
 
let perfomancemanagementSchema = new Schema ({

plan_id: {
    type: String
},
 employee_name: {
    type: String
 },

 assesment_date: {
    type: String
 },
 rating: {
    type: String
 },

 plan_date: {
    type: String
 },

 plan_description: {
    type: String
 },

 goals: {
    type: String
 },
 action_items: {
    type: String
 },
 deadline: {
    type: String 
 }


}, {
    collection: 'perfomancemanagement'
  })

export default model('perfomancemanagement', perfomancemanagementSchema)