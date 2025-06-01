const mongoose = require("mongoose");
const Chat = require("/Users/shobhitchandra/Documents/WebDev/chatbot - mongoose/models/chat.js");

main().then(() => {
    console.log("Working");
}).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/chatbot');
}

Chat.insertMany([
    {
        from: "Priya",
        to: "Aman",
        message: "Hey Aman, did you complete the assignment?",
        created_at: new Date(),
    },
    {
        from: "Neha",
        to: "Rohit",
        message: "Happy Birthday Rohit! 🎉",
        created_at: new Date(),
    },
    {
        from: "Ankit",
        to: "Meera",
        message: "Are you coming to the meeting?",
        created_at: new Date(),
    },
    {
        from: "Meera",
        to: "Ankit",
        message: "Yes, I’ll be there by 11 AM.",
        created_at: new Date(),
    },
])