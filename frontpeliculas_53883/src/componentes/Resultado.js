import '../estilos/resultado.css';

function Resultado(props){

    /* SEMANTICA
        <header>
        <nav>
        <section>
            <article>....es un elemento que se muestra de una seccion 
        <footer>    
    */

    function handleClick(evento){
        // TODO: Redireccionar al detalle de la pelicula.
        evento.stopPropagation();
        alert("Click en contenedor películas");
    }

    function handleClickPoster(evento){
        evento.stopPropagation(); //cancela la propagacion de este evento
        alert("Click en el póster");
    }

    return(
        <>
            <div className="dv-pelicula" onClick= {handleClick}>
                <div className="dv-poster">
                    <img onClick={handleClickPoster} alt="poster" src="https://m.media-amazon.com/images/I/81ai6zx6eXL._AC_SY679_.jpg"/>
                </div>
                <div>
                    <h3>TÍTULO</h3>
                </div>
                <div>
                    <p>SINOPSIS</p>
                </div>
                <div>
                    <span>
                        Rating
                        <i></i>
                    </span>
                </div>
            </div>
        </>
    );

}
export default Resultado;