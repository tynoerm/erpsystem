import mongoose from "mongoose";
import express from "express";
import { Parser } from "json2csv";

import accountsreceivablesinvoiceSchema from "../../models/Accounting/accountsreceivablesInvoice.js";


let router = express.Router();

router.route("/create-accountsreceivables2").post (async(req, res, next) => {
    await accountsreceivablesinvoiceSchema
       .create(req.body)
       .then ((result ) => {
        res.json({
            data: result,
            message: "record created sccessfully ",
            status: 200,
        });
       })
       .catch((err) => {
        return next(err); 
       });
});

export {router as accountsreceivablesInvoiceRoutes}