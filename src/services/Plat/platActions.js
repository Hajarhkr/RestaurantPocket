import axios from 'axios';
import { FETCH_PLAT_REQUEST, UPDATE_PLAT_REQUEST, PLAT_SUCCESS, PLAT_FAILURE, SAVE_PLAT_REQUEST } from './platTypes';
import "../../Components/globale"

export const savePlat = plat => {
    return dispatch => {
        dispatch(savePlatRequest());
        axios.post("http://localhost:8080/api/menus", plat)
            .then(response => {
                dispatch(PlatSuccess(response.data));
            })
            .catch(error => {
                dispatch(PlatFailure(error.message))
            });
    };
};


const savePlatRequest = () => {
    return {
        type: SAVE_PLAT_REQUEST
    };
};




const fetchPlatRequest = () => {
    return {
        type: FETCH_PLAT_REQUEST
    };
};

export const fetchPlat = (platId) => {
    return dispatch => {
        dispatch(fetchPlatRequest());
        axios.get("http://localhost:8080/api/menus/" + platId)
        .then(response => {
                dispatch(PlatSuccess(response.data));
            })
            .catch(error => {
                dispatch(PlatFailure(error.message))
            });
            
    };
};

const updatePlatRequest = () => {
    return {
        type: UPDATE_PLAT_REQUEST
    };
};

export const updatePlat = plat => {
    return dispatch => {
        dispatch(updatePlatRequest());
        axios.put("http://localhost:8080/api/menus", plat)
            .then(response => {
                dispatch(PlatSuccess(response.data));
            })
            .catch(error => {
                dispatch(PlatFailure(error.message))
            });
    };
};

const PlatSuccess = plat => {
    return {
        type: PLAT_SUCCESS,
        payload: plat
    };

};

const PlatFailure = error => {
    return {
        type: PLAT_FAILURE,
        payload: error

    };

}