const mongoose = require('mongoose');

const unitSchema = new mongoose.Schema({
    id: {
        required: true,
        type: Number
    },
    name: {
        required: true,
        type: String
    },
    size: {
        required: true,
        type: Number
    }
});

module.exports = mongoose.model('units', unitSchema);
