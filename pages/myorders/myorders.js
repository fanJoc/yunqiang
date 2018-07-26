import model from '../../utils/model';
var app = getApp();
Page({
    data: {
        hiddenLoading: false,
        ordersList: []
    },
    onLoad: function() {
        var that = this;
        app.getUserOpen(function(openid) {
            that.openid = openid;
            that.getOrdersList();
        })
    },
    getOrdersList: function() {
        var that = this;
        model.post('/order/GetAllOrders?openid=' + that.openid, {}, function(data, msg) {
            that.setData({
                ordersList: data,
                hiddenLoading: true
            })
        })
    }
})