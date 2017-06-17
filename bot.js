var HTTPS = require('https');
var cool = require('cool-ascii-faces');
var HTTP = require('http');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^\/gif*/g;
      botHello = /^\/rey hello$/; //Says hi in a friendly voice!
      botJoke = /^\/rey joke/; //tells random joke
      botMotivation = /^\/rey motivation/; //prints motivational phrase
      botCool = /^\/rey cool/; //prints random text face
      botHelp = /^\/rey help/; //prints random text face
      botFlightSchool = /^\/rey How's flight school going?/; //prints flight school response
      botQT = /^\/rey QT?/; //prints QT response
      botKnockKnock = /^\/rey Knock knock/; //prints Who's there?
      botCards = /^\/rey cards/; //Responds to question
      botTennis = /^\/rey yoyoyoTennis/; //Responds to question
      bot8Ball = /^\/rey 8ball/; //Responds to question with 8 ball response

  if(request.text && botHelp.test(request.text)) {
    this.res.writeHead(200);
    postMessage('List of commands (All commands start with "/rey"): \n'
                    + '/rey help - Prints this list \n'
                    + '/rey hello - Greets you \n'
                    + '/rey cool - Prints random text face\n'
                    + '/rey joke - Tells a random joke \n'
                    + '/rey motivation - Pumps you up \n'
                    + '/rey QT? - Responds to question \n'
                    + '/rey cards? - Responds to question \n'
                    + '/rey tennis? - Responds to question \n'
                    + '/rey 8ball "question" - Consult an magic 8 ball to decide your fate to any question \n');
    this.res.end();
  }
  else if (request.text && botRegex.test(request.text)) {
    var input = request.text.replace(botRegex, ""); //strip "/gif "
    this.res.writeHead(200);
    input = input.replace(/^\s*/g, ""); //remove beginning whitespace
    input = input.replace(/\/*/g, ""); //remove slashes
    inputs = input.split(/,?\s+/); //split by comma or space
    var first = inputs[0]; //always pull the first one
    postMessage(first);
      
    searchGiphy(first);  
    
      
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
        'Why did the mantis cross the road',
        'Tonight I dreamed of a beautiful walk on a sandy beach',
        'What did the husband preying mantis say to his wife?'
    ];
    
    var punchLineArray = [
        'to get to the other side.',
        'At least that explains the footprints I found in the cat litter box this morning.',
        'Your eating in bed is getting really out of hand!'
    ];
    
    var randomIndex = Math.floor(Math.random() * jokeArray.length); 
    var randomJoke = jokeArray[randomIndex];
    var punchline = punchLineArray[randomIndex];
    
    postMessage(randomJoke);
    
    setTimeout(function(){
        postMessage(punchline);
    }, 5000);
    
    this.res.end();
  } 
  else if(request.text && bot8Ball.test(request.text)) {
    this.res.writeHead(200);
    var ball8Array = [
      'Absolutely',
      'Prospect Good',
      'Consult Me Later',
      'Well Maybe',
      'You Wish',
      'Youve Got To Be Kidding...',
      'Not A Chance',
      'As I See It Yes',
      'Serai said no to Chris, so I say no to you',
      'What Do You Think?',
      'Duh',
      'Focus And Ask Again',
      'Obviously',
      'Answer Unclear Ask Later',
      'Chances Are not Good',
      'Dont Count On It',
      'Outlook Not So Good',
      'Most Likely',
      'Without A Doubt',
      'Absolutely',
      'Yes - Definitely',
      'Dont get too excited',
      'Concentrate and Ask Again',
      'NO',
      'Yes',
      'Better Not Tell You Now',
      'What was that?',
      'Porque no los dos?'
    ];
    
    var randomIndex = Math.floor(Math.random() * ball8Array.length); 
    var randomJoke = ball8Array[randomIndex];
    
    postMessage(randomJoke);
    this.res.end();
  } 
    
  else if(request.text && botMotivation.test(request.text)) {
    this.res.writeHead(200);
    postMessage("https://i.groupme.com/898x555.png.b18ab75a62074b47a764d4d0e36572dc.large");
    this.res.end();
  }  
    
  else if(request.text && botCards.test(request.text)) {
    this.res.writeHead(200);
    postMessage("Lol I don't know how to play cards. I'll play Go Fish though. I LOVE fish. LITERALLY");
    this.res.end();
  }
    
  else if(request.text && botTennis.test(request.text)) {
    this.res.writeHead(200);
    postMessage("Hey everyone! We are playing tennis tomorrow at Cosmo around 4:30 to 5. Be there or be square. Let me know if you can go. Or not. You can go either way. But I want you to be there.\n    -Rey");
    this.res.end();
  } 
    
  else if(request.text && botKnockKnock.test(request.text)) {
    this.res.writeHead(200);
    postMessage("Who's there?");
    this.res.end();
  }  
    
  else if(request.text && botQT.test(request.text)) {
    this.res.writeHead(200);
    postMessage("QTTTTTTTTTTTTTTTTTTTT");
    this.res.end();
  } 
    
  else if(request.text && botFlightSchool.test(request.text)) {
    this.res.writeHead(200);
    postMessage("Fantastic!!!\nI graduated summa cum laude!\nI also minored in Hospital Management and also Underwater Basket Weaving.");
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

function searchGiphy(giphyToSearch) {
  var options = {
    host: 'api.giphy.com',
    path: '/v1/gifs/search?q=' + giphyToSearch + '&api_key=dc6zaTOxFJmz'
  };

  var callback = function(response) {
    var str = '';

    response.on('data', function(chunck){
      str += chunck;
    });

    response.on('end', function() {
      if (!(str && JSON.parse(str).data[0])) {
        postMessage('Couldn\'t find a gif 💩');
      } else {
        var id = JSON.parse(str).data[0].id;
        var giphyURL = 'http://i.giphy.com/' + id + '.gif';
        postMessage(giphyURL);
      }
    });
  };

  HTTP.request(options, callback).end();
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