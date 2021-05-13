import { SAVE_PLAT_REQUEST, UPDATE_PLAT_REQUEST, FETCH_PLAT_REQUEST, DELETE_PLAT_REQUEST, PLAT_SUCCESS, PLAT_FAILURE } from './platTypes';

const initialState = {
    plat: '', error: ''
};

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case SAVE_PLAT_REQUEST || FETCH_PLAT_REQUEST || UPDATE_PLAT_REQUEST || DELETE_PLAT_REQUEST:
            return {
                ...state
            };

        case PLAT_SUCCESS:
            return {
                plat: action.payload,
                error: ''
            };

        case PLAT_FAILURE:
            return {
                plats: '',
                error: action.payload
            }
        default:
            return state;
    }
}

export default reducer;