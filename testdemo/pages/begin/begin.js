// pages/begin/begin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    ///////这一段代码保证在测试期间可以多次访问引导页///////
    // wx.setStorage({
    //   key: 'loadOpen',
    //   data: ''
    // })
    /////////////////////////////////////////////////
    this.enterMainPage(this.isNeedSearch());
  },

  isNeedSearch() {
    let needSearch = wx.getStorageSync("loadOpen");
    console.log(needSearch);
    if (needSearch == undefined || needSearch == '') {
      return true;
    }
    return false;
  },
 
  enterMainPage(flag) {
    if (flag) {
      wx.redirectTo({
        url: '../guidance/guidance',
      });
    } else {
      wx.redirectTo({
        url: '../index/index',
      });
    }
  }
})