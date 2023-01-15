function Status(props) {
    if(props.status === "FINISHED"){
        return(
            <p class="contenedorSerie__info--basico--texto">{props.episodes} episodios</p>
        )
    } else if(props.status === "RELEASING"){
        return(
            <p class="contenedorSerie__info--basico--texto">En publicación</p>
        )
    }
}
  export default Status;