// refreshJWT will get the jwt stored in localStorage and use it to obtain a fresh token
export const refreshJWT = (setJWT) => {
    const refresh = async () => {
        const storedToken = window.localStorage.getItem("jwt")
        if (storedToken === null) {
            setJWT(null)
            return
        }

        const headers = new Headers()
        headers.append("Authorization", `Bearer ${storedToken}`)
        const response = await fetch(`/api/refresh`)

        if (response.status !== 200) {
            // we most likely have an expired token
            window.localStorage.removeItem("jwt")
            setJWT(null)
            return
        }

        const json = await response.json()
        setJWT(json["token"])
        window.localStorage.setItem("jwt", json["token"])
    }

    refresh()
}

