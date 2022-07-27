// pages/master/master.js
let app = getApp()
const db = wx.cloud.database()
const cl = db.collection('Story')
const cl_bk = db.collection('Backgrounds')
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
    step: 1,
    set: '',
    backUrl: 'https://pic.imgdb.cn/item/62d3d3a8f54cd3f9376f71bb.png'
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
    console.log(option.content)
    this.setData({
      title: app.getChapterName(parseInt(option.chapter)),
      content: option.content,
      chapter: parseInt(option.chapter),
      step: parseInt(option.step)
    })
    // 设定缓存
    wx.setStorageSync('footstep', {chapter: this.data.chapter, step: this.data.step})
    // 获取背景照片
    cl_bk.get()
    .then((res) => {
      if(this.data.chapter === 0 && this.data.step === 2) {
        this.setData({
          backUrl: res.data[1].url
        })
      }else if (this.data.chapter === 4) {
        this.setData({
          backUrl: res.data[3].url
        })
      }else {
        this.setData({
          backUrl: res.data[0].url
        })
      }
    })
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
    // let set = setTimeout(()=> {
    //   this.nextPage()
    // }, 30000)
    // this.setData({
    //   set: set
    // })
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
    // clearTimeout(this.data.set)
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
      if(res.data.length === 0) { // 如果到了本章的最后一节
        if(this.data.chapter !== 4) { // 如果不是最后一章
          wx.redirectTo({
            url: './../main/main?chapter=' + (this.data.chapter + 1),
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
    wx.navigateTo({
      url: './../files/files',
    })
  },
  toMenu() {
    wx.navigateTo({
      url: './../menu/menu',
    })
  }
})