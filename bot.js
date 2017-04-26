var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botHello = /^\/rey hello$/; //Says hi in a friendly voice!
      botJoke = /^\/rey joke/; //tells random joke
      botMotivation = /^\/rey motivation/; //prints motivational phrase
      botCool = /^\/rey cool/; //prints random text face
      botCommands = /^\/rey commands/; //prints random text face

  if(request.text && botCommands.test(request.text)) {
    this.res.writeHead(200);
    postMessage('List of commands (All commands start with "/rey"): \n'
                    + '/rey commands - Prints this list \n'
                    + '/rey hello - Greets you \n'
                    + '/rey cool - Prints random text face\n'
                    + '/rey joke - Tells a random joke \n'
                    + '/rey motivation - Pumps you up \n');
    this.res.end();
  }
  else if(request.text && botHello.test(request.text)) {
    this.res.writeHead(200);
    postMessage("Man y'all are pretty swaggy for saying hi to me!");
    this.res.end();
  }
  else if(request.text && botJoke.test(request.text)) {
    this.res.writeHead(200);
    postMessage("https://i.chzbgr.com/full/5035524864/h25BCA081/");
    this.res.end();
  } 
  else if(request.text && botMotivation.test(request.text)) {
    this.res.writeHead(200);
    postMessage("DON'T LET YOUR DREAMS BE DREAMS!\nJUST DO IT");
    this.res.end();
  } 
  else if(request.text && botCool.test(request.text)) {
    this.res.writeHead(200);
    postMessage(cool());
    this.res.end();
  } 
  else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage(response) {
  var botResponse, options, body, botReq;

  botResponse = response;

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}


exports.respond = respond;
