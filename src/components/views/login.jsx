import React, { useState } from "react";
import { validateEmail } from "../../functions/formValidations";
import Header from '../layout/header';
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import RrssButton from "../botonRedSocial";

function Login() {
    const navigate = useNavigate();
    const [emailForm, setEmailForm] = useState("");
    const password = "Pestillo.123"

    const handleFormChange = (e) => {
        e.preventDefault();
        let {name, value} = e.target;      

        let validEmail = validateEmail(value)
                validEmail === true
                    ? setEmailForm("")
                    : setEmailForm("Email vacio o no válido")
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let contactValid = false;
        const formData = new FormData(e.target);
        const formObject = Object.fromEntries(formData.entries());
        if(validateEmail(formObject["email"]) && formObject["contraseña"] === password){
            console.log("validado")
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