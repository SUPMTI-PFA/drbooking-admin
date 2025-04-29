import React from 'react';
import { Link } from 'react-router';
import { Colors } from '@/utils/helpers/enums';


const Footer: React.FC = () => {
  return (
    <footer className=" text-white" style={{backgroundColor:Colors.Accent}}>
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center">
        {/* Company Info */}
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h2 className="text-2xl  font-semibold mb-2">DrBooking</h2>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} DrBooking. All rights reserved.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6 mb-4 md:mb-0">
          <Link to="/about" className="hover:text-white transition-colors">
            About
          </Link>
          <Link to="/contact" className="hover:text-white transition-colors">
            Contact
          </Link>
          <Link to="/privacy" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-white transition-colors">
            Terms of Service
          </Link>
        </div>

        {/* Social Media Icons */}
        {/* <div className="flex space-x-4">
          <a
            href="https://github.com/your-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            <GitHub size={24} />
          </a>
          <a
            href="https://twitter.com/your-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            <Twitter size={24} />
          </a>
          <a
            href="https://linkedin.com/in/your-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            <Linkedin size={24} />
          </a>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;