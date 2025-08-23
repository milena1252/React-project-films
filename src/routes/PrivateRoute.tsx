import type { PropsWithChildren } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { IoLogInOutline } from "react-icons/io5";
import { openAuthModal } from "../store/authSlice";
import '../pages/FavoritesPage.css';

export const PrivateRoute = ({ children }: PropsWithChildren) => {
    const dispatch = useAppDispatch();
    const { isAuth } = useAppSelector((state) => state.auth);

    if (!isAuth) {
        return (
            <div className="auth-required">
                <h2 className="auth-title">Authentication Required</h2>
                <div className="auth-message">
                    <p>Please 
                        <button 
                        onClick={() => dispatch(openAuthModal())}
                        className="login-button"
                        >
                        <IoLogInOutline style={{ marginRight: '8px' }} />
                        Log In
                        </button> 
                        to access this page</p>         
                </div>
            </div>
        );
    }

    return <>{children}</>; 
};