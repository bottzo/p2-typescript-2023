//pokemon image resource: https://randompokemon.com/sprites/normal/POKEMON_NAME.png

/*fetch("https://randompokemon.com/dex/all.json").then(function (response){
    return response.json();
}).then(function (obj){
    console.log(obj);
}).catch(function(error){
    console.error("smth went wrong when fetching the url or with the json response parsing");
    console.log(error);
});*/

async function loadPokemons()
{
    const response = await fetch("https://randompokemon.com/dex/all.json");
    const json = await response.json();
    return json;
}
const obj = await loadPokemons();
console.log(obj);