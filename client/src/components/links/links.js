import React from 'react'
import {uid} from 'react-uid'
import {Link} from "react-router-dom"

const Links = ({links}) => {
    return (

        <ul className="collection">
            {
                links.map((item) => {
                    return (
                        <li className="collection-item avatar" key={uid(item)}>
                            <img src="images/yuna.jpg" alt="" className="circle"/>
                            <p>To: {item.to}</p>
                            <p>From: {item.from}</p>
                            <p>Code: {item.code}</p>
                            <p>Clicks: {item.clicks}</p>
                            <Link to={`/detail/${item._id}`}>Подробнее</Link>
                        </li>

                    )
                })
            }
        </ul>
    )
}

    export default Links
