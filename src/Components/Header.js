import React, { useContext, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import Profile from "./Profile";
import "./Profile.css";
function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const url = `${process.env.REACT_APP_API_URL}`;
  const { userInfo, setUserInfo } = useContext(UserContext);
  useEffect(() => {
    fetch(`${url}/profile`, {
      credentials: "include",
    }).then((response) => {
      response.json().then((userinfo) => {
        setUserInfo(userinfo);
      });
    });
  }, []);
  const handleMenu = () => {
    setShowMenu(!showMenu);
  };
  const username = userInfo?.username;
  return (
    <header>
      <Link to="/" className="logo">
        My Blog
      </Link>
      <nav>
        {username && (
          <>
            <button className="button_post">
              <Link to="/create">
                <i class="fa-solid fa-square-plus fa-lg"></i>Create new Post
              </Link>
            </button>
            <button className="button_avatar" onClick={handleMenu}>
              <img
                className="avatar"
                src={`https://api.dicebear.com/6.x/shapes/svg?seed=${userInfo.username}`}
                // src={`https://avatars.dicebear.com/4.5/api/gridy/${userInfo.username}.svg`}
                alt="avatar"
              />
              <span>Hi {userInfo.username}</span>
            </button>
            {showMenu ? <Profile handleMenu={handleMenu} /> : null}
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
