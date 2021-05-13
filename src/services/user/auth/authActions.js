import axios from 'axios';
import { LOGIN_REQUEST, LOGOUT_REQUEST, SUCCESS, FAILURE } from './authTypes';



const loginRequest = () => {
    return {
        type: LOGIN_REQUEST
    };
};

export const authenticateUser = (email, passwordrestaut) => {
    return dispatch => {
        dispatch(loginRequest());
        if (email == "test" && passwordrestaut == "test") {
            dispatch(success(true));
        }
        else {
            dispatch(failure())
        }
    };
}

const logoutRequest = () => {
    return {
        type: LOGOUT_REQUEST
    };
};

export const logoutUser = (email, passwordrestaut) => {
    return dispatch => {
        dispatch(logoutRequest());
        dispatch(success(false));
    };
}

const success = isLoggedIn => {
    return {
        type: SUCCESS,
        payload: isLoggedIn
    };
};
const failure = () => {
    return {
        type: FAILURE,
        payload: false
    };
};