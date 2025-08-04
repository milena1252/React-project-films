import { logout, openAuthModal } from "../../store/authSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import './Layout.css';
import { IoMdLogIn } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";

export const AuthSection =() => {
    const dispatch = useAppDispatch();
    const {isAuth, username} = useAppSelector((state) => state.auth);

    return (
        <div className="auth__section">
            {isAuth ? (
                <div className="user-menu">
                    <span className="username"><FaRegUser /> {username}</span>
                        <button
                            onClick={() => dispatch(logout())}
                            className="logout-btn"
                        >
                            Logout
                    </button>
                </div>
                ) : (
                    <button
                        onClick={() => dispatch(openAuthModal())}
                        className="login-btn"
                    >
                        <IoMdLogIn  className="login-icon"/> 
                        Log In
                    </button>
                )}
        </div>
    );
};