var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;
var apiKey = process.env.API_KEY;

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
      botCards = /^\/rey cards/; //Responds to question
      botTennis = /^\/rey yoyoyoTennis/; //Responds to question
      bot8Ball = /^\/rey 8ball/; //Responds to question with 8 ball response
      giphyCommand = /^\/giphy/;
      botRegex = /^\/weather*/g;
    

  if(request.text && botHelp.test(request.text)) {
    this.res.writeHead(200);
    postMessage('List of commands (All commands start with "/rey"): \n'
                    + '/rey help - Prints this list \n'
                    + '/rey hello - Greets you \n'
                    + '/rey cool - Prints random text face\n'
                    + '/rey joke - Tells a random joke \n'
                    + '/rey motivation - Pumps you up \n'
                    + '/rey QT? - Responds to question \n'
                    + '/rey 8ball "question" - Consult an magic 8 ball to decide your fate to any question \n');
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
    postMessage("apiKey");
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
  else if(request.text && request.text.length > giphyCommand.length && request.text.substring(0, giphyCommand.length) === giphyCommand) {
    this.res.writeHead(200);
    searchGiphy(request.text.substring(giphyCommand.length + 1));
    postMessage("test");
    this.res.end();
  } 
    
  else if(request.text && botRegex.test(request.text)) {
    var input = request.text.replace(botRegex, ""); //strip "/weather "
    this.res.writeHead(200);
    input = input.replace(/^\s*/g, ""); //remove beginning whitespace
    input = input.replace(/\/*/g, ""); //remove slashes
    inputs = input.split(/,?\s+/); //split by comma or space
    var first = inputs[0]; //always pull the first one
    var city = "-1";
    var stateOrCountry = "-1";
    var type = "-1"; //2 day, etc.

    if(first == "help"){ //first thing to check
      postMessage("Default city is Pittsburgh \n Use /weather [City] [State/Country] for other cities \n More features to come! (Weather API from weatherunderground)");
      return;
    }

    if(inputs.length == 1){ //it's either empty or there is one input
      if(inputs[0] != ""){ //there is one input, not sure what to do with it
        postMessage("Please use /weather [City] [State/Country]");
        return;
      }else{ //no input, default to PGH
        city = "stl";
        stateOrCountry = "MO";
      }
    }

    if(inputs.length == 2){
      city = first; //our first input is probably the city
      stateOrCountry = inputs[1];
    }

    if(inputs.length == 3){ //city, state, type of forceast
      city = first;
      stateOrCountry = inputs[1];
      type = inputs[2];
    }

    if(city == "-1" || stateOrCountry == "-1"){ //last fallback
      postMessage("Please use /weather [City] [State/Country]");
      return;
    }

    processWeather(city, stateOrCountry, function(response){ //all other cities, process
      postMessage(response);
    });
    this.res.end();
  } else {
    // console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function processWeather(city, stateOrCountry, callback){ //callback is to send the message
  getWeather(city, stateOrCountry, function(dat){
    if(dat != undefined){
      var today = dat.forecastday[0];
      var tom = dat.forecastday[1];
      callback("In " + city.charAt(0).toUpperCase() + city.slice(1) + ", it is currently " + getWeatherConditions(today.conditions.toLowerCase()) + ".\n "
      + high(today, 0) + " " + wind(today) + "\n Tomorrow, it will be " + getWeatherConditions(tom.conditions.toLowerCase())
      + ",\n " + high(tom, 1) + " " + wind(tom));
    }else{
      callback("Nothing Found :(");
    }
  });
}

//use https://www.wunderground.com/weather/api/d/docs?d=resources/phrase-glossary&MR=1
function getWeatherConditions(weather){
  if(weather.search("/chance/") != -1){ //separately check for anything with 'chance'
      return "a " + weather; //just add 'a' before the weather string
  }
  switch(weather){
    case "thunderstorm":
      return "thunderstorming";
      break;
    case "rain": case "rain showers":
      return "raining";
      break;
    case "snow": case "snow showers":
      return "snowing";
      break;
    case "fog": case "shallow fog": case "partial fog": case "fog patches":
      return "foggy";
      break;
    case "haze":
      return "hazy";
      break;
    case "smoke":
      return "smokey";
      break;
    case "scattered clouds":
      return "cloudy";
      break;
    default:
      return weather;
      break;
  }
}

function wind(dat){
  if(dat.avewind.mph == undefined) return "";
  var ws = dat.avewind.mph;
  if(ws >= 30){ //wind cutoffs from beafort scale
    return " and very very very windy"
  }else if(ws >= 23){
    return " and very windy";
  }else if(ws >= 15){
    return " and windy";
  }else if(ws >= 8){
    return " and slightly windy";
  }else{
    return "";
  }
}

function high(dat, day){
  if(dat.high == undefined || dat.low == undefined) return "";
  var highF = dat.high.fahrenheit;
  var highC = dat.high.celsius;
  var lowF = dat.low.fahrenheit;
  var lowC = dat.low.celsius;
  return ((day ? "with a high of " : "The high for today will be ") + highF + " (" + highC + ")");

}

// api call: http://api.wunderground.com/api/1b993b6c50aaadc5/
//function to call weather underground API, callback to processWeather
function getWeather(city, stateOrCountry, callback){
  var baseUrl = "http://api.wunderground.com/api/1b993b6c50aaadc5/forecast/q/";
  var url = baseUrl + stateOrCountry + "/" + city + ".json";
  console.log(url);
  request({
  url: url,
  method: 'GET',
  json: true
  }, function (error, response, body) {
    if (!error) {
      console.log(response);
      //add check for a "results" return and take the first one
      callback(body.forecast.simpleforecast); //send full JSON back
    }else{
      console.log("Error " + response.statusCode);
    }
  })
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
