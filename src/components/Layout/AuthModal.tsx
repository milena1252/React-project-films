import { useState, type FormEvent } from "react";
import './AuthModal.css';
import { useAppDispatch, useAppSelector } from "../../store/store";
import { closeAuthModal, login } from "../../store/authSlice";

export const AuthModal = () => {
    const dispatch = useAppDispatch();
    const {isAuthModalOpen, authError} = useAppSelector((state) => state.auth);
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(login({username, password}));
    };

    if (!isAuthModalOpen) return null;

    return (
        <div className="auth__modal-over" onClick={() => dispatch(closeAuthModal())}>
            <div className="auth__modal" onClick={(e) => e.stopPropagation()}>
                <button className="auth__modal-close"
                onClick={() => dispatch(closeAuthModal())}
                >
                    X
                </button>
                <h3>Login</h3>
                {authError && <div className="error-message">{authError}</div>}
                <form onSubmit={handleSubmit}>
                     <div className="form-group">
                        <label>Username:</label>
                        <input
                        type="text"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Password:</label>
                        <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                        />
                    </div>
                        <button type="submit" className="login-btn">Login</button>
                </form>
            </div>
        </div>
    );
};