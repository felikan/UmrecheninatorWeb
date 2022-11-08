const mongoose = require('mongoose');

const unitSchema = new mongoose.Schema({
    unitName: {
        required: true,
        type: String
    },
    unitSize: {
        required: true,
        type: Number
    }
})

module.exports = mongoose.model('units', unitSchema)