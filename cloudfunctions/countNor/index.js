// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var openid = wxContext.OPENID;
  // console.log("openid:",openid);
  // console.log("event.type",event.type);
  var mytype = event.type;
  // console.log("mytype:",mytype);
  if(mytype==="果蔬"){
    // console.log("进来了！")
    var res = await db.collection("countNor").where({
      _openid:openid
    }).update({
      data:{
        normal_fruit:_.inc(1)
      }
    })
    // console.log("res",res);
  }else if(mytype==="饮品"){
    console.log("进来了！")
    var res = await db.collection("countNor").where({
      _openid:openid
    }).update({
      data:{
        normal_drink:_.inc(1)
      }
    })
    console.log("res",res);
  }else if(mytype==="肉类"){
    // console.log("进来了！")
    var res = await db.collection("countNor").where({
      _openid:openid
    }).update({
      data:{
        normal_meat:_.inc(1)
      }
    })
    console.log("res",res);
  }else if(mytype==="熟食"){
    // console.log("进来了！")
    var res = await db.collection("countNor").where({
      _openid:openid
    }).update({
      data:{
        normal_food:_.inc(1)
      }
    })
    console.log("res",res);
  }
}