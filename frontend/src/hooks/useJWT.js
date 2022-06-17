import * as jwt from "jsonwebtoken"
import {jwt_secret} from "../config";

import React, {useState, useEffect} from 'react';

export default function useJWT(token) {
    const [data, setData] = useState();

    useEffect(() => {
        setData(jwt.decode(token, jwt_secret));
    }, [token])

    return data;
}

