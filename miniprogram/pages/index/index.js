const db = wx.cloud.database();
const cl = db.collection('User');

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
  },

  async onLoad(options) {
    wx.showLoading({
      title: '获取绑定信息',
      mask: true
    });
    this.setData({WindowWidth: wx.getWindowInfo().screenWidth, WindowHeight: wx.getWindowInfo().screenHeight});
    await this.getOpenId();
    await this.getUserData();
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
      cl.where({
        openid: this.data.openId
      })
      .get() 
      .then(res => {
        data = res.data[0];
        if(data == undefined)
        {
          data = {
            openid: this.data.openId,
          };
          cl.add({
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

  async formSubmit(e)
  {
    console.log('用户输入认证码:')
    console.log(e.detail.value.input);

    if(this.checkAuthCode())
    {
      cl.where({openid:this.data.openId}).update({
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
        url: '../selchar/selchar',
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
