function Status(props) {
    if(props.status === "FINISHED"){
        return(
            <p className="contenedorSerie__info--basico--texto">{props.episodes} episodios</p>
        )
    } else if(props.status === "RELEASING"){
        return(
            <p className="contenedorSerie__info--basico--texto">En publicación</p>
        )
    }
}
  export default Status;