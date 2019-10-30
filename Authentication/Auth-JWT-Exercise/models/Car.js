const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = new Schema({
    model: { type: String, required: true },
    imageUrl: { type: String, required: true },
    pricePerDay: { type:Number, required: true },
    isRented: { type: Boolean, required: false, default: false }
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;