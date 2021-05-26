// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var openid = wxContext.OPENID;
  if(openid==undefined){
    openid=event.myid;
  }
  console.log("openid:",openid);
  // console.log("event.type",event.type);
  var mytype = event.type;
  if(event.type==="果蔬"){
    // console.log("进来了！")
    var res = await db.collection("countLeft").where({
      _openid:openid
    }).update({
      data:{
        waste_fruit:_.inc(1)
      }
    })
    // console.log("res",res);
  }else if(event.type==="饮品"){
    console.log("进来了！")
    var res = await db.collection("countLeft").where({
      _openid:openid
    }).update({
      data:{
        waste_drink:_.inc(1)
      }
    })
    // console.log("res",res);
  }else if(event.type==="肉类"){
    // console.log("进来了！")
    var res = await db.collection("countLeft").where({
      _openid:openid
    }).update({
      data:{
        waste_meat:_.inc(1)
      }
    })
    // console.log("res",res);
  }else if(event.type==="熟食"){
    // console.log("进来了！")
    var res = await db.collection("countLeft").where({
      _openid:openid
    }).update({
      data:{
        waste_food:_.inc(1)
      }
    })
    // console.log("res",res);
  }
}