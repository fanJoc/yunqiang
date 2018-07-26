import model from 'utils/model';

App({
    getUserOpen: function(cb) {
        try {
            var userOpen = wx.getStorageSync('userOpen');
            if (userOpen) {
                typeof cb == 'function' && cb(userOpen);
            } else {
                wx.login({
                    success: function(res) {
                        if (res.code) {
                            model.post('/wxa/JsCode2Json?jscode=' + res.code, {}, function(data, msg) {
                                wx.setStorage({
                                    key: 'userOpen',
                                    data: data.openid
                                });
                                cb && cb(data.openid);
                            })
                        }
                    }
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
})