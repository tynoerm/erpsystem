import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

let payrollSchema = new Schema({
  employeeId: {
    type: String,
  },
  employee_name: {
    type: String,
  },
  department: {
    type: String,
  },
  job_title: {  // changed from `position` for consistency
    type: String,
  },
  date_of_joining: {
    type: Date,
  },
  pay_period_start: {
    type: Date,
  },
  pay_period_end: {
    type: Date,
  },
  overtime_hours: {
    type: Number,
  },
  base_salary: {
    type: Number,
  },
  overtime_pay: {
    type: Number,
  },
  bonuses: {
    type: Number,
  },
  gross_pay: {
    type: Number,
  },
  deductions_medicalcontribution: {  // match CSV export name
    type: Number,
  },
  net_pay: {
    type: Number,
  },
  banking_details: {  // optional, if needed for CSV
    type: String,
  },
}, {
  collection: 'payroll'
});

export default model('payroll', payrollSchema);
