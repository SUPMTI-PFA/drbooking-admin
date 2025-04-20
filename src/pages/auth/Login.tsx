import React from "react";
import { Navigate, useNavigate } from "react-router";
import { useFormik } from "formik";
import { API } from "@/api/api";
import { LoginSchema } from "@/utils/validation/YupSchema";
import { InitLogin } from "@/utils/initValues/InitValues";
import SwitchAuthLink from "@/components/auth/SwitchAuthLink";

const Login: React.FC = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("mbs_user_token");
    if (token) return <Navigate to="/" replace />;



    const formik = useFormik({
        initialValues: InitLogin,
        validationSchema: LoginSchema,
        onSubmit: async (values, { setSubmitting, setFieldError }) => {
            try {
                const loginResponse = await API.post(`/login`, values, {
                    headers: { "Content-Type": "application/json" },
                });

                if (loginResponse.status === 200) {
                    const token = loginResponse.data.token;
                    localStorage.setItem("mbs_user_token", token);

                    const response = await API.get(`/me`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });

                    localStorage.setItem("mbs_user", JSON.stringify(response.data));

                    navigate("/");
                }
            } catch (error) {
                setFieldError("password", "Invalid email or password");
                console.error("Login failed:", error);
            } finally {
                setSubmitting(false);
            }
        }
    });

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b px-4">
            <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 shadow-lg p-4">
                <p className="text-center text-gray-600 mb-6">Welcome back, you’ve been missed!</p>

                <form onSubmit={formik.handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            className={`w-full mt-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${formik.touched.email && formik.errors.email
                                ? "border-red-500 focus:ring-red-500"
                                : "border-orange-300 focus:ring-orange-500"
                                }`}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <p className="text-sm text-red-500 mt-1">{formik.errors.email}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            className={`w-full mt-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${formik.touched.password && formik.errors.password
                                ? "border-red-500 focus:ring-red-500"
                                : "border-orange-300 focus:ring-orange-500"
                                }`}
                        />
                        {formik.touched.password && formik.errors.password && (
                            <p className="text-sm text-red-500 mt-1">{formik.errors.password}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={formik.isSubmitting}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-60"
                    >
                        {formik.isSubmitting ? "Signing in..." : "Sign in"}
                    </button>
                </form>
                <SwitchAuthLink
                    message="Don't have an account?"
                    linkText="Sign up"
                    to="/register"
                />

            </div>
        </div>
    );
};

export default Login;
