/**
 * @file login.jsx - Componente formulario login
 * @author José Luis Tocino Rojo
 */

/**
 * @module Component[View]_Login
 */

import React, { useState } from "react";
import { validateEmail } from "../../functions/formValidations";
import Header from '../layout/header';
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import RrssButton from "../botonRedSocial";

/**
 * Componente que se encarga de mostrar y administrar las validaciones del formulario de login
 * <br>
 * <br>
 * <b><u>FUNCIONES INTERNAS</u></b>
 * <br>
 * - <b>handleFormChange</b>
 * - <b>handleSubmit</b>
 * 
 * @memberof module:Component[View]_Login
 * @returns {JSX.Element} Devuelve el contenido de la página de login
 */
function Login() {
    // Hook de Router usado para redirigir a otro componente
    const navigate = useNavigate();
    // Estado para el input de email y una contraseña para probar validación
    const [emailForm, setEmailForm] = useState("");
    const password = "Pestillo.123"

    /**
     * @description Función llamada cada vez que se produzca un cambio en el input de email
     * para poder mostrar en pantalla si se ha escrito un email correcto
     * @name handleFormChange
     * @function 
     * @param {event} e El evento que recoge el cambio en el input de email
     */
    const handleFormChange = (e) => {
        e.preventDefault();
        // Recogemos el valor
        let {name, value} = e.target;      

        // Se valida y se setea el mensaje
        let validEmail = validateEmail(value)
                validEmail === true
                    ? setEmailForm("")
                    : setEmailForm("Email vacio o no válido")
    }

     /**
     * @description Función que es llamada al utilizar el submit que se encarga de realizar una ultima
     * validación de los datos de login 
     * @name handleSubmit
     * @function 
     * @param {event} e El evento que recoge los valores del formulario
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        let contactValid = false;
        // Se recogen datos del formulario
        const formData = new FormData(e.target);
        const formObject = Object.fromEntries(formData.entries());
        // Se comprueba la validación
        if(validateEmail(formObject["email"]) && formObject["contraseña"] === password){
            contactValid = true;
        }
        if(contactValid){
            alert("Login correcto")
            navigate("/")
        } else {
            alert("Email o password incorrectos")
        }
    }

    return (
        <>
            <Helmet>
                <title>AMR - Inicia sesión</title>
            </Helmet>
            <Header 
                titulo="Inicia sesión"
            />
            <main className="contenedorCentro">
            <article className="contenedorGenerico">
                <form className="contenedorGenerico__formulario" action="index.html" onSubmit={handleSubmit}>
                    <label className="contenedorGenerico__formulario--label" htmlFor="email" >Email</label>
                    <input className="contenedorGenerico__formulario--input" type="email" name="email" id="email" placeholder="E-mail" onChange={handleFormChange}/>
                    {emailForm.length > 0 &&
                        <p className="error">{emailForm}</p>}
                    <label className="contenedorGenerico__formulario--label" htmlFor="asunto">Contraseña</label>
                    <input className="contenedorGenerico__formulario--input" type="password" name="contraseña" id="contraseña" placeholder="Contraseña"/>
                    <input className="contenedorGenerico__formulario--submit" type="submit" value="Iniciar Sesion"/>
                </form>
                <p className="contenedorGenerico__letra">
                    <span className="contenedorGenerico__letra--linea">o</span>
                </p>
                <section className="contenedorGenerico__redesSociales">
                    <RrssButton 
                        name="google"
                    />
                    <RrssButton 
                        name="facebook"
                    />
                    <RrssButton 
                        name="twitter"
                    />
                </section>
                </article>
            </main>
        </>
    )
}
export default Login;