// testdemo/pages/imgRecognition/imgRecognition.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    access_token:'',
    openid:'',
    token:'',
    words:[],
    filePath:'',
    returnResult:[],
    //score:[],
    // bottomUrl:['cloud://cloud1-5gfxwyhfa35bb09e.636c-cloud1-5gfxwyhfa35bb09e-1305867234/recognition-image/牛奶_milk-one.png',
    // 'cloud://cloud1-5gfxwyhfa35bb09e.636c-cloud1-5gfxwyhfa35bb09e-1305867234/recognition-image/炸薯条_french-fries.png',
    // 'cloud://cloud1-5gfxwyhfa35bb09e.636c-cloud1-5gfxwyhfa35bb09e-1305867234/recognition-image/生日蛋糕_birthday-cake.png',
    // 'cloud://cloud1-5gfxwyhfa35bb09e.636c-cloud1-5gfxwyhfa35bb09e-1305867234/recognition-image/香蕉_banana.png',
    // 'cloud://cloud1-5gfxwyhfa35bb09e.636c-cloud1-5gfxwyhfa35bb09e-1305867234/recognition-image/鱼_fish.png',
    // 'cloud://cloud1-5gfxwyhfa35bb09e.636c-cloud1-5gfxwyhfa35bb09e-1305867234/recognition-image/苹果_apple-one.png',
    // 'cloud://cloud1-5gfxwyhfa35bb09e.636c-cloud1-5gfxwyhfa35bb09e-1305867234/recognition-image/螃蟹_crab.png',
    // 'cloud://cloud1-5gfxwyhfa35bb09e.636c-cloud1-5gfxwyhfa35bb09e-1305867234/recognition-image/牛油果_avocado.png',
    // 'cloud://cloud1-5gfxwyhfa35bb09e.636c-cloud1-5gfxwyhfa35bb09e-1305867234/recognition-image/鸡肉_chicken.png',
    // 'cloud://cloud1-5gfxwyhfa35bb09e.636c-cloud1-5gfxwyhfa35bb09e-1305867234/recognition-image/橙子_orange.png'],
    bannerUrl:'cloud://cloud1-5gfxwyhfa35bb09e.636c-cloud1-5gfxwyhfa35bb09e-1305867234/recognition-image/regBanner2.png',
    //bottomUrl:'cloud://cloud1-5gfxwyhfa35bb09e.636c-cloud1-5gfxwyhfa35bb09e-1305867234/recognition-image/regBanner4.png',
    // bottom1:'cloud://cloud1-5gfxwyhfa35bb09e.636c-cloud1-5gfxwyhfa35bb09e-1305867234/recognition-image/牛奶_milk-one.png',
    // bottom2:'cloud://cloud1-5gfxwyhfa35bb09e.636c-cloud1-5gfxwyhfa35bb09e-1305867234/recognition-image/炸薯条_french-fries.png',
    // bottom3:'cloud://cloud1-5gfxwyhfa35bb09e.636c-cloud1-5gfxwyhfa35bb09e-1305867234/recognition-image/生日蛋糕_birthday-cake.png',
    // bottom4:'cloud://cloud1-5gfxwyhfa35bb09e.636c-cloud1-5gfxwyhfa35bb09e-1305867234/recognition-image/香蕉_banana.png',
    // bottom5:'cloud://cloud1-5gfxwyhfa35bb09e.636c-cloud1-5gfxwyhfa35bb09e-1305867234/recognition-image/鱼_fish.png',
    // bottom6:'cloud://cloud1-5gfxwyhfa35bb09e.636c-cloud1-5gfxwyhfa35bb09e-1305867234/recognition-image/苹果_apple-one.png',
    // bottom7:'cloud://cloud1-5gfxwyhfa35bb09e.636c-cloud1-5gfxwyhfa35bb09e-1305867234/recognition-image/螃蟹_crab.png',
    // bottom8:'cloud://cloud1-5gfxwyhfa35bb09e.636c-cloud1-5gfxwyhfa35bb09e-1305867234/recognition-image/牛油果_avocado.png',
    // bottom9:'cloud://cloud1-5gfxwyhfa35bb09e.636c-cloud1-5gfxwyhfa35bb09e-1305867234/recognition-image/鸡肉_chicken.png',
    // bottom10:'cloud://cloud1-5gfxwyhfa35bb09e.636c-cloud1-5gfxwyhfa35bb09e-1305867234/recognition-image/橙子_orange.png',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this
    
   
    that.ctx = wx.createCameraContext()
    console.log("onLoad"),
      that.setData({
        openid: app.globalData.openid,
        token: app.globalData.token
      });
    
    const db = wx.cloud.database();
    db.collection("recognition").get({
      success:res=>{
        that.setData({
          bannerUrl:res.data[0]
        })
        console.log("bannerUrl",bannerUrl)
        console.log(res.data[0])
        console.log(res)
        console.log(res.data)
      },
      fail:res=>{
        console.log(res.data)
      }
    })

    // 每次更新access_token
    wx.request({
      
      url : 'https://aip.baidubce.com/oauth/2.0/token',
      method: 'GET',
      dataType: "json",
      data: {
        grant_type: 'client_credentials',
        client_id: 'luPM1MliFpLK2hwtwgZRf7j9',
        client_secret: 'L1FN6eDka4UOtHYrWv20AYlevNctnPaG'//自己的
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // console.log(res.data.access_token);
        // app.globalData.access_token = res.data.access_token;
        that.setData({
          access_token: res.data.access_token
        });
        console.log(that.data.access_token)
      }
    })
    wx.hideLoading()
    


  },

  showPopup(){
    this.popup.showPopup();
  },

  _error(){
    console.log('取消');
    this.popup.hidePopup();
  },

  _success(){
    console.log('确定');
    this.popup.hidePopup();
  },


  upLoadImg:function(){
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType:['original','compressed'],
      sourceType:['album','camera'],
      success:function(res){
        that.setData({
          filePath:res.tempFilePaths[0],
          bannerUrl:res.tempFilePaths[0]
        })
        //that.turnToBase64();
      }

    })
  },

  turnToBase64:function(){

    const that = this;
    wx.getFileSystemManager().readFile({
      filePath:that.data.filePath,
      encoding:"base64",
      success:function(res){
        console.log("读取成功",res.data)
        that.imgRecognition(res.data)
      },
      fail:res=>{
        console.log("失败",res)
      }
    })
  },


  imgRecognition:function(imageData){
    var that = this;
    const url = 'https://aip.baidubce.com/rest/2.0/image-classify/v1/classify/ingredient?access_token='+that.data.access_token;

    wx.request({
      url: url,
      data:{
        image:imageData
      },
      method:'POST',
      dataType:"json",
      header:{
        'content-type':'application/x-www-form-urlencoded'
      },
      success:function(res){
        console.log("成功",res.data)
        for(var i = 0;i<3;i++){
          var nameParam = "returnResult[" + i + "].name"
          var scoreParam="returnResult[" + i + "].score"
          that.setData({
            [nameParam]: res.data.result[i].name,
            [scoreParam]:(res.data.result[i].score)*100
          })
        }
        console.log('xxxxxx',that.data.returnResult)
        // that.setData({
        //   returnResult:saveNameData,
        //   score:saveScoreData
        // })
        // console.log('savenamedata', that.data.returnResult.name[0])
      //  console.log('savescoredata',that.data.returnResult[0].score)
        // wx.navigateTo({
        //   url: '../recognitionInfo/recognitionInfo?result='+that.data.result+'&score='+that.data.score,
        // })

        //that.showPopup()

      },
      fail:function(res){
        console.log("失败",res.data)
      }
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    that.popup = that.selectComponent("#popup");

   
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










})