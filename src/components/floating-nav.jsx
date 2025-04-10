"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

import { FaHome, FaUser, FaSignOutAlt, FaCog, FaFileAlt } from "react-icons/fa";
import { IoMdContact } from "react-icons/io";
import { RiInformationLine } from "react-icons/ri";

const baseNavItems = [
  { name: "Home", link: "/", icon: <FaHome className="w-4 h-4" /> },
  { name: "About", link: "/about", icon: <RiInformationLine className="w-4 h-4" /> },
  { name: "Contact", link: "/contact", icon: <IoMdContact className="w-4 h-4" /> },
];

const profileItems = (handleLogout) => [
  { name: "Profile", link: "/dashboard/profile", icon: <FaUser className="w-4 h-4" /> },
  { name: "Settings", link: "/dashboard/settings", icon: <FaCog className="w-4 h-4" /> },
  { name: "My Files", link: "/dashboard/my-files", icon: <FaFileAlt className="w-4 h-4" /> },
  { name: "Logout", action: handleLogout, icon: <FaSignOutAlt className="w-4 h-4" /> },
];

export default function FloatingNav() {
  const [isVisible, setIsVisible] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const isLoggedIn = !!user;

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.pageYOffset < 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-foreground">
            <span className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Data
              <span className="bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-500 inline-block text-transparent bg-clip-text ml-1">
                Vault
              </span>
            </span>
          </Link>

          {/* Navigation Items */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-6">
              {baseNavItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.link}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                    pathname === item.link
                      ? "text-primary"
                      : "text-foreground/60 hover:text-foreground"
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}

              {isLoggedIn && (
                <Link
                  href="/dashboard/my-files"
                  className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                    pathname === "/my-files"
                      ? "text-primary"
                      : "text-foreground/60 hover:text-foreground"
                  }`}
                >
                  <FaFileAlt className="w-4 h-4" />
                  My Files
                </Link>
              )}
            </div>

            {/* Auth Buttons / Profile */}
            {isLoggedIn ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen((prev) => !prev)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <FaUser className="w-4 h-4" />
                  <span className="text-sm font-medium">Profile</span>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-card rounded-lg shadow-lg border border-border/40 py-1 z-50">
                    {profileItems(logout).map((item) =>
                      item.action ? (
                        <button
                          key={item.name}
                          onClick={item.action}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors w-full text-left"
                        >
                          {item.icon}
                          {item.name}
                        </button>
                      ) : (
                        <Link
                          key={item.name}
                          href={item.link}
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                        >
                          {item.icon}
                          {item.name}
                        </Link>
                      )
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  href="/login"
                  className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
