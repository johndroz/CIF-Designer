const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const designSchema = new Schema({
    username : {
        type: String,
        required: true
    },
    front: {
        type: String,
        required: true
    },
    back: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Design = mongoose.model('Design', designSchema);

module.exports = Design;