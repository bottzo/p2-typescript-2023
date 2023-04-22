import {writeFile} from "fs/promises";

function pokemon(id,name,types) {
    this.id = id;
    this.name = name;
    this.types = types;
}

pokemon.prototype.getPngName = function (){
    return `${this.name}.png`;
}
pokemon.prototype.getAvifName = function (){
    return `${this.name}.avif`.toLowerCase().replace(' ', '-').replace("%E2%99%80", 'f');
}

async function loadPokemons()
{
    const response = await fetch("https://randompokemon.com/dex/all.json");
    const json = await response.json();
    const pokemons = Array(json.length);
    let i = 0;
    for(const {id,name,types} of json)
    {
        pokemons[i] = new pokemon(id,name,types);
        ++i;
    }
    return pokemons;
}

function writePokemons(pokemons){
    let data = '[';
    for(pokemon of pokemons)
    {
        data += `{${pokemon.id},${pokemon.name},${pokemon.types}},`
    }
    //removing last coma
    data = data.substring(0,data.length-1);
    data += ']';
    writeFile("pokemons.json", data);
}

//request 1 pokemon and create an html page with the image!!!
//pokemon image resource: https://randompokemon.com/sprites/normal/POKEMON_NAME.png
function imgsHtml(pokemons){
    let images = "";
    for(pokemon of pokemons)
        images += `<img src="https://img.pokemondb.net/sprites/home/normal/2x/avif/${pokemon.getAvifName()}" alt="${pokemon.name} image"></img>`;
        //console.log(pokemons[31].name);
        //console.log('%E2%99%80');
    let html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Pokemons</title>
    </head>
    <body>`;
    html += images;
    html +=`
    </body>
    </html>"`;
    writeFile("pokemons.html", html);
}

loadPokemons().then(function(pokemons){
writePokemons(pokemons);
imgsHtml(pokemons);
console.log(pokemons[35].name);
console.log(pokemons[35].getPngName());
}).catch(function(error){
    console.error("smth went wrong when fetching the url or with the json response parsing");
    console.log(error);
});