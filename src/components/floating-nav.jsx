"use client";
import { useState } from "react";
import Link from "next/link";

export default function FloatingNav({ name = "/" }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                {/* Logo */}
                <a href="/" className="flex items-center space-x-3">
                    <span className="self-center text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                        Data
                        <span className="bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-500 inline-block text-transparent bg-clip-text ml-1">
                            Vault
                        </span>
                    </span>
                </a>

                {/* Hamburger Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-gray-500 rounded-lg md:hidden 
                    hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 
                    dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                >
                    <span className="sr-only">Toggle navigation</span>
                    <svg
                        className="w-6 h-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        {isOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                        )}
                    </svg>
                </button>

                {/* Navigation Links */}
                <div
                    className={`${isOpen ? "block" : "hidden"} w-full md:block md:w-auto`}
                    id="navbar-default"
                >
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-200 rounded-lg bg-gray-50 
                        md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white 
                        dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700"
                    >
                        {[
                            { href: "/", label: "Home" },
                            { href: "/my-files", label: "My-Files" },
                            { href: "/dashboard/profile", label: "Profile" },
                            { href: "/login", label: "Login" }
                        ].map(({ href, label }) => (
                            <li key={href}>
                                <Link
                                    href={href}
                                    className={`block py-2 px-3 rounded-md md:p-0 transition-colors ${
                                        name === href
                                            ? "text-white bg-blue-700 md:bg-transparent md:text-blue-700 md:dark:text-blue-500"
                                            : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                    }`}
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
