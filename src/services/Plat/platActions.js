import axios from 'axios';
import { FETCH_PLAT_REQUEST, FETCH_PLAT_SUCCESS, FETCH_PLAT_FAILURE } from './platTypes';


export const fetchPlats = () => {
    return dispatch => {
        dispatch(fetchPlatRequest());
        axios.get("http://localhost:8080/apii/menus/qr/10")
            .then(response => {
                dispatch(fetchPlatSuccess(response.data));
            })
            .catch(error => {
                dispatch(fetchPlatFailure(error.message))
            });
    };
};

const fetchPlatRequest = () => {
    return {
        type: FETCH_PLAT_REQUEST
    };
};

const fetchPlatSuccess = plats => {
    return {
        type: FETCH_PLAT_SUCCESS,
        payload: plats
    };

};

const fetchPlatFailure = error => {
    return {
        type: FETCH_PLAT_FAILURE,
        payload: error

    };

}