import React, {useState, useEffect} from 'react'
import {useHistory } from 'react-router-dom'
import useHttp from '../../hooks/http.hooks'

const Auth = (props) => {
   const {request, error} = useHttp()
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
        const response =   await  request('auth/registration', "POST", form)
        console.log(response)
        // try {
        //     const response = await fetch('auth/registration', {
        //         method: "POST",
        //         body: JSON.stringify(form),
        //         headers: {
        //             'Content-Type': 'application/json;charset=utf-8'
        //         },
        //     })
        //     const data = await response.json()
        //     if (!response.ok) {
        //         setErr(data.errors[0].msg)
        //     } else {
        //         window.M.toast({html: data.msg})
        //         setTimeout(() => {
        //           history.push('/login')
        //         }, 1000)
        //     }
        // } catch (e) {
        //      console.error(e)
        // }

    }

    return (
        <div className="row" style={{marginTop: "50px",}}>
            {error && (
                <div className='col s6 l3 offset-l4 valign-wrapper card-panel  red lighten-1' style={{height: "50px"}}>
                    <div className='center-align' style={{
                        width: '100%',
                        fontFamily: 'Courier Prime  monospace',
                        fontSize: '18px',
                        fontWeight: 'bold'
                    }}>
                        {error}
                    </div>
                </div>)}
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
