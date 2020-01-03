import {useState, useCallback} from 'react'

const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    //TODO it is works with useCallBack and without, what is here profit ??
    const request = useCallback(async (url, method = "GET", body = null, headers = {}) => {
        try {
            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }
            const res = await fetch(url, {
                method,
                body,
                headers
            })

            const data = await res.json()

            if (!res.ok) {
                console.log(data.errors[0].msg)
                setError(data.errors[0].msg)
            }
        } catch (e) {

        }

    })
    return {error, request}
}

export default useHttp