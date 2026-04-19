import { useState } from "react";

import FormInput from "../form-input/form-input.component";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

// field object
const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmpassword: ''
}

const  SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmpassword } = formFields;

    console.log(formFields);

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    // async fnc because generating a user doc inside of an external service
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password != confirmpassword) {
            alert("passwords do not match");
            return;
        }

        try {
           const { user } = await createAuthUserWithEmailAndPassword(email, password);
           
           await createUserDocumentFromAuth(user, { displayName })
           resetFormFields();
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use');
            } else {
                console.log('user creation encountered an error', error);
            }
        }
    }

    //store & set object
    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value})

    };
    
    return(
        <div>
            <h1>Sign up with your email and password</h1>
            <form onSubmit={handleSubmit}>
                <label>Dispaly Name</label>
                <FormInput label="Display Name" type="text" required onChange={handleChange} name="displayName" value={displayName} />

                <label>Email</label>
                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email}/>

                <label>Password</label>
                <FormInput label="Password" type='password' required onChange={handleChange} name="password" value={password}/>

                <label>Confirm Password</label>
                <FormInput label="Confirm Password" type='password' required onChange={handleChange} name="confirmpassword" value={confirmpassword}/>

                <button type='submit'>Sign Up</button>
            </form>
        </div>
    )
}

export default SignUpForm;