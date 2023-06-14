const mongoose = require('mongoose');
const {Schema} = mongoose;

const placeSchema = new Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    title: {
        type: String,
        isRequired: true,
    },
    address: {
        type: String,
        isRequired: true,
    },
    photos: {
        type: [String],
    },
    description: {
        type: String,
    },
    perks: {
        type: [String], 
    },
    checkIn: {
        type: Number,
        isRequired: true, 
    },
    checkOut: {
        type: Number,
        isRequired: true, 
    },
    maxGuests: {
        type: Number, 
    },
    price: {
        type: Number,
    }
});

const PlaceModel = mongoose.model('Place', placeSchema);

module.exports = PlaceModel;