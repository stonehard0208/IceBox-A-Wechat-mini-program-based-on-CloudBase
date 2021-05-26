// pages/index1/index1.js
Page({
  data:{
    // userInfo: {},
    // hasUserInfo: false,
  },
  onLoad: function (query) {
   },
   getIndex(e){
    var that = this;
    //=============获取权限函数============
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {
        that.setData({
          userInfo: res.userInfo,
          hasUserInfo:true
        })
        console.log("用户信息",that.data.userInfo);
        wx.redirectTo({
          url: "../index/index"
        })
      },
    }) 
    
  },
  /**
   * 弹出框蒙层截断touchmove事件(空方法--阻断事件向下传递)
   */
  preventTouchMove: function () {
  },
})
