import { Link, useLocation } from "react-router-dom";

export const Sidebar = () => {

    const location = useLocation();

    return (<aside className="main-sidebar sidebar-dark-primary elevation-4">
        <a href="index3.html" className="brand-link">
            <span className="brand-text font-weight-light">AdminLTE 3</span>
        </a>

        <div className="sidebar">
            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                <div className="image">
                </div>
                <div className="info">
                    <a href="#" className="d-block">Alexander Pierce</a>
                </div>
            </div>


            <nav className="mt-2">
                <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

                    <li className="nav-item">
                        <Link to="/" className={"nav-link " + (location.pathname == "/" ? 'active' : " ")}>
                            <i className="nav-icon fas fa-tachometer-alt"></i>
                            <p>
                                Dashboard
                            </p>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/client" className={"nav-link " + (location.pathname == "/client" ? 'active' : " ")}>
                            <i className="nav-icon fa fa-user" aria-hidden="true"></i>
                            <p>
                                Client
                            </p>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/collectible" className={"nav-link " + (location.pathname == "/collectible" ? 'active' : " ")}>
                            <i className="nav-icon fas fa-box    "></i>
                            <p>
                                Collectible
                            </p>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/inventory" className={"nav-link " + (location.pathname == "/inventory" ? 'active' : " ")}>
                            <i className="nav-icon fa fa-truck" aria-hidden="true"></i>
                            <p>
                                Inventory
                            </p>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    </aside>);
}