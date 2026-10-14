import { Outlet } from "react-router";

const Layout = () => {
    return (
        <div>
        {/* <div className="dark"> */}
            <Outlet />
        </div>
    )
};

export default Layout;