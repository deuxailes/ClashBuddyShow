

document.getElementById("searchButton").addEventListener("click", async getName => {   
    
    var summonerName = document.getElementById("searchBar").value;
    const response = await fetch('/api',{ method: 'POST', headers: {'Content-Type' : 'text/plain' }, body: summonerName});
    const data = await response.json();
    document.getElementById('textPara').innerHTML = JSON.stringify(data);

    document.getElementById("profileImg").src = "dragon/10.10.3224670/img/profileicon/" + data.profileIconId + ".png"; 

});



