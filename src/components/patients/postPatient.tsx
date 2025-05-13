import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { formDataNormalizer } from '@/utils/helpers/Helpers';
import { postUserAPI } from '@/api/usersApi';
import ActivityIndicator from '../other/AcitivityIndicator';
import { Colors } from '@/utils/helpers/enums';
import { errorNotify, successNotify } from '@mbs-dev/react-helpers';
import { useQueryClient } from '@tanstack/react-query';

export interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  accountType: string;
  newsletter: boolean;
  photo: File | null;
}

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  username: Yup.string().required('Username is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  accountType: Yup.string().oneOf(['PATIENT']).required(),
  newsletter: Yup.boolean(),
  photo: Yup.mixed().required('Photo is required'),
});

export type PostPatientProps = {
  setModal?: React.Dispatch<React.SetStateAction<boolean>>;
};

const PostPatient: React.FC<PostPatientProps> = ({ setModal }) => {
  const queryClient = useQueryClient();
  const isDev = import.meta.env.DEV;

  const initialValues: FormValues = {
    firstName: isDev ? 'Loren' : '',
    lastName: isDev ? 'Borer' : '',
    email: isDev ? 'Scarlett.Upton@yahoo.com' : '',
    username: isDev ? 'Damion_Reinger-Balistreri' : '',
    password: isDev ? 'azerty' : '',
    accountType: 'PATIENT',
    newsletter: isDev,
    photo: null,
  };

  const formik = useFormik<FormValues>({
    initialValues,
    validationSchema,
    onSubmit: (values, { resetForm, setSubmitting }) => {
      const formData = formDataNormalizer({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        username: values.username,
        password: values.password,
        accountType: values.accountType,
        newsletter: values.newsletter ? '1' : '0',
        photo: values.photo,
      });

      setSubmitting(true);
      postUserAPI(formData)
        .then(() => {
          resetForm();
          setSubmitting(false);
          successNotify('User registered successfully');
          queryClient.invalidateQueries({ queryKey: ['users'] });
          if (setModal) setModal(false);
        })
        .catch(err => {
          console.error('Registration failed:', err);
          setSubmitting(false);
          const detail = err?.response?.data?.detail?.toLowerCase();
          if (detail?.includes('duplicate')) {
            errorNotify('User already exists');
          } else {
            errorNotify('Registration error');
          }
        });
    },
  });

  return (
    <div className="mx-auto p-6 bg-white rounded-xl shadow-md">
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
              onChange={(e) => e.currentTarget.files && formik.setFieldValue('photo', e.currentTarget.files[0])}
              className="block w-full"
            />
            {formik.touched.photo && formik.errors.photo && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.photo}</div>
            )}
          </div>

          {/* Hidden Account Type */}
          <input type="hidden" name="accountType" value="PATIENT" />

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
                Register Patient
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostPatient;
