import * as ActionTypes from './actionTypes';

const initialState = {
    isLoading: false,
    err: null
};

export const Gists = (state = initialState, action) => {

    switch (action.type) {


        case ActionTypes.GISTS_LOADING:
            return {
                ...state,
                isLoading: true,
                err: null
            }

        case ActionTypes.GISTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                err: null
            }

        case ActionTypes.GISTS_ERROR:
            return {
                ...state,
                isLoading: false,
                err: action.payload
            }

        default:
            return state;
    }

}