import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;


let expenseAccountSchema = new Schema ({

account_name: {
    type: String
},

account_number: {
    type: Number
},
debits_andcredits: {
    type: String
},

description: {
    type: String
},
opening_balance: {
    type: Number
},

transactions: {
    type: String
},

sub_accountsCategories: {
    type: String
}

},{

    collection: 'expenseaccount'
})

export default model('expenseaccount', expenseAccountSchema)



