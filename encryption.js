	 var CryptoJS = require("crypto-js");
	 var SHA256 = require("crypto-js/sha256");
	 var pass='ba8@3589*<)GT.D';

	//Encrypt  
	exports.encrypt = function(data){
		return CryptoJS.AES.encrypt(JSON.stringify([data]), pass);
	} 
	//Decrypt
	exports.decrypt = function(ciphertext){
		var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), pass);
		return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
	}