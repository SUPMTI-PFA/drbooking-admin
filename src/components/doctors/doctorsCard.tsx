import React from 'react'
import { Link } from 'react-router'
import { FaRegEye } from "react-icons/fa";

// Define the doctor profile and related types
interface DoctorProfile {
    address: string
    bio: string
    speciality: Speciality
}

interface Speciality {
    id: number
    name: string
}

interface DoctorInfo {
    id: number
    accountType: string
    createdAt: string
    doctorProfile: DoctorProfile
    email: string
    firstName: string
    lastName: string
    fullName: string
    username: string
    photo: string
}

interface DoctorInfoCardProps {
    doctor: DoctorInfo
}

/**
 * A card component to display doctor information.
 */
const DoctorInfoCard: React.FC<DoctorInfoCardProps> = ({ doctor }) => {

    const imageBaseUrl = import.meta.env.VITE_API_UPLOAD

    return (
        <div
            className='border border-gray-300 rounded-lg overflow-hidden justify-between flex flex-col'
        >
            {/* Header with photo and basic info */}
            <div className='flex flex-wrap items-center px-6 py-4 bg-gray-100'>
                <img
                    className='w-16 h-16 object-cover rounded-full mr-4'
                    src={imageBaseUrl + doctor?.photo}
                    alt={doctor?.fullName}
                />
                <div >
                    <h2 className='text-xl font-semibold text-gray-800'>{doctor?.fullName}</h2>
                    <p className='text-gray-600'>@{doctor?.username}</p>
                </div>
            </div>

            {/* Details section */}
            <div className='px-6 py-4 space-y-3'>
                <div>
                    <span className='font-medium text-gray-800 z-10' >Email:</span>{' '}
                    <Link to={`mailto:${doctor?.email}`} className='text-blue-600 hover:underline'>
                        {doctor?.email}
                    </Link>
                </div>

                <div>
                    <span className='font-medium text-gray-800'>Specialities:</span>{' '}
                    <span className='text-gray-700'>{doctor?.doctorProfile?.speciality?.name}</span>
                </div>

                <div>
                    <span className='font-medium text-gray-800'>Address:</span>{' '}
                    <span className='text-gray-700'>{doctor?.doctorProfile?.address}</span>
                </div>
            </div>
            <div className='flex justify-end p-2 gap-2'>
                <Link
                    key={doctor.id}
                    to={`/doctors/${doctor.id}`}
                    state={{ doctor }}
                    className='flex items-center rounded-sm bg-accent text-white gap-2 p-3'>
                    <FaRegEye size={25} />
                    <p>View</p>
                </Link>
            </div>
        </div>
    )
}

export default DoctorInfoCard