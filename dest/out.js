var HTTPRequest=function(){function o(){var o=this;o.url="",o.method="",o.options={},o.userToken="",o.makeCall=function(){$.ajax({method:o.method,url:o.url,data:o.options}).done(function(e){o.callBack(e)})}}return o}(),localStorage=window.localStorage,Login=function(){function o(){console.log("typeof Storage",typeof Storage);var o=this;o.username=ko.observable("solon"),o.password=ko.observable("salamina"),o.http=new HTTPRequest,o.IsLoggedIn=ko.observable(!1),o.token="",o.login=function(){console.log("login"),o.http.callBack=function(e){200==e.Code&&(o.IsLoggedIn(!0),console.log(e),o.token=e.Token,localStorage.userToken=o.Token,console.log("token",o.token))},o.http.method="POST",o.http.url="/loginUser",o.http.options={username:o.username.peek(),password:o.password.peek()},o.http.makeCall()},o.logout=function(){console.log("logout"),o.http.callBack=function(e){200==e.Code&&(o.IsLoggedIn(!1),console.log(e),o.token=e.Token,console.log("token",o.token))},o.http.method="POST",o.http.url="/logoutUser",o.http.options={username:o.username.peek(),password:o.password.peek(),Token:o.token},o.http.makeCall()}}return o}();ko.applyBindings(new Login);var Test1=function(){function o(){var o=this;o.test1="test1",console.log("value from test1: ",o.test1);new Login}return o}();new Test1;