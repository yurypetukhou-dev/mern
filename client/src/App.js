import React from 'react';
import useRoutes from "./components/secretRoutes";
import {BrowserRouter as Router} from "react-router-dom";
import useAuth from "./hooks/auth.hook";
import {AuthContext} from './context/auth.context'

function App() {
    //TODO доделать контекст
    const {token, userId, loginUser} = useAuth()
    const isAuth = !!token
    const AuthRouters = useRoutes(isAuth)
    return (
        <AuthContext.Provider value={{token, userId, loginUser, isAuth}}>
        <div className="App">
            <Router>
                {AuthRouters}
            </Router>
        </div>
        </AuthContext.Provider>
    );
}

export default App;
