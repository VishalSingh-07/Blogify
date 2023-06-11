import React, { useState } from "react";
import { Alert, AlertTitle } from "@mui/material";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./pages.css";
function RegisterPage() {
  const url = `${process.env.REACT_APP_API_URL}`;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  async function register(ev) {
    ev.preventDefault();
    if (username.length == 0 || email.length == 0 || password.length == 0) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 5000);
      return;
    }
    setIsLoading(true);

    const response = await fetch(`${url}/register`, {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      toast.success("Registered Successfully");
      setRedirect(true);
    } else {
      const errorResponse = await response.json();
      toast.error(errorResponse || "Registered Unsuccessfully");
      if (errorResponse == "Username and Email Already Exists!!") {
        toast.info("Plese Enter Unique Username and Email");
      } else if (errorResponse == "Username Already Exists!!") {
        toast.info("Plese Enter Unique Username");
      } else {
        toast.info("Plese Enter Unique Email");
      }
    }
    setIsLoading(false);
  }
  if (redirect) {
    return <Navigate to={"/login"} />;
  }
  return (
    <form action="" className="register" onSubmit={register}>
      <h1>Register</h1>
      {error ? (
        <Alert severity="error">
          <AlertTitle>Oops, Something wasn't right</AlertTitle>
          Please fill out — <strong>all required fields!</strong>
        </Alert>
      ) : null}

      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}></input>
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
        {isLoading ? "Creating Account..." : "Register"}
      </button>
    </form>
  );
}

export default RegisterPage;
