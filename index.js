const express = require('express');
const l = console.log;
const bodyParser = require("body-parser");
const app = express();
const cors = require('cors');
// const {google} = require("googleapis")
const rocket = require("./core/rocket");
const lib = require("./core/lib")
const Routers = {
  "main":require("./routers/main"),
  // "muhsin":require("./routers/muhsin")
};
const PORT = process.env.PORT || 9000
const mongoDB = require('mongodb')
const {MongoClient} = mongoDB;
// const client = new MongoClient('localhost',{useNewUrlParser:true})

app.use(rocket.tools)
app.use(cors())
app.use(rocket.logger);
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(bodyParser.text())
lib.plugRouters(Routers,app,"/api/")
// async function mongoConnect(){
//   let client = await MongoClient.connect("mongodb+srv://teminix:teminix123@api-cluster-bn0og.mongodb.net/test?retryWrites=true&w=majority",{useNewUrlParser:true});
//   let collection = client.db('mongo').collection('test');
//   let cursor = await collection.find().toDocs();
//   l(cursor)
//   client.close()
// }
// API comment
app.get("/",(req,res) => {
  res.send("Welcome to API")
})
app.get("/*",(req,res) => {
  res.send(`Invalid GET route "${req.path}"`)
})
app.post("/*",(req,res) => {
  res.send(`Invalid POST route "${req.path}"`)
})
app.listen(PORT,() => {
  l("Server running on "+PORT)
})
