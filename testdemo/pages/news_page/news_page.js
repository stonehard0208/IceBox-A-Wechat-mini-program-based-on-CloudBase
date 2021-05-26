// testdemo/pages/news_page/news_page.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsList:[],
    contentList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db = wx.cloud.database();
    
   console.log(options)
   console.log(options.title)
    db.collection('news').where({
      title:options.title
    }).get({
      success : res =>{
        console.log(res.data[0].image2idx)
        this.setData({
          newsList : res.data[0],
          contentList:res.data[0].content
         })
       },
     })



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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})