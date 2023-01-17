/**
 * @file formValidations.jsx - Funciones varias de validación
 * @author José Luis Tocino Rojo
 */

/**
 * @module Functions_Validations
 */

/**
 * Función que valida el email usando una expresión regular
 * 
 * @memberof module:Functions_Validations
 * @function
 * @param {string} email Email a validar
 * @return {boolean}
 */
export const validateEmail = (email) => {
    // Expresión regular que testea si lo recibido es un email valido
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return emailRegex.test(email);
}

/**
 * Función que valida la contraseña usando una expresión regular
 * 
 * @memberof module:Functions_Validations
 * @function
 * @param {string} password Contraseña a validar
 * @return {boolean}
 */
export const validatePassword = (password) => {
    // Contraseñas de más de 8 a 32 y debe de tener al menos una minúscula, una mayuscula, un número y un caracter especial
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\.\-\_])[A-Za-z\d@$!%*?&\.\-\_]{8,32}$/
    return passRegex.test(password);
}

/**
 * Función que valida que la contraseña al registrarse se repite corretamente
 * 
 * @memberof module:Functions_Validations
 * @function
 * @param {string} check Contraseña que debe ser igual
 * @param {string} pass Contraseña a probar
 * @return {boolean}
 */
export const validateSamePass = (check, pass) => {
    return check === pass;
}

/**
 * Función que valida el nombre usando una expresión regular
 * 
 * @memberof module:Functions_Validations
 * @function
 * @param {string} nombre Nombre a validar
 * @return {boolean}
 */
export const validateName = (nombre) => {
    // Nombre solo letras mínimo de 3 caracteres
    const nameRegex = /^[a-zA-z]{3,}$/
    return nameRegex.test(nombre);
}

/**
 * Función que valida el nombre de usuario usando una expresión regular
 * 
 * @memberof module:Functions_Validations
 * @function
 * @param {string} user Nombre de usuario a validar
 * @return {boolean}
 */
export const validateUser = (user) => {
    // Nombre de usuario que acepta letras, numeros y algún caracter especial
    const userRegex = /^[A-Za-z\d\.\-\_]{5,}$/;
    return userRegex.test(user);
}

/**
 * Función que valida que la fecha indicada es anterior a 14 años a nuestra fecha actual
 * 
 * @memberof module:Functions_Validations
 * @function
 * @param {string} birth Fecha a validar
 * @return {boolean}
 */
export const validateBirtDate = (birth) => {
    if(birth === ""){
        return false;
    } else {
        let birthDate = new Date(birth)
        let today = new Date();
        birthDate.setFullYear(birthDate.getFullYear()+14);
        return today >= birthDate;
    }
}

/**
 * Función que valida el formulario de contacto por completo para su submit
 * 
 * @memberof module:Functions_Validations
 * @function
 * @param {string} key Apartado a validar
 * @param {string} value Valor del apartado que queremos validar
 * @return {boolean}
 */
export const validateContactForm = (key,value) => {
    switch (key) {
        case "nombre":
            return validateName(value);

        case "email":
            return validateEmail(value);

        case "asunto":
            return value.length >= 10

        case "mensaje":
            return value.length >= 20
    }
}
