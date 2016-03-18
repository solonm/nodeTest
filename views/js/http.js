var HTTPRequest = (function () {
    function HTTPRequest() {
        var self = this;
        self.url = "";
        self.method = "";
        self.options = {};
        self.userToken = "";
        self.makeCall = function () {
            $.ajax({
                method: self.method,
                url: self.url,
                data: self.options
            }).done(function (msg) {
                self.callBack(msg);
            });
        };
    }
    return HTTPRequest;
}());
