import {doc, getDoc, setDoc, updateDoc} from "firebase/firestore";
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
export const updateMyShetSubtract = async (user, value, totalAtm, totalAcc) => {
    if (totalAcc[0] === 0
        || totalAcc[0] === undefined
        || totalAcc[0] === null
        || Number(totalAcc[0].value) < Number(value)
        || Number(totalAtm[0].total) < Number(value)
    ) {
        toast.warn("Недостаточно средств!")
    } else {
        await setDoc(doc(db, user.uid, "LA"), {
            value: Number(totalAcc[0].value) - Number(value),
        });
    }
    await updateDoc(totalDocRef, {total: Number(totalAtm[0].total) - Number(value)})
}

export const updateMyShetAdd = async (user, value, totalAtm, totalAcc) => {
    if (Number(totalAcc[0]) === 0 || totalAcc[0] === undefined || totalAcc[0] === null) {
        await setDoc(doc(db, user.uid, "LA"), {
            value: Number(value),
        });
    } else {
        await setDoc(doc(db, user.uid, "LA"), {
            value: Number(totalAcc[0].value) + Number(value),
        });
    }
    await updateDoc(totalDocRef, {total: Number(totalAtm[0].total) + Number(value)})
}

export const goTransReducer = async (uid, value, totalAcc, cUid) => {

    await getDoc(doc(db, "4BMlvbTuRCMYd6yYxnMIO8CiEu03", "LA")).then(docSnap => {
        if (docSnap.exists()) {
            setDoc(doc(db, uid, "LA"), {
                value: Number(docSnap.data().value) + Number(value),
            });
        } else {
            toast.warn("Что-то пошло не так...")
        }
    })

    await setDoc(doc(db, cUid, "LA"), {
        value: Number(totalAcc[0].value) - Number(value),
    });
}
