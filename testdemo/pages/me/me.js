// testdemo/pages/me/me.js
import * as echarts from '../../components/ec-canvas/echarts'
const db = wx.cloud.database();
const app = getApp();
// var lineops = [{
//   value:40,
//   name: "果蔬"
// },
// {
//   value:20,
//   name: "饮品"
// },
// {
//   value:20,
//   name: "肉类"
// },
// {
//   value:50,
//   name: "熟食"
// }
// ]


Page({

  /**
   * 页面的初始数据
   */
  data: {
    countFood:0,
    showModal1: false,
    showModal2:false,
    level:100,

    countLeft: 0,
    countNor:0,

    waste_fruit: 0,
    waste_drink: 0,
    waste_meat: 0,
    waste_food: 0,

    normal_fruit: 0,
    normal_meat: 0,
    normal_drink: 0,
    normal_food: 0,

    isAccept: false,
    userInfo: {},
    getCardNum:0,

    // hasUserInfo: false,
    ecage:{
      onInit: initChart
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getLeftAndNorCount();
    that.getNowLeft();
   
  },
  //=============获取用户权限================//
  getPromiss:function(){
    var that = this;
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {
        that.setData({
          userInfo: res.userInfo,
          isAccept:true
        })
        console.log("用户信息",that.data.userInfo);
      }
    }) 
  },



  // ===============弹窗=====================
  /*弹窗1*/ 
  showOuttimeNum: function(){
    this.setData({
      showModal1: true
    })
  },

  /*弹窗2*/
  showPieChart:function() {
    this.setData({
      showModal2:true
    })
  },

  // 弹出蒙版截断touchmove事件
  preventTouchMove:function(){
  },

  hideLeftCount:function(){
    this.setData({
      showModal1:false,
      showModal2:false
    })
  },
  myConform1:function(){
    this.hideLeftCount();
  },
// ============================================
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    that.getLeftAndNorCount();
    that.getNowLeft();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    // that.getLeftAndNorCount();
    that.onReady();
    wx.cloud.callFunction({
     name:'countCardNum',
     success:res=>{
       this.setData({
        getCardNum:res.result.total
       })
     }
   })
  },

  //===========现在冰箱里过期食品数量================//
  getNowLeft:function(){
    var that = this;
    wx.cloud.callFunction({
      name: "countNow",
      success: res=>{
        // console.log("数量是：",res.result.total);
        that.setData({
          countFood:res.result.total
        })
      }
    })
  },
  //=============数据用于绘制饼图和计算分数==========//
  getLeftAndNorCount:function() {
    var that = this;

    // ========取数据库里用户每种浪费和正常的数量=========
    wx.cloud.callFunction({
      name: "getLeft",
      success: res => {
        var mydata = res.result.data[0];
        that.setData({
          waste_fruit: mydata.waste_fruit,
          waste_meat: mydata.waste_meat,
          waste_drink: mydata.waste_drink,
          waste_food: mydata.waste_food,
          countLeft: mydata.waste_fruit + mydata.waste_meat + mydata.waste_drink + mydata.waste_food,
        });
        console.log("countLeft", that.data.countLeft);
        //=======嵌套使用，拒绝处理异步==========//
        wx.cloud.callFunction({
          name: "getNor",
          success: res=>{
            // console.log("res:",res);
            // console.log("返回来的数量是：",res.result.data[0]);
            var mydata = res.result.data[0];
            that.setData({
              normal_fruit: mydata.normal_fruit,
              normal_meat: mydata.normal_meat,
              normal_drink: mydata.normal_drink,
              normal_food: mydata.normal_food,
              countNor: mydata.normal_fruit+mydata.normal_meat+mydata.normal_drink+mydata.normal_food,
              // level:100+this.data.countNor-this.data.countLeft
            })
            console.log("countNor",that.data.countNor);
            that.setData({
              level:100+this.data.countNor-this.data.countLeft*5
            })
            // that.setData({
            //   level:float(this.data.countNor/(this.data.countNor+this.data.countLeft))
            // })
            //传入全局变量
            app.globalData.waste_fruit=this.data.waste_fruit;
            app.globalData.waste_drink=this.data.waste_drink;
            app.globalData.waste_meat=this.data.waste_meat;
            app.globalData.waste_food=this.data.waste_food;
            app.globalData.normal_fruit=this.data.normal_fruit;
            app.globalData.normal_drink=this.data.normal_drink;
            app.globalData.normal_meat=this.data.normal_meat;
            app.globalData.normal_food=this.data.normal_food;
            app.globalData.total_waste=this.data.countLeft;
            app.globalData.total_normal=this.data.countNor;
          }
        })
      }
    })

  },
  showCard:function () {
    wx.navigateTo({
      url: '/pages/mycard/mycard'
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    var that = this;
    that.setData({
      showModal1:false,
      showModal2:false
    })
  },



  // ================点击已过期食品栏目============//
  // showOuttimeNum:function(){
  //   wx.showModal({
  //     title: "已过期食品数量："+this.data.countFood,
  //     content: "快快去清理冰箱吧~",
  //     showCancel: false
  //   })
  // }
})


// ====================设置图标参数==============
function initChart(canvas, width, height, dpr) {
  var that = this;
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  var option = {
    // backgroundColor: "#ffffff",
    legend: {
      // bottom: 10,
      left: 'center',
      itemHeight: 6,
      itemWidth:6,
      textStyle:{
        fontSize: 10,
        color: "#777676"
      }
    },
    series: [{
      label: {
        normal: {
          // position:'inner',
          formatter: '{b}\n{d}%',
          textStyle:{
            fontSize: 10
          }
        }
      },
      type: 'pie',
      center: ['50%', '50%'],
      radius: ['20%', '38%'],
      data: [{
        value: app.globalData.total_waste,
        name: '过期'
      }, {
        value: app.globalData.total_normal,
        name: '正常'
      }]
    }]
  };
  chart.setOption(option);
  return chart;
}