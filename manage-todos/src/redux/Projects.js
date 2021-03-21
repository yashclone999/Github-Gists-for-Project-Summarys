import * as actionType from './actionTypes';

let initialState = {
    isLoading: false,
    PROJECTS:[],
    err: null
}


export const Projects = (state =  initialState , action) => {

    switch (action.type) {

        case actionType.ADD_PROJECTS:
            return {
                ...state,
                isLoading: false,
                PROJECTS: action.payload,
                err: null
            };


        case actionType.ADD_UPDATED_PROJECT:
            {
                let updated_projects = [...state.PROJECTS];
                for (let i in updated_projects) {
                    if (updated_projects[i]._id === action.payload._id) {
                        updated_projects[i] = action.payload;
                        break;
                    }
                }
                return {
                    ...state,
                    isLoading: false,
                    PROJECTS: updated_projects,
                    err: null
                };
                
            }

        case actionType.ADD_TO_PROJECTS:
            {
                let updated_projects = [...state.PROJECTS];
                updated_projects.push(action.payload);
                return {
                    ...state,
                    isLoading: false,
                    PROJECTS: updated_projects,
                    err: null
                };


            }

        case actionType.LOADING_PROJECTS:
            return {
                ...state,
                isLoading: true,
                err: null
            };

        case actionType.PROJECTS_ERROR:
            return {
                ...state,
                isLoading: false,
                err: action.payload
            };
        
        default:
            return state
    }


}

export default Projects;



