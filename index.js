// Este modulo Recibe argumentos, los procesa y delega las acciones a pelis.js.

const moduloPelis = require("./pelis");

function main() {
  const input = process.argv.slice(2); //crea un array a partir de node index.js

  if (input.length === 0) {
    //si no es ingresado ningun parametro
    const funcionLector = moduloPelis.lector();
    console.log("Todas las peliculas")
    console.table(funcionLector);
  } else if (input[0] === "--sort") {
    moduloPelis.sort(input[1]); //si el usuario ingresa sort. llamar a la funcion sort y averiguar que parametro sigue
  } else if (input[0] === "--search") {
    const funcionSearch = moduloPelis.search(input[1]);
    console.table(funcionSearch);
  } else if (input[0] === "--tag") {
    const funcionTags = moduloPelis.tags(input[1]);
    console.table(funcionTags);
  } else {
    console.log("error de sintaxis");
  }

}
main();