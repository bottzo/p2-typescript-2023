fetch("https://randompokemon.com/dex/all.json").then(function (response){
    return response.json();
}).then(function (obj){
    console.log(obj);
}).catch(function(error){
    console.error("smth went wrong when fetching the url or with the json response parsing");
    console.log(error);
});