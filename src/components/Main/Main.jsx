import React, {useState} from 'react';
import "./Main.css"
import { loginInitiate, logoutInitiate, registerInitiate } from "../../store/authReducer/action";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import Header from "../../UI/Header/Header";
import {useHistory} from "react-router-dom";
import {setLogsAcc, setLogsAccLogin, setLogsAccReg} from "../../store/logsReducer/logsReducer";

const Main = () => {

    const [email, setEmail] = useState("")
    const [displayName, setDisplayName] = useState("")
    const [password, setPassword] = useState("")
    const [truePass, setTruePass] = useState("")

    const dispatch = useDispatch()
    const { currentUser } = useSelector(state => state.auth)

    const goRegistr = async (e) => {
        e.preventDefault()
        if ((password !== truePass) || (email === "") || (displayName === "") || (password === "")) {
            toast("Что-то не так :(")
        } else {
            await dispatch(registerInitiate(email, password, displayName))
            await setLogsAccReg("Регистрация", email, Date.now(), displayName)
        }
    }

    const [login, setLogin] = useState("")
    const [pass, setPass] = useState("")

    const goLogin = async () => {
        if (login === "" || pass === "") {
            toast("Введите email и пароль")
        } else {
            await dispatch(loginInitiate(login, pass))
            await setLogsAccLogin("Вход", login, Date.now(), pass)
        }
    }

    const [start, setStart] = useState(0)

    return (
        <>
            <ToastContainer/>
            <Header/>
            {
                start
                ?
                    (
                        <div className="MainContainer">
                            <div className="MainLoginContainer">
                                <div className="MainLoginInputContainer">
                                    <h1>Войти</h1>
                                    <div className="MainLoginInputContainerContainer">
                                        <label className="MainLabelInput">
                                            Электронная почта
                                        </label>
                                        <input className="MainLoginInput" value={login} onChange={e => setLogin(e.target.value)}/>
                                    </div>
                                    <div className="MainLoginInputContainerContainer">
                                        <label className="MainLabelInput">
                                            Пароль
                                        </label>
                                        <input className="MainLoginInput" type="password" value={pass} onChange={e => setPass(e.target.value)}/>
                                    </div>
                                    <button className="MainLoginButton" onClick={goLogin}>
                                        Войти
                                    </button>
                                </div>
                            </div>
                            <div className="MainRegContainer">
                                <div className="MainRegInputContainer">
                                    <h1>Регистрация</h1>
                                    <div className="MainLoginInputContainerContainer">
                                        <label className="MainLabelInputReg">
                                            Ваше имя
                                        </label>
                                        <input className="MainLoginInputReg" value={displayName} onChange={e => setDisplayName(e.target.value)}/>
                                    </div>
                                    <div className="MainLoginInputContainerContainer">
                                        <label className="MainLabelInput">
                                            Электронная почта
                                        </label>
                                        <input className="MainLoginInputReg" value={email} onChange={e => setEmail(e.target.value)}/>
                                    </div>
                                    <div className="MainLoginInputContainerContainer">
                                        <label className="MainLabelInput">
                                            Пароль
                                        </label>
                                        <input className="MainLoginInputReg" value={password} onChange={e => setPassword(e.target.value)}/>
                                    </div>
                                    <div className="MainLoginInputContainerContainer">
                                        <label className="MainLabelInput">
                                            Подтверждение пароля
                                        </label>
                                        <input className="MainLoginInputReg" value={truePass} onChange={e => setTruePass(e.target.value)}/>
                                    </div>
                                    <button className="MainRegButton" onClick={goRegistr}>
                                        Войти
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                    :
                    (
                        <button onClick={() => setStart(1)} className="UserMainButton">Начать</button>
                    )
            }
        </>
    )
}

export default Main;



