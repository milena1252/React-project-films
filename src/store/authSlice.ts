import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
    isAuth: boolean;
    username: string | null;
    isAuthModalOpen: boolean;
    authError: string | null;
}

const initialState: AuthState = {
    isAuth: !!localStorage.getItem('auth'),
    username: localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth') || '').username : null,
    isAuthModalOpen: false,
    authError: null
};

export const authSlice = createSlice ({
    name: 'auth',
    initialState,
    reducers: {
        openAuthModal: (state) => {
            state.isAuthModalOpen = true;
            state.authError = null;
        },
        closeAuthModal: (state) => {
            state.isAuthModalOpen = false;
        },
        login: (state, action: PayloadAction<{username: string, password: string}>) => {
            if (action.payload.password.length < 6) {
                state.authError = 'Password must be at least 6 characters';
                return;
            }
            state.isAuth = true;
            state.username = action.payload.username;
            state.isAuthModalOpen = false;
            localStorage.setItem('auth', JSON.stringify({
                username: action.payload.username,
                isAuth: true
            }));
        },
        logout: (state) => {
            state.isAuth = false;
            state.username = null;
            localStorage.removeItem('auth');
        },
    },
});

export const {openAuthModal, closeAuthModal, login, logout} = authSlice.actions;
export const selectAuth = (state: {auth: AuthState}) => state.auth;
export default authSlice.reducer;