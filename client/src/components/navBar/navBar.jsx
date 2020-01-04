import React, {useContext} from 'react'
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/auth.context";
import {useHistory} from "react-router-dom";

const NavBAr = () => {
    const {logOut} = useContext(AuthContext)
    const history = useHistory()

    const handleLogOut = (e) => {
        e.preventDefault()
        logOut()
        history.push('/')
    }
    return (
        <nav>
            <div className="nav-wrapper">
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><Link to="links">Links</Link></li>
                    <li><Link to="create">Create</Link></li>
                    <li><Link to='/' onClick={handleLogOut}>Logout</Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBAr
