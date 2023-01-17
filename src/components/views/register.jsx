/**
 * @file register.jsx - Componente formulario registro
 * @author José Luis Tocino Rojo
 */

/**
 * @module Component[View]_Register
 */

import React, { useState } from "react";
import { validateEmail, validateUser, validateBirtDate, validatePassword, validateSamePass } from "../../functions/formValidations";
import Header from '../layout/header';
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import RrssButton from "../botonRedSocial";

/**
 * Componente que se encarga de mostrar y administrar las validaciones del formulario de registro
 * <br>
 * <br>
 * <b><u>FUNCIONES INTERNAS</u></b>
 * <br>
 * - <b>handleFormChange</b>
 * - <b>handleSubmit</b>
 * 
 * @memberof module:Component[View]_Register
 * @returns {JSX.Element} Devuelve el contenido de la página de registro
 */
function Register() {
    // Hook de Router usado para redirigir a otro componente
    const navigate = useNavigate();
    // Estado y setters de los inputs del formulario
    const [userForm, setuserForm] = useState("");
    const [emailForm, setEmailForm] = useState("");
    const [dateBirth, setDateBirth] = useState("");
    const [savedPassword, setSavedPassword] = useState("");
    const [passwordForm, setPassword] = useState("");
    const [checkPass, setCheckPass] = useState("");

    /**
     * @description Función llamada cada vez que se produzca un cambio en alguno de los inputs
     * del formulario para validarlos y mostrar en pantalla en caso de error
     * @name handleFormChange
     * @function 
     * @param {event} e El evento que recoge el cambio en los inputs del formulario
     */
    const handleFormChange = (e) => {
        e.preventDefault();
        // Recogemos nombre y valor del input
        let {name, value} = e.target;

        // Se valida y se setea el mensaje de error
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
                validateSamePass(value,savedPassword)
                    ? setCheckPass("")
                    : setCheckPass("Debes repetir la contraseña anterior")
                break;
        }
    }

    /**
     * @description Función que es llamada al utilizar el submit que se encarga de realizar una ultima
     * validación de los datos de registro
     * @name handleSubmit
     * @function 
     * @param {event} e El evento que recoge los valores del formulario
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        let registerValid = false;
        // Se recogen los datos del formulario
        const formData = new FormData(e.target);
        const formObject = Object.fromEntries(formData.entries());
        // Se busca validar todos los inputs
        if(validateUser(formObject["usuario"]) &&
            validateEmail(formObject["email"]) &&
            validateBirtDate(formObject["birthDate"]) &&
            "pronombre" in formObject &&
            validatePassword(formObject["contraseña"]) &&
            validateSamePass(formObject["repetirContra"], savedPassword) &&
            "check" in formObject){
                registerValid = true
        }

        // SI es valido se guardan los datos al localStorage y se vuelve al inicio
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
                                <input type="radio" name="pronombre" value="Masculino [el/ellos]"/>
                                Masculino [el/ellos]
                            </label>
                            <label>
                                <input type="radio" name="pronombre" value="Femenino [ella/ellas]"/>
                                Femenino [ella/ellas]
                            </label>
                            <label>
                                <input type="radio" name="pronombre" value="Neutro [elle/elles]"/>
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