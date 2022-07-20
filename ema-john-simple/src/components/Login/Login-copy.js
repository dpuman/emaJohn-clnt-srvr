import { initializeApp } from 'firebase/app';
import { updateProfile, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';

import { firebaseConfig } from './firebase.config';


const app = initializeApp(firebaseConfig);

function Login() {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext)

    const gProvider = new GoogleAuthProvider();
    const fbProvider = new FacebookAuthProvider();

    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isUser: false,
        name: '',
        email: '',
        password: '',
        photo: '',
        error: '',
        success: false,

    })
    let navigate = useNavigate();
    let location = useLocation();


    let { from } = location.state || { from: { pathname: "/" } };

    const handleSignOut = () => {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                const signOutUserDetails = {
                    isUser: false,
                    name: '',
                    email: '',
                    photo: '',
                }
                setUser(signOutUserDetails);

                alert('Sign out successful ');

            }).catch((error) => {
                // An error happened.
            });

    }

    const handleSignInClick = () => {
        const auth = getAuth();
        signInWithPopup(auth, gProvider)
            .then(res => {
                const user = res.user;
                const { email, displayName, photoURL } = user;

                const userDetails = {
                    isUser: true,
                    name: displayName,
                    email: email,
                    photo: photoURL,
                }

                setUser(userDetails);
                console.log(email, displayName, photoURL);
            })
            .catch(err => {
                console.log(err.message);
            })

    }

    const handleFbLogin = () => {
        const auth = getAuth();
        signInWithPopup(auth, fbProvider)
            .then((result) => {
                // The signed-in user info.
                const user = result.user;

                console.log('Facebook', user);

                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                const credential = FacebookAuthProvider.credentialFromResult(result);
                const accessToken = credential.accessToken;

                // ...
            })
            .catch((error) => {

                const errorMessage = error.message;
                console.log(errorMessage);

                // ...
            });
    }




    const handleInput = (event) => {
        // console.log(event.target.name + event.target.value);

        let isValidInput = true;

        if (event.target.name === 'email') {
            isValidInput = /\S+@\S+\.\S+/.test(event.target.value);
        }
        if (event.target.name === 'password') {

            const checkNumber = /\d{1}/.test(event.target.value);
            const checkLength = event.target.value.length > 6;
            isValidInput = checkNumber && checkLength;
        }

        if (isValidInput) {
            const newUser = { ...user }
            newUser[event.target.name] = event.target.value;
            setUser(newUser);
        }
    }

    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {

            const auth = getAuth();
            createUserWithEmailAndPassword(auth, user.email, user.password)
                .then((userCredential) => {

                    const newUser = userCredential.user;

                    const createNewUser = { ...user }
                    createNewUser.success = true;
                    createNewUser.error = ''
                    setUser(createNewUser);
                    userUpdate(user.name);
                    // console.log(newUser);

                })
                .catch((error) => {

                    const errorMessage = error.message;
                    const createNewUser = { ...user }
                    createNewUser.error = errorMessage
                    createNewUser.success = false;
                    setUser(createNewUser);


                });
        }

        if (!newUser && user.email && user.password) {
            const auth = getAuth();
            signInWithEmailAndPassword(auth, user.email, user.password)
                .then((userCredential) => {

                    // const newUser = userCredential.user;
                    // console.log(newUser);

                    const createNewUser = { ...user }
                    createNewUser.success = true;
                    createNewUser.error = ''
                    setUser(createNewUser);
                    setLoggedInUser(createNewUser);

                    navigate(from);
                })
                .catch((error) => {

                    const errorMessage = error.message;
                    const createNewUser = { ...user }
                    createNewUser.error = errorMessage
                    createNewUser.success = false;
                    setUser(createNewUser);
                });

        }

        e.preventDefault();
    }


    const userUpdate = name => {
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
    return (
        <div style={{ textAlign: 'center' }}>
            {user.isUser ? <button onClick={handleSignOut}>Sign Out</button> :
                <button onClick={handleSignInClick}>Sign in</button>}
            <br />

            {/* <button onClick={handleFbLogin}>Login Using facebook Authentication</button> */}

            {user.isUser && <div>
                <p>{user.name}</p>
                <p>{user.email}</p>
                <img src={user.photo} alt="UserImage" />
            </div>
            }

            <h1>Authentication Form</h1>
            <br />


            <form onSubmit={handleSubmit}>
                <input onChange={() => { setNewUser(!newUser) }} type="checkbox" name="newUser" id="newUser" />
                <label htmlFor="newUser">New User Sign Up</label>
                <br />

                {newUser && <input onBlur={handleInput} type="text" name="name" placeholder="Name" />}
                <br />
                <input onBlur={handleInput} type="email" name="email" placeholder="Email" required />
                <br />
                <input onBlur={handleInput} type="password" name="password" placeholder="Password" required />
                <br />
                <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'} />
            </form>

            <p style={{ 'color': 'red' }}>{user.error}</p>
            {
                user.success && <p style={{ 'color': 'green' }}>Successfully user {newUser ? 'Created' : 'Log in'} </p>
            }

        </div>
    );
}

export default Login;
