// pages/science/science.js
const db = wx.cloud.database()
const _ = db.command
const col = "food"
const sql = {
  _id: _.neq(1)
} //获取所有记录
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // testList:[],
    isEndOfList: false,
    list: [],
    limit: 20, //每次拉取数量
    foodList:[],
    inputsearch:'',
    searchList:[],
    navbar:['节约粮食','食物科普'],
    currentTab:0,
    newsList:[]
  },
  navbarTap: function(e){
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },

  getInputData : function(e){
    var value = e.detail.value;
    console.log(e);
    console.log(value);
    this.setData({
      inputsearch: value,
    });

     //监听输入框内容
   },

  searchFunction:function(e){
    var that = this;
    var input = that.data.inputsearch;

    const db = wx.cloud.database();
    db.collection('food').where({
      Zhname:input
    }).get({
      success : res =>{
        console.log(res.data)
        console.log(res.data.length)
        if(res.data.length!=0){
          wx.navigateTo({
            url: '../science-info/science-info?Zhname='+input,
          })
        }
        else{
          wx.navigateTo({
            url: '../searchFail/searchFail',
          })
        }    
       }
    })


  },

toFoodScienceInfo:function(e){
  var that = this;
  var name= e.currentTarget.dataset.name;
  console.log(name);

  const db = wx.cloud.database();
  db.collection('food').where({
    Zhname:name
  }).get({
    success : res =>{
      console.log(res.data)
      console.log(res.data.length)
      if(res.data.length!=0){
        wx.navigateTo({
          url: '../science-info/science-info?Zhname='+name,
        })
      } 
     }
  })
},

toNewsPage:function(e){
  var that = this;
  var title= e.currentTarget.dataset.title;
  console.log(title);

  const db = wx.cloud.database();
  db.collection('news').where({
    title:title
  }).get({
    success : res =>{
      console.log(res.data)
      console.log(res.data.length)
      if(res.data.length!=0){
        wx.navigateTo({
          url: '../news_page/news_page?title='+title,
        })
      } 
     }
  })
},

getData: function() {
  db.collection(col)
    .where(sql)
    .skip(this.data.foodList.length)
    .limit(this.data.limit)
    .get()
    .then(res => {
      this.setData({
        foodList: [...this.data.foodList, ...res.data], //合并数据
        isEndOfList: res.data.length < this.data.limit ? true : false //判断是否结束
      })
    })
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db = wx.cloud.database();
    db.collection('news').get({
      success:res=>{
        console.log(res.data)
        this.setData({
          newsList:res.data
        })
      },
      fail:console.error
    })
    this.getData()
    // db.collection('food').get({
    //   success:res=>{
    //     console.log(res.data)
    //     this.setData({
    //       foodList:res.data
    //     })
    //   },
    //   fail:console.error
    // })

  
    

  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
    this.data.isEndOfList || this.getData()
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})