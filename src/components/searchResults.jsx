import React, {useRef} from "react";
import Header from './header';
import Dropdown from "./dropdown";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Results() {
    const formRef = useRef();
    const navigate = useNavigate();
    const state = useLocation();
    const values = state;
    const opcionesGenero = {action: 'Acción', adventure:'Aventura', comedy:'Comedia', drama:'Drama', fantasy:'Fantasia'};
    const opcionesDecada = {2020:'2020s', 2010:'2010s', 2000:'2000s', 1990:'90s', 1980:'80s', 1970:'70s'};
    const opcionesMedia = {90:'90% o más', 80:'80% o más', 70:'70% o más', 60:'60% o más', 50:'50% o más', 40:'menos de 50%'};
    const opcionesEstado = {releasing:'En publicación', finished:'Finalizado'};
    const opcionesTipo = {anime:'Anime', manga:'Manga', movie:'Pelicula'}

    const handleForm = (event) => {
        event.preventDefault();
        const formData = new FormData(formRef.current);
        const values = Object.fromEntries(formData)
        console.log(values);
        navigate('/results',{values});
    }
    return (
        <>
            <Helmet>
                <title>AMR - Resultados de busqueda</title>
            </Helmet>
            <Header 
                titulo="Busqueda"
            />
            <main className="contenedorCentro">
            <article className="centro">
                <form className="centro__busqueda busqueda__inicio" onSubmit={handleForm} ref={formRef}>
                    <Dropdown
                        info="genero"
                        label="Género"
                        opciones= {opcionesGenero}
                    />
                    <Dropdown
                        info="decada"
                        label="Década"
                        opciones= {opcionesDecada}
                    />
                    <Dropdown
                        info="notaMedia"
                        label="Nota media"
                        opciones={opcionesMedia}
                    />
                    <Dropdown
                        info="estado"
                        label="Estado"
                        opciones={opcionesEstado}
                    />
                    <Dropdown
                        info="tipo"
                        label="Tipo"
                        opciones={opcionesTipo}
                    />
                </form>
                <button onClick={handleForm} className="centro__inputBusqueda">Buscar</button>
            </article>
        </main>
        </>
    )
}
export default Results;