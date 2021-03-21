import React from 'react';
import { logout } from '../redux/actionCreator';
import { useDispatch, useSelector } from 'react-redux';
import config from '../config';

const URL = `https://github.com/login/oauth/authorize?client_id=${config.clientID}&redirect_uri=${config.redirectURI}&scope=${config.scope}`;

function Login() {

    const dispatch = useDispatch();

    const Auth = useSelector(State => State.Authorization);

    if (Auth.isAuthenticated) {
        return (
            <>
                <div className="container">
                    <div className="row top-5">
                        <div className="col-12"><span className="project">You are Logged-In!</span></div>
                    </div>
                </div>
                <div className="container">
                    <div className="row top-5">
                        <div className="col-12"><button className="button" onClick={() => dispatch(logout())}>Logout</button></div>
                    </div>
                </div>
            </>
        )
    }
    else {
        return (
            <div className="container"><div className="row top-5"><div className="col-12"><a href={URL}> Login With GITHUB </a> </div></div ></div>
        )
    }

        
}

export default Login;


