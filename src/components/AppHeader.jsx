import { NavLink } from "react-router-dom";

function AppHeader() {
    const navLinks = [
        {
            path: '/',
            title: 'Home'
        },
        {
            path: '/movies',
            title: 'Movies'
        }
    ]
    return (
        <>
            <nav className="navbar navbar-dark navbar-expand-lg bg-dark header-shadow">
                <div className="container-fluid ">
                    <a className="navbar-brand" href="#">Navbar</a>
                    <div className="nav-links d-flex justify-content-center">
                        {navLinks.map((link, index) => (
                            <NavLink key={index} className="nav-link m-3" to={link.path}>{link.title}</NavLink>
                        ))}
                    </div>
                    <div className="">
                    </div>
                </div>
            </nav>
        </>
    )
}

export default AppHeader;