App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    wx.cloud.init({
      traceUser:true,
      env: 'cloud1-5gfxwyhfa35bb09e'
    });
    wx.cloud.callFunction({
      name:'login',
      success:res=>{
        this.globalData.globalOpenid=res.result.openid
      }
    })
  },

  globalData: {
    fruits: {},
    meats: {},
    drink: {},
    foods: {},
    owndata: 0,
    globalOpenid:"",
    waste_fruit: 0,
    waste_drink: 0,
    waste_meat: 0,
    waste_food: 0,

    normal_fruit: 0,
    normal_meat: 0,
    normal_drink: 0,
    normal_food: 0,

    total_waste:0,
    total_normal:0,
    // onShow:false
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    const db = wx.cloud.database();

  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  }
})
