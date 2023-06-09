import React, { useContext, useEffect, useState, useRef } from "react";
import "./Profile.css";
import { UserContext } from "../UserContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Profile({ handleMenu }) {
  const [theme, setTheme] = useState("light-theme");
  const url = `${process.env.REACT_APP_API_URL}`;
  const { userInfo, setUserInfo } = useContext(UserContext);
  const profileRef = useRef(null);

  useEffect(() => {
    fetch(`${url}/profile`, {
      credentials: "include",
    }).then((response) => {
      response.json().then((userinfo) => {
        setUserInfo(userinfo);
      });
    });
  }, []);

  async function logout(ev) {
    ev.preventDefault();
    const response = await fetch(`${url}/logout`, {
      credentials: "include",
      method: "POST",
    });
    if (response.ok) {
      toast.success("Successfully logged out");
      toast.info("See you again soon!");
    } else {
      toast.error("Unable to Logout");
      toast.error("Please try again later");
    }
    setUserInfo(null);
  }

  const toggleTheme = () => {
    if (theme === "dark-theme") {
      setTheme("light-theme");
    } else {
      setTheme("dark-theme");
    }
  };
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target) &&
        !event.target.classList.contains("button_avatar")
      ) {
        handleMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleMenu]);
  return (
    <div class="menu" ref={profileRef}>
      <div className="menu-upper">
        <img
          className="avatar"
          src={`https://api.dicebear.com/6.x/shapes/svg?seed=${userInfo.username}`}
          alt="avatar"
        />
        <br />
        <h2>Hello👋 {userInfo.username}</h2>
      </div>
      <ul>
        <li onClick={() => toggleTheme()}>
          {theme == "light-theme" ? (
            <>
              <i class="fa-solid fa-sun fa-spin fa-lg"></i>
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <i class="fa-solid fa-moon fa-spin fa-lg"></i>
              <span>Dark Mode</span>
            </>
          )}
        </li>
        <li onClick={handleMenu}>
          <i class="fa-solid fa-right-from-bracket fa-fade fa-lg"></i>
          <a href="" onClick={logout}>
            Logout
          </a>
        </li>
      </ul>
    </div>
  );
}
export default Profile;
