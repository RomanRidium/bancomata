import * as types from "./actionTypes"

const defaultValue = {
    loading: false,
    currentUser: null,
    error: null,
}

const authReducer = (state = defaultValue, action) => {
    switch(action.type){
        case types.REGISTER_START:
        case types.LOGIN_START:
        case types.LOGOUT_START: 
        case types.LOGIN_WITH_GOOGLE_START:    
            return {
                ...state,
                loading: true,
            }
        case types.LOGOUT_SUCCESS: 
            return {
                ...state,
                currentUser: null,
            }
        case types.SET_USER:
            return {
                ...state,
                loading: false,
                currentUser: action.payload,
            }                
        case types.REGISTER_SUCCESS:
        case types.LOGIN_SUCCESS:
        case types.LOGIN_WITH_GOOGLE_SUCCESS:     
            return {
                ...state,
                loading:false,
                currentUser: action.payload,
            }    
        case types.REGISTER_FAIL:
        case types.LOGIN_FAIL:
        case types.LOGOUT_FAIL:
        case types.LOGIN_WITH_GOOGLE_FAIL:  
            return {
                ...state,
                loading: false,
                error: action.payload,
            }     
        default:
            return state
    }
}   

export default authReducer;