import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Colors } from '@/utils/helpers/enums';
import { errorNotify, successNotify } from '@mbs-dev/react-helpers';
import { postSpecialityAPI } from '@/api/specialtiesApi';
import ActivityIndicator from '../other/AcitivityIndicator';
import { useBaseContext } from '@/contexts/baseContext';
import { useQueryClient } from '@tanstack/react-query';

export type PostSpecialityProps = {
    setModal?: React.Dispatch<React.SetStateAction<boolean>>;
};

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Speciality name is required'),
});

const PostSpeciality: React.FC<PostSpecialityProps> = ({ setModal }) => {
    const queryClient = useQueryClient();
    const formik = useFormik<{ name: string }>({
        initialValues: { name: import.meta.env.DEV ? 'Speciality 1' : '' },
        validationSchema,
        onSubmit: (values, { resetForm, setSubmitting }) => {
            setSubmitting(true);
            postSpecialityAPI({ name: values.name })
                .then(() => {
                    successNotify('Speciality added successfully');
                    resetForm();
                    queryClient.invalidateQueries({ queryKey: ['specialities'] });
                    setModal && setModal(false);
                })
                .catch(err => {
                    console.error('Failed to add speciality:', err);
                    if (err?.response?.data?.detail?.toLowerCase()?.includes('duplicate')) {
                        errorNotify('Speciality already exists');
                    } else {
                        errorNotify('An error occurred');
                    }
                })
                .finally(() => setSubmitting(false));
        },
    });

    return (
        <div className="mx-auto p-6 bg-white rounded-xl shadow-md">
            <form onSubmit={formik.handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block mb-1 font-medium">
                        Speciality Name
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                        className="block w-full border border-gray-300 rounded p-2"
                    />
                    {formik.touched.name && formik.errors.name && (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
                    )}
                </div>

                <div>
                    {formik.isSubmitting ? (
                        <ActivityIndicator size={32} color={Colors.Accent} />
                    ) : (
                        <button
                            type="submit"
                            disabled={formik.isSubmitting}
                            className="p-10 bg-green-600 text-white font-semibold py-2 rounded hover:bg-green-700 transition"
                        >
                            Add Speciality
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default PostSpeciality;
