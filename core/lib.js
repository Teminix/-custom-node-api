const l = console.log;
const Lib = {
  plugRouters:(routerList,app,prefix) => {
    for(let route in routerList){
      app.use(prefix+route,routerList[route])
    }
  },
  RNG:(start,end) => {
    return start+Math.floor(Math.random()*(end-start))
  }
}
module.exports = Lib

const {Cursor} = require("mongodb")
Cursor.prototype.toDocs = async function(){
  let array = [];
  while(await this.hasNext()){
    array.push(await this.next())
  }
  return array
}
