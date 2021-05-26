// miniprogram/pages/flag/flag.js
Page({
  /**
   * 页面的初始数据：备忘录列表、日期、输入框信息
   */
  data: {
    TodayList:[],
    Today:"",
    input:"",
    isEmpty:"",
    itemnum:0,
    showModal: false,
    goods_list:[]
  },

  /**
   * 存储列表数据函数
   */
  save: function(){
    wx.setStorageSync('TodayList', this.data.TodayList);
  },

  /**
   * 获取本地数据函数
   */
  loadData: function(){
    var todo = wx.getStorageSync('TodayList');
    var emp;
    var inum = this.data.itemnum;
    //判断列表是否为空
    if(todo.length){
      emp = false;
    }else{
      emp = true;
    }
    //计算未完成项数目
    for(var i = 0; i < todo.length; ++i){
      if(!todo[i].completed) inum++;
    }
    //更新数据
    if(todo){
      this.setData({
        TodayList: todo,
        isEmpty: emp,
        itemnum: inum
      });
    }
  },
  
  AddInput: function(e){
    this.setData({
      input:e.detail.value
    });
  },

  /**
   * 更改任务状态
   * */
  toggleTodoHandle: function (e) {
    var todo = this.data.TodayList;
    //获取e传输的id
    var index = e.currentTarget.id;
    //列表是否为空
    var emp = this.data.isEmpty;
    var inum = this.data.itemnum;
    //改变complete状态
    if(index < todo.length){
      todo[index].completed = !todo[index].completed;
      if(todo[index].completed) inum--; else inum++;
    }
    if(todo.length) emp = false; 
    else emp = true;
    //更改数据
    this.setData({
      TodayList:todo,
      isEmpty:emp,
      itemnum:inum
    });
    this.save();
  },

  /**
   * 增加一条记录
   */
  AddConfirm: function(e){
    if(this.data.input){
      var that = this;
      var todo = this.data.TodayList;
      todo.push({description:this.data.input,completed:false})
      var inum = this.data.itemnum;
      inum++;
      //更新数据
      that.setData({TodayList:todo,input:'',isEmpty:false,itemnum:inum});
      //输出日志信息
      console.log(this.data.TodayList)
      //保存记录到本地
      this.save();
    }else{
      wx.showModal({
        title: '提示',
        content: '购物计划不能为空！',
      })
    }  
  },

  /**
   * 进入编辑状态
   */
  addIntoRefHandle: function(e){
    var todo = this.data.TodayList;
    var index = e.currentTarget.id;
    var inum = this.data.itemnum;
    wx.navigateTo({
      url: '../add/add?name=' + todo[index].description,
    })
    if(todo[index].completed){
      todo[index].completed = !todo[index].completed;
      inum++;
    }
    //设置数据
    this.setData({
      TodayList:todo,
      itemnum:inum
    });
    // this.save();
  },

  /**
   * 清除一条记录
   */
  removeTodoHandle: function(e){
    var todo = this.data.TodayList;
    var index = e.currentTarget.id;
    var inum = this.data.itemnum;
    //剩余记录数量减一
    if(!todo[index].completed) inum--;
    //删除数据
    todo.splice(index,1);
    console.log(todo);
    if(index < todo.length){
      todo[index].completed = !todo[index].completed;
      if(todo[index].completed) inum--; else inum++;
    }
    //设置数据
    this.setData({
      TodayList:todo,
      itemnum:inum
    });
    this.save();
  },

  /**
   * 勾选全部记录
   */
  toggleAllHandle: function(){
    var todo = this.data.TodayList;
    for(var index = 0; index < todo.length; ++index){
      todo[index].completed = true;
    }
    //更改数据
    this.setData({
      TodayList:todo,
      itemnum:0
    });
    this.save();
  },

  /**
   * 清空列表
   */
  removeAllHandle: function(){
    var todo = this.data.TodayList;
    //删除数据
    todo.splice(0,todo.length);
    console.log(todo);
    //更改数据
    this.setData({
      TodayList:todo,
      isEmpty:true,
      itemnum:0
    });
    this.save();
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getfoodNotfresh()
    //计算日期
    var that = this;
    var date1 = new Date;
    var date2 = new Array("星期日","星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
    var Today;
    Today = date1.getFullYear() + '-' + (date1.getMonth() + 1) + '-' + date1.getDate() + '   ' + (date2[date1.getDay()]);
    var TodayStorage = wx.getStorageSync("Today");
    if (TodayStorage != Today){
      wx.setStorageSync("Today", Today);
    }
    that.setData({
      Today:Today
    });
    //获取本地存储日志
    this.loadData();
  },
  getfoodNotfresh:function(){
    wx.cloud.callFunction({
      name:'Notfresh'
    }).then(res=>{
      console.log(res)
      this.setData({
        goods_list:res.result.res.data
      })
      if(this.data.goods_list.length==0){
        this.setData({
          showModal:false
        })
      }else{
        this.setData({
          showModal:true
        })
      }
      // var num=0
      // for(var i=0;i<goods_list.length;i++){
      //   if(goods_list[i].left_date<=0){
      //     num++;
      //   }
      // }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
   /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
    this.hideModal();
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