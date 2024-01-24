import React, {useEffect} from 'react';
import cl from "./FourDigitCodePanel.module.css"
import {toast} from "react-toastify";
import {passValid} from "../../store/totalReducer/totalReducer";

const FourDigitCodePanel = ({
                                code,
                                setCode,
                                checkCode,
                                accTotal,
                                setValid,
                                currentUser
}) => {

    const handleDigitClick = (digit) => {
        if (code.length < 4) {
            setCode((prevCode) => prevCode + digit);
        }
    };

    const handleDelete = () => {
        setCode((prevCode) => prevCode.slice(0, -1));
    };

    if (code.length === 4 && checkCode === 1) {
        if (accTotal[0] !== undefined) {
            if (accTotal[0].code === code) {
                setValid(0)
            } else {
                toast.warn("Неверный пароль!")
                setCode('')
            }
        }
    }

    const newCode = async () => {
        await passValid(currentUser.uid, code)
        setValid(0)
    }

    return (
        <div className={cl.container}>
            {
                checkCode
                ?
                    (
                        <h1 style={{
                            color: "gray",
                            margin: "2%",
                            fontWeight: "200"
                        }}
                        >
                            Введите пин-код
                        </h1>
                    )
                    :
                    (
                        <h1 style={{
                            color: "gray",
                            margin: "2%",
                            fontWeight: "200"
                        }}
                        >
                            Придумайте пин-код
                        </h1>
                    )
            }
            <div className={cl.display}>{code}</div>
            <div className={cl.buttonContainer}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((digit) => (
                    <button key={digit} className={cl.digitButton} onClick={() => handleDigitClick(digit)}>
                        {digit}
                    </button>
                ))}
                <button className={cl.deleteButton} onClick={handleDelete}>
                    Delete
                </button>
                {
                    checkCode
                        ?
                        (
                            <></>
                        )
                        :
                        (
                            <button
                                className={cl.deleteButton}
                                style={{backgroundColor: "green", border: "none"}}
                                onClick={newCode}
                            >
                                Enter
                            </button>
                        )
                }
            </div>
        </div>
    );
};


export default FourDigitCodePanel;