import React, {useEffect, useState} from 'react';
import Header from "../../UI/Header/Header";
import "./AdminPanel.css"
import {toast, ToastContainer} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../firebase/firebase";
import {getDataLogs, setLogs} from "../../store/logsReducer/logsReducer";
import ListItem from "../../UI/ListItem/ListItem";
import {atmAdding, atmSubstract} from "../../store/totalAccReducer/totalAccReducer";
import {getData} from "../../store/totalReducer/totalReducer";


const AdminPanel = () => {

    const { currentUser } = useSelector(state => state.auth)
    const [counter, setCounter] = useState(0);
    const [billsCount, setBillsCount] = useState({
        id_50: 0,
        id_100: 0,
        id_200: 0,
        id_500: 0,
        id_1000: 0,
        id_2000: 0,
        id_5000: 0,
    });

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
        if (totalAtm[0].total < counter) {
            toast.warn("Недостаточно средств!")
        } else {
            await atmSubstract(counter, totalAtm, billsCount)
            await setLogs("Снятие наличных", currentUser.uid, Date.now(), counter, currentUser.displayName)
            setCounter(0)
            setBillsCount({
                id_50: 0,
                id_100: 0,
                id_200: 0,
                id_500: 0,
                id_1000: 0,
                id_2000: 0,
                id_5000: 0,
            })
        }
    }

    const atmAdd =  async () => {
        await atmAdding(counter, totalAtm, billsCount)
        await setLogs("Внесение наличных", currentUser.uid, Date.now(), counter, currentUser.displayName)
        setCounter(0)
        setBillsCount({
            id_50: 0,
            id_100: 0,
            id_200: 0,
            id_500: 0,
            id_1000: 0,
            id_2000: 0,
            id_5000: 0,
        })
    }

    const handleButtonClick = (value, selectedId) => {
        setCounter(counter + value);
        setBillsCount({
            ...billsCount,
            [selectedId]: billsCount[selectedId] + 1,
        });
    };

    const logs = useSelector(state => state.logs.logs)
    const dispatch = useDispatch()
    useEffect(() => {
        getDocs(collection(db, "logs"))
            .then((res) => dispatch(getDataLogs((res.docs.map(el => ({ ...el.data(), id: el.id }))))))
    }, [dispatch, counter])

    const totalAtm = useSelector(state => state.total.total)
    const dispatchAtm = useDispatch()
    useEffect(() => {
        getDocs(collection(db, 'total'))
            .then((res) => dispatchAtm(getData((res.docs.map(el => ({ ...el.data(), id: el.id }))))))
    }, [dispatchAtm, counter])

    
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
                                                    <h4 style={{margin: "1%"}}>Купюры 50₽: {totalAtm[0].id_50}шт.</h4>
                                                    <h4 style={{margin: "1%"}}>Купюры 100₽: {totalAtm[0].id_100}шт.</h4>
                                                    <h4 style={{margin: "1%"}}>Купюры 200₽: {totalAtm[0].id_200}шт.</h4>
                                                    <h4 style={{margin: "1%"}}>Купюры 500₽: {totalAtm[0].id_500}шт.</h4>
                                                    <h4 style={{margin: "1%"}}>Купюры 1000₽: {totalAtm[0].id_1000}шт.</h4>
                                                    <h4 style={{margin: "1%"}}>Купюры 2000₽: {totalAtm[0].id_2000}шт.</h4>
                                                    <h4 style={{margin: "1%"}}>Купюры 5000₽: {totalAtm[0].id_5000}шт.</h4>
                                                </div>
                                                <div className="addPanel">
                                                    <p style={{margin: "1%"}}>Текущая сумма {counter}₽</p>
                                                    <button className="valueButton" onClick={() => handleButtonClick(50, 'id_50')}>50</button>
                                                    <button className="valueButton" onClick={() => handleButtonClick(100, 'id_100')}>100</button>
                                                    <button className="valueButton" onClick={() => handleButtonClick(200, 'id_200')}>200</button>
                                                    <button className="valueButton" onClick={() => handleButtonClick(500, 'id_500')}>500</button>
                                                    <button className="valueButton" onClick={() => handleButtonClick(1000, 'id_1000')}>1000</button>
                                                    <button className="valueButton" onClick={() => handleButtonClick(2000, 'id_2000')}>2000</button>
                                                    <button className="valueButton" onClick={() => handleButtonClick(5000, 'id_5000')}>5000</button>
                                                    <button className="adminPanelButton" onClick={atmAdd}>
                                                        Внести деньги
                                                    </button>
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