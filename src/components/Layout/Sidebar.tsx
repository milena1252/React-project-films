import { Link } from "react-router";
import './Layout.css';

 export const Sidebar = () => {
   
    return (
        <aside className="sidebar">
            <nav className="sidebar__nav">
                <Link to="/" className="sidebar__link">
                    <span className="sidebar-icon">🏠</span>
                    <span>Home</span>
                </Link>
                <Link to="/search" className="sidebar__link">
                    <span className="sidebar-icon">🔍</span>
                    <span>Search</span>
                </Link>
                <Link to="/favorites" className="sidebar__link">
                    <span className="sidebar-icon">❤️</span>
                    <span>Favorites</span>
                </Link>                        
            </nav>
        </aside>
    );
 };
 
 
 