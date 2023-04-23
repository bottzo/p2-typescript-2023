import {writeFile} from "fs/promises";

export {writePokemonsJson, loadPokemons, renderHtml}

function pokemon(id,name,types) {
    this.id = id;
    this.name = name;
    this.types = types;
}
pokemon.prototype.getExtensionName = function (extension){
    return `${this.resourceName()}.${extension}`;
}
pokemon.prototype.resourceName = function (){
    return this.name.toLowerCase().replace('.','').replace(' ', '-').replace('\'', '');
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

function writePokemonsJson(pokemons){
    let data = '[';
    for(pokemon of pokemons)
        data += `{${pokemon.id},${pokemon.name},[${pokemon.types}]},`;
    //removing last coma
    data = data.substring(0,data.length-1);
    data += ']';
    writeFile("pokemons.json", data);
}

function renderHtml(pokemons){
    let images = "";
    for(pokemon of pokemons)
        images += pokemonDiv(pokemon);

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

function pokemonDiv(pokemon)
{
    /*<div class="pokemon">
    <img src="https://img.pokemondb.net/sprites/home/normal/2x/avif/bulbasaur.avif" alt="Bulbasaur image"></img>
    <p>id</p>
    <p>pokemon name</p>
    <p>types</p>
    </div>*/
    let div = `<div class="pokemon">`;
    if(pokemon.id < 906)
        div += `<img src="https://img.pokemondb.net/sprites/home/normal/2x/avif/${pokemon.getExtensionName("avif")}" alt="${pokemon.name} image"></img>`;
    else
        div += `<img src="https://img.pokemondb.net/sprites/scarlet-violet/normal/${pokemon.getExtensionName("png")}" alt="${pokemon.name} image"></img>`;
    div += `<p>${pokemon.id}</p>`;
    div += `<p>${pokemon.name}</p>`;
    div += `<p>`;
    //for(type of pokemon.types)
    div += `${pokemon.types} `;
    div += `</p>`;
    div += `</div>`
    return div;
}