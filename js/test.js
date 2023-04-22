import {writeFile} from "fs/promises";

function pokemon(id,name,types) {
    this.id = id;
    this.name = name;
    this.types = types;
}

pokemon.prototype.getPngName = function (){
    return `${this.name}.png`;
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

//request 1 pokemon and create an html page with the image!!!
function wrietPokemons(pokemons){
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

loadPokemons().then(function(pokemons){
wrietPokemons(pokemons);
console.log(pokemons[35].name);
console.log(pokemons[35].getPngName());
}).catch(function(error){
    console.error("smth went wrong when fetching the url or with the json response parsing");
    console.log(error);
});