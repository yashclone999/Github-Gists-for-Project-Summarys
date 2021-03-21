import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Authorization } from './Authorization';
import { Projects } from './Projects';
import { Todos } from './Todos';
import { Gists } from './gist';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers(
            {
                Authorization: Authorization,
                Projects: Projects,
                Todos: Todos,
                Gists: Gists
            }
        ),
        applyMiddleware(thunk, logger)
    );
    return store;
}
