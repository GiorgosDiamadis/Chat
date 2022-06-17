import React, {createContext, useCallback, useEffect, useMemo, useState} from "react";

export const AuthContext = createContext(null);


const AuthProvider = ({children}) => {

    const [token, setToken] = useState(localStorage.getItem("token"))


    const login = useCallback((userToken) => {
        setToken(userToken)
        localStorage.setItem("token", userToken)
    }, [])

    const logout = useCallback(() => {
        setToken("")
        localStorage.removeItem("token")
    }, [])


    const value = useMemo(() => ({token, login, logout}), [token, login, logout])
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider;