const mongoose = require("mongoose");
// conection is already formend in index.js

const chatShema = new mongoose.Schema({
    from:{
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        required: true,
    },
    message: {
        type: String,
        maxlength: 100,
    },
});

const Chat = mongoose.model("Chat", chatShema);

module.exports = Chat;