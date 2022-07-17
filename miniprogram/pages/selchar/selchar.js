const db = wx.cloud.database();
const cl = db.collection('User');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    selChar:0, // 已选择的角色，未选0男1女2
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({WindowWidth: wx.getWindowInfo().screenWidth, WindowHeight: wx.getWindowInfo().screenHeight});
    this.setData(app.globalData.data);
    if(this.data.userData.selChar)
    {
      wx.redirectTo({
        url: '../menu/menu',
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.setData(app.globalData.data);
    if(this.data.userData.selChar)
    {
      wx.redirectTo({
        url: '../menu/menu',
      });
    }
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

  selBoy()
  {
    this.setData({selChar: 1});
  },

  selGirl()
  {
    this.setData({selChar: 2});
  },

  resetChoice()
  {
    this.setData({selChar: 0});
  },

  makeSureChoice()
  {
    this.data.userData.selChar = this.data.selChar;
    this.setData({userData: this.data.userData});
    cl.where({openid:this.data.openId}).update({
      data: {
        selChar: this.data.selChar
      }
    });
    console.log('用户选择角色：'+this.data.selChar);
    wx.redirectTo({
      url: '../menu/menu',
    });
  }
  
})