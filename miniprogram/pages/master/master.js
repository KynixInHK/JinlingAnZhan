// pages/master/master.js
let app = getApp()
const db = wx.cloud.database()
const cl = db.collection('Story')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    WindowWidth: 0,
    WindowHeight: 0,
    HumanURL: 'https://pic.imgdb.cn/item/62d3da77f54cd3f9377c317b.png',
    title: '',
    content: '',
    chapter: 0,
    step: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this
    let option = options
    this.setData(app.globalData.data)
    this.setData({WindowWidth: wx.getWindowInfo().screenWidth, WindowHeight: wx.getWindowInfo().screenHeight});
    if(this.data.userData.selChar === 1) {
      this.setData({
        HumanURL: 'https://pic.imgdb.cn/item/62d756f4f54cd3f937da8f24.png'
      })
    }
    // 设置标题和content
    this.setData({
      title: app.getChapterName(parseInt(option.chapter)),
      content: option.content,
      chapter: parseInt(option.chapter),
      step: parseInt(option.step)
    })
    // console.log(this.data.title)
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

  },
  /**
   * 自定义方法
   */
  nextPage() {
    // 获取下一页的内容
    cl.where({
      chapter: this.data.chapter,
      step: this.data.step + 1
    }).get()
    .then((res) => {
      console.log(res)
      if(res.data.length === 0) { // 如果到了本章的最后一节
        if(this.data.chapter !== 4) { // 如果不是最后一章
          cl.where({
            chapter: this.data.chapter + 1,
            step: 1
          }).get()
          .then((res) => {
            wx.redirectTo({
              url: './../wordss/wordss?chapter=' + (this.data.chapter + 1) + '&step=1',
            })
          })
        } else { // 如果是最后一章
          wx.redirectTo({
            url: './../thanks/thanks',
          })
        }
      }else { // 如果不是本章的最后一节
        if(res.data[0].type === '2') {
          this.setData({
            content: res.data[0].content
          })          
        }else {
          wx.redirectTo({
            url: './../wordss/wordss?chapter=' + this.data.chapter + '&step=' + (this.data.step + 1),
          })
        }
      }
    })
  },
  toFiles() {
    wx.redirectTo({
      url: './../files/files',
    })
  },
  toMenu() {
    wx.redirectTo({
      url: './../menu/menu',
    })
  }
})