import React from "react";
import Header from './header';
import { Helmet } from "react-helmet";

function Index() {
        return (
        <>
            <Helmet>
                <title>AMR - Inicio</title>
            </Helmet>
            <Header 
                titulo="¿Que deseas ver hoy?"
            />
            <main className="contenedorCentro">
            <article className="centro">
                <h2 className="centro__frase">Descubre tu nuevo anime o manga favorito gracias a AMR.</h2>
                <form className="centro__busqueda busqueda__inicio">
                    <fieldset className="centro__busqueda--opcion">
                        <label for="genero">Género</label>
                        <select name="genero" id="genero">
                        <option value="accion">Acción</option>
                        <option value="aventuras">Aventuras</option>
                        <option value="comedia">Comedia</option>
                        <option value="drama">Drama</option>
                        <option value="fantasia">Fantasía</option>
                        </select>
                    </fieldset>
                    <fieldset className="centro__busqueda--opcion">
                        <label for="decada">Década</label>
                        <select name="decada" id="decada">
                        <option value="2020s">2020s</option>
                        <option value="2010s">2010s</option>
                        <option value="2000s">2000s</option>
                        <option value="90s">90s</option>
                        <option value="80s">80s</option>
                        <option value="70s">70s</option>
                        <option value="60s">60s</option>
                        </select>
                    </fieldset>
                    <fieldset className="centro__busqueda--opcion">
                        <label for="notaMedia">Nota media</label>
                        <select name="notaMedia" id="notaMedia">
                        <option value="9mas">90%</option>
                        <option value="8mas">80%</option>
                        <option value="7mas">70%</option>
                        <option value="6mas">60%</option>
                        <option value="5menos">50% o menos</option>
                        </select>
                    </fieldset>
                </form>
                <a className="centro__inputBusqueda" href="searchResult.html">Buscar</a>
            </article>
            <article className="chooser">
                <p id="chooser__titulo" className="chooser__titulo">Anime</p>
                <input type="checkbox" id="check" className="chooser__check"/>
                <label for="check" className="chooser__label"></label>
            </article>
        </main>
        </>
    )
}

export default Index;