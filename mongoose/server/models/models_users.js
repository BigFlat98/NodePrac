const mongoose = require('mongoose'); 

const { Schema } = mongoose;
const userSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:false,
    },
    age:{
        type:Number,
        required:true,
    },
    married:{
        type:Boolean,
        required: true,
    },
    comment:{
        type:String,
    },
    createAt:{
        type:Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('Users',userSchema);
