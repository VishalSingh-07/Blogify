import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import { signUpSchema } from "../schemas/schema";
import "../assests/styles/LogIn_Register.css";
import "react-toastify/dist/ReactToastify.css";
import SignUp from "../assests/Images/SignUp.svg";
const initialValues = {
  username: "",
  email: "",
  password: "",
  confirm_password: "",
};

const Registration = () => {
  const url = `${process.env.REACT_APP_API_URL}`;
  const [redirect, setRedirect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: signUpSchema,
    onSubmit: async (values, action) => {
      setIsLoading(true);
      const response = await fetch(`${url}/register`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json" },
      });
      console.log(response);
      if (response.ok) {
        toast.success("Registered Successfully");
        setRedirect(true);
      } else {
        const errorResponse = await response.json();
        toast.error(errorResponse || "Registered Unsuccessfully");
        if (errorResponse.message === "Username and Email Already Exists!!") {
          toast.info("Please Enter Unique Username and Email");
        } else if (errorResponse.message === "Username Already Exists!!") {
          toast.info("Please Enter Unique Username");
        } else {
          toast.info("Please Enter Unique Email");
        }
      }
      setIsLoading(false);
      console.log(values.username);
      action.resetForm();
    },
  });
  if (redirect) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <div className="container">
        <div className="modal-container">
          <div className="modal-right">
            <img src={SignUp} alt="" />
          </div>
          <div className="modal-left">
            <h1 className="modal-title">Register</h1>
            <form onSubmit={handleSubmit}>
              <div className="input-block">
                <label htmlFor="name" className="input-label">
                  User Name
                </label>
                <input
                  type="name"
                  autoComplete="off"
                  name="username"
                  id="username"
                  placeholder="John07"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.username && touched.username ? "error" : ""}
                />
                {errors.username && touched.username ? (
                  <p className="form-error">
                    <i class="fa-solid fa-circle-exclamation fa-beat fa-lg"></i>
                    <span>{errors.username}</span>
                  </p>
                ) : null}
              </div>

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

              <div className="input-block">
                <label htmlFor="confirm_password" className="input-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  autoComplete="off"
                  name="confirm_password"
                  id="confirm_password"
                  placeholder="••••••••"
                  value={values.confirm_password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.confirm_password && touched.confirm_password ? "error" : ""}
                />

                {errors.confirm_password && touched.confirm_password ? (
                  <p className="form-error">
                    <i class="fa-solid fa-circle-exclamation fa-beat fa-lg"></i>
                    <span>{errors.confirm_password}</span>
                  </p>
                ) : null}
              </div>

              <div className="modal-buttons">
                <button className="button" type="submit">
                  <span className="text">{isLoading ? "Creating Account..." : "Register"}</span>
                </button>
              </div>
            </form>
            <p className="modal-bottom">
              Already have an account?{" "}
              <Link to="/login" className="Link">
                LogIn now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
