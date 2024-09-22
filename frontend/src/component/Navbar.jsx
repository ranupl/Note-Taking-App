"use client";
import 'flowbite/dist/flowbite.min.css'; 
import { useEffect, useState } from "react";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import logo from "../assets/logo.svg";
import moon from "../assets/moon.svg";
import { useDispatch, useSelector } from 'react-redux';
import { clearCredentials } from '../redux/slice/auth/auth.slice'; 

function NavbarComponent() {
  const [darkMode, setDarkMode] = useState(false);
  const dispatch = useDispatch();
  
  const { token, email } = useSelector((state) => state.auth);
  
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      setDarkMode(JSON.parse(savedMode));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSignOut = () => {
    dispatch(clearCredentials()); 
    localStorage.clear();
  };

  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="https://flowbite-react.com">
        <img src={logo} className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Note Maker
        </span>
      </Navbar.Brand>
      { token &&  <div className="flex md:order-2">
        {/* <img 
          src={moon} 
          className="mr-3 h-2 sm:h-9 mt-1 pl-5 cursor-pointer" 
          alt="light dark mode" 
          onClick={toggleDarkMode}
        /> */}
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">{email}</span>
          </Dropdown.Header>
          <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item> 
        </Dropdown>
        <Navbar.Toggle />
      </div> }
     
      <Navbar.Collapse>
        <Navbar.Link href="/" active>
          Home
        </Navbar.Link>
        {!token ? (
          <>
            <Navbar.Link href="/login">Login</Navbar.Link>
            <Navbar.Link href="/signUp">Sign Up</Navbar.Link>
          </>
        ) : null}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarComponent;
