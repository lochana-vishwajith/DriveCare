const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vehicleCategorySchema = new Schema({
  categoryName: {
    type: String,
    required: true,
  },
  otherCategoriesCanBeDriven: [
    {
      type: String,
      required: true,
    },
  ],
  categoryCode: {
    type: String,
    required: true,
  },
});

const category = mongoose.model("vehicelcategory", vehicleCategorySchema);
module.exports = category;
