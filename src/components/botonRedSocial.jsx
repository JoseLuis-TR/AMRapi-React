function RrssButton(props) {
    return(
        <div className="contenedorGenerico__redesSociales--boton">
            <img src={require(`../assets/images/${props.name}.png`)} alt={`Logo de ${props.name}`} className="contenedorGenerico__redesSociales--boton--logo"/>
            <p className="contenedorGenerico__redesSociales--boton--texto">Continuar con {props.name.charAt(0).toUpperCase() + props.name.slice(1)}</p>
        </div>
    )
}
  export default RrssButton;