import { Link } from "react-router-dom"

const NavBar = () => {

    const handleClick = () => {
        window.scrollTo(0, 0)
    }

    return (
        <nav className="internal-row">
            <Link onClick={handleClick} className="nav-button" to="/../../">
                <span>Home</span>
                <img className="icon" src="/src/assets/home-outline.svg" />
            </Link>
            <Link className="nav-button" to="/../../article">
                <span>Write</span>
                <img className="icon" src="/src/assets/write-outline.svg" />
            </Link>
            <Link className="nav-button" to="/../../user">
                <span>Profile</span>
                <img className="icon" src="/src/assets/profile-outline.svg" />
            </Link>
        </nav>
    )
}

export default NavBar