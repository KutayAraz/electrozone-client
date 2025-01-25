import * as yup from "yup";

export const signInSchema = yup.object().shape({
  email: yup.string().email("Invalid email address").required("Please enter your email address"),
  password: yup
    .string()
    .required("Please enter your password")
    .min(6, "Passwords are least 6 characters long. Please enter a valid password"),
});
