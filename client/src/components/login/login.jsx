import React, {useState, useEffect, useContext} from "react";
import { useHistory } from "react-router-dom";
import useHttp from "../../hooks/http.hooks";
import Errors from "../common/errors";
import useAuth from "../../hooks/auth.hook";
import {AuthContext} from "../../context/auth.context";


const Login = () => {
    const context = useContext(AuthContext)
    const history = useHistory()
    const {loginUser} = useAuth()
    const {request, error, clearErrors} = useHttp()
    const [login, setLogin] = useState({
        email: null,
        password: null
    })


    const handleSubmitForm = async (e) => {
        e.preventDefault()
        const response = await request('auth/login', "POST", {...login})
        clearErrors()
        if(response.jwtToken) {
            context.loginUser(response.jwtToken, response.userId)
        }
    }

  const handleInput = (e) => {
        setLogin({...login, [e.target.name] : e.target.value})
  }
    return (
        <div className="row" style={{marginTop: "50px"}}>
            <form className="col s6 l6 offset-l3" noValidate onSubmit={handleSubmitForm}>
                {error && <Errors error={error} /> }
                <div className="row">
                    <div className='center-align'>Login</div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input
                            onChange={handleInput}
                            name='email'
                            type='email'
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                            placeholder="Email"
                            id="email"
                            className="validate"/>
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="input-field col s12">
                        <input
                            onChange={handleInput}
                            name='password'
                            type='password'
                            placeholder="Password"
                            id="password"
                            className="validate"
                            minLength='2'
                            maxLength='10'
                        />
                        <label htmlFor="password">Password</label>
                    </div>
                </div>
                <button className="btn waves-effect waves-light" type="submit" name="action">Login
                    <i className="material-icons right">send</i>
                </button>
            </form>
        </div>
    )

}

export default Login