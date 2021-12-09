// el modelo es el se conecta con la BD
const { ObjectId } = require('bson');
const basedatos = require('../../database/connection');
const objectId = require('mongodb').ObjectId;

//Creando metodo
function buscarTodos(){
    let conexion = basedatos.obtenerConexion();

    return db.collection("peliculas").find({}).toArray()
        .then(function(data){
            return data;
        })
        .catch(function(error){
            console.log(error);
        });
        
}

function buscarPorID(id){
    let db = basedatos.obtenerConexion();
    return db.collection("peliculas").findOne({"_id": objectId(id)}) //id como se llama en mongodb-> objectID 
        //Resolución de la promesa:
        .then(function(data){
            return data;
        })
        .catch(function(error){
            console.log(error);
        })
}

function buscarPorTitulo(nombre, exacta){
    let db = basedatos.obtenerConexion();

    let busqueda; //buscar titulo de pelicula exacta
    if(exacta){
        busqueda = nombre;
    }
    else{
         // Expresion Regular ---> RegExp -> patron = nombre modificador -> ignore las Mayusculas y las minusculas
        busqueda = new RegExp(nombre, "i"); // "i" : ignore las Mayusculas y minusculas -> Expe regular
    }

    return db.collection("peliculas").find({"titulo": busqueda}).toArray()
    //Resolución de la promesa
    .then(function(datos){
        return datos;
    })
    .catch(function(error){
        console.log(error);
    })
}

//    4) ---> Crear una nueva pelicula, inserte una nueva película
function crearUna(pelicula){
    let db = basedatos.obtenerConexion();
    return db.collection("peliculas").insertOne(pelicula)
    // capturamos el valor resultado
    .then(function(resultado){
        return resultado;
    })
    .catch(function(error){
        console.log(error);
    })
}

//   5) --> actualizar Película
function actualizarUna(id, nuevosDatos){
    
    let db = basedatos.obtenerConexion();
    return db.collection("peliculas").updateOne(
        {"_id": objectId(id)}, // Filtro
        {"$set":nuevosDatos} // Operación de actualización ---> $set, $unset
    )
    .then(function(resultado){
        return resultado;
    })
    .catch(function(error){
        console.log(error);
    })
}

// 6) --> eliminar Pelicula por ID
function eliminarUna(id){
    let db = basedatos.obtenerConexion();
    return db.collection("peliculas").deleteOne({"_id": objectId(id)}) // CREAMOS UN FILTRO PARA BUSCAR LA PELICULA 
    //then :captura el valor que viene del resolve= valor de la promesa
    .then(function(resultado){
        return resultado;
    })
    //catch : captura el valor que viene del requet
    .catch(function(error){
        console.log(error);
    });
}


// module.exports son modulos PARA EXPORTAR QUE SON ESPECIFICOS de NODE.JS
module.exports.buscarTodos = buscarTodos;
module.exports.buscarPorID = buscarPorID;
module.exports.buscarPorTitulo = buscarPorTitulo;
module.exports.actualizarUna = actualizarUna;
module.exports.eliminarUna = eliminarUna;
module.exports.crearUna = crearUna;