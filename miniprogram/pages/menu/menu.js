// pages/menu/menu.js
const app = getApp();
const db = wx.cloud.database();
const cl = db.collection('Story');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    set1: '',
    set2: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({WindowWidth: wx.getWindowInfo().screenWidth, WindowHeight: wx.getWindowInfo().screenHeight});
    let footstep = wx.getStorageSync('footstep')
    // console.log(typeof(footstep.chapter))
    if(footstep === null || footstep === '' || footstep === undefined) {
      let set1 = setTimeout(()=>{
        wx.redirectTo({
          url: './../main/main?chapter=0',
        })
      },30000)
      this.setData({
        set1: set1
      })
    }else {
      let set2 = setTimeout(()=> {
        this.getRedirectUrl(footstep.chapter, footstep.step)
      },30000)
      this.setData({
        set2: set2
      })
    }
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
    clearTimeout(this.data.set1)
    clearTimeout(this.data.set2)
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
  goChapter0()
  {
    wx.redirectTo({
      url: '../main/main?chapter=0',
    })
  },

  goChapter1()
  {
    wx.redirectTo({
      url: '../main/main?chapter=1',
    })
  },

  goChapter2()
  {
    wx.redirectTo({
      url: '../main/main?chapter=2',
    })
  },

  goChapter3()
  {
    wx.redirectTo({
      url: '../main/main?chapter=3',
    })
  },

  goChapter4()
  {
    wx.redirectTo({
      url: '../main/main?chapter=4',
    })
  },
  
  getRedirectUrl(chapter, step) {
    cl.where({
      chapter: chapter,
      step: step
    }).get()
    .then((res) => {
      if(res.data[0].type === '2') {
        wx.redirectTo({
          url: './../master/master?chapter=' + res.data[0].chapter + '&step=' + res.data[0].step + '&content=' + res.data[0].content,
        })
      } else {
        wx.redirectTo({
          url: './../wordss/wordss?chapter=' + res.data[0].chapter + '&step=' + res.data[0].step,
        })
      }
    })
  }
  
})