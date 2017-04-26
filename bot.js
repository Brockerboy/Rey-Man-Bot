var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botHello = /^\/rey hello$/; //Says hi in a friendly voice!
      botJoke = /^\/rey joke/; //tells random joke
      botMotivation = /^\/rey motivation/; //prints motivational phrase
      botCool = /^\/rey cool/; //prints random text face
      botHelp = /^\/rey help/; //prints random text face
      botFlightSchool = /^\/rey How's flight school going?/; //prints flight school response
      botQT = /^\/rey QT?/; //prints QT response
      botKnockKnock = /^\/rey Knock knock/; //prints Who's there?

  if(request.text && botHelp.test(request.text)) {
    this.res.writeHead(200);
    postMessage('List of commands (All commands start with "/rey"): \n'
                    + '/rey help - Prints this list \n'
                    + '/rey hello - Greets you \n'
                    + '/rey cool - Prints random text face\n'
                    + '/rey joke - Tells a random joke \n'
                    + '/rey motivation - Pumps you up \n'
                    + '/rey QT? - Responds to question \n');
    this.res.end();
  }
  else if(request.text && botHello.test(request.text)) {
    this.res.writeHead(200);
    postMessage("Man y'all are pretty swaggy for saying hi to me!");
    this.res.end();
  }
  else if(request.text && botJoke.test(request.text)) {
    this.res.writeHead(200);
    var jokeArray = [
        'Joke1',
        'Joke2',
        'Joke3'
    ];
    
    var randomIndex = Math.floor(Math.random() * jokeArray.length); 
    var randomJoke = jokeArray[randomIndex];
    
    postMessage(randomJoke);
    this.res.end();
  } 
  else if(request.text && botMotivation.test(request.text)) {
    this.res.writeHead(200);
    postMessage("DON'T LET YOUR DREAMS BE DREAMS!\nJUST GOTTA DO IT");
    this.res.end();
  }   
  else if(request.text && botKnockKnock.test(request.text)) {
    this.res.writeHead(200);
    delay(1000);
    postMessage("Who's there?");
    this.res.end();
  }  
  else if(request.text && botQT.test(request.text)) {
    this.res.writeHead(200);
    postMessage("I can't tonight. Chris, can you get me some sunflower seeds though?");
    this.res.end();
  } 
  else if(request.text && botFlightSchool.test(request.text)) {
    this.res.writeHead(200);
    postMessage("Flight School is awesome!!!\nI learned about aerodynamics today. Only hit one building too.");
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
