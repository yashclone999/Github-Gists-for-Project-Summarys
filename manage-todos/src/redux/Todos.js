import * as ActionTypes from './actionTypes';

const initialState = {
    isLoading: false,
    err:null
};

export const Todos = (state = initialState, action) => {

    switch (action.type) {
        

        case ActionTypes.TODOS_LOADING:
            return {
                ...state,
                isLoading: true,
                err: null
            }

        case ActionTypes.TODOS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                err: null
            }

        case ActionTypes.TODOS_ERROR:
            return {
                ...state,
                isLoading: false,
                err: action.payload
            }
        
        default:
            return state;
    }

}