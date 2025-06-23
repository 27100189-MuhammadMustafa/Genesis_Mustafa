const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
        minlength:3,
        maxlength:30,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/
    },
    age: {
        type : Number,
        min: 0,
        default: 18
    },
    createdAt: {
        type: Date,
        default: Date.now
    }        
});
const User = mongoose.model('User', userSchema);
module.exports = User;
//for task3 