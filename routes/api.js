const express = require('express');
const router = express.Router();

router.get('/name', function (req, res, next) {
  res.json({
    name: 'Bob'
  })
});

/**
 * Login to the code analyser app using the instance InstanceUrl
 */
router.get('/login', function (req, res, next) {
  console.log(JSON.stringify(req.headers));
  let headers = req.headers;
  let instanceUrl = headers['instanceurl'];
  let userName = headers['username'];
  let password = headers['password'];
  let request = require('request'); 
  console.log(userName);
  request({
		baseUrl : 'https://'+instanceUrl+'.service-now.com',
		method : 'GET',
		uri : 'api/now/v2/table/sys_user?sysparm_query=user_name%3D' + userName,
		json : true,
		// Here we use the basic authentication. The username and password set here will send 
		// as the authentication header.
		auth: {
            'user': userName,
            'pass': password,
            'sendImmediately': true
        }

	}, function(err, response, body) {
    console.log('response');
		if (!err && response.statusCode == 200){
      console.log(JSON.stringify(response));
		} else {	
      console.log(JSON.stringify(err));
		}
    res.json(response);
	});
});

module.exports = router;