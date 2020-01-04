import React, {useEffect, useState, useContext} from 'react'
import {useParams} from 'react-router-dom'
import LinkCard from "./linkCard"
import useHttp from "../../hooks/http.hooks";
import {AuthContext} from "../../context/auth.context"
const Details = () => {
    const {token} = useContext(AuthContext)
    const {request} = useHttp()
    let id = useParams().id
    const [link, setLink] = useState(false)
    useEffect(() => {
        (async () => {
            const link = await request(`/link/${id}`, "GET", null, {
                Authorization: `Bear ${token}`
            })
            setLink(link)
        })()
    }, [])

    return (
        <>
            {link && <LinkCard link={link}/>}
        </>
    )
}

export default Details
