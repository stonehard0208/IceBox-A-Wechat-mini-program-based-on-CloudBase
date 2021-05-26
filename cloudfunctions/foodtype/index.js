// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  // var openid = '"'+wxContext.OPENID+'"';
  var openid = wxContext.OPENID;
  // console.log(openid);

  //await异步操作，如果没有，会返回空数据
  return {
    fruits: await db.collection("fridge"+openid).where({
              type: "果蔬"
            }).orderBy('left_date','asc').get(),
    meats: await db.collection("fridge"+openid).where({
              type: "肉类"
            }).orderBy('left_date','asc').get(),
    drink: await db.collection("fridge"+openid).where({
              type: "饮品"
            }).orderBy('left_date','asc').get(),
    foods: await db.collection("fridge"+openid).where({
              type: "熟食"
            }).orderBy('left_date','asc').get()
  }
}