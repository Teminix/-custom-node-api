const express = require('express')
const router = express.Router();
const lib = require("../core/lib")
const {promisify} = require("util")
const l = console.log;
const {MongoClient} = require("mongodb");
const data = require("../keys/data.json");
const MONGO_LINK = data['mongo-db-link']
l(MONGO_LINK)
router.get("/",(req,res) => {
  res.send("Welcome to main API route")
})
router.get("/getAllData",(req,res) => {
  (async function() {
      let client = await MongoClient.connect(MONGO_LINK,{useNewUrlParser:true});
      let collection = client.db("mongo").collection('test');
      let data = await collection.find().toDocs();
      l(data)
      // res.json(data);
      res.type("text/plain").send(JSON.stringify(data,undefined,3))
      client.close()
  }());
})
router.post("/",(req,res) => {
  res.send("Welcome to main API post route")
})
router.get("/*",(req,res) => {
  res.send(`Invalid GET route "${req.path}"`)
})
router.post("/*",(req,res) => {
  res.send(`Invalid POST route "${req.path}"`)
})

module.exports = router
async function initMongo(){
  let client = await MongoClient.connect(MONGO_LINK);
  let collection = client.db('mongo').collection('test');
  let data = await collection.findOne();
  console.log(data);
  client.close();
}
// initMongo()
