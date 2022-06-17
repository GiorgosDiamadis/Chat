import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Login from "./routes/login";
import Register from "./routes/register";
import Navbar from "./components/navbar";

import "primereact/resources/themes/arya-orange/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css";
import './App.css';
import AuthProvider from "./auth/useAuth";
import AuthRoute from "./components/authRoute";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <BrowserRouter>
            <Navbar/>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<AuthRoute>
                        <App/>
                    </AuthRoute>}/>
                    <Route path="login" element={<Login/>}/>
                    <Route path="register" element={<Register/>}/>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    </>,
);

reportWebVitals();
