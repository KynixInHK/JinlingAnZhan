const db = wx.cloud.database()
const cl = db.collection('Story')
const cl_qa = db.collection('QuestionsAndAnswers')
let app = getApp()
const cl_invi = db.collection('Invitations')
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
    notHidden: true,
    placeholder: '',
    value: '',
    answer: '',
    toInvi:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this
    this.setData({WindowWidth: wx.getWindowInfo().screenWidth, WindowHeight: wx.getWindowInfo().screenHeight});
    that.setData({
      value: '',
      inputUrl: 'https://pic.imgdb.cn/item/62d3d013f54cd3f9376946b1.png'
    })
    // 读取要跳转到Invitation页面的章节号
    cl_invi.get()
    .then((res) => {
      that.setData({
        toInvi: res.data
      })
    })
    // 设定跳转的章节和步骤
    this.setData({
      chapter: parseInt(options.chapter),
      step: parseInt(options.step)
    })
    // 设定缓存
    wx.setStorageSync('footstep', {chapter: this.data.chapter, step: this.data.step})
    cl.where({
      chapter: this.data.chapter,
      step: this.data.step
    }).get()
    .then((res) => {
      this.setData({
        content: res.data[0].content,
        type: res.data[0].type
      })
          // 设置是否隐藏下方的框框
      if(this.data.type !== '3') {
        this.setData({
          notHidden: false
        }) // 隐藏框框
      } else {
        cl_qa.where({
          chapter: this.data.chapter,
          step: this.data.step
        }).get()
        .then((res)=> {
          this.setData({
            notHidden: true,
            placeholder: res.data[0].question,
            answer: res.data[0].answer
          })
        })
      }
    })
    // 设置标题
    const title = app.getChapterName(this.data.chapter)
    this.setData({
      title: title
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
    if(this.data.type !== '3') {
      setTimeout(()=> {
        this.nextPage()
      }, 30000)
    }
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
    var that = this
    var flag = false
    var index = 0
    for(var i = 0;i < that.data.toInvi.length;i ++) {
      if(that.data.chapter === that.data.toInvi[i].chapter && that.data.step === that.data.toInvi[i].step) {
        flag = true
        index = i
        break
      }
    }
    if(flag === false) {
      if((this.data.type === '3' && this.data.value === this.data.answer) || this.data.type !== '3') { // 如果输入了正确的答案
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
              wx.redirectTo({ // 跳转到主剧情页面
                url: './../master/master?chapter=' + this.data.chapter + '&step=' + res.data[0].step + '&content=' + res.data[0].content,
              })
            }else if(res.data[0].type === '1') {
              this.onLoad({chapter: this.data.chapter, step: this.data.step + 1})
            }else if(res.data[0].type === '3') {
              this.onLoad({chapter: this.data.chapter, step: this.data.step + 1})
            }
          }
        })
        .catch((err) => {
          console.log(err)
        })
      }else {
        this.setData({
          inputUrl: 'https://pic.imgdb.cn/item/62d7c764f54cd3f937f1eed5.png'
        })
      }
    }else {
      wx.redirectTo({
        url: './../invitation/invitation?chapter=' + this.data.chapter + '&step=' + this.data.step
      })
    }
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
  },
  changeValue(e) {
    this.setData({
      value: e.detail.value
    })
    console.log(this.data.value)
    if(this.data.value !== '') {
      setTimeout(()=> {
        this.nextPage()
      },10000)
    }
  }
})