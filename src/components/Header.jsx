import { NavLink } from "react-router-dom"
import SearchBar from "./SearchBar"
import '../style/Header.css'

export default function Header() {

    return (
        <div className="header-container">

            <NavLink to='/'>
                <img src="../../public/RENTORA1.gif" alt="Logo Animato" className="logo-header" />
            </NavLink>

            <nav>
                <NavLink to='/'>
                    Homepage
                </NavLink>
                <SearchBar />
            </nav>
        </div>
    )
}