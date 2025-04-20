import * as Yup from "yup";

export const LoginSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().min(6, "Must be at least 6 characters").required("Required")
})

export const RegisterSchema = Yup.object().shape({
    fullName: Yup.string().required('Full name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6).required('Password is required'),
    currency: Yup.string().required('Currency is required'),
});