import React, {useContext, useState} from 'react'
import useHttp from "../../hooks/http.hooks";
import {AuthContext} from "../../context/auth.context";

const Create = () => {

    const {token} = useContext(AuthContext)
    const [link, setLink] = useState('')
    const {request} = useHttp()


    const handleLink = (e) => {
        setLink(e.target.value)
    }

    const handleSend = async (e) => {
         if(e.key === 'Enter') {
            let data = request('/link/generate', "POST", {from: link}, {
                Authorization: `Bear ${token}`
            })

         }
    }
    return (<div className="row">
        <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
            <div className="input-field">
                <input
                    placeholder="Вставьте ссылку"
                    id="link"
                    type="text"
                    value={link}
                    onChange={handleLink}
                    onKeyPress={handleSend}
                />
                <label htmlFor="link">Введите ссылку</label>
            </div>
        </div>
    </div>)
}

export default Create