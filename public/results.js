import * as data from '/10.16.1/data/en_US/champion.json';
data.js
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const summonerName = urlParams.get('page')
const {championJSON} = data;
console.log(championJSON);

async function loadFunction () {

    const account_response = await fetch('/api',{ method: 'POST', headers: {'Content-Type' : 'text/plain' }, body: summonerName});
    const account_data = await account_response.json();
    document.getElementById('summonerNameHeader').innerHTML = account_data.name;
    //document.getElementById('PlayerNameTop').innerHTML = account_data.name;

    /*
    const ranked_response = await fetch('/api/ranked',{ method: 'POST', headers: {'Content-Type' : 'text/plain' }, body: account_data.id});
    const ranked_data = await  ranked_response.json();
    document.getElementById('winrateTop').innerHTML = 100 * ranked_data.winRate + "%";
    document.getElementById('textPara').innerHTML = "Current rank: " + ranked_data.currentRank;
    */
   
    document.getElementById("profileImg").src = "/10.16.1/img/profileicon/" + account_data.profileIconId + ".png";

    const roles_response = await fetch('/api/playerRoles',{ method: 'POST', headers: {'Content-Type' : 'text/plain' }, body: summonerName});
    const roles_data = await roles_response.json();

    const spectator_response = await fetch('/api/currentGame',{ method: 'POST', headers: {'Content-Type' : 'text/plain' }, body: account_data.id});
    const spectator_data = await spectator_response.json();

    var gameParticpants = spectator_data.participants;
    console.log(gameParticpants);
    var blueTeamData = JSON.parse(roles_data[0].replaceAll('\'','\"'));
    var redTeamData = JSON.parse(roles_data[1].replaceAll('\'','\"'));

    var blueTeamDivs = document.getElementById("blueteam").getElementsByTagName("div");
    var redTeamDivs = document.getElementById("redteam").getElementsByTagName("div");


    
    for(var i = 0; i < 5; i++)
    {
        gameParticpants.forEach((player) =>{

        })
        blueTeamDivs[i].querySelector("p.blue_playername").innerHTML = account_data.name;
        blueTeamDivs[i].querySelector("p.blue_champion").innerHTML = Object.values(blueTeamData)[i];  
    }
    for(var i = 0; i < 5; i++)
    {
        redTeamDivs[i].querySelector("p.red_playername").innerHTML = account_data.name;
        redTeamDivs[i].querySelector("p.red_champion").innerHTML = Object.values(redTeamData)[i];  
    }



    console.log(blueTeamData);
    console.log(redTeamData);
    
   

    

}


loadFunction();