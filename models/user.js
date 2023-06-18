const mongoose = require("mongoose");



const userSchema = new mongoose.Schema({
    name:{
        type: String,
       
    },
    mobile:{
        type: String,
        unique: true
    },
    address:{
        type: String,
    },
    rollnumber:{
        type: String,
    },
    Specification:{
        type: String,
    },
    password:{
        type : String,
        minlength: 6
    },
    notes:[{
        type: mongoose.Types.ObjectId,
        ref: 'Notes'
    }]
});

 module.exports = mongoose.model("User",userSchema);
