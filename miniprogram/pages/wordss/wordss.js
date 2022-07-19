const db = wx.cloud.database()
const cl = db.collection('Story')
// pages/wordss/wordss.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    WindowWidth: 0,
    WindowHeight: 0,
    inputUrl: "https://pic.imgdb.cn/item/62d3d013f54cd3f9376946b1.png",
    chapter: 0,
    step: 1,
    type: '1',
    title: '邀请函',
    content: '',
    isHidden: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this
    this.setData({WindowWidth: wx.getWindowInfo().screenWidth, WindowHeight: wx.getWindowInfo().screenHeight});
    // 设定跳转的章节和步骤
    this.setData({
      chapter: parseInt(options.chapter),
      step: parseInt(options.step)
    })
    cl.where({
      chapter: this.data.chapter,
      step: this.data.step
    }).get()
    .then((res) => {
      // console.log(res)
      this.setData({
        content: res.data[0].content,
        type: res.data[0].type
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

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