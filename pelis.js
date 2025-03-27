// Este modulo lee el archivo JSON y expone funciones para interactuar con los datos.
// Objetivo: definir las funciones de filtrado y busqueda.
// --search. buscar por palabra en el titulo.
// --tag. buscar por tags.
// --sort. Ordenar por propiedades disponibles:
//'title'. Devolver peliculas en orden alfabetico por el titulo
//'rating'. Devolver en orden de mayor a menor
//'year'. Devolver en orden de mayor a menor

const fs = require("fs"); //importar modulo de node fs

function lector() {
  const archivo = JSON.parse(
    fs.readFileSync(__dirname + "/pelis.json", "utf-8"));
  const peliculas = archivo.map((pelicula) => ({
    //organizar
    title: pelicula.title,
    rating: pelicula.rating,
    tags: pelicula.tags.join(", "), // Convierte el array en un string
    year: pelicula.year,
  }));
  return peliculas;
}

function archivoEditable(archivo) {
  //devuelve un archivo duplicado a fin de operar con el sin modificar el original
  const arrayEditable = [];
  for (let i = 0; i < archivo.length; i++) {
    const titulo = archivo[i];
    arrayEditable.push(titulo);
  }
  return arrayEditable;
}

//funcion sort
function sort(parametro) {
  if (parametro == "title") {
    console.log("Ejecutando 'title'. Peliculas en orden alfabetico");
    console.table(title());
  } else if (parametro == "rating") {
    console.log("ejecutando 'rating'. Peliculas de mayor rating");
    console.table(rating());
  } else if (parametro == "year") {
    console.log("ejecutando 'year'. Peliculas mas recientes");
    console.table(year());
  } else {
    console.log("Error de sintaxis");
  }
}

//funciones de sort
function title() {
  const archivo = archivoEditable(lector()); // llamo al archivo editable
  // Ordenar el nuevo array por título alfabéticamente
  archivo.sort((a, b) => {
    if (a.title < b.title) return -1;
    if (a.title > b.title) return 1;
    return 0;
  });
  return archivo; // Retornar el array ordenado
}

function rating() {
  const archivo = archivoEditable(lector()); // llamo al archivo editable
  archivo.sort((a, b) => b.rating - a.rating); //ordenar los objetos segun la propiedad rating
  return archivo;
}

function year() {
  const archivo = archivoEditable(lector()); // llamo al archivo editable
  archivo.sort((a, b) => b.year - a.year); //ordenar los objetos segun la propiedad year
  return archivo;
}

//funcion search
function search(palabraBuscada) {
  const archivo = lector(); //collection
  const objetosEncontrados = []; // Array para almacenar los objetos que cumplen la condición

  archivo.forEach((objeto) => {
    if (objeto.title.toLowerCase().includes(palabraBuscada.toLowerCase())) {
      objetosEncontrados.push(objeto); // Agrega el objeto al array
    }
  });
  if (objetosEncontrados.length === 0) {
    console.log("No hay resultados");
  }
  return objetosEncontrados;
}

//funcion tags
function tags(tagBuscado) {
  const archivo = lector(); //collection
  const objetosEncontrados = []; // Array para almacenar los objetos que cumplen la condición

  archivo.forEach((objeto) => {
    if (objeto.tags.toLowerCase().includes(tagBuscado.toLowerCase())) {
      objetosEncontrados.push(objeto); // Agrega el objeto al array
    }
  });
  if (objetosEncontrados.length === 0) {
    console.log("No hay resultados");
  }
  return objetosEncontrados;
}

module.exports = {
  lector,
  title,
  rating,
  year,
  sort,
  search,
  tags,
};