// testdemo/pages/science-info/science-info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    inputsearch:'',
    searchList:[],
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.Zhname)
    const db = wx.cloud.database();
    db.collection('food').where({
      Zhname:options.Zhname
    }).get({
      success : res =>{
        this.setData({
          searchList : res.data
         })
       },
     })
     

    // db.collection('food').where({
    //   Zhname:options.Zhname
    // }).get().then(res=>
    //   {
    //     console.log(res.data);
    //     console.log(res.data.length);
    //     if(res.data.length==0){
    //       wx.navigateTo({
    //         url: '../science-Fail/science-Fail',
    //       })
    //   }
    //     else{
    //     this.setData({
    //         searchList : res.data
    //       })
    //     console.log('searchdata',searchList)
    //   }
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})