"use client";

import { useState, useRef, useEffect } from "react";
import { User, Settings, FileText, LogOut } from "lucide-react";
import Link from "next/link";

const ProfileDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const menuItems = [
        { icon: <User size={18} />, label: "Profile", href: "/profile" },
        { icon: <Settings size={18} />, label: "Settings", href: "/settings" },
        { icon: <FileText size={18} />, label: "My Files", href: "/my-files" },
        { icon: <LogOut size={18} />, label: "Logout", href: "/logout" },
    ];

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/10 dark:hover:bg-[#1e293b]/50 transition-colors duration-300"
            >
                <div className="w-8 h-8 rounded-full bg-[#3b82f6] dark:bg-[#60a5fa] flex items-center justify-center">
                    <User size={20} className="text-white" />
                </div>
                <span className="text-black dark:text-[#f8fafc]">Profile</span>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white/10 dark:bg-[#0f172a] backdrop-blur-xl shadow-lg border border-white/30 dark:border-[#1e293b] overflow-hidden">
                    {menuItems.map((item, index) => (
                        <Link
                            key={index}
                            href={item.href}
                            className="flex items-center space-x-2 px-4 py-3 text-black dark:text-[#f8fafc] hover:bg-white/20 dark:hover:bg-[#1e293b]/50 transition-colors duration-300"
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown; 