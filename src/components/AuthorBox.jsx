import { useEffect, useState } from "react"
import { getUserByUsername } from "../utils/api"

const AuthorBox = ({item}) => {
    const [isUserLoaded, setIsUserLoaded] = useState(false)
    const [user, setUser] = useState()

    useEffect(() => {
        getUserByUsername(item.author).then((author) => {
            setUser(author)
            setIsUserLoaded(true)
        })
    },[])  

    return (
        <>
            <span>{item.author}</span>
            {isUserLoaded ? <img className="round-img" src={user.avatar_url} /> : <div className="round-img placeholder"></div>}
        </>
    )
}

export default AuthorBox