import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import useHttp from '../../hooks/http.hooks'
import Errors from "../common/errors";

const Auth = (props) => {
    const {request, error, clearErrors} = useHttp()
    const history = useHistory()
    const [form, setForm] = useState({
        email: null,
        password: null
    })

    useEffect(() => {
        window.M.updateTextFields()
    }, [])
    const handleFormChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleSubmitForm = async (e) => {
        e.preventDefault()
        clearErrors()
        const response = await request('auth/registration', "POST", {...form})
        if (!response.errors) {
            window.M.toast({html: response.msg})
            setTimeout(() => {
                history.push('/login')
            }, 2000)
        }

    }

    return (
        <div className="row" style={{marginTop: "50px",}}>
            {error && <Errors error={error}/>}
            <form className="col s6 l6 offset-l3" onSubmit={handleSubmitForm} noValidate>
                <div className="row">
                    <div className="input-field col s12">
                        <input
                            onChange={handleFormChange}
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
                            onChange={handleFormChange}
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
                <button className="btn waves-effect waves-light" type="submit" name="action">Submit
                    <i className="material-icons right">send</i>
                </button>
            </form>
        </div>
    )
}

export default Auth
