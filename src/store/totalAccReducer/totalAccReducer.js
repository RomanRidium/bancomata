import {doc, updateDoc} from "firebase/firestore";
import {db} from "../../firebase/firebase";
import {toast} from "react-toastify";

const defaultStateAcc = {
    totalAcc: [],
    productCountsAcc: 0,
}

const totalAccReducer = (state = defaultStateAcc, action) => {
    switch (action.type) {
        case "GET_ALL_ACC": return {
            ...state,
            totalAcc: action.arr,
            productCountAcc: action.arr.length
        }
        default:
            return state
    }
}

export default totalAccReducer;

export const getDatas = (arr) => {
    return {
        type: "GET_ALL_ACC",
        arr
    }
}

const totalDocRef = doc(db, "total", "ngKf3Rcp0So4fwXfuCLz");
export const atmSubstract = async (value, totalAtm, billsCount) => {
    if (Number(totalAtm[0].id_50) < Number(billsCount.id_50) ||
        Number(totalAtm[0].id_100) < Number(billsCount.id_100) ||
        Number(totalAtm[0].id_200) < Number(billsCount.id_200) ||
        Number(totalAtm[0].id_500) < Number(billsCount.id_500) ||
        Number(totalAtm[0].id_1000) < Number(billsCount.id_1000) ||
        Number(totalAtm[0].id_2000) < Number(billsCount.id_2000) ||
        Number(totalAtm[0].id_5000) < Number(billsCount.id_5000))
    {
        toast.warn("В банкомате недостаточно купюр :(")
    } else {
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

export const atmAdding = async (value, totalAtm, billsCount) => {
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