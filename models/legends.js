const mongoose = require('mongoose');// require mongoose
const Schema = mongoose.Schema; // create a shorthand for the mongoose Schema constructor


const legendSchema = new Schema({
    name: String,
    type: String,
    fullName: String,
    passive: String,
    tact: String,
    ult: String,
    description: String,
    img: String,
  }, {timestamps: false});

const Legend = mongoose.model('legend', legendSchema)

module.exports = Legend
