const mongoose = require("mongoose");
const { required } = require("nodemon/lib/config");

const notesSchema = new mongoose.Schema({
    title:{
        type: String,
        required: '{path} is required'

    },
    description:{
        type: String,
        required: true,
    },
    user:[{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }]
});

 module.exports = mongoose.model("Notes",notesSchema);
