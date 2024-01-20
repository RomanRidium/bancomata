import React, {useEffect, useState} from "react";
import { Route, Switch, Redirect } from "react-router-dom"
import { privateRoutes, publicRoutes } from "./routes";
import {MAIN, USER} from "../utils/consts";
import {useDispatch, useSelector} from "react-redux";
import {auth} from "../firebase/firebase";
import {setUser} from "../store/authReducer/action";


const Navigation = function () {

    const { currentUser } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                dispatch(setUser(authUser))
            } else {
                dispatch(setUser(null))
            }
        })
    }, [dispatch])

    return !currentUser

        ?
        (
            <Switch>
                {publicRoutes.map(({ path, component }) =>
                    <Route path={path} component={component} exact key={component} />
                )}
                <Redirect to={MAIN} />
            </Switch>
        )
        :
        (
            <Switch>
                {privateRoutes.map(({ path, component }) =>
                    <Route path={path} component={component} exact key={component} />
                )}
                <Redirect to={USER} />
            </Switch>
        )
}

export default Navigation;