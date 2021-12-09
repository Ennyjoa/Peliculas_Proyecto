/* Service --> se hace la logica  */

const modeloPeliculas = require('./model');

/*
    SERVICIO -> MANIPULACIÓN DE DATOS -> LÓGICA DEL NEGOCIO.
        -> RECIBE UNA ACCIÓM DESDE EL CONTROLADOR.
            -> EJECUTA LA ACCIÓN
                -> CONSULTAR DATOS AL MODELO
                -> REALIZAR OPERACIONES MATEMÁTICAS, LÓGICAS CON LOS DATOS.
        -> ENVÍA LOS RESULTAOD DE LA ACCIÓN AL CONTROLADOR.
*/
//async -> voy a usar promesas
async function obtenerPeliculas(){
    let peliculas = await modeloPeliculas.buscarTodos(); //devolviendo una promesa
    return peliculas;
}

/*
    Formulario HTML
        -> crea objeto --> envio un obj vacio {}
        -> Realiza la petición
        -------> Controlador --> revisa que el obj no este vacio {}
                -> Captura el objeto (Body)
                -> Servicio !== {} y valida que se un objeto existente !== Null y undefined

*/

//2) Creando Funcion Obtener una pelicula que se usa en CONTROLLER.js --> ese id sale de la Base Datos
// id -> identifica la película -> valor E234DFSf
async function obtenerPelicula(id){
    //Validad que el ID no sea nulo, undefine o vacio
    if (id.length == 24){
        let pelicula = await modeloPeliculas.buscarPorID(id);

        if(pelicula){
            return pelicula
        }
        else{
            return "ID no existe en la base de datos"
        }
    }
    else{
        return "Ingrese por favor un ID"
    }
}

async function buscarPeliculasTitulo(nombre, exacta = false){
    //validar que la pelicula no sea nula
    let peliculas = await modeloPeliculas.buscarPorTitulo(nombre, exacta);//encuentre la pelicula
    return peliculas; //la devuelve todas las películas que encuentras
}

//    4) ---> Crear una nueva pelicula, inserte una nueva película
async function crearPelicula(pelicula){
    let resultado ={}; //objeto
    // validar que el objeto pelicula tenga algo; que no sea null / undefine 
    // Objeto vacio -> longitud es 0 -> cuando es un objet debemos conocer sus llaves == 0 , esta vacio
    
    if(pelicula && Object.keys(pelicula).length > 0){
        if(pelicula.titulo && pelicula.titulo !== ""){
            let busqueda = await buscarPeliculasTitulo(pelicula.titulo, true);

            if(busqueda.length === 0){
                let crearResultado = await modeloPeliculas.crearUna(pelicula);

                if(crearResultado && crearResultado.acknowledged){
                    resultado.mensaje = "Película creada exitosamente";
                    resultado.datos = crearResultado; 

                }else{
                    resultado.mensaje = "Error al crear película";
                    resultado.datos = pelicula;

                }

            }else{
                resultado.mensaje = "Película ya existe";
                resultado.datos = pelicula.nombre;

            }

        }else{
            resultado.mensaje = "Título no existe o vacío";
            resultado.data = pelicula;
        }
        
    }else{
        resultado.mensaje = "No hay datos para insertar";
    }

    return resultado;
}

//   5) --> actualizar Película
async function actualizarPelicula(id, nuevosDatos){
    /*

        1. longitud es exactamente igual a 24 --->string es un array de caracteres
        2. 0-9 y A-F : hexagecimal porque tiene 12 bits ---> Expresión regular :/^[0-9A-F]+$/i -> i : mayusculas y minusculas
        test es un metodo de las expresiones regulares.
    */
    let resultado = {};
   if(id.length == 24 && /^[0-9A-F]+$/i.test(id)){
       // TODO: VALIDAR LOS NUEVOS DATOS

       //Llamamos el servicio
       let actualizarResultado = await modeloPeliculas.actualizarUna(id, nuevosDatos);
       if(actualizarResultado && actualizarResultado.acknowledged){
           resultado.mensaje = "Película actualizada correctamente";
           resultado.datos = actualizarResultado;

       }else{
           resultado.mensaje = "Error al actualizar película";
           resultado.datos = {"id":id, "datos":nuevosDatos};

       }

   }else{
       resultado.mensaje = "ID inválido";
       resultado.datos = id;
   }
   return resultado;
} 


// 6) --> eliminar Pelicula por ID
// la funcion eliminarPelicula la creamos en el controlador
async function eliminarPelicula(id){
    let resultado = {};
    console.log(id);
    // vamos a validar el id
    if(id && id.length == 24 && /^[0-9A-F]+$/i.test(id)){
        let resultadoEliminar = await modeloPeliculas.eliminarUna(id);
        if(resultadoEliminar && resultadoEliminar.acknowledged){
            resultado.mensaje = "Película Eliminada correctamente";
            resultado.datos = resultadoEliminar;

        }else{
            resultado.mensaje = "Error al eliminar Película";
            resultado.datos = id;
        }

    }else{
        resultado.mensaje = "ID inválido";
        resultado.datos = id;
    }

    return resultado;
}






module.exports.obtenerPeliculas = obtenerPeliculas;
module.exports.obtenerPelicula = obtenerPelicula;
module.exports.buscarPeliculasTitulo = buscarPeliculasTitulo;
module.exports.crearPelicula = crearPelicula;
module.exports.actualizarPelicula = actualizarPelicula;
module.exports.eliminarPelicula = eliminarPelicula;