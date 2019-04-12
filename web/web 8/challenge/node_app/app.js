//NOTE: MUST BE RUNNING ON NODE 0.12.x

var express = require('express')
var session = require('express-session');
var app = express()

app.use(session({secret: 'topsecret' || process.env.SESSION_SECRET}));

app.get('/guess', function(req, res) {
  if (req.query.check == req.session.answer) {
    res.send('flag{weak_prng_is_we4k}');
  } else {
    res.send("Sorry, you didn't win this time. Don't worry, you can try again!");
  }
});

app.get('/', function(req, res) {
  var form = '<form action="/guess" method="get">Guess: <input type="text" name="check"><br><input type="submit" value="Submit"></form>'
  var nums = [Math.random(), Math.random(), Math.random()];
  req.session.answer = Math.random().toFixed(6);
  res.setHeader('x-node-version', process.version);
  res.send('Welcome to the lottery, all you need to do is guess the next number <b>rounded to 6 decimal places (i.e. 0.123456)</b>!<br/><br/>Your lucky numbers are: ' + nums.join(', ') + '<br/><br/>' + form);
});

app.listen(
  parseInt(process.env.APP_PORT) || 1337,
  process.env.APP_HOST || '0.0.0.0',
  function() {
    console.log("Challenge ready!");
  }
);
