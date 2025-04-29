import DoctorInfoCard from '@/components/doctors/doctorsCard';
import { useBaseContext } from '@/contexts/baseContext';
import React from 'react';

const Doctors: React.FC = () => {

    const { users } = useBaseContext()
    console.log(users?.filter((user:any) => user?.accountType?.toLowerCase() === "patient"));
    
    
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Our doctors</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {users?.filter((user:any) => user?.accountType?.toLowerCase() === "doctor")?.map((doctor: any) => (
                    <DoctorInfoCard key={doctor.id} doctor={doctor} />
                ))}
            </div>
        </div>
    );
};

export default Doctors;
