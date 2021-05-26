// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const _ = db.command;
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var openid = wxContext.OPENID;
  // console.log("云端：openid",openid);
  console.log("云端，删除类型：",event.type);
  var res2 = await db.collection("fridge"+openid).where({
    type: event.type,
    left_date: _.lt(0)
  }).count();
  // console.log("res2",res2.total);
  var total2 = res2.total;
  if(res2.total>0){
    if(event.type==="果蔬"){
      // console.log("进来了！")
      var res = await db.collection("countLeft").where({
        _openid:openid
      }).update({
        data:{
          waste_fruit:_.inc(total2)
        }
      })
    }else if(event.type==="饮品"){
      console.log("进来了！")
      var res = await db.collection("countLeft").where({
        _openid:openid
      }).update({
        data:{
          waste_drink:_.inc(total2)
        }
      })
      // console.log("res",res);
    }else if(event.type==="肉类"){
      // console.log("进来了！")
      var res = await db.collection("countLeft").where({
        _openid:openid
      }).update({
        data:{
          waste_meat:_.inc(total2)
        }
      })
      // console.log("res",res);
    }else if(event.type==="熟食"){
      // console.log("进来了！")
      var res = await db.collection("countLeft").where({
        _openid:openid
      }).update({
        data:{
          waste_food:_.inc(total2)
        }
      })
    }
  }

  var res1 = await db.collection("fridge"+openid).where({
    type: event.type,
    left_date: _.gte(0)
  }).count();
  console.log("大于0：",res1.total);
  var total1=res1.total;
  if(total1>0){
    if(event.type==="果蔬"){
      // console.log("进来了！")
      var res = await db.collection("countNor").where({
        _openid:openid
      }).update({
        data:{
          normal_fruit:_.inc(total1)
        }
      })
      // console.log("res",res);
    }else if(event.type==="饮品"){
      console.log("进来了！")
      var res = await db.collection("countNor").where({
        _openid:openid
      }).update({
        data:{
          normal_drink:_.inc(total1)
        }
      })
      // console.log("res",res);
    }else if(event.type==="肉类"){
      // console.log("进来了！")
      var res = await db.collection("countNor").where({
        _openid:openid
      }).update({
        data:{
          normal_meat:_.inc(total1)
        }
      })
      // console.log("res",res);
    }else if(event.type==="熟食"){
      // console.log("进来了！")
      var res = await db.collection("countNor").where({
        _openid:openid
      }).update({
        data:{
          normal_food:_.inc(total1)
        }
      })
    }
  }

  return await db.collection("fridge"+openid).where({
    type: event.type
  }).remove().then(res=>{
    console.log("清空成功！");
  })

}