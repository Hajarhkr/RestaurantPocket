import { FETCH_PLAT_REQUEST, FETCH_PLAT_SUCCESS, FETCH_PLAT_FAILURE } from './platTypes';

const initialState = {
    plats: [],
    error: ''
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_PLAT_REQUEST:
            return {
                ...state
            };
        case FETCH_PLAT_SUCCESS:
            return{
                plats:action.payload,
                error: ''
            }; 
        case FETCH_PLAT_FAILURE :
            return{
                plats:[],
                error:action.payload
            }
        default:
            return state;          
    }
}

export default reducer;