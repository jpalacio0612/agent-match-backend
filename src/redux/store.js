import { saveAuthUserReducer } from './reducers/saveAuthUserReducer';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

export const store = createStore(saveAuthUserReducer, composeWithDevTools());
