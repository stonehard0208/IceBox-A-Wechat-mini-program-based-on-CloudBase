// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {

      },

  onLoad() {
    if (wx.canIUse('hideHomeButton')) {
      wx.hideHomeButton()
    }
    this.setData({
      
    })
  },

  gotoTodo: function(){
    // wx.navigateTo({
    //   url: 'pages/todo/todo',
    // })
    wx.switchTab({
      url: '/pages/todo/todo',
    })
  },

  gotoInside: function(){
    wx.switchTab({
      url: '/pages/inside/inside',
      success: function(res){
        console.log('跳转到news页面成功')// success
     },
     fail: function() {
      console.log('跳转到news页面失败')  // fail
     },
     complete: function() {
       console.log('跳转到news页面完成') // complete
     }
    })
  }
  
})
