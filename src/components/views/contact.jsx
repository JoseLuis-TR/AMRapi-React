/**
 * @file contact.jsx - Componente formulario contacto
 * @author José Luis Tocino Rojo
 */

/**
 * @module Component[View]_Contact
 */

import React, { useState } from "react";
import { validateEmail, validateName, validateContactForm } from "../../functions/formValidations";
import Header from '../layout/header';
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

/**
 * Componente que se encarga de mostrar y administrar las validaciones del formulario de contacto
 * <br>
 * <br>
 * <b><u>FUNCIONES INTERNAS</u></b>
 * <br>
 * - <b>handleFormChange</b>
 * - <b>handleSubmit</b>
 * 
 * @memberof module:Component[View]_Contact
 * @returns {JSX.Element} Devuelve el contenido de la página de contacto
 */
function Contact() {
    // Hook de Router usado para redirigir a otro componente
    const navigate = useNavigate();
    // Estados y setters de los inputs del formulario
    const [nameForm, setnameForm] = useState("");
    const [emailForm, setEmailForm] = useState("");
    const [asuntoForm, setAsuntoForm] = useState("");
    const [textForm, setTextForm] = useState("");

    /**
     * @description Función llamada cada vez que se produzca un cambio en alguno de los inputs del
     * formulario para validar el contenido
     * @name handleFormChange
     * @function 
     * @param {event} e El evento que recoge el cambio en el input del formulario
     */
    const handleFormChange = (e) => {
        e.preventDefault();
        // Se recoge nombre de input y su valor
        let {name, value} = e.target;      

        // Si no se valida se muestra mensaje en pantalla
        switch (name) {
            case "nombre":
                if(!validateName(value)){
                    setnameForm("El nombre debe tener al menos 3 caracteres y no llevar números")
                } else {
                    setnameForm("")
                }
                break;

            case "email":
                let validEmail = validateEmail(value)
                validEmail === true
                    ? setEmailForm("")
                    : setEmailForm("Email vacio o no válido")
                break;

            case "asunto":
                value.length < 10
                    ? setAsuntoForm("El asunto debe tener al menos 10 caracteres")
                    : setAsuntoForm("")
                break;

            case "mensaje":
                value.length < 20
                    ? setTextForm("El mensaje debe tener al menos 20 caracteres")
                    : setTextForm("")
                break;
        }
    }

    /**
     * @description Función que es llamada al utilizar el submit que se encarga de realizar una ultima
     * validación de los datos del formulario 
     * @name handleSubmit
     * @function 
     * @param {event} e El evento que recoge los valores del formulario
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        let contactValid = false;
        // Se recogen datos y nombre de los inputs del formulario
        const formData = new FormData(e.target);
        const formObject = Object.fromEntries(formData.entries());
        for(const key in formObject){
            contactValid = validateContactForm(key, formObject[key])
        }
        if(contactValid){
            alert("Mensaje enviado")
            navigate("/")
        }
    }

    return (
        <>
            <Helmet>
                <title>AMR - Contacto</title>
            </Helmet>
            <Header 
                titulo="Contacte con nosotros"
            />
            <main className="contenedorCentro">
            <section className="contenedorGenerico">
                <p className="contenedorGenerico__mensaje">Utilice este formulario para hacernos llegar cualquier comentario o pregunta que tenga sobre la web o su funcionamiento.</p>
                <form className="contenedorGenerico__formulario" action="index.html" onSubmit={handleSubmit} >
                    <label className="contenedorGenerico__formulario--label" htmlFor="nombre">Nombre</label>
                    <input className={nameForm.length > 0 ? "contenedorGenerico__formulario--input error-input" : "contenedorGenerico__formulario--input"} type="text" name="nombre"  placeholder="Nombre" onChange={handleFormChange}/>
                    {nameForm.length > 0 &&
                        <p className="error">{nameForm}</p>}
                    <label className="contenedorGenerico__formulario--label" htmlFor="email" >Email</label>
                    <input className={emailForm.length > 0 ? "contenedorGenerico__formulario--input error-input" : "contenedorGenerico__formulario--input"} type="text" name="email" placeholder="E-mail" onChange={handleFormChange}/>
                    {emailForm.length > 0 &&
                        <p className="error">{emailForm}</p>}
                    <label className="contenedorGenerico__formulario--label" htmlFor="asunto">Asunto</label>
                    <input className={asuntoForm.length > 0 ? "contenedorGenerico__formulario--input error-input" : "contenedorGenerico__formulario--input"} type="text" name="asunto"  placeholder="Asunto" onChange={handleFormChange}/>
                    {asuntoForm.length > 0 &&
                        <p className="error">{asuntoForm}</p>}
                    <label className="contenedorGenerico__formulario--label" htmlFor="mensaje">Mensaje a enviar</label>
                    <textarea className={textForm.length > 0 ? "contenedorGenerico__formulario--textArea error-input" : "contenedorGenerico__formulario--textArea"} name="mensaje" placeholder="Escriba su mensaje aquí" onChange={handleFormChange}></textarea>
                    {textForm.length > 0 &&
                        <p className="error">{textForm}</p>}
                    <input className="contenedorGenerico__formulario--submit" type="submit" value="Enviar"/>
                    </form>
                </section>
            </main>
        </>
    )
}
export default Contact;