import React, { useEffect, useState } from "react";
import Header from '../layout/header';
import { Helmet } from "react-helmet";

function UserProfile() {
    const [savedMedia, setSavedMedia] = useState(0)
    const [isLoaded, setLoaded] = useState(false)

    useEffect(() => {
        if(localStorage.getItem("mediaSaved") !== null){
            setSavedMedia(localStorage.getItem("mediaSaved").split(",").length)
            console.log(savedMedia)
        }
    }, [])

    useEffect(() => {
        console.log(savedMedia)
        setLoaded(true)
    }, [savedMedia])

    if(isLoaded){
        return (
            <>
                <Helmet>
                    <title>AMR - Perfil de {localStorage.getItem("user") ? localStorage.getItem("user") : "NOUSER"}</title>
                </Helmet>
                <Header 
                    titulo="Perfil de usuario"
                />
                <main className="contenedorCentro">
                    <article className="contenedorPerfil">
                        <section className="contenedorPerfil__infoUsuario">
                            <img src={require("../../assets/images/pfp.jpg")} alt="Foto de perfil" className="contenedorPerfil__infoUsuario--foto"/>
                            <p className="contenedorPerfil__infoUsuario--nombreUsuario">{localStorage.getItem("user") ? localStorage.getItem("user") : "NOUSER"}</p>
                            <div className="contenedorPerfil__infoUsuario--guardadas">
                                <p className="contenedorPerfil__infoUsuario--guardadas--titulo">Series guardadas</p>
                                <p className="contenedorPerfil__infoUsuario--guardadas--numero">{savedMedia}</p>
                            </div>
                        </section>
                        <span className="contenedorPerfil__lineaVertical"></span>
                        <section className="contenedorPerfil__modificarDatos">
                            <form className="contenedorPerfil__modificarDatos__formulario">
                                <label className="contenedorPerfil__modificarDatos__formulario--label" htmlFor="usuario" >Usuario</label>
                                <input className="contenedorPerfil__modificarDatos__formulario--input" type="text" name="usuario" id="usuario" value={localStorage.getItem("user") ? localStorage.getItem("user") : "NOUSER"} disabled="true"/>
                                <label className="contenedorPerfil__modificarDatos__formulario--label" htmlFor="email" >E-mail</label>
                                <input className="contenedorPerfil__modificarDatos__formulario--input" type="email" name="email" id="email" value={localStorage.getItem("email") ? localStorage.getItem("email") : "NOEMAIL"} disabled="true"/>
                                <label className="contenedorPerfil__modificarDatos__formulario--label" htmlFor="pass" >Contraseña</label>
                                <input className="contenedorPerfil__modificarDatos__formulario--input" type="password" name="pass" id="pass" value={localStorage.getItem("pass") ? localStorage.getItem("pass") : ""} disabled="true"/>
                                <label className="contenedorPerfil__modificarDatos__formulario--label" htmlFor="pronombre" >Pronombre</label>
                                <input className="contenedorPerfil__modificarDatos__formulario--input" type="text" name="pronombre" id="pronombre" value={localStorage.getItem("pronoun") ? localStorage.getItem("pronoun") : "NOPRONOUN"} disabled="true"/>
                            </form>
                        </section>
                    </article>
                </main>
            </>
        )
    }
}
export default UserProfile;