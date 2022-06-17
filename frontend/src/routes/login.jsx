import {InputText} from "primereact/inputtext";
import React, {useContext, useRef, useState} from "react";
import {Button} from "primereact/button";
import {Toast} from 'primereact/toast';
import {postRequest} from "../utils/request"
import {AuthContext} from "../auth/useAuth";
import {useLocation, useNavigate} from "react-router";
import {useNotify} from "../hooks/useToast";

export default function Login(props) {
    const [loginData, setLoginData] = useState({
        username: "",
        password: "",
    })
    const [notifications, setNotifications] = useState([]);
    const toast = useRef();
    const {state} = useLocation();
    const navigate = useNavigate();
    const {login} = useContext(AuthContext);

    useNotify({
        notifications, toast
    })
    const [loading, isLoading] = useState(false)
    const submit = (e) => {
        isLoading(true);
        postRequest("auth/login", {...loginData}).then((res) => {
            isLoading(false)
            login(res.data.access_token)
            navigate('/', {state: {token: res.data.access_token}})
        }).catch(({response: {data: {reason}}}) => {
            isLoading(false)
            setNotifications(reason)
        })
    }

    return (
        <>
            <Toast ref={toast}/>
            <div className="container h-100 d-flex flex-column justify-content-center align-items-center">
                <h1 className="text-center">Login to your account</h1>
                <div className="row w-50">
                    <div className="mt-4 field">
                        <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                                <i className="pi pi-user"></i>
                            </span>
                            <span className="w-100 p-float-label">
                            <InputText name="username" className="w-100" id="inputgroup" value={loginData.username}
                                       onChange={(e) => setLoginData((prevState) => ({
                                           ...prevState,
                                           username: e.target.value,
                                       }))}/>
                            <label htmlFor="inputgroup">Username</label>
                        </span>
                        </div>
                    </div>
                    <div className="mt-4 field">
                        <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                                <i className="pi pi-lock"></i>
                            </span>
                            <span className="w-100 p-float-label">
                            <InputText type={'password'} className="w-100" id="inputgroup" value={loginData.password}
                                       onChange={(e) => setLoginData((prevState) => ({
                                           ...prevState,
                                           password: e.target.value,
                                       }))}/>
                            <label htmlFor="inputgroup">Password</label>
                        </span>
                        </div>
                    </div>
                    <Button label="Login" onClick={submit} className="w-50 m-auto mt-4" loading={loading}/>
                </div>
            </div>
        </>


    );
}