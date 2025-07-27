import type { PropsWithChildren } from "react";
import './Layout.css';
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { AuthModal } from "./AuthModal";

export const Layout = ({children = true}: PropsWithChildren) => {
    return (
        <div className="layout">
            <Sidebar/>
            <div className="layout__content">
                <Header/>
                <main className="layout__main">
                    {children}
                </main>
            </div>
            <AuthModal/>
        </div>
    );
};