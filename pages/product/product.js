import model from '../../utils/model';
var app = getApp();
Page({
    data: {
        hiddenLoading: false,
        product: {},
        name: '',
        num: 1,
        unitPrice: 0,
        totalPrice: 0,
        payText: '确认支付',
        payStyle: '',
        payState: false
    },
    onLoad: function(e) {
        var that = this;
        app.getUserOpen(function(openid) {
            that.id = e.id;
            that.openid = openid;
            that.getProductDetail();
        })
    },
    getProductDetail: function() {
        var that = this;
        model.post('/commodity/commodity?id=' + that.id, {}, function(data, msg) {
            that.setData({
                product: data,
                name: data.CommodityName,
                unitPrice: data.EarnestMoney,
                productImgs: JSON.parse(data.ProductImageList),
                productComments: JSON.parse(data.CommentList),
                hiddenLoading: true
            });
            that.countTotalPrice();
        })
    },
    bindAddNum: function() {
        this.data.num += 1;
        this.countTotalPrice();
    },
    bindReduceNum: function() {
        if (this.data.num == 1) return;
        this.data.num -= 1;
        this.countTotalPrice();
    },
    countTotalPrice: function() {
        var num = this.data.num,
            unitPrice = this.data.unitPrice;
        this.setData({
            num: num,
            totalPrice: num * unitPrice
        })
    },
    payTap: function() {
        var that = this;
        var param = {
            OpenId: that.openid,
            Count: that.data.num,
            CommodityId: that.id
        }
        that.setData({
            payText: '正在支付',
            payStyle: 'pay-btn-active',
            payState: true
        })
        model.post('/wxa/Unifiedorder', param, function(data, msg) {
            wx.requestPayment({
                'timeStamp': data.timeStamp,
                'nonceStr': data.nonceStr,
                'package': data.package,
                'signType': 'MD5',
                'paySign': data.paySign,
                'success': function(res) {
                    wx.redirectTo({
                        url: '../orderwait/orderwait?orderid=' + data.WxOrderId
                    })
                },
                'fail': function(res) {
                    that.setData({
                        payText: '确认支付',
                        payStyle: '',
                        payState: false
                    })
                    console.log('支付失败', res);
                }
            })
        })
    },
    leaveMsg: function() {
        wx.showModal({
            content: '请支付后联系客服留言',
            showCancel: false
        })
    },
    onShareAppMessage: function (res) {
        return {
          title: this.data.name + '介绍',
          path: '/pages/product/product?id=' + this.id
        }
      }
})