import { Link } from "react-router";
import './Layout.css';
import { GoSearch } from "react-icons/go";
import { MdFavoriteBorder } from "react-icons/md";
import { AiFillSetting } from "react-icons/ai";

export const Sidebar = () => {
    return (
        <aside className="sidebar">
            <nav className="sidebar__nav">
                <Link to="/" className="sidebar__link">
                    <GoSearch />
                    <span>Search</span>
                </Link>
                <Link to="/favorites" className="sidebar__link">
                    <MdFavoriteBorder />
                    <span>Favorites</span>
                </Link>
                <Link to="/settings" className="sidebar__link">
                    <AiFillSetting />
                    <span>Settings</span>
                </Link>
            </nav>
        </aside>
    );
};