import {InputText} from "primereact/inputtext";
import {useState} from "react";
import {Button} from "primereact/button";

import {postRequest} from "../utils/request"

export default function Register() {
    const [registerData, setRegisterData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [loading, isLoading] = useState(false)
    const submit = (e) => {
        isLoading(true);
        postRequest("auth/register", {...registerData}).then((res) => {
            isLoading(false)
        }).catch(({response: {data: {reason}}}) => {
            console.log(reason[0].split('"'))
            isLoading(false)
        })
    }

    return (
        <div className="container">
            <div className="row w-50 m-auto">
                <div className="mt-4 field">
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                                <i className="pi pi-user"></i>
                            </span>
                        <span className="w-100 p-float-label">
                            <InputText name="username" className="w-100" id="inputgroup" value={registerData.username}
                                       onChange={(e) => setRegisterData((prevState) => ({
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
                                <i className="pi pi-envelope"></i>
                            </span>
                        <span className="w-100 p-float-label">
                            <InputText type="email" className="w-100" id="inputgroup" value={registerData.email}
                                       onChange={(e) => setRegisterData((prevState) => ({
                                           ...prevState,
                                           email: e.target.value,
                                       }))}/>
                            <label htmlFor="inputgroup">Email</label>
                        </span>
                    </div>
                </div>
                <div className="mt-4 field">
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                                <i className="pi pi-lock"></i>
                            </span>
                        <span className="w-100 p-float-label">
                            <InputText type={'password'} className="w-100" id="inputgroup" value={registerData.password}
                                       onChange={(e) => setRegisterData((prevState) => ({
                                           ...prevState,
                                           password: e.target.value,
                                       }))}/>
                            <label htmlFor="inputgroup">Password</label>
                        </span>
                    </div>
                </div>
                <div className="mt-4 field">
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                                <i className="pi pi-lock"></i>
                            </span>
                        <span className="w-100 p-float-label">
                            <InputText type={'password'} className="w-100" id="inputgroup"
                                       value={registerData.confirmPassword}
                                       onChange={(e) => setRegisterData((prevState) => ({
                                           ...prevState,
                                           confirmPassword: e.target.value,
                                       }))}/>
                            <label htmlFor="inputgroup">Confirm Password</label>
                        </span>
                    </div>
                </div>

                <Button label="Submit" onClick={submit} className="w-25 m-auto mt-4" loading={loading}/>
            </div>
        </div>


    );
}