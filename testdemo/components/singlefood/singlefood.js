// components/singlefood/singlefood.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {}
    },
    itemurl: {
      type: String,
      value: ""
    },
    startTime:{
      type: Date,
      value: new Date()
    },
    endTime:{
      type:Date,
      value: new Date()
    },
    // noShow:{
    //   type: Boolean,
    //   value: true
    // },
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // handleTouchStart(e){
    //   var that = this;
    //   that.startTime=e.timeStamp;
    // },
    // handleTouchEnd(e){
    //   var that = this;
    //   that.endTime=e.timeStamp;
    // },
    // handleClick(e){
    //   var that = this;
    //   if(that.endTime-that.startTime<350){
    //     console.log("点击");
    //     wx.navigateTo({
    //       url: '/pages/edit/edit',
    //     })
    //   }
    // },
    // handleLongPress(e){
    //   var that = this;
    //   console.log("长按");
    //   // that.setData({
    //   //   noShow:false
    //   // })

    // },
  }
})
