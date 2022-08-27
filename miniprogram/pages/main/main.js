let app = getApp()
// pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    WindowWidth: 0,
    WindowHeight: 0,
    chapterNum : '序章',
    chapterName : '邀请函',
    id: 0,
    step: 0,
    set: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this
    this.setData({WindowWidth: wx.getWindowInfo().screenWidth, WindowHeight: wx.getWindowInfo().screenHeight});
    // 获取章节ID
    // console.log(typeof(parseInt(options.chapter)))
    this.setData({
      id: parseInt(options.chapter)
    })
    console.log(this.data.id)
    let res = this.getChapters(that.data.id)
    console.log(res)
    that.setData({
      chapterNum: res.data[0].chapterNum,
      chapterName: res.data[0].chapterName
    })
    // 加载字体
    wx.loadFontFace({
      family: '方正舒体',
      source: 'url("http://124.71.184.29:8080/fileManager-1.0-SNAPSHOT/fzstjw.ttf")',
      success: console.log
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.setData(app.globalData.data)
    // 开始计时
    let set = setTimeout(() => {
      wx.redirectTo({
        url: './../wordss/wordss?chapter=' + this.data.id + '&step=1',
      })
    }, 5000)
    this.setData({
      set: set
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    clearTimeout(this.data.set)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  startGame() {
    wx.redirectTo({
      url: './../wordss/wordss?chapter=' + this.data.id + '&step=1',
    })
  },
  getChapters(id) {
    let chapter = []
    for(var i = 0;i < app.globalData.data.ChapterData.length;i ++) {
      if(app.globalData.data.ChapterData[i].id === id) {
        chapter[0] = app.globalData.data.ChapterData[i]
        break
      }
    }
    return {data: chapter}
  }
})