// pages/invitation/invitation.js
let app = getApp()
const db = wx.cloud.database()
const cl = db.collection('Story')
const cl_invi = db.collection('Invitations')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    WindowWidth: 0,
    WindowHeight: 0,
    invi:{},
    notHidden: false,
    zhongchou: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this
    this.setData({WindowWidth: wx.getWindowInfo().screenWidth, WindowHeight: wx.getWindowInfo().screenHeight});
    if(options.chapter === '0' && options.step === '8') {
      this.setData({
        notHidden: true
      })
    }
    this.getInvi(parseInt(options.chapter), parseInt(options.step))
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.setData(app.globalData.data)
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
  /**
   * 自定义方法
   */
  getInvi (chapter, step) {
    let that = this
    console.log('this is the hello world test')
    console.log(app.globalData.data.InviData)
    for(var i = 0;i < app.globalData.data.InviData.length;i ++) {
      if(app.globalData.data.InviData[i].chapter === chapter
        && app.globalData.data.InviData[i].step === step) {
          that.setData({
            invi: app.globalData.data.InviData[i]
          })
          break
        }
    }
  },
  getStory(chapter, step) {
    let story = []
    for(var i = 0;i < app.globalData.data.StoryData.length;i ++) {
      if(app.globalData.data.StoryData[i].chapter === chapter && app.globalData.data.StoryData[i].step === step) {
        story[0] = app.globalData.data.StoryData[i]
        break
      }
    }
    return {data: story}
  },
  nextPage() {
    console.log(this.data.invi.step + 1)
    const that = this
    if((this.data.invi.chapter !== 0 && this.data.invi.step !== 7) || this.data.zhongchou === true) { // 如果不是邀请函的话
      this.setData({
        zhongchou: false
      })
        let res = this.getStory(that.data.invi.chapter, that.data.invi.step + 1)
        console.log(res)
        if(res.data.length === 0) { // 到了本章的最后一节
          if(that.data.invi.chapter !== 4) { // 如果不是最后一章
            wx.redirectTo({
              url: './../main/main?chapter=' + that.data.invi.chapter + 1,
            })
          } else { // 如果是最后一章
            wx.redirectTo({
              url: './../thanks/thanks',
            })
          }
        } else {
          if(res.data[0].type === '1' || res.data[0].type === '3') {
            wx.redirectTo({
              url: './../wordss/wordss?chapter=' + res.data[0].chapter + '&step=' + res.data[0].step,
            })
          }else {
            wx.redirectTo({
              url: './../master/master?chapter=' + res.data[0].chapter + '&step=' + res.data[0].step,
            })
          }
        }
    }else { // 解锁二十万众筹福利
      this.setData({
        zhongchou: true
      })
    }
  }
})