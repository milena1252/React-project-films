import { FavoriteList } from "../components/FavoritesList";
import { selectFavorites } from "../store/favoritesSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { AuthModal } from "../components/Layout/AuthModal";
import { openAuthModal } from "../store/authSlice";

export const FavoritesPage = () => {
    const favorites = useAppSelector(selectFavorites);
    const {isAuth} = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    return (
        <div className="favorites">
            {!isAuth && <AuthModal/>}
            <h2>Your Favorite Movies</h2>
        {isAuth ? (
            favorites.length > 0 ? (
            <FavoriteList movies={favorites} />
        ) : (
            <p>You don't have any favorite movies yet.</p>
        )
      ) : (
            <p className="login-prompt">
                Please 
                <button onClick={() => dispatch(openAuthModal())}>log in</button>
                to view your favorites.
            </p>
      )}
    </div>
    );
};