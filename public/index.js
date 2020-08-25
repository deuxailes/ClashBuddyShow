var j = 1598161840000;
var d = new Date(j);
console.log(d);

document.getElementById("searchButton").addEventListener("click", async getName => {   
    
    var summonerName = document.getElementById("searchBar").value;
    const account_response = await fetch('/api',{ method: 'POST', headers: {'Content-Type' : 'text/plain' }, body: summonerName});
    const account_data = await account_response.json();

    console.log(account_data);
    /*
    const ranked_response = await fetch('/api/ranked',{ method: 'POST', headers: {'Content-Type' : 'text/plain' }, body: account_data.id});
    const ranked_data = await  ranked_response.json();
    let wins = parseInt(ranked_data[1].wins);
    let losses = parseInt(ranked_data[1].losses);

    
    console.log("Current rank: " + ranked_data[1].tier + " " + ranked_data[1].rank);
    console.log("win ratio: " + (wins/(wins+losses)));
    */

 
     
    
    if (account_data.id != null) {
        console.log("HIII" + encodeURIComponent(account_data.name));
        var url = "http://maximiliancreative.xyz:3000/results.html?page=" + encodeURIComponent(account_data.name);
        window.location.href = url;
        console.log(url);
    }
    else {
        document.getElementById('textPara').innerHTML = "SUMMONER NOT FOUND";
    }
    
});



