import React from 'react';
import useRoutes from "./components/secretRoutes";
import {BrowserRouter as Router} from "react-router-dom";


function App() {
    const AuthRouters = useRoutes(false)
    return (
        <div className="App">
            <Router>
                {AuthRouters}
            </Router>
        </div>

    );
}

export default App;
