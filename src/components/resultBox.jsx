import React from 'react';
import { Link } from "react-router-dom";

function ResultBox(props) {
  return (
    <section key={props.key} class="resultados__caja">
        <Link 
            to="/product"
            state={{id:props.id, type:props.status}}>
            <img class="resultados__caja--imagen" src={props.imagen}/>
            <footer class="resultados__caja--cuadroTexto">
                <p class="resultados__caja--nombreSerie">{props.titulo}</p>
            </footer>
        </Link>
    </section>
  );
}

export default ResultBox;