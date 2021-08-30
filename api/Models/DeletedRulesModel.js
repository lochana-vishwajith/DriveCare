const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DeletedRules = new Schema({
    ruleNo: {
        type: String,
        required: true,
    },
    ruleName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    gazetteNo: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: false,
    },
    demeritPoints: {
        type: String,
    },
    fineAmount: {
        type: String,
        required: true,
    },
    RuleCategoryId:{
        type:mongoose.Schema.Types.ObjectId,
        require: false,
        ref: 'rulescategories',
    },
    deletedDate:{
       type:Date,
        default:Date.now
    },
    deletedGazetteNo:{
        type:String

    },
    comment:{
        type:String,
        required:true
    },
    ruleId:{
        type:String
    }
});
const deletedRulesModel = mongoose.model(
    'deletedrules',
    DeletedRules
);
module.exports = deletedRulesModel ;
