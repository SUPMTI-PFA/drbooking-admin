import React from "react";
import { useNavigate } from "react-router";
import { useFormik } from "formik";
import { API } from "@api/api";
import { RegisterSchema } from "@/utils/validation/YupSchema";
import { InitRegister } from "@/utils/initValues/InitValues";
import { formDataGenerator } from "@mbs-dev/react-helpers";
import SwitchAuthLink from "@/components/auth/SwitchAuthLink";
import { currencySymbols } from "@/utils/helpers/Helpers";

const Register: React.FC = () => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: InitRegister,
        validationSchema: RegisterSchema,
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            try {
                const formData = new FormData();
                formDataGenerator(values, formData, '');

                const response = await API.post("/users", formData);

                if (response.status === 201 || response.status === 200) {
                    navigate("/login");
                }
            } catch (error) {
                setErrors({ email: "Registration failed. Email may already be used." });
                console.error("Registration failed:", error);
            } finally {
                setSubmitting(false);
            }
        }
    });

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b px-4">
            <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 shadow-lg p-4">
                <h2 className="text-center text-2xl font-bold text-orange-500">Create Account</h2>
                <p className="text-center text-gray-600 mt-2">Start your journey today.</p>

                <form onSubmit={formik.handleSubmit} className="space-y-6 mt-6">
                    {/* Full Name */}
                    <div>
                        <label className="block text-gray-700 font-medium">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Your full name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.fullName}
                            className={`w-full mt-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${formik.touched.fullName && formik.errors.fullName
                                ? "border-red-500 focus:ring-red-500"
                                : "border-orange-300 focus:ring-orange-500"
                                }`}
                        />
                        {formik.touched.fullName && formik.errors.fullName && (
                            <p className="text-sm text-red-500 mt-1">{formik.errors.fullName}</p>
                        )}
                    </div>

                    {/* Email */}
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

                    {/* Password */}
                    <div>
                        <label className="block text-gray-700 font-medium">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Create a password"
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

                    {/* Currency */}
                    <div>
                        <label className="block text-gray-700 font-medium">Preferred Currency</label>
                        <select
                            name="currency"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.currency}
                            className={`w-full mt-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${formik.touched.currency && formik.errors.currency
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-orange-300 focus:ring-orange-500'
                                }`}
                        >
                            <option value="">-- Select your currency --</option>
                            {Object.entries(currencySymbols).map(([code, symbol]) => (
                                <option key={code} value={code}>
                                    {code} ({symbol})
                                </option>
                            ))}
                        </select>
                        {formik.touched.currency && formik.errors.currency && (
                            <p className="text-sm text-red-500 mt-1">{formik.errors.currency}</p>
                        )}
                    </div>


                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={formik.isSubmitting}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-60"
                    >
                        {formik.isSubmitting ? "Registering..." : "Sign Up"}
                    </button>
                </form>

                <SwitchAuthLink
                    message="Already have an account?"
                    linkText="Sign in"
                    to="/login"
                />

            </div>
        </div>
    );
};

export default Register;
