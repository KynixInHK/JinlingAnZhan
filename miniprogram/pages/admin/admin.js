// pages/admin/admin.js
const db = wx.cloud.database()
const cl = db.collection('Story')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    chapter: 0,
    content: "",
    step: 0,
    type: "1"
  },

  selectChapter(options) {
    this.setData({
      chapter: parseInt(options.detail.value)
    })
  },
  getContent(options) {
    this.setData({
      content: options.detail.value
    })
  },
  getStep(options) {
    this.setData({
      step: parseInt(options.detail.value)
    })
  },
  selectType(options) {
    this.setData({
      type: options.detail.value
    })
  },
  submit() {
    let that = this
    cl.add({
      data: that.data,
    }).then((res) => {
      console.log(res)
      wx.showToast({
        title: '添加成功',
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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