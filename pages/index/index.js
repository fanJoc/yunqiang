var app = getApp();

Page({
  onLoad: function() {

  },
  onShareAppMessage: function (res) {
    return {
      title: '公司简介',
      path: '/pages/index/index'
    }
  }
})