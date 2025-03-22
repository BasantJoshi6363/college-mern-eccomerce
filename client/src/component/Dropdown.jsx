import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dropdown = ({ username, imageUrl }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const avatar =  username.split("")[0]

    const handleMouseEnter = () => {
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    },);

    return (
        <div className="relative inline-block" ref={dropdownRef}>
            <div onMouseEnter={handleMouseEnter} className="circle size-8 flex items-center justify-center bg-green-500 text-white rounded-full">{avatar.toUpperCase()}</div>
            <div
                className={`${isOpen ? 'absolute' : 'hidden'
                    } z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 right-0`}
                onMouseLeave={handleMouseLeave}
            >
                <div className="py-1">
                    <p className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>Hello {username}👋</p>
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Your Profile
                    </Link>
                    <Link to="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Dashboard
                    </Link>
                    <Link to="/signout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Sign Out
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Dropdown;