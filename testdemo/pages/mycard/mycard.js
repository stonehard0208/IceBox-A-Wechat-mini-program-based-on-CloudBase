// pages/mycard/mycard.js
const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    unlockedNum: 0,
    comFruit: 0,  //已解锁果蔬数量
    comMeat: 0,  //已解锁肉类数量
    comDeli: 0,  //已解锁熟食数量
    comDrink: 0,  //已解锁饮品数量
    showModal: false,   //是否弹窗
    items: [
      { name: 'fruit', value: '果蔬' },
      { name: 'meat', value: '肉类' },
      { name: 'drink', value: '饮品' },
      { name: 'deli', value: '熟食' },],
    fruitcard: [],
    fruitnum: 0,
    meatcard: [],
    meatnum: 0,
    drinkcard: [],
    drinknum: 0,
    delicard: [],
    delinum: 0,
    imgUrl:'cloud://cloud1-5gfxwyhfa35bb09e.636c-cloud1-5gfxwyhfa35bb09e-1305867234/cardIMG/fruit/AppleCard.png',
  },

  /**
   * 弹出框蒙层截断touchmove事件(空方法--阻断事件向下传递)
   */
  preventTouchMove: function () {
  },

  /**
   * 弹窗
   */
  showDialogBtn: function () {
    this.setData({ showModal: true });
  },

  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({ showModal: false });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    var that = this
    wx.cloud.callFunction({
      name: 'getCardByLabel',
      data: {
        label: '果蔬'
      },
      success: res => {
        console.log(res.result.data)
        that.setData({
          fruitcard: res.result.data,
          fruitnum: res.result.data.length
        })
        for(var i=0;i<that.data.fruitcard.length;i++){
          if(that.data.fruitcard[i].num>=10){
            that.setData({
              comFruit:that.data.comFruit+1
            })
          }
        }
        that.setData({
          unlockedNum:that.data.unlockedNum+that.data.comFruit
        })
      }
    })
    
    
    wx.cloud.callFunction({
      name: 'getCardByLabel',
      data: {
        label: '肉类'
      },
      success: res => {
        that.setData({
          meatcard: res.result.data,
          meatnum: res.result.data.length
        })
        for(var i=0;i<that.data.meatcard.length;i++){
          if(that.data.meatcard[i].num>=10){
            that.setData({
              comMeat:that.data.comMeat+1
            })
          }
        }
        that.setData({
          unlockedNum:that.data.unlockedNum+that.data.comMeat
        })
      }
    })

    wx.cloud.callFunction({
      name: 'getCardByLabel',
      data: {
        label: '熟食'
      },
      success: res => {
        that.setData({
          delicard: res.result.data,
          delinum: res.result.data.length
        })
        for(var i=0;i<that.data.delicard.length;i++){
          if(that.data.delicard[i].num>=10){
            that.setData({
              comDeli:that.data.comDeli+1
            })
          }
        }
        that.setData({
          unlockedNum:that.data.unlockedNum+that.data.comDeli
        })
      }
    })

    wx.cloud.callFunction({
      name: 'getCardByLabel',
      data: {
        label: '饮品'
      },
      success: res => {
        that.setData({
          drinkcard: res.result.data,
          drinknum: res.result.data.length
        })
        for(var i=0;i<that.data.drinkcard.length;i++){
          if(that.data.drinkcard[i].num>=10){
            that.setData({
              comDrink:that.data.comDrink+1
            })
          }
        }
        that.setData({
          unlockedNum:that.data.unlockedNum+that.data.comDrink
        })
      }
    })
    // for(var i=0;i<that.data.items.length;i++){

    //   wx.cloud.callFunction({
    //     name:'getCardByLabel',
    //     data:{
    //       label:that.data.items[i].value
    //     },
    //     success:res=>{
    //       var _label=that.data.items[i].value
    //       switch(_label){
    //         case '果蔬':
    //           that.setData({
    //             fruitcard:res.result.data,
    //             fruitnum:res.result.data.length
    //           })
    //           console.log(that.data.fruitcard)
    //           break;
    //         case '肉类':
    //           that.setData({
    //             meatcard:res.result.data,
    //             meatnum:res.result.data.length
    //           })
    //           console.log(that.data.meatcard)
    //           break;
    //         case '熟食':
    //           that.setData({
    //             delicard:res.result.data,
    //             delinum:res.result.data.length
    //           })
    //           console.log(that.data.delicard)
    //           break;
    //         case '饮品':
    //           that.setData({
    //             drinkcard:res.result.data,
    //             drinknum:res.result.data.length
    //           })
    //           console.log(that.data.drinkcard)
    //           break;
    //       }
    //     }
    //   })
    // }
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
  //图片点击放大事件
    showCard: function(e){
    var item=e.currentTarget.dataset.item
    var imgUrl = item.cardPath
    if(item.num>=10){
        wx.previewImage({
          urls: [imgUrl], //需要预览的图片http链接列表，注意是数组
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })}
      },
})