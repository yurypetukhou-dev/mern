import React from 'react'
import {Switch, Route, Redirect} from "react-router-dom";
import Auth from "./auth/auth";
import Login from './login/login'
import Links from "./links/links";
import Create from "./create/create";
import Details from "./detail/detail";

const useRoutes = isAuth => {
    if(isAuth) {
        return (
            <Switch>
                <Route path='/links' exact>
                    <Links/>
                </Route>
                <Route path='/create' exact>
                        <Create/>
                </Route>
                <Route path='/detail/:id'>
                    <Details/>
                </Route>
                <Redirect to='/create' />
            </Switch>
        )

    }
    return (
        <Switch>
            <Route path='/' exact>
                <Auth />
            </Route>
            <Route path='/login' exact>
                <Login/>
            </Route>
            <Redirect to='/' />
        </Switch>
    )

}

export default useRoutes