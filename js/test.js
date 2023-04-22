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

loadPokemons().then(function(pokemons){
console.log(pokemons[35].name);
console.log(pokemons[35].getPngName());
}).catch(function(error){
    console.error("smth went wrong when fetching the url or with the json response parsing");
    console.log(error);
})
