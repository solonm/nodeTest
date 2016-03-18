/// <reference path="../../d.ts/jquery.d.ts" />
class HTTPRequest {
	public url: string;
	public options: any;
	public method: string;
	public callBack: any;
	public makeCall:() => any;
	public userToken: string;
	constructor(){
		var self = this;
		self.url = "";
		self.method = "";
		self.options = {};
		self.userToken = "";

		self.makeCall = function(){
			$.ajax({
			  method: self.method,
			  url: self.url,
			  data: self.options
			}).done(function( msg ) {
			    self.callBack(msg);
			});
		}

	}

}