function Genres(props) {
    if(props.genres.length === 1){
        return(
            <section className="contenedorSerie__footer--generos">
                <p className="contenedorSerie__footer--generos--texto">{props.genres[0].toLowerCase()}</p>
            </section>
        )
    } else if(props.genres.length > 1){
        return(
            <section className="contenedorSerie__footer--generos">
                <p className="contenedorSerie__footer--generos--texto">{props.genres[0].toLowerCase()}</p>
                <p className="contenedorSerie__footer--generos--texto">{props.genres[1].toLowerCase()}</p>
            </section>
        )
    }
}
  export default Genres;