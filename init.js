const mongoose = require('mongoose');
const Chat = require("./models/chat.js"); // import from models floder chat file


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


let allchats = [
  {
    from: "kiran",
    to: "karan",
    msg: "Hii",
    createdat: new Date()
  },
  {
    from: "rahul",
    to: "priya",
    msg: "How are you?",
    createdat: new Date()
  },
  {
    from: "amit",
    to: "neha",
    msg: "Let's meet tomorrow",
    createdat: new Date()
  },
  {
    from: "sneha",
    to: "rohit",
    msg: "Good Morning",
    createdat: new Date()
  },
  {
    from: "vikas",
    to: "pooja",
    msg: "Have a nice day",
    createdat: new Date()
  },
  {
    from: "arjun",
    to: "kavya",
    msg: "See you soon",
    createdat: new Date()
  }
];

Chat.insertMany(allchats);

