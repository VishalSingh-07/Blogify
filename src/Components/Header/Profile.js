import React, { useContext, useEffect, useRef } from "react";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assests/styles/Profile.css";

function Profile({ handleMenu, theme, setTheme }) {
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
  }, [setUserInfo, url]);

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

  function toggleTheme() {
    // setTheme((prevTheme) => (prevTheme === "dark-theme" ? "light-theme" : "dark-theme"));
    if (theme === "dark-theme") {
      setTheme("light-theme");
    } else {
      setTheme("dark-theme");
    }
  }
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
  function handleLogoutAndMenu(ev) {
    ev.preventDefault();
    logout(ev);
    handleMenu(ev);
  }
  return (
    <div class="profile" ref={profileRef}>
      <div className="profile-menu">
        <div className="profile-menu-upper">
          <img
            src={`https://api.dicebear.com/6.x/fun-emoji/svg?seed=${userInfo.username}&backgroundType=gradientLinear,solid&eyes=closed,closed2,crying&mouth=cute,drip,faceMask&randomizeIds=false`}
            // src={`https://api.dicebear.com/6.x/shapes/svg?seed=${userInfo.username}`}
            alt="avatar"
          />
          <br />
          <h2>Hello {userInfo.username} 👋 </h2>
        </div>
        <ul>
          <li onClick={toggleTheme}>
            {theme === "light-theme" ? (
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
          <li onClick={handleLogoutAndMenu}>
            <i class="fa-solid fa-right-from-bracket fa-fade fa-lg"></i>
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
}
export default Profile;
