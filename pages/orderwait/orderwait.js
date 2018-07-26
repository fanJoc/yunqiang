import model from '../../utils/model';
var app = getApp();
Page({
    data: {
        custom: '',
        tel: '',
        address: '',
    },
    onLoad: function(e) {
        this.orderid = e.orderid;
    },
    getCustom: function(e) {
        this.data.custom = e.detail.value;
    },
    getTel: function(e) {
        this.data.tel = e.detail.value;
    },
    getAddress: function(e) {
        this.data.address = e.detail.value;
    },
    checkComplete: function() {
        var custom = this.data.custom,
            tel = this.data.tel,
            address = this.data.address;
        if (custom != '' && tel != '' && address != '') {
            if (/^1[3|4|5|6|7|8|9]\d{9}$/.test(tel)) {
                return true;
            } else {
                wx.showModal({
                    content: '手机号格式不正确！',
                    showCancel: false
                });
                return false;
            }
        } else {
            wx.showModal({
                content: '请完善订单信息！',
                showCancel: false
            });
            return false;
        }
    },
    saveOrder: function() {
        var that = this;
        if (that.checkComplete()) {
            app.getUserOpen(function(openid) {
                that.openid = openid;
                that.postOrderData();
            })
        }
    },
    postOrderData: function() {
        var that = this;
        var param = {
            WxOrderId: that.orderid,
            openid: that.openid,
            Name: that.data.custom,
            Mobile: that.data.tel,
            Address: that.data.address
        }
        model.post('/order/SaveOrderInfo', param, function(data, msg) {
            if (data.success) {
                wx.showToast({
                    title: '保存成功',
                    success: function() {
                        setTimeout(function() {
                            wx.switchTab({
                                url: '../my/my'
                            })
                        }, 1000)
                    }
                })
            }
        })
    }
})