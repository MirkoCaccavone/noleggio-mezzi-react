import { NavLink } from "react-router-dom"


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
            </nav>
        </div>
    )
}