import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {toast, ToastContainer} from "react-toastify";
import Header from "../../UI/Header/Header";
import "./User.css"
import {db} from "../../firebase/firebase";
import {getData, goTransReducer, updateMyShetAdd, updateMyShetSubtract} from "../../store/totalReducer/totalReducer";
import { collection, getDocs, doc, getDoc} from "firebase/firestore";
import {getDatas} from "../../store/totalAccReducer/totalAccReducer";
import {setLogs, setLogsTransaction} from "../../store/logsReducer/logsReducer";
const User = () => {

    const { currentUser } = useSelector(state => state.auth)

    const [uid, setUid] = useState()
    const [transValue, setTransValue] = useState()

    const [mySchetAdd, setMyShetAdd] = useState()

    const updateMyShetAddBtn = async () => {
        await updateMyShetAdd(currentUser, mySchetAdd, totalAtm, accTotal)
        await setLogs("Внесение наличных", currentUser.uid, Date.now(), mySchetAdd, currentUser.displayName)
        setMyShetAdd(0)
    }
    const [mySchetSub, setMyShetSub] = useState()
    const updateMyShetSubtractBtn = async () => {
        if (Number(accTotal[0].value) < Number(mySchetSub)
            || Number(totalAtm[0].total) < Number(mySchetSub)
        ) {
            toast.warn("Недостаточно средств!")
        } else {
            await updateMyShetSubtract(currentUser, mySchetSub, totalAtm, accTotal)
            await setLogs("Снятие наличных", currentUser.uid, Date.now(), mySchetSub, currentUser.displayName)
            setMyShetSub(0)
        }
    }

    const accTotal = useSelector(state => state.totalAcc.totalAcc)
    const dispatchTotalAcc = useDispatch()
    useEffect(() => {
        getDocs(collection(db, currentUser.uid))
            .then((res) => dispatchTotalAcc(getDatas((res.docs.map(el => ({ ...el.data(), id: el.id }))))))
    }, [dispatchTotalAcc, mySchetAdd, mySchetSub, transValue, uid])

    const totalAtm = useSelector(state => state.total.total)
    const dispatchProduct = useDispatch()
    useEffect(() => {
        getDocs(collection(db, 'total'))
            .then((res) => dispatchProduct(getData((res.docs.map(el => ({ ...el.data(), id: el.id }))))))
    }, [dispatchProduct, mySchetAdd, mySchetSub, transValue, uid])

    const [goAdd, setGoAdd] = useState(0)
    const [goSub, setGoSub] = useState(0)
    const [goTrans, setGoTrans] = useState(0)

    const [visibleTotal, setVisibleTotal] = useState(0)
    useEffect(() => {
        setVisibleTotal(accTotal.map(f => f.value))
    }, [accTotal, mySchetAdd, mySchetSub])

    const goTransF = async () => {
        if (Number(accTotal[0].value) < Number(transValue)) {
            toast.warn("Недостаточно средств!")
        } else {
            await goTransReducer(uid, transValue, accTotal, currentUser.uid)
            await setLogsTransaction(currentUser.uid, uid, Date.now(), transValue, "Перевод со счёта на счёт")
            setTransValue(0)
        }
    }

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
                                            <input
                                                value={mySchetAdd}
                                                placeholder="Введите сумму в рублях"
                                                className="userInput"
                                                onChange={(e) => setMyShetAdd(e.target.value)}
                                            />
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
                                            <input
                                                value={mySchetSub}
                                                placeholder="Введите сумму в рублях"
                                                className="userInput"
                                                onChange={(e) => setMyShetSub(e.target.value)}
                                            />
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