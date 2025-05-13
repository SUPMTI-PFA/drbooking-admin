import React from 'react'
import { Link } from 'react-router'
import { FaRegEye, FaEnvelope, FaStethoscope, FaMapMarkerAlt } from "react-icons/fa";

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

const DoctorInfoCard: React.FC<DoctorInfoCardProps> = ({ doctor }) => {
    const imageBaseUrl = import.meta.env.VITE_API_UPLOAD

    return (
        <div className="border border-gray-300 rounded-lg overflow-hidden flex flex-col justify-between">
            {/* Header */}
            <div className="flex flex-wrap items-center px-6 py-4 bg-gray-100">
                <img
                    className="w-16 h-16 object-cover rounded-full mr-4"
                    src={imageBaseUrl + doctor.photo}
                    alt={doctor.fullName}
                />
                <div>
                    <h2 className="text-xl font-semibold text-gray-800">{doctor.fullName}</h2>
                    <p className="text-gray-600">@{doctor.username}</p>
                </div>
            </div>

            {/* Details with circled icons */}
            <div className="px-6 py-4 space-y-4">
                <div className="flex items-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full mr-3">
                        <FaEnvelope />
                    </span>
                    <span className="font-medium text-gray-800">Email:</span>
                    <Link to={`mailto:${doctor.email}`} className="ml-2 text-blue-600 hover:underline">
                        {doctor.email}
                    </Link>
                </div>

                <div className="flex items-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-green-500 text-white rounded-full mr-3">
                        <FaStethoscope />
                    </span>
                    <span className="font-medium text-gray-800">Speciality:</span>
                    <span className="ml-2 text-gray-700">
                        {doctor.doctorProfile.speciality.name}
                    </span>
                </div>

                <div className="flex items-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-purple-500 text-white rounded-full mr-3">
                        <FaMapMarkerAlt />
                    </span>
                    <span className="font-medium text-gray-800">Address:</span>
                    <span className="ml-2 text-gray-700">
                        {doctor.doctorProfile.address}
                    </span>
                </div>
            </div>

            {/* Footer View button */}
            <div className="flex justify-end p-4">
                <Link
                    to={`/doctors/${doctor.id}`}
                    state={{ doctor }}
                    className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-sm"
                >
                    <FaRegEye size={20} />
                    <span>View</span>
                </Link>
            </div>
        </div>
    )
}

export default DoctorInfoCard
