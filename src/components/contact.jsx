import React, { useState } from "react";
import { validateEmail, validateName, validateContactForm } from "../functions/formValidations";
import Header from './header';
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

function Contact() {
    const navigate = useNavigate();
    const [nameForm, setnameForm] = useState("");
    const [emailForm, setEmailForm] = useState("");
    const [asuntoForm, setAsuntoForm] = useState("");
    const [textForm, setTextForm] = useState("");

    const handleFormChange = (e) => {
        e.preventDefault();
        let {name, value} = e.target;      

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

    const handleSubmit = (e) => {
        e.preventDefault();
        let contactValid = false;
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