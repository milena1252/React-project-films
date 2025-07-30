import { Link } from "react-router";
import './Layout.css';
import { IoHomeOutline } from "react-icons/io5";
import { GoSearch } from "react-icons/go";
import { MdFavoriteBorder } from "react-icons/md";

 export const Sidebar = () => {
   
    return (
        <aside className="sidebar">
            <nav className="sidebar__nav">
                <Link to="/" className="sidebar__link">
                    <IoHomeOutline />
                    <span>Home</span>
                </Link>
                <Link to="/search" className="sidebar__link">
                    <GoSearch />
                    <span>Search</span>
                </Link>
                <Link to="/favorites" className="sidebar__link">
                    <MdFavoriteBorder />
                    <span>Favorites</span>
                </Link>                        
            </nav>
        </aside>
    );
 };
 
 
 