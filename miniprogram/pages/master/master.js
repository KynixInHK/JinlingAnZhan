// pages/master/master.js
let app = getApp()
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
    // backUrl: 'https://pic.imgdb.cn/item/62d3d3a8f54cd3f9376f71bb.png'
    backUrl:'',

    // Edit by ASingleDog
    // 档案解锁位置
    FileLoc:[
      {chapter:1, step:3},
      {chapter:1, step:4},
      {chapter:1, step:13},
      {chapter:2, step:3},
      {chapter:2, step:2},
      {chapter:3, step:33},
      {chapter:3, step:24}
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this
    let option = options
    this.setData({WindowWidth: wx.getWindowInfo().screenWidth, WindowHeight: wx.getWindowInfo().screenHeight});
    if(app.globalData.data.userData.selChar === 1) {
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
    let res = this.getBack()
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

    // Edit by ASingleDog
    // 获取档案判定
    // this.getNewFile();this.setData(app.globalData.data)
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
    console.log()
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
    let res = this.getStory(this.data.chapter, this.data.step + 1)
    console.log(res)
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
            content: res.data[0].content,
            step: this.data.step + 1
          })          
        }else {
          wx.redirectTo({
            url: './../wordss/wordss?chapter=' + this.data.chapter + '&step=' + (this.data.step + 1),
          })
        }
      }
  },
  getStory(chapter, step) {
    let story = []
    console.log(chapter)
    console.log(typeof(chapter))
    console.log(step)
    console.log(typeof(step))
    for(var i = 0;i < app.globalData.data.StoryData.length;i ++) {
      if(app.globalData.data.StoryData[i].chapter === chapter && app.globalData.data.StoryData[i].step === step) {
        story[0] = app.globalData.data.StoryData[i]
        break
      }
    }
    return {data: story}
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

  // Edit by ASingleDog
  // 判定是否获得新档案
  // getNewFile()
  // {
  //   console.log({chapter:this.data.chapter, step:this.data.step})
  //   let index = this.data.FileLoc.findIndex((element)=>element.chapter ==  this.data.chapter && element.step ==  this.data.step);
    
  //   if(index != -1)
  //   {
  //     let userData = this.data.userData;
  //     if(userData.unlockFiles[index] != 1)
  //     {
  //       userData.unlockFiles[index] = 1;
  //       this.setData({userData});
  //       app.globalData.data=this.data;

  //       const db = wx.cloud.database();
  //       const userCl = db.collection('User');
  //       userCl.where({openid:this.data.openId}).update({
  //         data: {
  //           unlockFiles:userData.unlockFiles
  //         }
  //       });
        
  //     }
      
  //   }
  // },
  getBack() {
    let backs = []
    for(var i = 0;i < app.globalData.data.BackData.length;i ++) {
      backs[i] = app.globalData.data.BackData[i]
    }
    return {data: backs}
  }
})