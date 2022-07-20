

import { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { UserContext } from '../../App';
import { resetPassword, SignInWithEmailAndPassword, CreateUserWithEmailAndPassword, handleSignOut, handleFbLogin, initializeLoginFramework, handleGoogleSignIn } from './loginManager'

initializeLoginFramework();


function Login() {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
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

    const handleResponse = (res, redirect) => {
        setUser(res);
        setLoggedInUser(res);
        if (redirect) {
            navigate(from);
        }
    }


    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                handleResponse(res, true);
            })
    }

    const fbSignIn = () => {
        handleFbLogin()
            .then(res => {
                handleResponse(res, true);
            }).catch(err => {
                console.log(err.message);
            })
    }

    const signOut = () => {
        handleSignOut()
            .then(res => {
                handleResponse(res, false);
            })
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
            CreateUserWithEmailAndPassword(user.name, user.email, user.password)
                .then(res => {
                    handleResponse(res, true);
                })


        }

        if (!newUser && user.email && user.password) {
            SignInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    handleResponse(res, true);
                })
        }
        e.preventDefault();
    }



    return (
        <div style={{ textAlign: 'center' }}>
            {user.isUser ? <button onClick={signOut}>Sign Out</button> :
                <button onClick={googleSignIn}>Sign in</button>}
            <br />

            <button onClick={fbSignIn}>Login Using facebook Authentication</button>

            {user.isUser && <div>
                <p>{user.name}</p>
                <p>{user.email}</p>
                <img src={user.photo} alt="UserImage" />
            </div>
            }

            <h1>Signup form</h1>


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

            <button onClick={() => resetPassword(user.email)}>Reset Password</button>

            <p style={{ 'color': 'red' }}>{user.error}</p>
            {
                user.success && <p style={{ 'color': 'green' }}>Successfully user {newUser ? 'Created' : 'Log in'} </p>
            }

        </div>
    );
}

export default Login;
