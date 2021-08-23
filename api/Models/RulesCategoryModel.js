const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RulesCategory = new Schema({
    categoryName: {
        type: String,
        required: true,
    },
    categoryNumber: {
        type: String,
        required: true,
    },
    range: {
        type: String,
        required: true,
    },
    severity: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    Rules:[{
        type:mongoose.Schema.Types.ObjectId,
        require: false,
        ref: 'rules',
    }]
});
const rulesCategoryModel = mongoose.model(
    'rulescategories',
    RulesCategory
);
module.exports = rulesCategoryModel ;
