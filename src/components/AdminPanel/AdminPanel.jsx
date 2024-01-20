import React, {useEffect, useState} from 'react';
import Header from "../../UI/Header/Header";
import "./AdminPanel.css"
import {toast, ToastContainer} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../firebase/firebase";
import {getDataLogs, setLogs} from "../../store/logsReducer/logsReducer";
import ListItem from "../../UI/ListItem/ListItem";
import {atmAdding, atmSubstract, getDatas} from "../../store/totalAccReducer/totalAccReducer";
import {getData} from "../../store/totalReducer/totalReducer";


const AdminPanel = () => {

    const { currentUser } = useSelector(state => state.auth)

    const [value, setValue] = useState()

    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [check, setCheck] = useState(0)

    const goCheck = () => {
        if (login === process.env.REACT_APP_adminLogin && password === process.env.REACT_APP_adminPassword) {
            setCheck(1)
        } else {
            toast("Что-то пошло не так :(")
        }
    }

    const atmSub =  async () => {
        if (totalAtm[0].total < value) {
            toast.warn("Недостаточно средств!")
        } else {
            await atmSubstract(value, totalAtm)
            await setLogs("Снятие наличных", currentUser.uid, Date.now(), value, currentUser.displayName)
            setValue(0)
        }
    }

    const atmAdd =  async () => {
        await atmAdding(value, totalAtm)
        await setLogs("Внесение наличных", currentUser.uid, Date.now(), value, currentUser.displayName)
        setValue(0)
    }

    const logs = useSelector(state => state.logs.logs)
    const dispatch = useDispatch()
    useEffect(() => {
        getDocs(collection(db, "logs"))
            .then((res) => dispatch(getDataLogs((res.docs.map(el => ({ ...el.data(), id: el.id }))))))
    }, [dispatch, value])

    const totalAtm = useSelector(state => state.total.total)
    const dispatchAtm = useDispatch()
    useEffect(() => {
        getDocs(collection(db, 'total'))
            .then((res) => dispatchAtm(getData((res.docs.map(el => ({ ...el.data(), id: el.id }))))))
    }, [dispatchAtm, value])

    return (
        <div>
            <Header/>
            <ToastContainer/>
            <div className="adminContainer">
                {
                    check
                    ?
                        (
                            <div className="adminListContainer">
                                <div>
                                    <div>
                                        {Array.isArray(totalAtm)
                                            ?
                                            <div className="adminPanelContainer">
                                                <div>
                                                    <h1 style={{fontWeight: "300", margin: "1%"}}>
                                                        Денег в банкомате: {totalAtm[0].total}₽
                                                    </h1>
                                                </div>
                                                <div>
                                                    <input
                                                        placeholder="Введите сумму..."
                                                        className="adminPanelInput"
                                                        value={value}
                                                        onChange={(e) => setValue(e.target.value)}
                                                    />
                                                </div>
                                                <div>
                                                    <button className="adminPanelButton" onClick={atmAdd}>
                                                        Внести деньги
                                                    </button>
                                                </div>
                                                <div>
                                                    <button className="adminPanelButton" onClick={atmSub}>
                                                        Снять деньги
                                                    </button>
                                                </div>
                                            </div>
                                            :
                                            null
                                        }
                                    </div>
                                    <h1 className="adminListLabel">История операций</h1>
                                    <div className="adminListContainerCont">
                                        {Array.isArray(logs)
                                        ?
                                        logs.map((data) =>
                                            <ListItem data={data} key={Math.random()} />
                                        )
                                        :
                                        null
                                    }
                                    </div>
                                </div>
                            </div>
                        )
                        :
                        (
                            <div className="adminLoginContainer">
                                <h2>
                                    Вход
                                </h2>
                                <label className="adminLoginLabel">Логин</label>
                                <input
                                    className="adminLoginInput"
                                    value={login}
                                    onChange={(e) => setLogin(e.target.value)}
                                />
                                <label className="adminLoginLabel">Пароль</label>
                                <input
                                    className="adminLoginInput"
                                    value={password}
                                    type="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    className="loginButton"
                                    onClick={goCheck}
                                >
                                    Войти
                                </button>
                            </div>
                        )
                }
            </div>
        </div>
    );
};

export default AdminPanel;