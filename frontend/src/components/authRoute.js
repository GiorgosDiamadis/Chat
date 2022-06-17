import React, {useContext, useEffect} from "react";
import {Navigate} from "react-router-dom"
import {verify} from 'jsonwebtoken';
import {AuthContext} from "../auth/useAuth";
import {jwt_secret} from "../config"
import {useNavigate} from "react-router";
import {getRequest, postRequest} from "../utils/request";

export default function AuthRoute({children}) {
    const {token} = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (!token)
            navigate('/login', {state: {reason: "Token not provided"}})

        getRequest(`user/validate`).then((data) => {
            }
        ).catch(({response: {data}}) => {
            navigate('/login', {state: {reason: data}})
        })

    }, [token])
    return children;
}