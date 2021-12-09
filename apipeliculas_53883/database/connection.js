//Iniciamos conexion con Base de Datos --> CON EL MODELO DE SINGLETON 

const mongoClient = require('mongodb').MongoClient;   // llamamos la lib mongodb y a mongo cliente
require('dotenv').config();   // llamos a variables de cliente 

let basedatos;

//declaramos la funcion que es una promesa 
const conectar = function(){
    return new Promise(function(resolve, reject){
        if(basedatos){
            resolve();
        }
        else{

            // conexion a un servidor externo
            mongoClient.connect(process.env.MONGODB_URI,{useNewUrlParser: true})
            .then(function(conexion){
                //conexion con base de datos
                basedatos = conexion.db(process.env.MONGODB_DB)
                // resolviendo la promesa
                resolve(); 
            })
            .catch(function(error){
                reject(error); // rechaza la promesa y muestra cual fue el error
            });
        }
    });  
}

// funcion que nos devuelva la base de datos 
const obtenerConexion = function(){
    return basedatos;
}

module.exports = {conectar, obtenerConexion}