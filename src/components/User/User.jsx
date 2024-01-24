import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {toast, ToastContainer} from "react-toastify";
import Header from "../../UI/Header/Header";
import "./User.css"
import {db} from "../../firebase/firebase";
import {getData, goTransReducer, updateMyShetAdd, updateMyShetSubtract} from "../../store/totalReducer/totalReducer";
import { collection, getDocs} from "firebase/firestore";
import {getDatas} from "../../store/totalAccReducer/totalAccReducer";
import {setLogs, setLogsTransaction} from "../../store/logsReducer/logsReducer";
const User = () => {

    const { currentUser } = useSelector(state => state.auth)

    const [uid, setUid] = useState()
    const [transValue, setTransValue] = useState()

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

    const [counterSub, setCounterSub] = useState(0);
    const [billsCountSub, setBillsCountSub] = useState({
        id_50: 0,
        id_100: 0,
        id_200: 0,
        id_500: 0,
        id_1000: 0,
        id_2000: 0,
        id_5000: 0,
    });

    const updateMyShetAddBtn = async () => {
        await updateMyShetAdd(currentUser, counter, totalAtm, accTotal, billsCount)
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
    const updateMyShetSubtractBtn = async () => {
        if (Number(accTotal[0].value) < Number(counterSub)
            || Number(totalAtm[0].total) < Number(counterSub)
        ) {
            toast.warn("Недостаточно средств!")
        } else {
            await updateMyShetSubtract(currentUser, counterSub, totalAtm, accTotal, billsCountSub)
            await setLogs("Снятие наличных", currentUser.uid, Date.now(), counterSub, currentUser.displayName)
            setCounterSub(0)
            setBillsCountSub({
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

    const accTotal = useSelector(state => state.totalAcc.totalAcc)
    const dispatchTotalAcc = useDispatch()
    useEffect(() => {
        getDocs(collection(db, currentUser.uid))
            .then((res) => dispatchTotalAcc(getDatas((res.docs.map(el => ({ ...el.data(), id: el.id }))))))
    }, [dispatchTotalAcc, counter, counterSub, transValue, uid])

    const totalAtm = useSelector(state => state.total.total)
    const dispatchProduct = useDispatch()
    useEffect(() => {
        getDocs(collection(db, 'total'))
            .then((res) => dispatchProduct(getData((res.docs.map(el => ({ ...el.data(), id: el.id }))))))
    }, [dispatchProduct, counter, counterSub, transValue, uid])

    const [goAdd, setGoAdd] = useState(0)
    const [goSub, setGoSub] = useState(0)
    const [goTrans, setGoTrans] = useState(0)

    const [visibleTotal, setVisibleTotal] = useState(0)
    useEffect(() => {
        setVisibleTotal(accTotal.map(f => f.value))
    }, [accTotal, counter, counterSub])

    const goTransF = async () => {
        if (Number(accTotal[0].value) < Number(transValue)) {
            toast.warn("Недостаточно средств!")
        } else {
            await goTransReducer(uid, transValue, accTotal, currentUser.uid)
            await setLogsTransaction(currentUser.uid, uid, Date.now(), transValue, "Перевод со счёта на счёт")
            setTransValue(0)
        }
    }

    const handleButtonClick = (value, selectedId) => {
        setCounter(counter + value);
        setBillsCount({
            ...billsCount,
            [selectedId]: billsCount[selectedId] + 1,
        });
    };

    const handleButtonClickSub = (value, selectedId) => {
        setCounterSub(counterSub + value);
        setBillsCountSub({
            ...billsCountSub,
            [selectedId]: billsCountSub[selectedId] + 1,
        });
    };

    return (
        <div>
            <ToastContainer/>
            <Header/>
            <div className="UserMainContainer">
                <div className="UserMainContainerInfo">
                    <div className="container">
                        <div className="big-div">
                            <label className="labelUser">Имя</label>
                            <h1 className="labelUserInfo">{currentUser.displayName}</h1>
                            <label className="labelUser">E-mail</label>
                            <h1 className="labelUserInfo">{currentUser.email}</h1>
                            <label className="labelUser">Баланс</label>
                            <h1 className="labelUserInfo">{visibleTotal}₽</h1>
                            <label className="labelUser">Ваш ID</label>
                            <h1 className="labelUserInfo">{currentUser.uid}</h1>
                        </div>
                        <div className="small-div">
                            {
                                goAdd
                                ?
                                    (
                                        <div style={{width: "100%", height: "100%"}}>
                                            <p>Текущая сумма: {counter}₽</p>
                                            <button className="valueButton" onClick={() => handleButtonClick(50, 'id_50')}>50</button>
                                            <button className="valueButton" onClick={() => handleButtonClick(100, 'id_100')}>100</button>
                                            <button className="valueButton" onClick={() => handleButtonClick(200, 'id_200')}>200</button>
                                            <button className="valueButton" onClick={() => handleButtonClick(500, 'id_500')}>500</button>
                                            <button className="valueButton" onClick={() => handleButtonClick(1000, 'id_1000')}>1000</button>
                                            <button className="valueButton" onClick={() => handleButtonClick(2000, 'id_2000')}>2000</button>
                                            <button className="valueButton" onClick={() => handleButtonClick(5000, 'id_5000')}>5000</button>
                                            <button className="userButton" onClick={updateMyShetAddBtn}>Внести</button>
                                            <button className="userButton" onClick={() => setGoAdd(0)}>Назад</button>
                                        </div>
                                    )
                                    :
                                    (
                                        <div onClick={() => setGoAdd(1)} style={{width: "100%", height: "100%"}}>
                                            <label className="labelUser">Внести средства</label>
                                        </div>
                                    )
                            }
                        </div>
                        <div className="small-div">
                            {
                                goSub
                                    ?
                                    (
                                        <div style={{width: "100%", height: "100%"}}>
                                            <p>Текущая сумма: -{counterSub}₽</p>
                                            <button className="valueButton" onClick={() => handleButtonClickSub(50, 'id_50')}>50</button>
                                            <button className="valueButton" onClick={() => handleButtonClickSub(100, 'id_100')}>100</button>
                                            <button className="valueButton" onClick={() => handleButtonClickSub(200, 'id_200')}>200</button>
                                            <button className="valueButton" onClick={() => handleButtonClickSub(500, 'id_500')}>500</button>
                                            <button className="valueButton" onClick={() => handleButtonClickSub(1000, 'id_1000')}>1000</button>
                                            <button className="valueButton" onClick={() => handleButtonClickSub(2000, 'id_2000')}>2000</button>
                                            <button className="valueButton" onClick={() => handleButtonClickSub(5000, 'id_5000')}>5000</button>
                                            <button className="userButton" onClick={updateMyShetSubtractBtn}>Снять</button>
                                            <button className="userButton" onClick={() => setGoSub(0)}>Назад</button>
                                        </div>
                                    )
                                    :
                                    (
                                        <div onClick={() => setGoSub(1)} style={{width: "100%", height: "100%"}}>
                                            <label className="labelUser">Снять средства</label>
                                        </div>
                                    )
                            }
                        </div>
                        <div className="small-div" style={{width: "100%"}}>
                            {
                                goTrans
                                    ?
                                    (
                                        <div style={{width: "100%", height: "100%"}}>
                                            <input
                                                value={uid}
                                                placeholder="Введите id пользователя"
                                                className="userInput"
                                                style={{width: "35%"}}
                                                onChange={(e) => setUid(e.target.value)}
                                            />
                                            <input
                                                value={transValue}
                                                placeholder="Введите сумму в рублях"
                                                className="userInput"
                                                style={{width: "35%"}}
                                                onChange={(e) => setTransValue(e.target.value)}
                                            />
                                            <button className="userButton" onClick={goTransF}>Перевести</button>
                                            <button className="userButton" onClick={() => setGoTrans(0)}>Назад</button>
                                        </div>
                                    )
                                    :
                                    (
                                        <div onClick={() => setGoTrans(1)} style={{width: "100%", height: "100%"}}>
                                            <label className="labelUser">Со счёта на счёт</label>
                                        </div>
                                    )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default User;