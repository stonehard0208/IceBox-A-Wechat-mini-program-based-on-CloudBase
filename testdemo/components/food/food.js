// components/food/food.js
const app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: ""
    },
    moreurl: {
      type: String,
      value: ""
    },
    items: {
      type: Array,
      value: []
    },
    noShow: {
      type: Boolean,
      value: true
    },
    clearType:{
      type:String,
      value:""
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {
      var that = this;
      // console.log("show");
      that.setData({
        noShow:true
      })
     },
    hide: function () {
      var that = this;
      // console.log("hide");
      that.setData({
        noShow:true
      })
     },
    resize: function () { },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //清空
    deleteAll(){
      var that=this;
      console.log("种类是",that.data.title);
      var title = that.data.title;
      that.triggerEvent('cleanAll',{title:title});
      console.log("调用完了");
    },
    deleteOneFood(e){
      // const db = wx.clould.database();//无法调用
      var that = this;
      var id = e.currentTarget.dataset.id;
      var leftdate = e.currentTarget.dataset.leftdate;
      var type = e.currentTarget.dataset.type;
      var mydata=[id,leftdate,type];
      console.log("leftDate:" ,leftdate);
      console.log("type is",type);
      that.triggerEvent('fromFood',{mydata:mydata});//向page传递要删除的id
    },
    handleTouchStart(e){
      var that = this;
      that.startTime=e.timeStamp;
    },
    handleTouchEnd(e){
      var that = this;
      that.endTime=e.timeStamp;
    },
    handleClick(e){
      var that = this;
      if(that.endTime-that.startTime<350){
        var id = e.currentTarget.dataset.id;
        // console.log("点击id为：",id);
        wx.navigateTo({
          url: '/pages/edit/edit?id='+id,
        })
      }
    },
    handleLongPress(e){
      var that = this;
      console.log("长按");
      that.setData({
        noShow:false
      })

    },
    cancle(){
      var that = this;
      console.log("取消");
      that.setData({
        noShow:true
      })
    }

  }
})
