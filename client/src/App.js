import React from 'react';
import useRoutes from "./components/secretRoutes";
import {BrowserRouter as Router} from "react-router-dom";
import useAuth from "./hooks/auth.hook";
import {AuthContext} from './context/auth.context'

function App() {
    //TODO сделать что бы при каждом запросе шол вместе с Auth
    const {token, userId, loginUser, logOut} = useAuth()
    const isAuth = !!token
    const AuthRouters = useRoutes(isAuth)
    return (
        <AuthContext.Provider value={{token, userId, loginUser, logOut, isAuth}}>
            <div className="App">
                <Router>
                    {AuthRouters}
                </Router>
            </div>
        </AuthContext.Provider>
    );
}

export default App;
