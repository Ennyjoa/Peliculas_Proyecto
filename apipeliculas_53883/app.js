// 1)Importar los módulos requeridos.
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

//importamos la libreria cors de seguridad
const cors = require('cors');

// importamos libreria compression -> reduce archivos 
const compression = require('compression');

//las importamos de los controladores --> controller.js
const controladorPeliculas = require('./api/peliculas/controller');
const controladorUsuarios = require('./api/usuarios/controller');
const basedatos = require('./database/connection');
const { addListener } = require('nodemon');

//importamos la libreria helmet proteccion de vulnerabilidades
const helmet = require('helmet');
// NODE -> crea un obj que se llama process
    // process.env.PORT
require('dotenv').config();


// 2)Iniciar la configuración
const app = express();
app.use(cors()); // limitamos los dominios que queremos que accedan a nuestra API --> seguridad 
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());    // body-parse : convierte a json
app.use(bodyParser.urlencoded({extends: true}));   // convertir datos en json
app.use(morgan(process.env.MORGAN_MODE)); // modo dev -> developer
//const port = 3300; //Definimos el puerto
const port = process.env.PORT; // Configurando el puerto del archivo .env


// 3)Iniciar de rutas --> las importamos de los controladores
app.use("/api/peliculas", controladorPeliculas);   // use. -> usa el controlador Películas
app.use("/api/usuarios", controladorUsuarios);     // use. -> usa el controlador Usuarios

//Configurar Dónde el API va estar monitoreando peticiones
// Promesa -> ahora si vamos a CONECTAR --> Anidacion de metodos por eso no hay {}
basedatos.conectar()
    .then(function(){
        app.listen(port, function(){
            console.log("API ejecutandose en el Puerto :" + port);
            console.log(basedatos.obtenerConexion());
        });
        
    })
    // funcion de rechazar la promesa
    .catch(function(error){
        console.log("Se presento un error al conectar a la BASE DE DATOS");
        console.log(error);
    })


