// pages/edit/edit.js
var dateTimePicker = require('time.js');
const db = wx.cloud.database()
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    food_id:"",
    inputname: "",
    name: "",    //食物名称
    //食物类型图标
    icons: [],
    icoIndex: 0,    //选择图标索引
    date: '2018-10-01',
    time: '12:00',
    dateTimeArray1: null,
    dateTime1: null,
    startYear: 2000,
    endYear: 2050,
    dateArray: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 20, 30, 45, 60, 90],
    index: 0,   //保质期数组索引
    expirationDate: 7,    //自选保质期
    type: "水果",    //食物种类
    reDate: 7,   //推荐保质期
    tempFilePath: "../../icon/addpic.png",   //食物图片路径
    showModal: false,   //是否弹窗
    array: ['果蔬', '肉类', '熟食', '饮品'],
    category: '',
    categoryID: 0,
    iconPath: '',
    freshday: 7,
    iconName: '苹果',
    showDialog: false,
    items: [
      { name: '果蔬', value: '果蔬' },
      { name: '饮品', value: '饮品' },
      { name: '肉类', value: '肉类' },
      { name: '熟食', value: '熟食' },],
    imgUrl: ''
  },
  showIcon: function () {
    wx.cloud.callFunction({
      name: 'getIconByLabel',
      data: {
        category: this.data.category
      }
    }).then(res => {
      this.setData({
        icons: res.result.data
      })
      // console.log(res)
    })
  },
  /**
   * 获取食物名称文本框输入值
   */
  nameInput: function (e) {
    this.setData({
      inputname: e.detail.value
    });
  },

  /**
   * 保存食物名称
   */
  nameConfirm: function (e) {
    var that = this;
    var inputname = this.data.inputname;
    //更新数据
    that.setData({ name: inputname ? inputname : this.data.name });
    //输出日志信息
    // console.log(this.data.name)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var name = options.name;
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var startDate=new Date("2000/1/1 00:00:00")
    // var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj1 = dateTimePicker.dateTimePicker(startDate);
    // // 精确到分的处理，将数组的秒去掉
    var lastArray = obj1.dateTimeArray.pop();
    var lastTime = obj1.dateTime.pop();
    // console.log(obj1.dateTime)
    that.setData({
      dateTimeArray1: obj1.dateTimeArray,
      // dateTime1: obj1.dateTime
    })
    // ==============================================
    //获取当前点击的id
    // console.log("edit界面的id：", options.id);
    var id = options.id;
    that.setData({
      food_id:id
    })
    db.collection('fridge'+app.globalData.globalOpenid).where({
      _id: id
    }).get().then(res => {
      
      // console.log("res:", res.data[0].put_date);
      // console.log("res..:", res.data[0].iconName);
      // res.data[0].put_date.pop();
      if(res.data[0].pic!=""){
        that.setData({
          tempFilePath: res.data[0].pic,
          imgUrl:res.data[0].pic
        })
      }
      
      that.setData({
        value: res.data[0].type,
        name: res.data[0].food_name,
        dateTime1: res.data[0].put_date,
        expirationDate: res.data[0].freshday,
        iconPath: res.data[0].img,
        freshday:res.data[0].reDay,
        iconName:res.data[0].iconName,
        category:res.data[0].type,
      })
    }).then(res=>{
      that.showIcon()
      if(that.data.expirationDate<=0){
        that.setData({
          index: 0,
          expirationDate: 0
        })
        wx.showModal({
          title: '警告',
          content: '当前食物已过期！',
        })
      }else{
      for (var i = 0; i < that.data.dateArray.length; ++i) {
        if (that.data.dateArray[i] == that.data.expirationDate) {
          that.setData({
            index: i,
            expirationDate: that.data.expirationDate
          })
        }
      }}
    })
    
    

    
    // that.showIcon()
    //输出日志信息
    // console.log(obj1.dateTimeArray)
    // console.log(this.data.dateTime1)
  },

  /**
   * 获取购买时间
   */
  changeDateTime1(e) {
    this.setData({ dateTime1: e.detail.value });
  },

  /**
   * 设置购买时间
   */
  changeDateTimeColumn1(e) {
    var arr = this.data.dateTime1, dateArr = this.data.dateTimeArray1;
    arr[e.detail.column] = e.detail.value;
    var now=new Date()
    var year=now.getFullYear()
    var month=now.getMonth()+1
    var day=now.getDate()
    dateArr[1]=dateTimePicker.getYearMonth(dateArr[0][arr[0]], year,month)
    dateArr[2] = dateTimePicker.getMonthDayII(dateArr[0][arr[0]], dateArr[1][arr[1]],year,month,day);
    // console.log("设置购买时间")
    // console.log(dateArr)
    // console.log(arr)
    this.setData({
      dateTimeArray1: dateArr,
      dateTime1: arr
    });
  },

  /**
   * 保质期天数设置
   */
  changeDate: function (e) {
    var date = this.data.dateArray[e.detail.value];
    this.setData({
      index: e.detail.value,
      expirationDate: date
    })
    //输出日志信息
    // console.log(this.data.expirationDate)
  },
  //上传操作
  uploadImg: function () {
    wx.showLoading({
      title: '图片上传中',
    })
    wx.cloud.uploadFile({
      cloudPath: 'foodIMG/' + (new Date()).valueOf() + '.png', // 文件名
      filePath: this.data.tempFilePath, // 文件路径
      success: res => {
        // get resource ID
        // console.log(res.fileID)
        // 赋值图片
        this.setData({
          imgUrl: res.fileID
        })
        console.log("----------------",this.data.imgUrl)
        wx.hideLoading({
          success: (res) => {
            wx.showToast({
              title: '图片上传成功',
            })
          },
        })
      },
      fail: err => {
        // handle error
        wx.showModal({
          title: '提示',
          content: '云存储照片失败！',
        })
      }
    })
  },
  /**
   * 获取图片
   */
  chooseimage: function () {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          tempFilePath: res.tempFilePaths[0]
        })
        console.log(that.data.tempFilePath)
        that.uploadImg()
      }
    })
  },

  /**
   * 弹窗
   */
  showDialogBtn: function () {
    this.setData({ showModal: true });
  },

  /**
   * 弹出框蒙层截断touchmove事件(空方法--阻断事件向下传递)
   */
  preventTouchMove: function () {
  },

  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({ showModal: false });
  },

  /**
   * 选择图标
   */
  iconChoose: function (e) {
    this.hideModal();
    var iconName = e.currentTarget.id
    wx.cloud.callFunction({
      name: 'getIconInfoByName',
      data: {
        Enname: iconName
      }
    }).then(res => {
      var info = res.result.data[0]
      this.setData({
        iconPath: info.path,
        iconName: info.Zhname,
        freshday: info.freshday
      })
    })
    // console.log(this.data.iconPath)
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

  },
  /*点击变色*/
  click: function (e) {
    var id = e.currentTarget.dataset.id
    // console.log(e.currentTarget.dataset)
    var that = this
    that.setData({
      id: id
    })
  },
  radioChange: function (e) {
    // console.log('radio发生change事件，携带value值为：', e.detail.value)
    var that = this
    that.setData({
      value: e.detail.value
    })
    that.setData({
      category: e.detail.value
    })
    this.showIcon()
  },
  toggleDialog() {
    this.setData({
      showDialog: !this.data.showDialog
    });
  },
  freeBack: function (e) {
    var that = this
    that.setData({
      showDialog: !this.data.showDialog
    })
  },
  freetoBack: function () {
    var that = this
    that.setData({
      showDialog: !this.data.showDialog,
      checked: false,
    })
  },
  calDay:function(){
    var that=this
    var time1=that.data.dateTime1
    console.log("--------------------")
    // var str1='20'+time1[0]+'/'+(time1[1]+1)+'/'+(time1[2]+1)+" "+time1[3]+":"+time1[4]
    var str1='20'+time1[0]+'/'+(time1[1]+1)+'/'+(time1[2]+1)
    var date1=new Date(str1)
    var date2=new Date()
    var str2=date2.getFullYear()+'/'+(date2.getMonth()+1)+'/'+date2.getDate()
    date2=new Date(str2)
    var day=parseInt((date2.getTime()-date1.getTime())/(1000*60*60*24))
    // console.log("day",day)
    that.setData({
      passDay:day
    })
  },
  modRef:function(){
    // console.log("修改")
    var that=this
    if (that.data.name == '' || that.data.name == undefined) {
      wx.showModal({
        title: '警告',
        content: '食物名称不能为空！',
      })
    } else {
      // console.log("else")
      // console.log("id:",that.data.food_id)
      var time = this.data.dateTime1
      that.calDay()
      wx.cloud.callFunction({
        name: 'updatefoodByID',
        data: {
          food_id:that.data.food_id,
          food_name: that.data.name,
          food_img: that.data.iconPath,
          fresh_day: that.data.expirationDate,
          left_day:that.data.expirationDate-that.data.passDay,
          food_pic: that.data.imgUrl,
          add_date: time,
          food_category: that.data.category,
          icon_name:that.data.iconName,
          reDay:that.data.freshday
        },
        success(res) {
          wx.switchTab({
            url: '../inside/inside',
          })
        },
        fail(err) {
          // console.log(err)
          wx.showModal({
            title: '提示',
            content: '食物修改失败！',
          })
        }
      })
    }
  },
  delRef:function(){
    var that=this;
    that.calDay()
    const _=db.conmand;
    // console.log("传过去的left_date",that.data.expirationDate-that.data.passDay);
    /*============AHASAN代码========= */
    // wx.cloud.callFunction({
    //   name: 'delfoodByID',
    //   data: {
    //     food_id:that.data.food_id,
    //     left_date:that.data.expirationDate-that.data.passDay,
    //     type:that.data.category
    //   },
    //   success(res) {
    //     wx.switchTab({
    //       url: '../inside/inside',
    //     })
    //   },
    //   fail(err) {
    //     // console.log(err)
    //     wx.showModal({
    //       title: '提示',
    //       content: '食物取出失败！',
    //     })
    //   }
    // })
    /* ========ZFJ==============*/
    var myleft = that.data.expirationDate-that.data.passDay;
    var mytype = that.data.category;
    var myid = that.data.food_id;
    var myname=that.data.iconName;
    // 先判断是否为过期食物
    // 如果过期，插入数据库countLeft
    // 反之，插入数据库countNor
    if(myleft<0){
      //调用云函数1
      wx.cloud.callFunction({
        name:"countLeft",
        data:{
          type:mytype,
          name:myname
        },
        success: res => {
          console.log("添加过期食物数量成功！");
        }
      });
    }else{
      // 调用云函数2
      wx.cloud.callFunction({
        name:"countNor",
        data:{
          type:mytype,
          name:myname
        },
        success: res => {
          console.log("添加正常食物数量成功！！");
        }
      });
    }

    db.collection('fridge'+app.globalData.globalOpenid).doc(myid).remove({
      success(res) {
        wx.showToast({
          title: '取出成功',
        })
        wx.switchTab({
          url: '../inside/inside',
        })
      },
      fail(err) {
        // console.log(err)
        wx.showModal({
          title: '提示',
          content: '食物取出失败！',
        })
      }
    })
  }
})