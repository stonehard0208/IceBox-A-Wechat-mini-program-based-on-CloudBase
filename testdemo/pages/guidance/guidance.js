// pages/guidance/guidance.js
Page({
  /**
     * 页面的初始数据
     */
  data: {
    isTiptrue: true,
    swiperCurrent: 0,  // 引导页的下标 
    swiperMaxNumber: 4  // 引导页的下标
  },

  fike(e) {
    this.setData({
      swiperCurrent: e.detail.current
    });
  },

	/**
	 * 生命周期函数--监听页面加载
	 */
  onLoad: function (query) {
    let firstOpen = wx.getStorageSync("loadOpen")
    console.log("是否首次打开本页面==",firstOpen)
    if (firstOpen == undefined || firstOpen == '') { //根据缓存周期决定是否显示新手引导
      wx.cloud.callFunction({
        name:'createTableByOpenID'
      })
      this.setData({
        isTiptrue: true,
      })
      } else {
        this.setData({
          isTiptrue: false,
        })
      }
    console.log(this.data.isTiptrue);
  },

  getIndex(e) {
    console.log("s");
    wx.setStorage({
      key: 'loadOpen',
      data: 'OpenTwo'
    })
    this.setData({
      isTiptrue: false
    })
    wx.redirectTo({
      url: "../index1/index1"
    })
  },
  

})