import { AuthSection } from "./AuthSection";
import './Layout.css';
import { IoSearchOutline } from "react-icons/io5";

interface Headerrops {
    showSearch?: boolean;
}

export const Header = ({showSearch = true}: Headerrops) => {
  
    return (
        <>
        
        <header className="header">
            {showSearch && (
                <div className="search__container">
                    <input 
                        type="text" 
                        placeholder="Search movies..."
                        className="search__input"
                    />
                    <button className="search__button">
                        <IoSearchOutline />
                    </button>
                </div>
            )}
            <AuthSection/>
        </header>
     </>
    );
};