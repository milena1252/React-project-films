import { FavoriteList } from "../components/FavoritesList";
import { selectFavorites } from "../store/favoritesSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import './FavoritesPage.css';

export const FavoritesPage = () => {
    const favorites = useAppSelector(selectFavorites);

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