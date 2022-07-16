const db = wx.cloud.database()
const cl = db.collection('Chapter')
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
    step: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this
    this.setData({WindowWidth: wx.getWindowInfo().screenWidth, WindowHeight: wx.getWindowInfo().screenHeight});
    // 显示章节名称
    cl.where({
      id: that.data.id 
    }).get()
    .then((res) => {
      that.setData({
        chapterNum: res.data[0].chapterNum,
        chapterName: res.data[0].chapterName
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.setData(app.globalData.data)
    // 开始计时
    setTimeout(() => {
      wx.redirectTo({
        url: './../invitation/invitation',
      })
    }, 10000)
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

  }
})