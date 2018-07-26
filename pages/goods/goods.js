import model from '../../utils/model';

Page({
    data: {
        hiddenLoading: false,
        goodsList: []
    },
    onLoad: function() {
        this.getGoodsList();
    },
    getGoodsList: function() {
        var that = this;
        model.post('/commodity/getallcommoditys', {}, function(data, msg) {
            that.setData({
                goodsList: data,
                hiddenLoading: true
            })
        })
    },
    productTap: function(e) {
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../product/product?id=' + id,
        })
    }
})