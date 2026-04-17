import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';

import {
    auth,
    signInWithGooglePopup,
    signInWithGoogleRedirect,
    createUserDocumentFromAuth,
 } from '../../utils/firebase/firebase.utils';


const SignIn = () => {
   useEffect(() => {
        const getGoogleResponse = async () => {
            const response = await getRedirectResult(auth);
            console.log(response);
            if (response) {
                const userDocRef = await createUserDocumentFromAuth(response.user)
            }
        }
        getGoogleResponse().catch(console.error);
    }, []);

   const logGoogleUser = async () => {
      const { user } = await signInWithGooglePopup();
      const userDocRef = await createUserDocumentFromAuth(user);
      console.log(user);
   };

//    const logGoogleRedirectUser = async () => {
//         const { user } = await signInWithGoogleRedirect();
//         console.log({user});
//     };
    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>Sign in with Google Popup</button>
            <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button>

        </div>
    );
};

export default SignIn;