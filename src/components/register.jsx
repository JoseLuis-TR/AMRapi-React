import React, { useState } from "react";
import { validateEmail, validateUser, validateBirtDate, validatePassword, validateSamePass } from "../functions/formValidations";
import Header from './header';
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import RrssButton from "./botonRedSocial";

function Register() {
    const navigate = useNavigate();
    const [userForm, setuserForm] = useState("");
    const [emailForm, setEmailForm] = useState("");
    const [dateBirth, setDateBirth] = useState("");
    const [savedPassword, setSavedPassword] = useState("");
    const [passwordForm, setPassword] = useState("");
    const [checkPass, setCheckPass] = useState("");

    const handleFormChange = (e) => {
        e.preventDefault();
        let {name, value} = e.target;
        console.log(name)
        console.log(value)

        switch (name) {
            case "usuario":
                if(!validateUser(value)){
                    setuserForm("El usuario debe contener al menos 5 caracteres, aceptando números y algunos caracteres especiales (. - _)")
                } else {
                    setuserForm("")
                }
                break;

            case "email":
                let validEmail = validateEmail(value)
                validEmail === true
                    ? setEmailForm("")
                    : setEmailForm("Email vacio o no válido")
                break;

            case "birthDate":
                
                validateBirtDate(value)
                    ? setDateBirth("")
                    : setDateBirth("Debes ser mayor de 14 años")
                break;

            case "contraseña":
                if(validatePassword(value)){
                    setPassword("");
                    setSavedPassword(value)
                } else {
                    setPassword("La contraseña debe tener: de 8 a 32 caracteres, una letra mayúscula y minúscula, un caracter especial y un número")
                }
                break;

            case "repetirContra":
                console.log(value)
                console.log(savedPassword)
                validateSamePass(value,savedPassword)
                    ? setCheckPass("")
                    : setCheckPass("Debes repetir la contraseña anterior")
                break;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let registerValid = false;
        const formData = new FormData(e.target);
        const formObject = Object.fromEntries(formData.entries());
        console.log(formObject)
        if(validateUser(formObject["usuario"]) &&
            validateEmail(formObject["email"]) &&
            validateBirtDate(formObject["birthDate"]) &&
            "pronombre" in formObject &&
            validatePassword(formObject["contraseña"]) &&
            validateSamePass(formObject["repetirContra"], savedPassword) &&
            "check" in formObject){
                registerValid = true
        }

        if(registerValid){
            alert("Usuario creado correctamente");
            localStorage.setItem("user", formObject["usuario"]);
            localStorage.setItem("email", formObject["email"]);
            localStorage.setItem("pass", formObject["contraseña"]);
            localStorage.setItem("pronoun", formObject["pronombre"])
            navigate("/")
        } else {
            alert("Falta algún dato o no siguen las normas de validación")
        }
        // if(validateEmail(formObject["email"]) && formObject["contraseña"] === password){
        //     console.log("validado")
        //     contactValid = true;
        // }
        // if(contactValid){
        //     alert("Login correcto")
        //     navigate("/")
        // } else {
        //     alert("Email o password incorrectos")
        // }
    }

    return (
        <>
            <Helmet>
                <title>AMR - Registro</title>
            </Helmet>
            <Header 
                titulo="Registro"
            />
            <main className="contenedorCentro">
                <article className="contenedorGenerico">
                    <form className="contenedorGenerico__formulario" action="index.html" onSubmit={handleSubmit}>
                        <label className="contenedorGenerico__formulario--label" htmlFor="usuario" >Usuario</label>
                        <input className="contenedorGenerico__formulario--input" type="text" name="usuario" id="usuario" placeholder="Nombre de usuario" onChange={handleFormChange}/>
                        {userForm.length > 0 &&
                            <p className="error">{userForm}</p>}
                        <label className="contenedorGenerico__formulario--label" htmlFor="email" >Email</label>
                        <input className="contenedorGenerico__formulario--input" type="email" name="email" id="email" placeholder="E-mail" onChange={handleFormChange}/>
                        {emailForm.length > 0 &&
                            <p className="error">{emailForm}</p>}
                        <p className="p-sola">Fecha de nacimiento</p>
                        <input className="contenedorGenerico__formulario--input" type="date" placeholder="Fecha de nacimiento" name="birthDate" onChange={handleFormChange}/>
                        {dateBirth.length > 0 &&
                            <p className="error">{dateBirth}</p>}
                        <section className="form-radio">
                            <p>Escoge tu pronombre</p>
                            <label>
                                <input type="radio" name="pronombre" value="Masculino"/>
                                Masculino [el/ellos]
                            </label>
                            <label>
                                <input type="radio" name="pronombre" value="Masculino [el/ellos]"/>
                                Femenino [ella/ellas]
                            </label>
                            <label>
                                <input type="radio" name="pronombre" value="Masculino [el/ellos]"/>
                                Neutro [elle/elles]
                            </label>
                        </section>
                        <label className="contenedorGenerico__formulario--label" htmlFor="contraseña">Contraseña</label>
                        <input className="contenedorGenerico__formulario--input" type="password" name="contraseña" id="contraseña" placeholder="Contraseña" onChange={handleFormChange}/>
                        {passwordForm.length > 0 &&
                            <p className="error">{passwordForm}</p>}
                        <label className="contenedorGenerico__formulario--label" htmlFor="repetirContra">Repetir contraseña</label>
                        <input className="contenedorGenerico__formulario--input" type="password" name="repetirContra" id="repetirContra" placeholder="Repetir contraseña" onChange={handleFormChange}/>
                        {checkPass.length > 0 &&
                            <p className="error">{checkPass}</p>}
                        <section className="contenedorGenerico__formulario--condiciones">
                            <input type="checkbox" className="contenedorGenerico__formulario--condiciones--checkbox" name="check"/>
                            <p className="contenedorGenerico__formulario--condiciones--texto" >He leido y acepto las condiciones</p>
                        </section>
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
export default Register;