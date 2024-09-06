import { useEffect, useRef, useState } from "react";
import "../../../assets/css/public/Header.css";
import navlogo from "../../../assets/images/navlogo-black.png";
import { NavLink } from "react-router-dom";

function Header() {
  const [isNavActive, setIsNavActive] = useState(false);
  const navbarRef = useRef(null);
  const logoWhiteRef = useRef(null);
  const logoBlackRef = useRef(null);

  const toggleNav = () => {
    setIsNavActive(prevState => !prevState);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 0;
      
      if (window.scrollY > scrollThreshold) {
        navbarRef.current.classList.add("navbar-sticky");
        if (logoWhiteRef.current && logoBlackRef.current) {
          logoWhiteRef.current.style.display = "block";
          logoBlackRef.current.style.display = "none";
        }
      } else {
        navbarRef.current.classList.remove("navbar-sticky");
        if (logoWhiteRef.current && logoBlackRef.current) {
          logoWhiteRef.current.style.display = "none";
          logoBlackRef.current.style.display = "block";
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className="navbar" ref={navbarRef}>
      <div className="nav-logo">
        <img src={navlogo} className="navlogo-black" ref={logoBlackRef} alt="Black Logo" />
        <img
          src={require("../../../assets/images/navlogo-white.png")}
          className="navlogo-white"
          ref={logoWhiteRef}
          alt="White Logo"
        />
      </div>
      <div className="nav-text">
        <NavLink to="about">About Us</NavLink>
        <a href="##">Our Services</a>
        <a href="##">Our Approach</a>
        <a href="##">Our Work</a>
        <a href="##">Contact Us</a>
      </div>
      <div className="menubar-icon">{/* <i className="fa-solid fa-bars"></i> */}</div>
    </nav>
  );
}

export default Header;
