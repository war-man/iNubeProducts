import { combineReducers } from 'redux';
import translationReducer from 'components/Translation/reducer';
//import { authentication } from 'modules/Login/_reducers/authentication.reducer';
//import { registration } from 'modules/Login/_reducers/registration.reducer';
//import { users } from 'modules/Login/_reducers/users.reducer';
//import { alert } from 'modules/Login/_reducers/alert.reducer';

export const rootReducer = combineReducers({
    translation: translationReducer

    
});