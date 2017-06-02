var http = require('http'),
     io = require('socket.io').listen(http),
     fs = require('fs'),
    five = require('johnny-five'),
    express = require('express'),
    request = require('request'),
    dotenv = require('dotenv');

dotenv.load();


var clientId = 'CLIENT_ID';
var clientSecret = 'CLIENT_SECRET';

var app = express();
// We define the port we want to listen to. Logically this has to be the same port than we specified on ngrok.
const PORT=4390;

app.listen(PORT, function () {
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Example app listening on port " + PORT);
});


// This route handles GET requests to our root ngrok address and responds with the same "Ngrok is working message" we used before
app.get('/', function(req, res) {
    res.send('Ngrok is working! Path Hit: ' + req.url);
});

// This route handles get request to a /oauth endpoint. We'll use this endpoint for handling the logic of the Slack oAuth process behind our app.
app.get('/oauth', function(req, res) {
    // When a user authorizes an app, a code query parameter is passed on the oAuth endpoint. If that code is not there, we respond with an error message
    if (!req.query.code) {
        res.status(500);
        res.send({"Error": "Looks like we're not getting code."});
        console.log("Looks like we're not getting code.");
    } else {
        // If it's there...

        // We'll do a GET call to Slack's `oauth.access` endpoint, passing our app's client ID, client secret, and the code we just got as query parameters.
        request({
            url: 'https://slack.com/api/oauth.access', //URL to hit
            qs: {code: req.query.code, client_id: clientId, client_secret: clientSecret}, //Query string data
            method: 'GET', //Specify the method

        }, function (error, response, body) {
            if (error) {
                console.log(error);
            } else {
                res.json(body);

            }
        })
    }
});

// Route the endpoint that our slash command will point to and send back a simple response to indicate that ngrok is working
app.post('/command', function(req, res) {
    res.send('Your ngrok tunnel is up and running!');
});

board = new five.Board();

board.on("ready", function() {
  servo = new five.Servo({
    pin: 10,
    startAt: 0
  });

  io.sockets.on('connection', function (socket) {
    socket.on('click', function () {

      servo.to(180, 2000);
      setTimeout(() => {
        servo.to(0, 2000);
      }, 3500);
    });
  });
});
