const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
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
