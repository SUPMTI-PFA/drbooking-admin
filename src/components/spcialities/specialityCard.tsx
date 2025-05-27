import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { TbStethoscope } from 'react-icons/tb';

interface SpecialityCardProps {
  content: string;
}

const SpecialityCard: React.FC<SpecialityCardProps> = ({ content }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400 }}
    >
      <Link
        to={`/doctors-by-specialty/${content}`}
        className="block bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300 group"
      >
        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-lg bg-blue-50 text-blue-500 group-hover:bg-blue-100 transition-colors">
            <TbStethoscope size={24} />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
            {content}
          </h3>
        </div>
        <div className="mt-4 flex items-center text-sm text-blue-500 font-medium">
          <span>View specialists</span>
          <svg 
            className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </Link>
    </motion.div>
  );
};

export default SpecialityCard;