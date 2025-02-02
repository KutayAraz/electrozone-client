import * as yup from "yup";

export const profileSchema = yup.object({
  email: yup.string().email("Invalid email address").nullable().notRequired(),
  address: yup
    .string()
    .nullable()
    .notRequired()
    .test("address-test", "Please enter a valid address", (value) => !value || value.length >= 3),
  city: yup
    .string()
    .nullable()
    .notRequired()
    .test("city-test", "Please enter a valid city", (value) => !value || value.length >= 2),
});
