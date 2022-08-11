const db = wx.cloud.database();
const userCl = db.collection('User');
const sc = db.collection('Science');
const backCl = db.collection('Backgrounds');
const chapterCl = db.collection('Chapter');
const inviCl = db.collection('Invitations');
const qaCl = db.collection('QuestionsAndAnswers');

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openId: '',
    WindowWidth: 0,
    WindowHeight: 0,
    userData: {}, // 用户数据，字段详见云开发数据库
    ScienceData: [],
    BackData: [],
    ChapterData: [],
    InviData: [],
    QAData: [],
    StoryData: []
  },

  async onLoad(options) {
    wx.showLoading({
      title: '获取绑定信息',
      mask: true
    });
    this.setData({WindowWidth: wx.getWindowInfo().screenWidth, WindowHeight: wx.getWindowInfo().screenHeight});
    await this.getOpenId();
    await this.getUserData();
    await this.getScienceData();
    await this.getStoryData();
    await this.getBackData();
    await this.getChapterData();
    await this.getInviData();
    await this.getQAData();
    console.log('该用户数据：');
    console.log(this.data.userData);
    app.globalData.data = this.data; // 利用globalData同步各页面数据
    wx.hideLoading();
    
    if(typeof(this.data.userData.authCode) != 'undefined')
    {
      wx.showToast({
        title: '您已完成绑定',
      });

      await this.sleep(1000);

      wx.redirectTo({
         url: '../selchar/selchar',
      })
    }
    // 储存openid以备用
    wx.setStorageSync('openId', this.data.openId)
  },

  getOpenId() {
    return new Promise((resolve) => {
      wx.cloud.callFunction({
          name: 'quickstartFunctions',
          config: {
            env: ''
          },
          data: {
            type: 'getOpenId'
          }
        }).then((resp) => {
          this.setData({
            openId: resp.result.openid
          });
          console.log('openId:'+resp.result.openid);
          resolve(0);
      }).catch((e) => {
          console.log('openId获取失败');
          console.log(e);
          resolve(1);
    });
  })
  },

  getUserData()
  {
    return new Promise(resolve => {
      let data;
      userCl.where({
        openid: this.data.openId
      })
      .get() 
      .then(res => {
        data = res.data[0];
        if(data == undefined)
        {
          data = {
            openid: this.data.openId,
            unlockFiles:[0, 0, 0, 0, 0, 0, 0]
          };
          userCl.add({
            data
          });
        }
        this.setData({userData : data}); 
        resolve(0);
      })
      .catch(e => {
        console.log("获取用户数据失败");
        console.log(e);
        resolve(1);
      });
    })
  },

  getScienceData()
  {
    return new Promise(resolve => {
      sc.get() 
      .then(res => {
        console.log('Science:')
        console.log(res.data);
        res.data.sort((a, b)=>{ return a.num - b.num });
        this.setData({ScienceData: res.data});
        resolve(0);
      })
      .catch(e => {
        console.log("获取Science数据失败");
        console.log(e);
        resolve(1);
      });
    })
  },
  getStoryData() {
    wx.cloud.callFunction({
      name: 'getChapters',
      success: (res) => {
        console.log('Story:')
        console.log(res.result.data)
        this.setData({
          StoryData: res.result.data
        })
      },
      fail: (err) => {
      console.log('Error!')
      console.log(err)
      }
    })
  },

  getBackData() {
    backCl.get()
    .then(res => {
      console.log('Back:')
      console.log(res.data)
      this.setData({
        BackData: res.data
      })
    })
    .catch(err => {
      console.log(err)
    })
  },
  getChapterData() {
    chapterCl.get()
    .then(res => {
      console.log('Chapter:')
      console.log(res.data)
      this.setData({
        ChapterData : res.data
      })
    })
    .catch(err => {
      console.log(err)
    })
  },
  getInviData() {
    inviCl.get()
    .then(res => {
      console.log('Invi:')
      console.log(res.data)
      this.setData({
        InviData: res.data
      })
    })
    .catch(err => {
      console.log(err)
    })
  },
  getQAData() {
    qaCl.get()
    .then(res => {
      console.log('QA:')
      console.log(res.data)
      this.setData({
        QAData: res.data
      })
    })
    .catch(err => {
      console.log(err)
    })
  },

  async formSubmit(e)
  {
    console.log('用户输入认证码:')
    console.log(e.detail.value.input);

    if(this.checkAuthCode())
    {
      userCl.where({openid:this.data.openId}).update({
        data: {
          authCode: e.detail.value.input
        }
      });

      this.data.userData.authCode = e.detail.value.input;
      this.setData({userData: this.data.userData});
      console.log('用户数据更新:');
      console.log(this.data.userData);

      wx.showToast({
        title: '绑定成功',
      });

      await this.sleep(1000);
      
      wx.redirectTo({
        url: './../selchar/selchar',
     })
    }

    else {
      wx.showToast({
        title: '认证码不存在',
        icon: 'error'
      })
    }

  },

  checkAuthCode()
  {
    console.log('认证码正确');
    return true;
  },

  sleep(t)
  {
    return new Promise(resolve =>{
      setTimeout(resolve, t);
    })
  }

});
