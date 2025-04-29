import React from 'react'
import { Link } from 'react-router'
import { FaRegEye } from "react-icons/fa";
import { TbPhotoOff } from "react-icons/tb";
// Define the Patient profile and related types
interface PatientProfile {
    address: string
    bio: string
}

interface Speciality {
    id: number
    name: string
}

interface PatientInfo {
    id: number
    accountType: string
    createdAt: string
    PatientProfile: PatientProfile
    email: string
    firstName: string
    lastName: string
    fullName: string
    username: string
    photo: string
}

interface PatientInfoCardProps {
    Patient: PatientInfo
}

/**
 * A card component to display Patient information.
 */
const PatientInfoCard: React.FC<PatientInfoCardProps> = ({ Patient }) => {

    const imageBaseUrl = import.meta.env.VITE_API_UPLOAD

    return (
        <div
            className='border border-gray-300 rounded-lg overflow-hidden justify-between flex flex-col'
        >
            {/* Header with photo and basic info */}
            <div className='flex flex-wrap items-center px-6 py-4 bg-gray-100'>
                {Patient?.photo 
                ? <img
                    className='w-16 h-16 object-cover rounded-full mr-4'
                    src={imageBaseUrl + Patient?.photo}
                    alt={Patient?.fullName}
                /> 
                : <TbPhotoOff size={20} className='w-16 h-16 object-cover mr-4'/>
                
                }
                <div >
                    <h2 className='text-xl font-semibold text-gray-800'>{Patient?.fullName}</h2>
                    <p className='text-gray-600'>@{Patient?.username}</p>
                </div>
            </div>

            {/* Details section */}
            <div className='px-6 py-4 space-y-3'>
                <div>
                    <span className='font-medium text-gray-800 z-10' >Email:</span>{' '}
                    <Link to={`mailto:${Patient?.email}`} className='text-blue-600 hover:underline'>
                        {Patient?.email}
                    </Link>
                </div>
                {/* <div>
                    <span className='font-medium text-gray-800'>Address:</span>{' '}
                    <span className='text-gray-700'>{Patient?.PatientProfile?.address}</span>
                </div> */}
            </div>
            <div className='flex justify-end p-2'>
                <Link
                    key={Patient.id}
                    to={`/patients/${Patient.id}`}
                    state={{ Patient }}
                    className='flex items-center rounded-sm bg-accent text-white gap-2 p-3'>
                    <FaRegEye size={25}/>
                    <p>View</p>
                </Link>
            </div>
        </div>
    )
}

export default PatientInfoCard