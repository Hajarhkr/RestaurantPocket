import { combineReducers } from 'redux'
import platReducer from './Plat/platReducer'
import authReducer from './user/auth/authReducer'


const rootReducer = combineReducers({
    plat: platReducer,
    auth: authReducer
})

export default rootReducer;