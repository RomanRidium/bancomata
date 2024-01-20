import * as types from "./actionTypes"
import { auth } from "../../firebase/firebase"
import { toast } from "react-toastify";

const registerStart = () => ({
    type: types.REGISTER_START
})

const registerSucess = (user) => ({
    type: types.REGISTER_SUCCESS,
    payload: user,
})

const registerFail = (error) => ({
    type: types.REGISTER_FAIL,
    payload: error,
})

export const registerInitiate = (email, password, displayName) => {
    return function (dispatch) {
        dispatch(registerStart())
        auth.createUserWithEmailAndPassword(email, password).then(({user})=> {
            user.updateProfile({
                displayName,
            })
            dispatch(registerSucess(user))
            toast.success(`Здравствуйте, ${email}`)
        }).catch(error => dispatch(registerFail(error.message) && toast.warning(`Что-то пошло не так, возможно такая учетная запись уже существует`)))
    }
}

const loginStart = () => ({
    type: types.LOGIN_START
})

const loginSucess = (user) => ({
    type: types.LOGIN_SUCCESS,
    payload: user,
})

const loginFail = (error) => ({
    type: types.LOGIN_FAIL,
    payload: error,
})

export const loginInitiate = (email, password) => {
    return function (dispatch) {
        dispatch(loginStart())
        auth.signInWithEmailAndPassword(email, password).then(({user})=> {
            dispatch(loginSucess(user))
            toast.success(`Здравствуйте, ${email}`)
        }).catch(error => dispatch(loginFail(error.message) && toast.warning("Указан неверный пароль или почта")))
    }
}

const logoutStart = () => ({
    type: types.LOGOUT_START
})

const logoutSucess = () => ({
    type: types.LOGOUT_SUCCESS,
})

const logoutFail = (error) => ({
    type: types.LOGOUT_FAIL,
    payload: error,
})

export const logoutInitiate = () => {
    return function (dispatch) {
        dispatch(logoutStart())
        auth
        .signOut().then((resp)=>dispatch(logoutSucess(resp)))
        .catch(error => dispatch(logoutFail(error.message)))
    }
}

export const setUser = (user) => ({
    type: types.SET_USER,
    payload: user,
}) 

// const googleStart = () => ({
//     type: types.LOGIN_WITH_GOOGLE_START
// })
//
// const googleSucess = (user) => ({
//     type: types.LOGIN_WITH_GOOGLE_SUCCESS,
//     payload: user,
// })
//
// const googleFail = (error) => ({
//     type: types.LOGIN_WITH_GOOGLE_FAIL,
//     payload: error,
// })

// export const loginGoogleInitiate = () => {
//     return function (dispatch) {
//         dispatch(googleStart())
//         auth.signInWithPopup(googleAuthProvider).then(({user})=> {
//             dispatch(googleSucess(user))
//         })
//         .catch(error => dispatch(googleFail(error.message)))
//     }
// }


