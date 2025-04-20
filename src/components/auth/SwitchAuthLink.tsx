import React from 'react';
import { Link } from 'react-router';
import { SwitchAuthLinkProps } from '@utils/interfaces/Interfaces';

const SwitchAuthLink: React.FC<SwitchAuthLinkProps> = ({ message, linkText, to, color = 'text-[#04be94]' }) => {
    return (
        <div className="flex flex-row justify-center items-center gap-1 text-base mt-4">
            <p>{message}</p>
            <Link to={to} className={`${color} underline`}>
                {linkText}
            </Link>
        </div>
    );
};

export default SwitchAuthLink;
