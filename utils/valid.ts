const valid = (name: string, email: string, password: string, cf_password: string) => {
    if(!name || !email || !password)
        return "Please fill in all fields."

    if(name.length > 10){
        return "Your username can't be that long."
    }

    if(!validateEmail(email)){
        return "Invalid email."
    }

    if(password.length < 6){
        return "Password must be at least 6 characters."
    }

    if(password !== cf_password){
        return "Passwords did not match."
    }
}

const validateEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export default valid;

export {
    validateEmail,
};