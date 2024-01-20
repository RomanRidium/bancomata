import React from 'react';
import cl from "./Header.module.css"
import {useDispatch, useSelector} from "react-redux";
import {logoutInitiate} from "../../store/authReducer/action";
import {useHistory} from "react-router-dom";

const Header = () => {

    const { currentUser } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const logOut = (e) => {
        e.preventDefault()
        if (currentUser) {
            dispatch(logoutInitiate())
        }
    }
    const history = useHistory()

    return (
        <div className={cl.HeaderContainer}>
            <h1 className={cl.HeaderLabel} style={{
             fontWeight: 200
            }}>Bankomata</h1>
            {
                currentUser
                ?
                    (
                        <button
                            className={cl.logoutButton}
                            onClick={logOut}
                        >Выйти</button>
                    )
                    :
                    (
                        <></>
                    )
            }
            {
                currentUser && currentUser.email === "rogovroman777@gmail.com"
                ?
                    (
                        <button
                            onClick={() => history.push("/admin")}
                            className={cl.adminButton}
                        >
                          AdminPanel
                        </button>
                    )
                    :
                    (
                        <></>
                    )
            }
        </div>
    );
};

export default Header;