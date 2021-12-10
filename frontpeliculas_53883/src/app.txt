import MiPrimerComponente from "./MiPrimerComponente";
import ComponenteClase from "./ComponenteClase"; 
import MiPrimerComponenteArray from "./MiPrimerComponente Array";

function App() {

  let nombre = "Avicci";
  let apellido = "Electro";
  let personas = [
    {"nombre": "Milan"  , "apellido":"fresa" , "edad": 25 },
    {"nombre": "vivian" , "apellido": "roldan"},
    {"nombre": "luisa" , "apellido": "mayorga" }
    
  ]
  // return es lo que se va a mostrar --> FRONTEND
  return (

    <> {/* <> son fragmentos de ReactJS */}
      <h1> Mis primeros pasos en REACT </h1>
      
      {/* Reutilizando componentes en jsx 
            --> React es programación declarativa
            --> AQUI ESTAMOS RECIBIENDO VALORES ESTATICOS*/ }
      
      <MiPrimerComponente nombre="Johanna" apellido="Sanchez"></MiPrimerComponente>
      <MiPrimerComponente nombre="Enny"    apellido="Ramirez"></MiPrimerComponente>
      <MiPrimerComponente nombre="Raif"    apellido="Raif"></MiPrimerComponente>
      <MiPrimerComponente nombre="Fercha"  apellido="Lopez"></MiPrimerComponente>
      
      {/* Recibe valores de las variables arriba del return */}
      <MiPrimerComponente nombre={nombre} apellido={apellido}></MiPrimerComponente>
      <ComponenteClase />
      <br /> <br />
      <h1>Datos desde un array</h1>
      <MiPrimerComponenteArray personas={personas} />
    
    </>

  ); 

}

export default App;
