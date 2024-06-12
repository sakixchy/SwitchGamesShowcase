import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap';
import logo from '../assets/images/logo.png';
import styles from "../styles/NavBar.module.css";
import { NavLink } from 'react-router-dom';
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContexts';
import Avatar from './Avatar';
import axios from 'axios';


const NavBar = () => {
  const currentUser = useCurrentUser()
  const setCurrentUser = useSetCurrentUser()

  const handleSignOut = async () => {
    try {
      await axios.post('dj-rest-auth/logout/');
      setCurrentUser(null)
    }catch (err){
      console.log(err)
    }
  }

  const loggedInIcons = <>
    <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/games"><i className="fa-solid fa-gamepad"></i>Games</NavLink>
    <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/rentals"><i className="fa-solid fa-clock"></i>Rentals</NavLink>
    <NavLink
      exact
      className={styles.NavLink} 
      to="/"
      onClick={handleSignOut}
      ><i className="fas fa-sign-out-alt"></i>Sign Out</NavLink>
    <NavLink
      className={styles.NavLink}
      to={`/profiles/${currentUser?.profile_id}`}>
      <Avatar src={currentUser?.profile_image} text="Profile" height={40} />
    </NavLink>
  </>
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
                to="/">
                <i className="fas fa-home"></i>Home
              </NavLink>
              {currentUser ? loggedInIcons : loggedOutIcons}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default NavBar