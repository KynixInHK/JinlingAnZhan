// pages/filePrst/filePrst.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:-1, 
    file:[
      {img:['https://s3.bmp.ovh/imgs/2022/08/09/1f6bdfabd50dc9a6.jpg', 'https://s3.bmp.ovh/imgs/2022/08/09/fbf46ea3d198908a.jpg'], title:'电子会议记录和侦察小组合照'},

      {img:['https://s3.bmp.ovh/imgs/2022/08/09/89078e2fc0524a36.jpg', 'https://s3.bmp.ovh/imgs/2022/08/09/b4344c049fe18e33.jpg'], title:'戴笠的日记'},

      {img:['https://s3.bmp.ovh/imgs/2022/08/09/e88c80b41e32af89.jpg', 'https://s3.bmp.ovh/imgs/2022/08/09/b48e4de101657403.jpg'], title:'与会人员名单'},


      {img:['https://s3.bmp.ovh/imgs/2022/08/09/e6dab8bbba258be9.jpg'], title:'黄浚早稻田大学毕业证书'},

      {img:['https://s3.bmp.ovh/imgs/2022/08/09/f42ee18382d70f26.jpg'], text:['黄浚与须磨会见。来源：云南卫视《档案秘闻——金陵暗战》2010年11月23日'], title:'黄浚与须磨的合照'},

      {img:['https://s3.bmp.ovh/imgs/2022/08/09/b80b358f8ddb0358.jpg'], text:['日本侵华地图，1932年的南京地图。江阴要塞处于长江下游江面最窄、水流最急的地方，东临上海，西依南京，背靠京沪铁路，素有“江防门户”之称，是国民党军队重点设防的据点。因此该战略地图意义重大。'], title:'南京下关江防地图'},

      {img:['https://s3.bmp.ovh/imgs/2022/08/09/583869e7face04b7.jpg',], text:['来源：孔夫子旧书网，民国地图'], title:'南京城市地图'}
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData(app.globalData.data);
    this.setData({WindowWidth: wx.getWindowInfo().screenWidth, WindowHeight: wx.getWindowInfo().screenHeight});
    this.setData({id:options.id})
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

  back() {
    wx.navigateBack({
      delta: 1,
    })
  },

  openLargerImg(e)
  {
    wx.previewImage({
      urls:e.currentTarget.dataset.urls,
      current: e.currentTarget.dataset.url
    })
  }
})