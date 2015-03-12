var request = require('request');
request('http://elasticsearch-private.bugs.scl3.mozilla.com:9200', function (error, response, body) {
//request('http://www.google.com', function (error, response, body) {  
  if (!error && response.statusCode == 200) {
    console.log(body) // Show the HTML for the Google homepage. 
  }
  else
  {
  	console.log(error);
  }
})