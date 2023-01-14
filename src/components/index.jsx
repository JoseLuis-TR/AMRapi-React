import React, {useRef} from "react";
import Header from './header';
import Dropdown from "./dropdown";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

function Index() {
    let accents = require('remove-accents');
    const formRef = useRef();
    const navigate = useNavigate();
    const opcionesGenero = {action: 'Acción', adventure:'Aventura', comedy:'Comedia', drama:'Drama', fantasy:'Fantasia'};
    const opcionesDecada = {2020:'2020s', 2010:'2010s', 2000:'2000s', 1990:'90s', 1980:'80s', 1970:'70s'};
    const opcionesMedia = {90:'90% o más', 80:'80% o más', 70:'70% o más', 60:'60% o más', 50:'50% o más', 40:'40% o más'};
    const opcionesEstado = {releasing:'En publicación', finished:'Finalizado'};
    const opcionesTipo = {anime:'Anime', manga:'Manga'}
    const listaOpciones = {"Género":opcionesGenero, "Década":opcionesDecada, "Nota Media":opcionesMedia, "Estado":opcionesEstado, "Tipo":opcionesTipo}

    const handleForm = (event) => {
        event.preventDefault();
        const formData = new FormData(formRef.current);
        const values = Object.fromEntries(formData)
        console.log(values);
        navigate('/results',{state:values});
    }
    return (
        <>
            <Helmet>
                <title>AMR - Inicio</title>
            </Helmet>
            <Header 
                titulo="¿Que deseas descubrir hoy?"
            />
            <main className="contenedorCentro">
            <article className="centro">
                <h2 className="centro__frase">Descubre tu nuevo anime o manga favorito gracias a AMR.</h2>
                <form className="centro__busqueda busqueda__inicio" onSubmit={handleForm} ref={formRef}>
                    <section className="dropdowns">
                        {
                            Object.entries(listaOpciones).map((value,key) => 
                                <Dropdown
                                    key = {key} 
                                    info={accents.remove(value[0].trim().toLowerCase().split(" ").join(""))}
                                    label={value[0]}
                                    opciones = {value[1]}
                                />
                                )
                        }
                    </section>
                    <section className="button">
                        <button onClick={handleForm} className="centro__inputBusqueda">Buscar</button>
                    </section>
                </form>
            </article>
        </main>
        </>
    )
}
export default Index;