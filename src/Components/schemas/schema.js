import * as Yup from "yup";
const url = `${process.env.REACT_APP_API_URL}`;
const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const signUpSchema = Yup.object({
  username: Yup.string()
    .min(2)
    .max(25)
    .matches(/^\S*$/, "Username must not contain spaces")
    .test("is-unique", "Username already exists", async function (value) {
      const response = await fetch(`${url}/check-username`, {
        method: "POST",
        body: JSON.stringify({ username: value }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      return response.ok && data.isUnique;
    })
    .required("Please enter your name"),
  email: Yup.string()
    .email()
    .required("Please enter your email")
    .test("is-unique", "Email already exists", async function (value) {
      const response = await fetch(`${url}/check-email`, {
        method: "POST",
        body: JSON.stringify({ email: value }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      return response.ok && data.isUnique;
    }),
  password: Yup.string()
    .matches(
      strongPasswordRegex,
      "Password must be at least 8 characters long and contain one lowercase letter, one uppercase letter, one digit, and one special character."
    )
    .required("Please enter your password"),
  confirm_password: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Password must match"),
});

export const LogInSchema = Yup.object({
  email: Yup.string()
    .email()
    .required("Please enter your email")
    .test("is-not-unique", "Email does not exist", async function (value) {
      const response = await fetch(`${url}/email`, {
        method: "POST",
        body: JSON.stringify({ email: value }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      return response.ok && data.isNotUnique; // Check if email is not unique (i.e., does not exist in the database)
    }),
  password: Yup.string().min(6).required("Please enter your password"),
});

