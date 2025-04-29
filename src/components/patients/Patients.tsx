import { useBaseContext } from '@/contexts/baseContext';
import React from 'react';
import PatientInfoCard from './PatientCard';

const Patients: React.FC = () => {

    const { users } = useBaseContext()
    
    
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Our Patients</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {users?.filter((user:any) => user?.accountType?.toLowerCase() === "patient")?.map((Patient: any) => (
                    <PatientInfoCard key={Patient.id} Patient={Patient} />
                ))}
            </div>
        </div>
    );
};

export default Patients;
