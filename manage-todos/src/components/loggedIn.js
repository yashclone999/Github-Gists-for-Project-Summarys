import React, {useEffect } from 'react';
import { useDispatch} from 'react-redux';
import { loginSuccess } from '../redux/actionCreator';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

function LoggedIn() {

    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);
    const token = searchParams.get('token');
    const err = searchParams.get('err');
    const dispatch = useDispatch();

    useEffect(() => {
        localStorage.setItem("token", token);
    }, [])


    const handle = () => {
        dispatch(loginSuccess(token));
    }


    if (err) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 top-5">Error</div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 top-5" align="center"><Link to={`/projects`} ><button className="button" onClick={handle}>Complete Authentication</button></Link></div>
                </div>
            </div>
        )
    }
}

export default LoggedIn;


