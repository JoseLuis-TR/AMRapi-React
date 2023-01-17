/**
 * @file genres.jsx - Componentes de muestra de generos en pantalla de producto
 * @author José Luis Tocino Rojo
 */

/**
 * @module Component[Unit]_Genres
 */

/**
 * Componente usado en la vista en detalle del producto para mostrar los generos del producto seleccionado
 * 
 * @memberof module:Component[Unit]_Genres
 * @param {Array.<string>} genres Listado con los generos del producto seleccionado
 * @returns {JSX.Element} Contenido HTML referente al genero del producto mostrado en la vista detallada
 */
function Genres({genres}) {
    if(genres.length === 1){
        return(
            <section className="contenedorSerie__footer--generos">
                <p className="contenedorSerie__footer--generos--texto">{genres[0].toLowerCase()}</p>
            </section>
        )
    } else if(genres.length > 1){
        return(
            <section className="contenedorSerie__footer--generos">
                <p className="contenedorSerie__footer--generos--texto">{genres[0].toLowerCase()}</p>
                <p className="contenedorSerie__footer--generos--texto">{genres[1].toLowerCase()}</p>
            </section>
        )
    }
}
  export default Genres;