import React from "react";

//i18n
import {SidebarContent} from "./SidebarContent";

import {Link} from "react-router-dom";

const Sidebar = () => {
    return (
        <React.Fragment>
            <div className="vertical-menu">
                <div className="navbar-brand-box">
                    <Link to="/" className="logo logo-dark">
                        <span className="logo-sm">HOME</span>
                        <span className="logo-lg">HOME</span>
                    </Link>
                </div>
                <div data-simplebar className="h-100">
                    <SidebarContent/>
                </div>

                <div className="sidebar-background"></div>
            </div>
        </React.Fragment>
    );
};

export default Sidebar;
