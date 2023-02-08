import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div>
        {/* <div className="dark"> */}
            <Outlet />
        </div>
    )
};

export default Layout;