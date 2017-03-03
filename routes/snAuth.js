module.exports = BasicAuth;

function BasicAuth(snInstanceURL, username, password, options) {
	this.snInstanceURL = snInstanceURL;
	this.username = username;
	this.password = password;
    this.options = options;
}

BasicAuth.prototype.authenticate = function(callBack) {
	var request = require('request');
    request.debug = this.options.verbose;
	request({
		baseUrl : this.snInstanceURL,
		method : 'GET',
		uri : 'api/now/v2/table/sys_user?sysparm_query=user_name%3D' + this.username,
		json : true,
		// Here we use the basic authentication. The username and password set here will send 
		// as the authentication header.
		auth: {
            'user': this.username,
            'pass': this.password,
            'sendImmediately': true
        }

	}, function(err, response, body) {
		if (!err && response.statusCode == 200){
			//callBack(err, response, body, response.headers['set-cookie']);
            console.log(JSON.stringify(response));
		} else {
			//callBack(err, response, body);
            console.log(JSON.stringify(response));
		}
	});
}