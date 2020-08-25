const express = require('express');
const app = express();
const fetch = require('node-fetch');
const APIKEY = 'RGAPI-5bf99818-2d0a-4689-b39f-f276edbd5845';

app.listen(3000, () => console.log('listenting at 3000'));
app.use(express.static('public'))
app.use(express.text());

var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
s3 = new AWS.S3({apiVersion: '2006-03-01'});

var bucketParams = {
    Bucket : 'clashbuddycache',
    Key: "playercache/playerlist.json"
};


/*function writeToS3(input) { // Log API responses from riot into playercache S3 Bucket
    var content;

    s3.getObject(bucketParams, function(err, data) {
        if (err) console.log(err, err.stack);
        else {
            content = new Buffer(data.Body).toString("utf8");
            content = content + '\n' + new Date() + '\t' + input;
            var putParams = {
                Body: content,
                Bucket: 'clashbuddycache', 
                Key: "playercache/playerlist.json",
                ACL: "public-read"
             };

            s3.putObject(putParams, function(err, data) {
                if (err) console.log(err, err.stack); // an error occurred
                else     {
                    console.log(data);           // successful response
                }
             });
        }
    });  
}*/

app.post('/api',async (request, response) => { //send data to server (client to server) POST
    console.log("Summoner name: " + request.body);

    const fetch_response = await fetch('https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/'+ request.body + '?api_key=' + APIKEY);
    const data = await fetch_response.json();

    response.json(data);
    console.log(data);
    //writeToS3(JSON.stringify(data)); // Log Riot API response to S3 playercache S3 Bucket

})

app.post('/api/ranked',async (request, response) => { //send data to server (client to server) POST
    console.log("encrypted id: " +  request.body);
    var playerValue = {isHot: false,isVeteran: false, isInactive: false,totalMastery: 0,winRate: 0.0,currentRank: "Iron IV"};
    
    const ranked_response = await fetch('https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/'+ request.body +'?api_key=' + APIKEY);
    const ranked_data = await ranked_response.json();

    const mastery_response = await fetch('https://na1.api.riotgames.com/lol/champion-mastery/v4/scores/by-summoner/'+ request.body + '?api_key=' + APIKEY);
    const mastery_data = await mastery_response.json();

    let wins = parseInt(ranked_data[0].wins);
    let losses = parseInt(ranked_data[0].losses);
    
    playerValue.isHot = ranked_data[0].hotStreak;
    playerValue.isVeteran = ranked_data[0].veteran;
    playerValue.isInactive = ranked_data[0].inactive;
    playerValue.totalMastery = mastery_data;
    playerValue.winRate = ((wins/(wins+losses)));
    playerValue.currentRank = ranked_data[0].tier + " " + ranked_data[0].rank;

    console.log(playerValue);



    response.json(ranked_data);
    console.log(ranked_data);
    //writeToS3(JSON.stringify(data)); // Log Riot API response to S3 playercache S3 Bucket

})


function targetMVP(players)
{

}



/*var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhttp = new XMLHttpRequest();
xhttp.open("GET", "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/Torko?api_key=RGAPI-1cad6f88-3852-4ca6-ada8-1b58f6e475eb", true);*/



