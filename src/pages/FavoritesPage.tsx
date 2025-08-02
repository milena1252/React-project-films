import { IoLogInOutline } from "react-icons/io5";
import { FavoriteList } from "../components/FavoritesList";
import { openAuthModal } from "../store/authSlice";
import { selectFavorites } from "../store/favoritesSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import './FavoritesPage.css';
import { GrFavorite } from "react-icons/gr";

export const FavoritesPage = () => {
    const favorites = useAppSelector(selectFavorites);
    const {isAuth} = useAppSelector((state) => state.auth);
     const dispatch = useAppDispatch();
   
   if (!isAuth) {
    return (
        <div className="auth-required">
            <h2 className="auth-title">Favorites <GrFavorite style={{fontSize: '36px', color: 'red'}}/> </h2>
            <div className="auth-message">
                <p>Please <button 
                        onClick={() => dispatch(openAuthModal())}
                        className="login-button"
                    >
                        <IoLogInOutline style={{ marginRight: '8px' }} />
                        Log In
                    </button> 
                to view your favorites</p>         
            </div>
        </div>
    );
   }

   return (
        <div className="favorites-page">
            <h2 className="favorites-title">Your Favorite Movies</h2>
            {favorites.length > 0 ? (
                <FavoriteList movies={favorites}/>
            ) : (
                <p className="favorites-empty">
                   You don't have any favorite movies yet. 
                </p>
            )}
        </div>
   );
};