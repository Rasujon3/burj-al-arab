import React, { useContext, useState } from 'react';
// import { GoogleAuthProvider } from "firebase/auth";
// import { getAuth, signInWithPopup } from "firebase/auth";
// import { initializeApp } from 'firebase/app';
import firebase from 'firebase/app';
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';



const Login = () => {
    const [loggedInUser,setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();

    const { from } = location.state || { from: { pathname: "/" } };

    // const app = initializeApp(firebaseConfig);
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }else {
        firebase.app(); // if already initialized, use that one
      }

    const handleGoogleSignIn = () =>{
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            const {displayName,email} = result.user;
            const signedInUser = {name : displayName,email}
            console.log(signedInUser);
            setLoggedInUser(signedInUser);
            storeAuthToken();
            history.replace(from);
            // ...
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });

    }

    const storeAuthToken = () =>{
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
        .then(function(idToken) {
            sessionStorage.setItem('token',idToken);
          }).catch(function(error) {
            // Handle error
          });
    }

    return (
        <div>
            <h1>This is Login</h1>
            <button onClick={handleGoogleSignIn}>Google Sign In</button>
        </div>
    );
};

export default Login;