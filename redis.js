var redis = require('redis');
var host = 'localhost';
var port = 6379;
var RedisNotifier = require('redis-notifier');

client = redis.createClient(port, host);
client.auth('Salamina1948');
client.on("error", function (err) {
    console.log("Error " + err);
});

exports.set = function(key, val, expireAt){
	client.set(key, val);
	client.expire(key, expireAt);
}

exports.del = function(key){
	client.del(key);
}

exports.get = function(key){
	return client.get(key);
}

 exports.notifier = function(callback){
 	var eventNotifier = new RedisNotifier(redis, {
	  redis : { host : host, port : port, auth: 'Salamina1948' },
	  expired : true,
	  evicted : false,
	  logLevel : 'DEBUG' //Defaults To INFO 
	});

 	console.log("called");
	//Listen for event emission 
	eventNotifier.on('message', function(pattern, channelPattern, emittedKey) {
	  var channel = this.parseMessageChannel(channelPattern);
	  switch(channel.key) {
	    case 'expired':
	        callback(emittedKey);
	      break;
	    default:
	      logger.debug("Unrecognized Channel Type:" + channel.type);
	  }
	});
	console.log("finished");
}