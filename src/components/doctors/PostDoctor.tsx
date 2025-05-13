import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { formDataNormalizer } from '@/utils/helpers/Helpers';
import { postUserAPI } from '@/api/usersApi';
import ActivityIndicator from '../other/AcitivityIndicator';
import { Colors } from '@/utils/helpers/enums';
import { useBaseContext } from '@/contexts/baseContext';
import { errorNotify, successNotify } from '@mbs-dev/react-helpers';
import { useQueryClient } from '@tanstack/react-query';

export type Speciality = { id: string; name: string };

interface DoctorProfile {
    speciality: string;
    address: string;
    bio: string;
}

interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    accountType: string;
    newsletter: boolean;
    photo: File | null;
    doctorProfile: DoctorProfile;
}

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    username: Yup.string().required('Username is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    doctorProfile: Yup.object().shape({
        speciality: Yup.string().required('Speciality is required'),
        address: Yup.string().required('Address is required'),
        bio: Yup.string().max(500, 'Bio cannot exceed 500 characters'),
    }),
    newsletter: Yup.boolean(),
    photo: Yup.mixed().required('Photo is required'),
});

export type PostDoctorProps = {
    setModal?: React.Dispatch<React.SetStateAction<boolean>>;
};

const PostDoctor: React.FC<PostDoctorProps> = ({ setModal }) => {
    const { specialties, specialtiesLoading } = useBaseContext()
    const isDev = import.meta.env.DEV;
    console.log("🚀 ~ PostDoctor.tsx:52 ~ isDev --->", isDev)
    const queryClient = useQueryClient();
    
    const defaultValues: FormValues = {
        firstName: isDev ? 'John' : '',
        lastName: isDev ? 'Doe' : '',
        email: isDev ? 'john.doe@example.com' : '',
        username: isDev ? 'johndoe' : '',
        password: isDev ? 'password123' : '',
        accountType: 'DOCTOR',
        newsletter: isDev,
        photo: null,
        doctorProfile: {
            speciality: '',
            address: isDev ? '123 Main St' : '',
            bio: isDev ? 'This is a sample bio for development.' : '',
        }}
        const formik = useFormik<FormValues>({
            initialValues:defaultValues,
            validationSchema,
            onSubmit: (values, { resetForm, setSubmitting }) => {
                const formData = formDataNormalizer({
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    username: values.username,
                    password: values.password,
                    accountType: values.accountType,
                    newsletter: values.newsletter,
                    photo: values.photo,
                    doctorProfile: values.doctorProfile,
                });

                if (formik.isValid) {
                    console.log("🚀 ~ PostDoctor.tsx:104 ~ formData --->", formData)
                    setSubmitting(true);
                    postUserAPI(formData)
                        .then(res => {
                            resetForm();
                            setSubmitting(false);
                            successNotify('User registered successfully');
                            queryClient.invalidateQueries({ queryKey: ['users'] });
                            setModal && setModal(false);
                        })
                        .catch(err => {
                            console.error('Doctor registration failed:', err);
                            setSubmitting(false);
                            if(err?.response?.data?.detail?.toLowerCase()?.includes("duplicate")){
                                errorNotify("User already exists")
                            }
                            console.log("🚀 ~ PostDoctor.tsx:97 ~ err --->", err?.response?.data?.detail)
                            
                        });
                }
                    
            },
        });

        return(
        <div className = "mx-auto p-6 bg-white rounded-xl shadow-md" >
                <form onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* First Name */}
                        <div>
                            <label htmlFor="firstName" className="block mb-1 font-medium">First Name</label>
                            <input
                                id="firstName"
                                name="firstName"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.firstName}
                                className="block w-full border border-gray-300 rounded p-2"
                            />
                            {formik.touched.firstName && formik.errors.firstName && (
                                <div className="text-red-500 text-sm mt-1">{formik.errors.firstName}</div>
                            )}
                        </div>

                        {/* Last Name */}
                        <div>
                            <label htmlFor="lastName" className="block mb-1 font-medium">Last Name</label>
                            <input
                                id="lastName"
                                name="lastName"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.lastName}
                                className="block w-full border border-gray-300 rounded p-2"
                            />
                            {formik.touched.lastName && formik.errors.lastName && (
                                <div className="text-red-500 text-sm mt-1">{formik.errors.lastName}</div>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block mb-1 font-medium">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                className="block w-full border border-gray-300 rounded p-2"
                            />
                            {formik.touched.email && formik.errors.email && (
                                <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
                            )}
                        </div>

                        {/* Username */}
                        <div>
                            <label htmlFor="username" className="block mb-1 font-medium">Username</label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.username}
                                className="block w-full border border-gray-300 rounded p-2"
                            />
                            {formik.touched.username && formik.errors.username && (
                                <div className="text-red-500 text-sm mt-1">{formik.errors.username}</div>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block mb-1 font-medium">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                                className="block w-full border border-gray-300 rounded p-2"
                            />
                            {formik.touched.password && formik.errors.password && (
                                <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
                            )}
                        </div>

                        {/* Newsletter */}
                        <div className="sm:col-span-2 flex items-center">
                            <label className="inline-flex items-center">
                                <input
                                    name="newsletter"
                                    type="checkbox"
                                    onChange={formik.handleChange}
                                    checked={formik.values.newsletter}
                                    className="form-checkbox"
                                />
                                <span className="ml-2">Subscribe to newsletter</span>
                            </label>
                        </div>

                        {/* Photo */}
                        <div className="sm:col-span-2">
                            <label htmlFor="photo" className="block mb-1 font-medium">Photo</label>
                            <input
                                id="photo"
                                name="photo"
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    if (e.currentTarget.files) formik.setFieldValue('photo', e.currentTarget.files[0]);
                                }}
                                className="block w-full"
                            />
                            {formik.touched.photo && formik.errors.photo && (
                                <div className="text-red-500 text-sm mt-1">{formik.errors.photo}</div>
                            )}
                        </div>

                        {/* Doctor Profile Header */}
                        <div className="sm:col-span-2">
                            <h3 className="text-xl font-semibold mt-4">Doctor Profile</h3>
                        </div>

                        {/* Speciality */}
                        <div>
                            <label htmlFor="doctorProfile.speciality" className="block mb-1 font-medium">Speciality</label>
                            {specialtiesLoading ? (
                                <ActivityIndicator size={20} color={Colors.Accent} />
                            ) : (
                                <select
                                    id="doctorProfile.speciality"
                                    name="doctorProfile.speciality"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.doctorProfile.speciality}
                                    className="block w-full border border-gray-300 rounded p-2"
                                >
                                    <option value="">-- Select speciality --</option>
                                    {specialties?.map((s: any) => (
                                        <option key={s.id} value={"api/specialities/" + s.id}>
                                            {s.name}
                                        </option>
                                    ))}
                                </select>
                            )}
                            {formik.touched.doctorProfile?.speciality && formik.errors.doctorProfile?.speciality && (
                                <div className="text-red-500 text-sm mt-1">{formik.errors.doctorProfile.speciality}</div>
                            )}
                        </div>

                        {/* Address */}
                        <div>
                            <label htmlFor="doctorProfile.address" className="block mb-1 font-medium">Address</label>
                            <input
                                id="doctorProfile.address"
                                name="doctorProfile.address"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.doctorProfile.address}
                                className="block w-full border border-gray-300 rounded p-2"
                            />
                            {formik.touched.doctorProfile?.address && formik.errors.doctorProfile?.address && (
                                <div className="text-red-500 text-sm mt-1">{formik.errors.doctorProfile.address}</div>
                            )}
                        </div>

                        {/* Bio */}
                        <div className="sm:col-span-2">
                            <label htmlFor="doctorProfile.bio" className="block mb-1 font-medium">Bio</label>
                            <textarea
                                id="doctorProfile.bio"
                                name="doctorProfile.bio"
                                rows={4}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.doctorProfile.bio}
                                className="block w-full border border-gray-300 rounded p-2"
                            />
                            {formik.touched.doctorProfile?.bio && formik.errors.doctorProfile?.bio && (
                                <div className="text-red-500 text-sm mt-1">{formik.errors.doctorProfile.bio}</div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="sm:col-span-2">
                            {formik.isSubmitting ? (
                                <ActivityIndicator size={32} color={Colors.Accent} />
                            ) : (
                                <button
                                    type="submit"
                                    disabled={formik.isSubmitting}
                                    className="p-10 bg-green-600 text-white font-semibold py-2 rounded hover:bg-green-700 transition"
                                >
                                    Add Doctor
                                </button>
                            )}
                        </div>
                    </div>
                </form>
        </div >
    );
};

export default PostDoctor;
