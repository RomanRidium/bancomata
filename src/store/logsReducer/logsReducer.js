import {collection, doc, addDoc, setDoc} from "firebase/firestore";
import {db} from "../../firebase/firebase";

const defaultStateLogs = {
    logs: [],
    countLogs: 0,
}

const totalLogsReducer = (state = defaultStateLogs, action) => {
    switch (action.type) {
        case "GET_ALL_LOGS": return {
            ...state,
            logs: action.arr,
            countLogs: action.arr.length
        }
        default:
            return state
    }
}

export default totalLogsReducer

export const getDataLogs = (arr) => {
    return {
        type: "GET_ALL_LOGS",
        arr
    }
}

export const setLogs = async (type, uid, time, value, uname) => {
    await addDoc(collection(db, "logs"), {type: type, uid: uid, time: time, value: value, uname: uname})
}

export const setLogsAccReg = async (type, email, time, uname) => {
    await addDoc(collection(db, "logs"), {type: type, email: email, time: time, uname: uname})
}

export const setLogsAccLogin = async (type, email, time, password) => {
    await addDoc(collection(db, "logs"), {type: type, email: email, time: time, password: password})
}

export const setLogsTransaction = async (cUid, uid, time, value, type) => {
    await addDoc(collection(db, "logs"), {type: type, uid: uid, time: time, cUid: cUid, value: value})
}