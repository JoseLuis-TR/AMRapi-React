import React from 'react';
import { Link } from "react-router-dom";

function ResultBox(props) {
  return (
    <section key={props.key} className="resultados__caja">
        <Link 
            to="/product"
            state={{id:props.id, type:props.status}}>
            <img className="resultados__caja--imagen" src={props.imagen}/>
            <footer className="resultados__caja--cuadroTexto">
                <p className="resultados__caja--nombreSerie">{props.titulo}</p>
            </footer>
        </Link>
    </section>
  );
}

export default ResultBox;