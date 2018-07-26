import model from '../../utils/model';
var app = getApp();
Page({
    data: {
        isAuthorize: false,
        userInfo: {}
    },
    onLoad: function() {
        var userInfo = wx.getStorageSync('userInfo');
        if (userInfo) {
            this.setData({
                isAuthorize: true,
                userInfo: userInfo
            });
        }
    },
    myordersTap: function() {
        wx.navigateTo({
            url: '../myorders/myorders',
        })
    },
    getUserInfo: function(e) {
        var userInfo = e.detail.userInfo;
        if (userInfo) {
            this.setData({
                isAuthorize: true,
                userInfo: userInfo
            });
            wx.setStorage({
                key: 'userInfo',
                data: userInfo
            });
            app.getUserOpen(function(openid) {
                userInfo.openid = openid;
                model.post('/wxa/AddUser', userInfo, function(data, msg) {

                })
            })
        }
    }
})