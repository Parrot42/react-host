import { NavLink, useMatch, useResolvedPath } from 'react-router-dom';
import './navbar.css';

function Navbar(props) {

    return <nav className='nav'>
        <NavLink to={props.home[1]} className='home-link link'>{props.home[0]}</NavLink>
        <ul>
            {/* <CustomLink to='/admin/new'>Neuer Benutzer</CustomLink>
            <CustomLink to='/admin/user'>Benutzerliste</CustomLink>
            <CustomLink to='/admin/gurke'>Gurke</CustomLink>     */}
            {props.links.map((link) => {
                return <CustomLink to={link[1]}>{link[0]}</CustomLink>
            })}
        </ul>
    </nav>

}

function CustomLink({ to, children }) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true});
    return (
        <li className={isActive ? 'active' : ''}>
            <NavLink to={to} className='link'>{children}</NavLink>
        </li>
    );
}

export default Navbar;