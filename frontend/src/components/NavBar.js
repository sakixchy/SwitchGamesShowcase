import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap';
import logo from '../assets/images/logo.png';
import styles from "../styles/NavBar.module.css";
import { NavLink } from 'react-router-dom';
import { useCurrentUser } from '../contexts/CurrentUserContexts';

const NavBar = () => {
  const currentUser = useCurrentUser()
  const loggedInIcons = <>{currentUser?.username}</>
  const loggedOutIcons = (
  <> 
    <NavLink
    className={styles.NavLink}
    activeClassName={styles.Active}
    to="/signin"><i className="fas fa-sign-in-alt"></i>Sign In</NavLink>
    <NavLink
    className={styles.NavLink}
    activeClassName={styles.Active}
    to="/signup"><i className="fas fa-user-plus"></i>Sign Up</NavLink>
  </>
  );

  return (
    <div>
        <Navbar className={styles.NavBar} expand="md" fixed="top">
        <Container>
          <NavLink to="/">
            <Navbar.Brand>
            <img src={logo} alt="logo" height="45" />
            </Navbar.Brand>
          </NavLink>
            <Navbar.Toggle aria-controls="basic-navbar-nav">
            <i className="fa-solid fa-angle-down"></i>
            </Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto text-left">
                <NavLink
                exact
                className={styles.NavLink}
                activeClassName={styles.Active} 
                to="/"><i className="fas fa-home"></i>Home</NavLink>
                <NavLink
                className={styles.NavLink}
                activeClassName={styles.Active}
                to="/games"><i className="fa-solid fa-gamepad"></i>Games</NavLink>
                <NavLink
                className={styles.NavLink}
                activeClassName={styles.Active}
                to="/rentals"><i className="fa-solid fa-clock"></i>Rentals</NavLink>
                {currentUser ? loggedInIcons : loggedOutIcons}
                <NavLink
                className={styles.NavLink}
                activeClassName={styles.Active}
                to="/profile"><i className="fas fa-user-plus"></i>Profile</NavLink>
                </Nav>      
            </Navbar.Collapse>
        </Container>
        </Navbar>
    </div>
  )
}

export default NavBar