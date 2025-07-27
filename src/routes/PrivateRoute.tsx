import type { PropsWithChildren } from "react";
import { useAppSelector } from "../store/store";
import { Navigate } from "react-router";

export const PrivateRoute = ({children}: PropsWithChildren) => {
    const {isAuth} = useAppSelector((state) => state.auth);

    if (!isAuth) {
        return <Navigate to="/" replace/>
    }

    return children;
};