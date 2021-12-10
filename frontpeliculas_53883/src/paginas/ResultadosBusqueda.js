import Resultado from "../componentes/Resultado";

function ResultadosBusqueda(){
    
    // llamar eventos de la siguiente manera
    //  Recomendacion llamar a funciones manejardo eventos --> habdleSubmitFormularioUno
    function handleSubmit(evento){
        evento.preventDefault();
    }

    function handleChange(evento){
        console.log(evento);
        console.log(evento.target);
        console.log(evento.target.value);

    }

    return(
    <>
        
        <div className="dv-busqueda">
            {/* vamos a crear un formulario */}
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend> Buscar Película </legend>
                    <input type="text" id="busqueda" name="busqueda" onChange={handleChange} placeholder="Buscar por título"></input>
                </fieldset>
            </form>
        </div>

        <div>
            <fieldset>
                <legend>Listado Películas</legend>
                {/*Contenedor de los cuadros de las películas */}
                <div className="dv-resultados">
                    {/*vamos a crear las FlexBox -> para las tarjetas de las películas */}
                        <Resultado/>
                        <Resultado/>
                        <Resultado/>
                        <Resultado/>
                        <Resultado/>
                        <Resultado/>
                </div>
            </fieldset>

        </div>
    </>

    );
}



export default ResultadosBusqueda;