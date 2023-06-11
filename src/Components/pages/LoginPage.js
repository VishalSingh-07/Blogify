import React, { useContext, useState } from "react";
import { Alert, AlertTitle } from "@mui/material";
import "./pages.css";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginPage() {
  const url = `${process.env.REACT_APP_API_URL}`;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setUserInfo } = useContext(UserContext);
  async function login(ev) {
    ev.preventDefault();
    if (email.length === 0 || password.length === 0) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 5000); // 5 seconds
      return;
    }
    setIsLoading(true);
    const response = await fetch(`${url}/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (response.ok) {
      response.json().then((userinfo) => {
        setUserInfo(userinfo);
        setRedirect(true);
      });
      toast.success("Login Successfully");
    } else {
      const errorResponse = await response.json();
      toast.error(errorResponse || "Wrong Credentials");
    }
    setIsLoading(false);
  }
  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <>
      <form className="login" onSubmit={login}>
        <h1>Login</h1>
        {error ? (
          <Alert severity="error">
            <AlertTitle>Oops, Something wasn't right</AlertTitle>
            Please fill out — <strong>all required fields!</strong>
          </Alert>
        ) : null}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}></input>
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}></input>
        <button className="button_primary" disabled={isLoading}>
          {isLoading ? "Logging...." : "Login"}
        </button>
      </form>
    </>
  );
}

export default LoginPage;
