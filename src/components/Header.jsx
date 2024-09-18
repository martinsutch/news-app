import { Link } from "react-router-dom"

const Header = () => {

    const handleClick = () => {
        window.scrollTo(0, 0)
    }

    return(
        <header className="internal-row push-left">
            <Link onClick={handleClick} className="internal-row" to="/../../">
                <img src="/public/news-flash.svg" />
                <h1>News Flash</h1>
            </Link>
        </header>
    )
}

export default Header