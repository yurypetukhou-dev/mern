import React, {useCallback, useContext, useEffect, useState} from 'react'
import useHttp from "../../hooks/http.hooks"
import {AuthContext} from "../../context/auth.context"
import LinksList from './links'

const Links = () => {
    const {token} = useContext(AuthContext)
    const {request} = useHttp()
    const [linksList, setLinksList] = useState([])

    useEffect(() => {
        (async () => {
            let links = await request('/link', 'GET', null, {
                Authorization: `Bear ${token}`
            })

            setLinksList(links)
        })()
    }, [])

    return (
       <LinksList links={linksList} />
    )
}

export default Links