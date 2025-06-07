import { NavLink } from "react-router-dom"
import SearchBar from "./SearchBar"

export default function Header() {

    return (
        <div className="header-container">
            <h1>
                logo sito
            </h1>
            <nav>
                <NavLink to='/'>
                    Homepage
                </NavLink>
                <SearchBar />
            </nav>
        </div>
    )
}