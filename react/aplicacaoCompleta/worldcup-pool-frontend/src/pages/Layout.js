import { Outlet, Link } from "react-router-dom";

const Layout = () => {
    return (
        <div className="dark">
            <Outlet />
        </div>
    )
};

export default Layout;