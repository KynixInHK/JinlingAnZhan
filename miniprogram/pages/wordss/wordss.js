const db = wx.cloud.database()
const cl = db.collection('Story')
const cl_qa = db.collection('QuestionsAndAnswers')
const cl_bk = db.collection('Backgrounds')
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
    toInvi:[],
    ScienceData:[], // 由index从数据库获取
    showSet: '',
    inputSet: '',
    zhongchou1: false,
    zhongchou2: false,
    times: 0,
    // backUrl: 'https://pic.rmb.bdstatic.com/bjh/bfb5e4c8ca0ed265c092e77f162f7bba.png',
    backUrl: '',
    coverUrl: 'https://pic.rmb.bdstatic.com/bjh/a2f36ae444fcb924b8b7e4ab912d0a9f.png',
    isCover: false,
    imageUrl: '',
    haveImage: false,

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
    this.setData(app.globalData.data);
    this.setData({WindowWidth: wx.getWindowInfo().screenWidth, WindowHeight: wx.getWindowInfo().screenHeight});
    that.setData({
      value: '',
      inputUrl: 'https://pic.imgdb.cn/item/62d3d013f54cd3f9376946b1.png'
    })
    // 读取所有的背景图片
    cl_bk.get()
    .then((res) => {
      // 根据chapterID来设置背景照片
      if(this.data.chapter === 0 && this.data.step === 1) {
        this.setData({
          backUrl: res.data[1].url,
          isCover: false
        })
      }else if(this.data.chapter === 0 && this.data.step !== 1) {
        this.setData({
          backUrl: res.data[0].url,
          isCover: true
        })
      } else if(this.data.chapter === 4) {
        this.setData({
          backUrl: res.data[3].url,
          isCover: true
        })
      }else {
        this.setData({
          backUrl: res.data[2].url
        })
      }
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
      if(res.data[0].image !== '' && res.data[0].image !== null && res.data[0].image !== undefined) {
        that.setData({
          imageUrl: res.data[0].image,
          haveImage: true
        })
      }
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

    // Edit by ASingleDog
    // 获取档案判定
    this.getNewFile();
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
    // if(this.data.type !== '3') {
    //   let set = setTimeout(()=> {
    //     this.nextPage()
    //   }, 30000)
    //   this.setData({
    //     showSet: set
    //   })
    // }else {
    //   clearTimeout(this.data.showSet)
    // }
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
    // clearTimeout(this.data.showSet)
    // clearTimeout(this.data.inputSet)
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
    if((this.data.chapter === 3 && this.data.step === 37 && this.data.value === this.data.answer)) {
      this.setData({
        zhongchou2: true
      })
    }
    if((this.data.chapter === 3 && this.data.step === 9 && this.data.value === this.data.answer)) {
      this.setData({
        zhongchou1: true
      })
    }
    if((this.data.chapter === 3 && this.data.step === 9 && this.data.value !== this.data.answer) || (this.data.chapter === 3 && this.data.step === 37 && this.data.value !== this.data.answer)) {
      this.setData({
        inputUrl: 'https://pic.imgdb.cn/item/62d7c764f54cd3f937f1eed5.png'
      })
    }
    if((this.data.chapter === 3 && this.data.step !== 9 && this.data.step !== 37) || (this.data.zhongchou1 === true  && this.data.times === 1) || (this.data.zhongchou2 === true && this.data.times === 1) || this.data.chapter !== 3) {
      that.setData({
        zhongchou1: false,
        zhongchou2: false,
        times: -1
      })
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
    }
    this.setData({
      times: this.data.times +1
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
  },
  changeValue(e) {
    this.setData({
      value: e.detail.value
    })
    // console.log(this.data.value)
    // if(this.data.value !== '') {
    //   // let set = setTimeout(()=> {
    //   //   this.nextPage()
    //   // },10000)
    //   // this.setData({
    //   //   inputSet: set
    //   // })
    // }
  },

  // Edit by ASingleDog
  toScience(e)
  {
    console.log("toScience:")
    console.log(e.currentTarget.dataset.num);
    wx.navigateTo({
      url: '../science/science?num='+e.currentTarget.dataset.num,
    })
  },

  // Edit by ASingleDog
  // 判定是否获得新档案
  getNewFile()
  {
    console.log({chapter:this.data.chapter, step:this.data.step})
    let index = this.data.FileLoc.findIndex((element)=>element.chapter ==  this.data.chapter && element.step ==  this.data.step);
    
    if(index != -1)
    {
      let userData = this.data.userData;
      if(userData.unlockFiles[index] != 1)
      {
        userData.unlockFiles[index] = 1;
        this.setData({userData});
        app.globalData.data=this.data;

        const db = wx.cloud.database();
        const userCl = db.collection('User');
        userCl.where({openid:this.data.openId}).update({
          data: {
            unlockFiles:userData.unlockFiles
          }
        });
        
      }
      
    }
  },

})