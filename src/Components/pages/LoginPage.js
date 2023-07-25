import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { LogInSchema } from "../schemas/schema";
import "../assests/styles/LogIn_Register.css";
import "react-toastify/dist/ReactToastify.css";
import LogIn from "../assests/Images/LogIn.svg";
const initialValues = {
  email: "",
  password: "",
};

const Registration = () => {
  const url = `${process.env.REACT_APP_API_URL}`;
  const [redirect, setRedirect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setUserInfo } = useContext(UserContext);
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: LogInSchema,
    onSubmit: async (values, action) => {
      setIsLoading(true);
      const response = await fetch(`${url}/login`, {
        method: "POST",
        body: JSON.stringify(values),
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
      console.log(values.username);
      action.resetForm();
    },
  });
  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div className="container">
        <div className="modal-container">
          <div className="modal-right">
            <img src={LogIn} alt="" />
          </div>
          <div className="modal-left-logIn">
            <h1 className="modal-title">LogIn</h1>
            <form onSubmit={handleSubmit}>
              <div className="input-block">
                <label htmlFor="email" className="input-label">
                  Email
                </label>
                <input
                  type="email"
                  autoComplete="off"
                  name="email"
                  id="email"
                  placeholder="john@gmail.com"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.email && touched.email ? "error" : ""}
                />
                {errors.email && touched.email ? (
                  <p className="form-error">
                    <i class="fa-solid fa-circle-exclamation fa-beat fa-lg"></i>
                    <span>{errors.email}</span>
                  </p>
                ) : null}
              </div>

              <div className="input-block">
                <label htmlFor="password" className="input-label">
                  Password
                </label>
                <input
                  type="password"
                  autoComplete="off"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.password && touched.password ? "error" : ""}
                />
                {errors.password && touched.password ? (
                  <p className="form-error">
                    <i class="fa-solid fa-circle-exclamation fa-beat fa-lg"></i>
                    <span>{errors.password}</span>
                  </p>
                ) : null}
              </div>

              <div className="modal-buttons">
                <button className="button" type="submit">
                  <span className="text">{isLoading ? "Logging....." : "LogIn"}</span>
                </button>
              </div>
            </form>
            <p className="modal-bottom">
              Not have an account?{" "}
              <Link to="/register" className="Link">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
