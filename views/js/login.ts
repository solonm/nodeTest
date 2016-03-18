/// <reference path="../../d.ts/knockout.d.ts" />
/// <reference path="../../d.ts/socket.io.d.ts" />
/// <reference path="http.ts" />

class Login {
	
	public username: KnockoutObservable<string>;
	public password: KnockoutObservable<string>;
	public login: () => void;
	public logout: () => void;
	public http: HTTPRequest;
	public token: string;
	public IsLoggedIn: KnockoutObservable<boolean>;
	public socket: any;
	constructor() {
        console.log("typeof Storage",typeof Storage);
		var self = this;
		self.username = ko.observable("solon");
		self.password = ko.observable("salamina");
		self.http = new HTTPRequest();
		var userTokenExists = typeof localStorage["UserToken"] !== "undefined" && localStorage["UserToken"] !== null;
		self.IsLoggedIn = ko.observable(userTokenExists);
		self.token = "";
		self.socket = io();

		self.socket.on("msg", function(data) { 
			console.log("message from server ", data);
		});

		self.login = function(){
			console.log("login");
			self.http.callBack = function(msg){
				if(msg.Code == 200){
					self.IsLoggedIn(true);
					console.log(msg);
					self.token = msg.Token;
					localStorage["UserToken"] = msg.Token;
					console.log("token", self.token);
				}
			}	
			self.http.method = "POST";
			self.http.url = "/loginUser";
			self.http.options = {username: self.username.peek(), password: self.password.peek()};
			self.http.makeCall();
		};
		self.logout = function() {
			console.log("logout");
			self.http.callBack = function(msg) {
				if (msg.Code == 200) {
					self.IsLoggedIn(false);
					console.log(msg);
					localStorage["UserToken"] = undefined;
				}
			}
			self.http.method = "POST";
			self.http.url = "/logoutUser";
			self.http.options = { Token: localStorage["UserToken"] };
			self.http.makeCall();
		};
	}
}
ko.applyBindings(new Login());