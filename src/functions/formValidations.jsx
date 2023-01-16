export const validateEmail = (email) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return emailRegex.test(email);
}

export const validatePassword = (password) => {
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\.\-\_])[A-Za-z\d@$!%*?&\.\-\_]{8,}$/
    console.log(password)
    return passRegex.test(password);
}

export const validateSamePass = (check, pass) => {
    return check === pass;
}

export const validateName = (nombre) => {
    const nameRegex = /^[a-zA-z]{3,}$/
    return nameRegex.test(nombre);
}

export const validateUser = (user) => {
    const userRegex = /^[A-Za-z\d\.\-\_]{5,}$/;
    return userRegex.test(user);
}

export const validateBirtDate = (birth) => {
    if(birth === ""){
        return false;
    } else {
        let birthDate = new Date(birth)
        let today = new Date();
        birthDate.setFullYear(birthDate.getFullYear()+14);
        console.log(birthDate)
        return today >= birthDate;
    }
}

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
