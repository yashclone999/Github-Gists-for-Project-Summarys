import * as actionType from './actionTypes';

let initialState = {
    isLoading: false,
    isAuthenticated: localStorage.getItem('token') ? true : false,
    token: localStorage.getItem('token'),
    isRegistered: false,
    err: null
}
    
                             
export const Authorization = (state = {initialState}, action) => {

    switch (action.type) {
        case actionType.LOGIN_REQUEST:
            return {
                ...state,
                isLoading: true,
                isAuthenticated: false
            };

        case actionType.LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                err: '',
                token: action.token
            };

        case actionType.LOGIN_ERROR:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: false,
                err: action.message
            }

        case actionType.LOGOUT_REQUEST:
            return {
                ...state,
                isLoading: true,
                isAuthenticated: true
            };

        case actionType.LOGOUT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: false,
                token: ''
            };
        
        default:
            return state
    }
        

}

