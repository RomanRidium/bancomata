import {doc, updateDoc} from "firebase/firestore";
import {db} from "../../firebase/firebase";

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
export const atmSubstract = async (value, totalAtm) => {
    await updateDoc(totalDocRef, {total: Number(totalAtm[0].total) - Number(value)})
}

export const atmAdding = async (value, totalAtm) => {
    await updateDoc(totalDocRef, {total: Number(totalAtm[0].total) + Number(value)})
}