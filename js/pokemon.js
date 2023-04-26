export function pokemon(id,name,types) {
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