import {combineReducers} from 'redux'
import platReducer from './Plat/platReducer'


const rootReducer = combineReducers({
    plat: platReducer

})

export default rootReducer;