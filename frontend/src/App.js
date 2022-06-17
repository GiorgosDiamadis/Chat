import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "./auth/useAuth";
import useJWT from "./hooks/useJWT";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";
import {MultiSelect} from "primereact/multiselect";
import {postRequest} from "./utils/request";

function App() {
    const {token} = useContext(AuthContext);
    const data = useJWT(token);
    const [visible, isVisible] = useState(false);


    const [selectedUsers, setSelectedUsers] = useState(null);
    const [seachedUsers, setSearchedUsers] = useState();

    useEffect(() => {
        if (!selectedUsers)
            searchUsers(selectedUsers)
    }, [selectedUsers])

    const searchUsers = (prefix) => {

        // postRequest("users/search", {prefix}).then((res) => {
        //     setSearchedUsers(res.data)
        // }).catch(({response}) => {
        //
        //     console.log(response)
        // })
    }
    const setVisible = (visible) => {
        isVisible(visible)
    };

    const countryTemplate = (option) => {
        return (
            <div className="country-item">
                <div>{option.username}</div>
            </div>
        );
    }

    const selectedCountriesTemplate = (option) => {
        if (option) {
            return (
                <div className="country-item country-item-value">
                    <div>{option.username}</div>
                </div>
            );
        }

        return "Invite Users";
    }


    const panelFooterTemplate = () => {
        const selectedItems = selectedUsers;
        const length = selectedItems ? selectedItems.length : 0;
        return (
            <div className="py-2 px-3">
                <b>{length}</b> item{length > 1 ? 's' : ''} selected.
            </div>
        );
    }

    return (data &&
        (<div className={"container"}>
            <h1 className={"mt-5 text-center"}>Hey {data.username}</h1>
            <Button onClick={() => setVisible(true)} className={"d-block m-auto mt-5 transparent"} label="Create room"
                    icon="pi pi-plus"/>
            <Dialog header={"Create room"} visible={visible} onHide={() => setVisible(false)}>
                <span className="p-float-label mt-4">
                    <InputText id="in"/>
                    <label htmlFor="in">Room name</label>
                </span>
                <MultiSelect value={selectedUsers} options={seachedUsers}
                             onChange={(e) => {
                                 setSelectedUsers(e.value)
                                 console.log(e.value)
                             }} optionLabel="name"
                             placeholder="Invite users" filter={false} className="mt-4 w-100 multiselect-custom"
                             itemTemplate={countryTemplate} selectedItemTemplate={selectedCountriesTemplate}
                             panelFooterTemplate={panelFooterTemplate}/>
            </Dialog>

        </div>)
    );
}

export default App;
