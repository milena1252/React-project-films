import { AuthSection } from "./AuthSection";
import './Layout.css';

interface Headerrops {
    showSearch?: boolean;
}

export const Header = ({showSearch = true}: Headerrops) => {
  
    return (
        <header className="header">
            {showSearch && (
                <div className="search__container">
                    <input 
                        type="text" 
                        placeholder="Search movies..."
                        className="search__input"
                    />
                    <button className="search__button">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M15.5 15H14.71L14.43 14.73C15.41 13.59 16 12.11 16 10.5C16 6.91 13.09 4 9.5 4C5.91 4 3 6.91 3 10.5C3 14.09 5.91 17 9.5 17C11.11 17 12.59 16.41 13.73 15.43L14 15.71V16.5L19 21.49L20.49 20L15.5 15Z" fill="currentColor"/>
                        </svg>
                    </button>
                </div>
            )}
            <AuthSection/>
        </header>
    );
};