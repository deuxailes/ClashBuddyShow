const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const summonerName = urlParams.get('page')

async function loadFunction () {

    const account_response = await fetch('/api',{ method: 'POST', headers: {'Content-Type' : 'text/plain' }, body: summonerName});
    const account_data = await account_response.json();
    document.getElementById('summonerNameHeader').innerHTML = account_data.name;

    const ranked_response = await fetch('/api/ranked',{ method: 'POST', headers: {'Content-Type' : 'text/plain' }, body: account_data.id});
    const ranked_data = await  ranked_response.json();
    document.getElementById('textPara').innerHTML = "Current rank: " + ranked_data[0].tier + " " + ranked_data[0].rank;

    console.log(ranked_data.vetaran);
    document.getElementById("profileImg").src = "dragon/10.10.3224670/img/profileicon/" + account_data.profileIconId + ".png";

}


loadFunction();