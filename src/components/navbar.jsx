import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Logo } from '../assets';

const linksData = [
  { title: 'Work', path: '/Work' },
  { title: 'About', path: '/About' },
  { title: 'Services', path: '/Services' },
  { title: 'Ideas', path: '/Ideas' },
  { title: 'Careers', path: '/Careers' },
  { title: 'Contact', path: '/Contact' },
];

const navbar = () => {
  const currentLocation = useLocation();
  const [previousScrollPosition, setPreviousScrollPosition] = useState(0);
  const [isNavigationBarVisible, setNavigationBarVisibility] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.pageYOffset;
      setNavigationBarVisibility(previousScrollPosition > currentScrollPosition || currentScrollPosition < 10);
      setPreviousScrollPosition(currentScrollPosition);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [previousScrollPosition]);

  const navigationBarStyles = {
    position: 'fixed',
    top: isNavigationBarVisible ? 0 : '-100px',
    width: '100%',
    zIndex: 1000,
    transition: 'top 0.3s ease-in-out, opacity 0.5s ease-in-out',
    opacity: isNavigationBarVisible ? 1 : 0,
    pointerEvents: isNavigationBarVisible ? 'auto' : 'none',
  };

  return (
    <nav style={navigationBarStyles} className="w-full bg-main flex items-center justify-between px-32 py-5 text-white text-xl bg-[#ff6700]">
      <NavLink to={'/'}>
        <img src={Logo} alt="logo" className="h-20 w-auto"/>
      </NavLink>
      <ul className="flex flex-row items-center gap-8">
        {linksData.map(link => (
          <li key={link.title}>
            <NavLink 
              to={link.path} 
              className={`nav-link ${currentLocation.pathname === link.path ? "active" : ""}`}>
                {link.title}
            </NavLink>
          </li> 
        ))}
      </ul>
    </nav>
  );
}

export default navbar;