// created by Fa1r. at 2018.07.18

var base = 'http://192.168.1.200:10086/api';

var request = {
    post: function(url, data, success) {
        var that = this,
            url = base + url,
            method = 'POST';
        var param = {
            url: url,
            data: data,
            method: method,
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function(res) {
                if (res.statusCode == 200 && res.errMsg == 'request:ok') {
                    var data = res.data;
                    var msg = that.getMsg(res);
                    success && success(data, msg);
                }
            },
            fail: function(err) {
                console.log('err', err);
            },
            complete: function() {
                console.log('complete');
            }
        }
        wx.request(param);
    },
    getMsg: function(res) {
        return {
            statusCode: res.statusCode,
            errMsg: res.errMsg
        };
    }
}

module.exports = request;