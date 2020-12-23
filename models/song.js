const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title: String,
    artist: String,
    releaseYear: Number,
    genres:[String],
    ratings: [Number]
})

module.exports = mongoose.model('Song', songSchema)