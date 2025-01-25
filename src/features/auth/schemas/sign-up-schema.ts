import * as yup from "yup";

export const signUpSchema = yup.object().shape({
  email: yup.string().email("Invalid email address").required("Email is required"),
  password: yup.string().required("Password is required").min(6, "Password is too short"),
  retypedPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Retyped password is required"),
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  address: yup.string().required("Address name is required"),
  city: yup.string().required("City name is required"),
});
