import React from 'React'
import {Switch, Router} from "react-router-dom";

const useRoutes = isAuth => {
    if(isAuth) {
        return (
            <Switch>
                <Router path='/links' exact></Router>
                <Router path='/create' exact></Router>
                <Router path='/detail/:id'></Router>
            </Switch>
        )
    }
}
