const db = wx.cloud.database()
const cl = db.collection('Story')
let app = getApp()
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
    notHidden: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
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
      this.setData({
        content: res.data[0].content,
        type: res.data[0].type
      })
    })
    // 设置标题
    const title = app.getChapterName(this.data.chapter)
    this.setData({
      title: title
    })
    // 设置是否隐藏下方的框框
    if(this.data.type !== '3') {
      this.setData({
        notHidden: false
      }) // 隐藏框框
    } else {
      this.setData({
        notHidden: true
      })
    }
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
  nextPage() {
    console.log(this.data)
    // 获取下一页的内容
    cl.where({
      chapter: this.data.chapter,
      step: this.data.step + 1
    }).get()
    .then((res) => {
      if(res.data.length === 0) { // 如果到了本章的最后一节
        if(this.data.chapter !== 4) { // 如果不是最后一章
          cl.where({
            chapter: this.data.chapter + 1,
            step: 1
          }).get()
          .then((res) => {
            this.setData({
              title: app.getChapterName(this.data.chapter + 1),
              content: res.data[0].content,
              chapter: this.data.chapter + 1,
              step: 1
            })
          })
        } else { // 如果是最后一章
          wx.redirectTo({
            url: './../thanks/thanks',
          })
        }
      }else { // 如果不是本章的最后一节
        if(res.data[0].type === '2') {
          wx.redirectTo({ // 跳转到主剧情页面
            url: './../master/master?chapter=' + this.data.chapter + '&step=' + res.data[0].step + '&content=' + res.data[0].content,
          })
        }else if(res.data[0].type === '1') {
          this.setData({
            step: res.data[0].step,
            content: res.data[0].content,
            notHidden: false
          })
        }else if(res.data[0].type === '3') {
          this.setData({
            step: res.data[0].step,
            content: res.data[0].content,
            notHidden: true
          })
        }
      }
    })
    .catch((err) => {
      console.log(err)
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