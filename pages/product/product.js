import model from '../../utils/model';
var app = getApp();
Page({
    data: {
        hiddenLoading: false,
        product: {},
        num: 1,
        unitPrice: 0,
        totalPrice: 0
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
    orderwaitTap: function() {
        wx.redirectTo({
            url: '../orderwait/orderwait'
        })
    },
    leaveMsg: function() {
        wx.showModal({
            content: '请支付后联系客服留言',
            showCancel: false
        })
    }
})