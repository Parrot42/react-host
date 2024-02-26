import React, { useEffect, useState } from 'react';
import { NavLink, useMatch, useResolvedPath } from 'react-router-dom';
import './navbar.css';

function Navbar() {

    return <nav className='nav'>
        <NavLink to="/admin" className='home-link link'>Home</NavLink>
        <ul>
            <CustomLink to='/admin/new'>Neuer Benutzer</CustomLink>
            <CustomLink to='/admin/tomate'>Tomate</CustomLink>
            <CustomLink to='/admin/gurke'>Gurke</CustomLink>    
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