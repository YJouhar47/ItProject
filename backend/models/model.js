const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    
    question: {
        required: true,
        type: String
    },
    status: {
        required: true,
        type: String
    },
    reason: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('Data', dataSchema)