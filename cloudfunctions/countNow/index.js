// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const _ = db.command;
// 云函数入口函数
// 获取当前冰箱内过期食品数量
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var openid = wxContext.OPENID;
  return await db.collection("fridge"+openid).where({
    left_date: _.lt(0)
  }).count();
}