import * as yup from "yup";
export const registerSchema = yup.object({
    username: yup.string()
        .required("Username is required")
        .min(3, "Username must be at least 3 characters")
        .max(30, "Username must be less than 30 characters"),

    email: yup.string()
        .required("Email is required")
        .email("Enter a valid email address"),

    password: yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .max(100, "Password must be less than 100 characters"),
});
