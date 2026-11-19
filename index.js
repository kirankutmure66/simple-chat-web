const express = require("express");
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const methodoveride = require("method-override");
const expresserror = require("./expresserror");

const Chat = require("./models/chat.js"); // import from models floder chat file
app.set("views",path.join(__dirname,"views")); // this lines is usefull for creting ejs
app.set("view engine","ejs"); // for creting ejs
app.use(express.static(path.join(__dirname,"public"))); // for joiningg path from public folder
app.use(express.urlencoded({extended:true}));  // for parse req.body;
app.use(methodoveride("_method"));

// database part
main()
.then(res=>{
    console.log("connection succesfull")
})
.catch(err=>{
    console.log("Ther is error")
})
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

}

// asyncWrap part

function asyncWrap(fn){
    return function(req,res,next){
        fn(req,res,next).catch((err)=>next(err));
    }
}
module.exports = asyncWrap;

// Express part

// Delete Route

app.delete("/chats/:id",async (req,res)=>{
    let {id} = req.params;
    let dletechat = await Chat.findOneAndDelete(id);
    res.redirect("/chats");
})

// update route
app.put("/chats/:id",async (req,res,next)=>{
    try{
    let {id} = req.params;
    let {msg:newmsg} = req.body;
    let updatechat =await Chat.findByIdAndUpdate(id,{msg:newmsg});
    if(!updatechat){
        throw new expresserror(404,"chat not found")
    }
    res.redirect("/chats");
    } catch(err){
        next(err);
    }
});

app.use((err,req,res,next)=>{
    let{status=404,message="error found"}=err;
    res.status(status).send(message);
});
// edit route
app.get("/chats/:id/edit",asyncWrap(async (req,res ,next)=>{
   
    let {id} = req.params;
    let chat =await Chat.findById(id);
    if(!chat){
        throw new expresserror(404, "Chat Not Found");
    }
    res.render("edit.ejs",{chat});


}));
// crete route
app.post("/chats",async(req,res)=>{
    let {from,to,msg} = req.body; // for this write app.use(express.urlencoded({extended:true}));
    let newchat = new Chat({   
        from:from,
        to:to,
        msg:msg,
        createdat:new Date()
    });
    await newchat.save()
    res.redirect("/chats");

});

// show chats
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
})

app.get("/chats",async (req,res)=>{
    let chats = await Chat.find(); // asynchronous function so kepp await 
    res.render("chats.ejs",{chats});
})

app.get("/",(req,res)=>{
    res.render("home_page.ejs");
})

app.listen(8080,()=>{
    console.log("app is started");
})