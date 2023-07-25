import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Loader from "../Loader.js";
import Profile from "./Profile.js";
import "../assests/styles/Header.css";
import Logo from "../assests/Images/logo.svg";

export default function Header() {
  const url = `${process.env.REACT_APP_API_URL}`;
  const [humburger, setHumBurger] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [theme, setTheme] = useState("light-theme");
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${url}/profile`, {
      credentials: "include",
    }).then((response) => {
      response.json().then((userinfo) => {
        setUserInfo(userinfo);
      });
      setIsLoading(false);
    });
  }, [setUserInfo, url]);
  const handleMenu = () => {
    setShowMenu(!showMenu);
  };
  const username = userInfo?.username;
  if (isLoading) {
    return (
      <div className="loader">
        <Loader />
      </div>
    );
  }
  return (
    <>
      <nav className="Navbar">
        <Link to="/" className="Link logo">
          <img src={Logo} alt="Logo" />
        </Link>
        <div className="search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
        <div className="menu-icons">
          <i
            className={humburger ? "fas fa-times" : "fas fa-bars"}
            onClick={() => setHumBurger(!humburger)}></i>
        </div>

        <ul className={humburger ? "nav-menu active" : "nav-menu"}>
          {username && (
            <>
              <Link to="/create" className="Link">
                <button className="button">
                  <span className="text">
                    <i className="fa-solid fa-square-plus fa-lg"></i>Create new Post
                  </span>
                </button>
              </Link>
              <button className="button" onClick={handleMenu}>
                <span className="text">Hi {userInfo.username} 👋</span>
              </button>
              {showMenu ? (
                <Profile handleMenu={handleMenu} theme={theme} setTheme={setTheme} />
              ) : null}
            </>
          )}
          {!username && (
            <>
              <Link to="/login" className="Link">
                <button className="button">
                  <span className="text">Log In</span>
                </button>
              </Link>
              <Link to="/register" className="Link">
                <button className="button">
                  <span className="text">Register</span>
                </button>
              </Link>
            </>
          )}
        </ul>
      </nav>
    </>
  );
}
