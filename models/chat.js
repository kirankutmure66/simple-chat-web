const mongoose = require('mongoose');

const chatsSchema = new mongoose.Schema({
    from:{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true
    },
    msg:{
        type:String,
        maxLength:50
    },
    createdat:{
        type:Date,
        required:true
    },
    updateat:{
        type:String,
        required:true,
        default:"Still Not Updated"
    }
});

const Chat = mongoose.model("Chat",chatsSchema);
module.exports = Chat;