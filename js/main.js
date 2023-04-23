import { loadPokemons, writePokemonsJson, renderHtml} from "./pokemon.js";


loadPokemons().then(function(pokemons){
writePokemonsJson(pokemons);
renderHtml(pokemons);
console.log(pokemons[35].name);
console.log(pokemons[35].getExtensionName("png"));
}).catch(function(error){
    console.error("smth went wrong when fetching the url or with the json response parsing");
    console.log(error);
});