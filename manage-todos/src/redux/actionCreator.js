import * as ActionTypes from './actionTypes';
import axios from 'axios';
import config from '../config';
let baseURL = config.URL;


//----------------------PROJECTS-----------------

export const addProject = (projects) => {
    return {
        type: ActionTypes.ADD_PROJECTS,
        payload: projects
    }
}

export const addToProject = (project) => {
    return {
        type: ActionTypes.ADD_TO_PROJECTS,
        payload: project
    }
}

export const addUpdatedProject = (project) => {
    return {
        type: ActionTypes.ADD_UPDATED_PROJECT,
        payload: project
    }
}

export const loadingProject = () => {
    return {
        type: ActionTypes.LOADING_PROJECTS
    }
}

export const errorProject = (err) => {
    return {
        type: ActionTypes.PROJECTS_ERROR,
        payload: err
    }
}

//----------------------Fetch PROJECTS-----------------
export const fetchProject = () => (dispatch) => {

    dispatch(loadingProject());

    const bearer = 'Bearer ' + localStorage.getItem('token');
    const fetch = axios({
        method: "get",
        url: baseURL + "/projects",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    });

    fetch.then((res) => {
        if (res.status === 200) {
            dispatch(addProject(res.data));
        }
        else {
            dispatch(errorProject("problem with response: " + res.status));
        }
    })
    .catch(err => {
            if (err.response) {
                dispatch(errorProject("problem with response: " + err.response.status));

            }
            else if (err.request) {
                dispatch(errorProject("problem with request"));
            }
            else {
                dispatch(errorProject(err.message));
            }

        });   
}
//----------------------Post PROJECTS-----------------


export const PostProject = (project) => (dispatch) => {

    dispatch(loadingProject());
    
    const bearer = 'Bearer ' + localStorage.getItem('token');

    const POST = axios({
        method: "post",
        url: baseURL + "/projects",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin',
        data: JSON.stringify(project)
    });

    POST.then((res) => {

        if (res.status === 200) {
            dispatch(addToProject(res.data));
        }
        else {
            dispatch(errorProject("problem with response: " + res.status));
        }
    })
    .catch(err => {
            if (err.response) {
                dispatch(errorProject("problem with response: " + err.response.status));

            }
            else if (err.request) {
                dispatch(errorProject("problem with request"));
            }
            else {
                dispatch(errorProject(err.message));
            }

    });   
        

}

//----------------------Update PROJECTS-----------------

export const PutProject = (project) => (dispatch) => {

    dispatch(loadingProject());

    const bearer = 'Bearer ' + localStorage.getItem('token');

    const PUT = axios({
        method: "put",
        url: baseURL + `/projects/${project._id}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin',
        data: JSON.stringify(project.name)
    });

    PUT.then((res) => {

        if (res.status === 200) {
            dispatch(addUpdatedProject(res.data));
        }
        else {
            dispatch(errorProject("problem with response: " + res.status));
        }
    })
        .catch(err => {
            if (err.response) {
                dispatch(errorProject("problem with response: " + err.response.status));

            }
            else if (err.request) {
                dispatch(errorProject("problem with request"));
            }
            else {
                dispatch(errorProject(err.message));
            }

        });


}


//----------------------TODOS-----------------

const loadingTodos = () => {
    return {
        type: ActionTypes.TODOS_LOADING
    }
};

const todoSuccess = () => {
    return {
        type: ActionTypes.TODOS_SUCCESS
    }
};
const errorTodos = (err) => {
    return {
        type: ActionTypes.TODOS_ERROR,
        payload: err
    }
};

//----------------------Put TODOS-----------------

export const PutTodo = (data) => (dispatch) => {

    dispatch(loadingTodos());

    const bearer = 'Bearer ' + localStorage.getItem('token');

    var TODO = axios({
        method: "put",
        url: baseURL + `/todo/${data._id}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin',
        data: JSON.stringify(data.todo)
    });

    TODO.then((res) => {

        if (res.status === 200) {
            dispatch(todoSuccess());
            dispatch(addUpdatedProject(res.data));
        }
        else {
            dispatch(errorTodos("problem with response: " + res.status));
        }
    })
    .catch(err => {
        if (err.response) {
            dispatch(errorTodos("problem with response: " + err.response.status));

        }
        else if (err.request) {
            dispatch(errorTodos("problem with request"));
        }
        else {
            dispatch(errorTodos(err.message));
        }

    });


}

//----------------------Post TODOS-----------------

export const PostTodo = (data) => (dispatch) => {

    dispatch(loadingTodos());

    const bearer = 'Bearer ' + localStorage.getItem('token');

    var TODO = axios({
        method: "post",
        url: baseURL + "/todo",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin',
        data: JSON.stringify(data.todo)
    });

    TODO.then((res) => {

        if (res.status === 200) {
            dispatch(todoSuccess());
            dispatch(addUpdatedProject(res.data));
        }
        else {
            dispatch(errorTodos("problem with response: " + res.status));
        }
    })
        .catch(err => {
            if (err.response) {
                dispatch(errorTodos("problem with response: " + err.response.status));

            }
            else if (err.request) {
                dispatch(errorTodos("problem with request"));
            }
            else {
                dispatch(errorTodos(err.message));
            }

        });


}

//----------------------Delete TODOS-----------------

export const DeleteTodo = (id) => (dispatch) => {

    dispatch(loadingTodos());
    
    const bearer = 'Bearer ' + localStorage.getItem('token');

    var TODO = axios({
        method: "delete",
        url: baseURL + `/todo/${id}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    });



    TODO.then((res) => {

        if (res.status === 200) {
            dispatch(todoSuccess());
            dispatch(addUpdatedProject(res.data));
        }
        else {
            dispatch(errorTodos("problem with response: " + res.status));
        }
    })
        .catch(err => {
            if (err.response) {
                dispatch(errorTodos("problem with response: " + err.response.status));

            }
            else if (err.request) {
                dispatch(errorTodos("problem with request"));
            }
            else {
                dispatch(errorTodos(err.message));
            }

        });


}


//----------------------Update status TODOS-----------------

export const UpdateStatus = (statusList, ProjectID) => (dispatch) => {

    dispatch(loadingTodos());

    let List = [];
    Array.from(statusList.keys()).forEach((key) => {
        List.push({ _id: key, status: statusList.get(key) });
    })

    const bearer = 'Bearer ' + localStorage.getItem('token');

    
    const PROJECT = axios({
        method: "put",
        url: baseURL + `/todo/status/${ProjectID}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin',
        data: JSON.stringify({ statusList: List})
    });



    PROJECT.then((res) => {
        
        if (res.status === 200) {
            dispatch(todoSuccess());
            dispatch(addUpdatedProject(res.data));
        }
        else {
            dispatch(errorTodos("problem with response: " + res.status));
        }
    })
        .catch(err => {
            if (err.response) {
                dispatch(errorTodos("problem with response: " + err.response.status));
            }
            else if (err.request) {
                dispatch(errorTodos("problem with request"));
            }
            else {
                dispatch(errorTodos(err.message));
            }

        });


}

//----------------------------Authorization: LOGIN & LOGOUT---------------------------------


export const loginRequest = () => {
    return {
        type: ActionTypes.LOGIN_REQUEST
    }
};

export const loginSuccess = (token) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        token: token
    }
};

export const loginError = (err) => {
    return {
        type: ActionTypes.LOGIN_ERROR,
        message: err
    }
};

export const login = () => (dispatch) => {
    
    dispatch(loginRequest());

    const LOGIN = axios({
        method: "get",
        url: baseURL + "/users/login" ,
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
    });

    LOGIN
        .then(res => {

            if (res.success === true) {
                localStorage.setItem('token', res.data.token);
                dispatch(loginSuccess(res.data.token));
            }
            else {
                throw res.message;
            }
            
        })
        .catch(err => {
            if (err.response) {
                dispatch(loginError("problem with response: " + err.response.status));
                
            }
            else if (err.request) {
                dispatch(loginError("problem with request"));
            }
            else {
                dispatch(loginError(err.message));
            }
            
        })
    
};
export const logout = () => (dispatch) => {

    dispatch(logoutRequest());
    localStorage.removeItem('token');
    dispatch(logoutSuccess());
};

export const logoutRequest = () => {
    return {
        type: ActionTypes.LOGOUT_REQUEST
    }
};

export const logoutSuccess = () => {
    return {
        type: ActionTypes.LOGOUT_SUCCESS
    }
};



/*-------------------------------------------------GISTS--------------------*/

const loadingGists = () => {
    return {
        type: ActionTypes.GISTS_LOADING
    }
};

const gitsSuccess = () => {
    return {
        type: ActionTypes.GISTS_SUCCESS
    }
};
const errorGists = (err) => {
    return {
        type: ActionTypes.GISTS_ERROR,
        payload: err
    }
};


export const gist = (id) => (dispatch) => {

    dispatch(loadingGists());

    const bearer = 'Bearer ' + localStorage.getItem('token');

    const gist = axios({
        method: "get",
        url: baseURL + `/gist/${id}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    });

    gist.then((res) => {

        if (res.status === 200) {
            dispatch(gitsSuccess());
        }
        else {
            dispatch(errorGists(res));
        }
    })
        .catch(err => {
            if (err.response) {
                dispatch(errorGists(err.response));

            }
            else if (err.request) {
                dispatch(errorGists(err.request));
            }
            else {
                dispatch(errorGists(err.message));
            }

        });


}








