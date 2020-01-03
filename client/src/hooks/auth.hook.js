import {useState, useEffect, useCallback} from 'react'

const useAuth = () => {
    const userData = 'userData'
    const [userId, setUserId] = useState(null)
    const [token, setToken] = useState(null)

    const loginUser = useCallback((jwtToken, _userId) => {
        setToken(jwtToken)
        setUserId(userId)
        localStorage.setItem(userData, JSON.stringify({
            jwt: jwtToken,
            userId: _userId
        }))
    })

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(userData))

        if (data && data.jwt) {
            loginUser(data.jwt, data.userId)
        }
    }, [loginUser])
    return {loginUser, token, userId}
}

export default useAuth
