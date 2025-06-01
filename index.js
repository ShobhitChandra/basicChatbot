const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat");
const methordOverride = require("method-override");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methordOverride("_method"));

main().then(()=> {
    console.log("Working");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/chatbot');
}

app.get("/", (req, res) => {
    res.send("Root is working properly.")
});

app.get("/chat", async (req, res) => {
    let allchats = await Chat.find();
    res.render("index.ejs", {allchats});
});

app.post("/chat", (req, res) => {
    let {from, to, msg} = req.body;
    let newchat = new Chat({
        from: from,
        to: to,
        message: msg,
        created_at: new Date(),
    });
    newchat.save().then(() => {
        console.log("New data saved");
    }).catch((err) => {
        console.log(err);
    })
    res.redirect("/chat")
});

app.get("/chat/:id/edit", async (req, res) => {
    let {id} = req.params;
    let chat = await Chat.findById(id)
    console.log(chat);
    res.render("edit.ejs", {chat});
});

app.patch("/chat/:id", async (req, res)=> {
    let {id} = req.params;
    let {message: newMsg} = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(id, {$set: {message: newMsg}}, {runValidators: true, new: true});
    let updatetime = await Chat.findByIdAndUpdate(id, {created_at: new Date()}, {runValidators: true, new: true});
    res.redirect("/chat");
});

app.delete("/chat/:id/delete", async (req, res) => {
    let {id} = req.params;
    let deletdchat = await Chat.findByIdAndDelete(id);
    res.redirect("/chat");
});

app.listen(8080, () => {
    console.log("App is listning on port 8080.");
});