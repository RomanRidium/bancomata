import {doc, getDoc, updateDoc} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import {toast} from "react-toastify";

const defaultState = {
    total: [],
    productCounts: 0,
}

const totalReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "GET_ALL": return {
            ...state,
            total: action.arr,
            productCount: action.arr.length
        }
        default:
            return state
    }
}

export default totalReducer;

export const getData = (arr) => {
    return {
        type: "GET_ALL",
        arr
    }
}


const totalDocRef = doc(db, "total", "ngKf3Rcp0So4fwXfuCLz");
export const updateMyShetSubtract = async (user, value, totalAtm, totalAcc, billsCount) => {
    if (totalAcc[0] === 0
        || totalAcc[0] === undefined
        || totalAcc[0] === null
        || Number(totalAcc[0].value) < Number(value)
        || Number(totalAtm[0].total) < Number(value)
        || Number(totalAtm[0].id_50) < Number(billsCount.id_50) ||
        Number(totalAtm[0].id_100) < Number(billsCount.id_100) ||
        Number(totalAtm[0].id_200) < Number(billsCount.id_200) ||
        Number(totalAtm[0].id_500) < Number(billsCount.id_500) ||
        Number(totalAtm[0].id_1000) < Number(billsCount.id_1000) ||
        Number(totalAtm[0].id_2000) < Number(billsCount.id_2000) ||
        Number(totalAtm[0].id_5000) < Number(billsCount.id_5000)
    ) {
        toast.warn("Недостаточно средств! Или в банкомате недостаточно купюр :(")
    } else {
        await updateDoc(doc(db, user.uid, "LA"), {
            value: Number(totalAcc[0].value) - Number(value),
        });
        await updateDoc(totalDocRef, {
            total: Number(totalAtm[0].total) - Number(value),
            id_50: Number(totalAtm[0].id_50) - Number(billsCount.id_50),
            id_100: Number(totalAtm[0].id_100) - Number(billsCount.id_100),
            id_200: Number(totalAtm[0].id_200) - Number(billsCount.id_200),
            id_500: Number(totalAtm[0].id_500) - Number(billsCount.id_500),
            id_1000: Number(totalAtm[0].id_1000) - Number(billsCount.id_1000),
            id_2000: Number(totalAtm[0].id_2000) - Number(billsCount.id_2000),
            id_5000: Number(totalAtm[0].id_5000) - Number(billsCount.id_5000),
        })
    }
}

export const updateMyShetAdd = async (user, value, totalAtm, totalAcc, billsCount) => {
    if (Number(totalAcc[0]) === 0 || totalAcc[0] === undefined || totalAcc[0] === null) {
        await updateDoc(doc(db, user.uid, "LA"), {
            value: Number(value),
        });
    } else {
        await updateDoc(doc(db, user.uid, "LA"), {
            value: Number(totalAcc[0].value) + Number(value),
        });
    }
    await updateDoc(totalDocRef, {
        total: Number(totalAtm[0].total) + Number(value),
        id_50: Number(totalAtm[0].id_50) + Number(billsCount.id_50),
        id_100: Number(totalAtm[0].id_100) + Number(billsCount.id_100),
        id_200: Number(totalAtm[0].id_200) + Number(billsCount.id_200),
        id_500: Number(totalAtm[0].id_500) + Number(billsCount.id_500),
        id_1000: Number(totalAtm[0].id_1000) + Number(billsCount.id_1000),
        id_2000: Number(totalAtm[0].id_2000) + Number(billsCount.id_2000),
        id_5000: Number(totalAtm[0].id_5000) + Number(billsCount.id_5000),
    })
}

export const goTransReducer = async (uid, value, totalAcc, cUid) => {

    await getDoc(doc(db, uid, "LA")).then(docSnap => {
        if (docSnap.exists()) {
            console.log(docSnap.data())
            updateDoc(doc(db, uid, "LA"), {
                value: Number(docSnap.data().value) + Number(value),
            });
        } else {
            toast.warn("Что-то пошло не так...")
        }
    })

    await updateDoc(doc(db, cUid, "LA"), {
        value: Number(totalAcc[0].value) - Number(value),
    });
}

export const passValid = async (cUid, code) => {
    await updateDoc(doc(db, cUid, "LA"), {
        code: code,
    });
}