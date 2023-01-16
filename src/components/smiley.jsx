function Smiley(props) {
  if(props.nota >= 0 && props.nota < 45){
    return(
        <img src={require("../assets/images/sad.png")} alt="Smiley" className="contenedorSerie__extra--nota--imagen"/>
    )
  } else if(props.nota >= 45 && props.nota < 75){
    return(
        <img src={require("../assets/images/neutral.png")} alt="Smiley" className="contenedorSerie__extra--nota--imagen"/>
    )
  } else if (props.nota >= 75 && props.nota <= 100){
    return(
        <img src={require("../assets/images/happy.png")} alt="Smile" className="contenedorSerie__extra--nota--imagen"/>
    )
  }
}

export default Smiley;