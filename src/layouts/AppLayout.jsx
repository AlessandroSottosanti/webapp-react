import { Outlet } from "react-router-dom";
import AppFooter from "../components/AppFooter";
import AppHeader from "../components/AppHeader";

function AppLayout() {
    return (
        <>
        <AppHeader/>
            <div className="container my-3">
            <Outlet/>
            </div>
        <AppFooter />
        </>
    )
}

export default AppLayout;