import { initializeApp } from 'firebase/app';
import { sendPasswordResetEmail, sendEmailVerification, updateProfile, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { firebaseConfig } from './firebase.config';



export const initializeLoginFramework = () => {

    const app = initializeApp(firebaseConfig);

}

export const handleGoogleSignIn = () => {
    const auth = getAuth();
    const gProvider = new GoogleAuthProvider();

    return signInWithPopup(auth, gProvider)
        .then(res => {
            const user = res.user;
            const { email, displayName, photoURL } = user;

            const userDetails = {
                isUser: true,
                name: displayName,
                email: email,
                photo: photoURL,
                success: true
            }

            return userDetails;

        })
        .catch(err => {
            console.log(err.message);
        })

}

export const handleSignOut = () => {
    const auth = getAuth();
    return signOut(auth)
        .then(() => {
            const signOutUserDetails = {
                isUser: false,
                name: '',
                email: '',
                photo: '',
                error: '',
                success: false
            }
            return signOutUserDetails;



        }).catch((error) => {
            // An error happened.
        });

}

export const handleFbLogin = () => {
    const auth = getAuth();
    const fbProvider = new FacebookAuthProvider();

    return signInWithPopup(auth, fbProvider)
        .then((result) => {
            // The signed-in user info.
            const user = result.user;
            user.success = true;
            return user;


            // console.log('Facebook', user);

            // // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            // const credential = FacebookAuthProvider.credentialFromResult(result);
            // const accessToken = credential.accessToken;

            // ...
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = FacebookAuthProvider.credentialFromError(error);

            // ...
        });
}



export const CreateUserWithEmailAndPassword = (name, email, password) => {
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {

            const newUser = userCredential.user;

            const createNewUser = newUser;
            createNewUser.success = true;
            createNewUser.error = '';
            userUpdate(name);

            verifyEmail();

            return createNewUser;



        })
        .catch((error) => {

            const errorMessage = error.message;
            const createNewUser = {}
            createNewUser.error = errorMessage
            createNewUser.success = false;

            return createNewUser


        });
}


export const SignInWithEmailAndPassword = (email, password) => {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {


            const createNewUser = userCredential.user
            createNewUser.success = true;
            createNewUser.error = ''
            return createNewUser;

        })
        .catch((error) => {

            const errorMessage = error.message;
            const createNewUser = {}
            createNewUser.error = errorMessage
            createNewUser.success = false;

            return createNewUser
        });
}


export const userUpdate = name => {
    const auth = getAuth();
    updateProfile(auth.currentUser, {
        displayName: name,
    }).then(() => {
        // Profile updated!
        console.log('Successfully Updated');
        // ...
    }).catch((error) => {
        // An error occurred
        console.log('Successfully Updated Not');
        // ...
    });
}


// Verify Email

const verifyEmail = () => {
    const auth = getAuth();
    sendEmailVerification(auth.currentUser)
        .then(() => {

        });
}

// pass reser

export const resetPassword = (email) => {

    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
        .then(() => {
            // Password reset email sent!
            // ..
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
}