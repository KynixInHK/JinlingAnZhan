// pages/menu/menu.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({WindowWidth: wx.getWindowInfo().screenWidth, WindowHeight: wx.getWindowInfo().screenHeight});
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.setData(app.globalData.data);
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

  },

  goChapter0()
  {
    wx.navigateTo({
      url: '../main/main?chapter=0',
    })
  },

  goChapter1()
  {
    wx.navigateTo({
      url: '../main/main?chapter=1',
    })
  },

  goChapter2()
  {
    wx.navigateTo({
      url: '../main/main?chapter=2',
    })
  },

  goChapter3()
  {
    wx.navigateTo({
      url: '../main/main?chapter=3',
    })
  },

  goChapter4()
  {
    wx.navigateTo({
      url: '../main/main?chapter=4',
    })
  }
  
})