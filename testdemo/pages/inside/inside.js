// testdemo/pages/inside/inside.js

const db = wx.cloud.database();

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    fruits:[1],
    foods:[1],
    meats:[1],
    drink:[1],
    owndata:0,
    animationData:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
  },

  //添加食物
  addFood:function(){
    wx.navigateTo({
      url: '/pages/add/add',
    })
  },

  //获取冰箱集合
  getfridge:function(){
    wx.cloud.callFunction({
      name:"foodtype",
      success: res => {
        // console.log(res);
        var foods = res.result.foods.data;
        var fruits = res.result.fruits.data;
        var meats = res.result.meats.data;
        var drink = res.result.drink.data;
        var owndata = 1;
        if((fruits.length==0&&drink.length==0&&meats.length==0&&foods.length==0)||foods==null&&fruits==null&&meats==null&&drink==null){
          owndata = 0;
        }
        this.setData({
          foods: foods,
          fruits: fruits,
          meats:meats,
          drink: drink,
          owndata: owndata
        });
        // console.log(fruits);
        app.globalData.foods=foods;
        app.globalData.fruits=fruits;
        app.globalData.meats=meats;
        app.globalData.drink=drink;
        app.globalData.owndata=owndata;
        // console.log(meats);
      }
    })
  },

  //添加测试数据
  // addfridge: function(){
  //   db.collection('fridge').add({
  //     data: {
  //       food_id: "1ace8ef1609fcc6c01051e5f10f9606a",
  //       food_name: "披萨",
  //       img: "cloud://cloud1-5gfxwyhfa35bb09e.636c-cloud1-5gfxwyhfa35bb09e-1305867234/foodICON/deli/Pizza.png",
  //       left_date: 4,
  //       pic: "",
  //       put_date: new Date(),
  //       type: "熟食"
  //     }
  //   }).then(res =>{
  //     // console.log(res);
  //   })
  // },

//删除一个食物
  deleteId:function(e){
    var that = this;
    console.log("进入deleteID")
    var Mydata=e.detail.mydata;
    // 注释：Mydata[0]=id,Mydata[1]=leftdate,Mydata[2]=type
    console.log("mydata is：",Mydata);
    // console.log("剩余的天数是：",leftDate);
    const _=db.conmand;
    var myid = app.globalData.globalOpenid;
    console.log("myid",myid);
    // 先判断是否为过期食物
    // 如果过期，插入数据库countLeft
    // 反之，插入数据库countNor
    if(Mydata[1]<0){
      //调用云函数1
      wx.cloud.callFunction({
        name:"countLeft",
        data:{
          myid:myid,
          type:Mydata[2]
        },
        success: res => {
          console.log("添加过期食物数量成功！");
        }
      });
    }else{
      // 调用云函数2
      wx.cloud.callFunction({
        name:"countNor",
        data:{
          myid:myid,
          type:Mydata[2]
        },
        success: res => {
          console.log("添加正常食物数量成功！！");
        }
      });
    }

    db.collection('fridge'+app.globalData.globalOpenid).doc(Mydata[0]).remove().then(res=>{
      console.log("删除成功！");
      // console.log("果蔬",app.globalData.fruits);
      that.onReady();
    })
  },

  cleanTypeAll:function(e){
    var that = this;
    console.log("进入清空");
    var delTitle = e.detail.title;
    console.log("要清空的类型是",delTitle);
    //去云函数操作，传递title（type）过去
    wx.cloud.callFunction({
      name:"deleteAllfood",
      data:{
        type:delTitle
      },
      success: res => {
        console.log("清空完成！");
        wx.showToast({
          title: "清空"+delTitle+"完成",
          duration:2000,
          success:function(){
            console.log("完成");
            that.onReady();
          }
        },1000)
      }
    });
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    that.getfridge();
    // =============动画部分=============
    var circleCount = 0;
    this.animation = wx.createAnimation({
      duration:1000, // 以毫秒为单位
      timingFunction: 'linear',
      delay: 100,
      transformOrigin: '50% 50%',
      success: function (res) {}
    });
    this.animation1 = wx.createAnimation({
      duration:1000, // 以毫秒为单位
      timingFunction: 'linear',
      delay: 100,
      transformOrigin: '50% 50%',
      success: function (res) {}
    });
    setInterval(function() {
      if (circleCount % 2 == 0) {
        this.animation.translateY(6).step();
        this.animation1.translateY(-6).step();
      } else {
        this.animation.translateY(-6).step();
        this.animation1.translateY(6).step();
      }
      this.setData({
        animation: this.animation.export(),
        animation1: this.animation1.export()
      });
      circleCount++;
      if (circleCount == 1000) {
        circleCount = 0;
      }
    }.bind(this), 1000);
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onReady();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})