"use client";

import { useTheme } from "@/context/ThemeContext";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="fixed bottom-6 right-6 p-3 rounded-full bg-white/10 dark:bg-[#1e293b]/50 backdrop-blur-xl border border-white/30 dark:border-[#1e293b] hover:bg-white/20 dark:hover:bg-[#1e293b]/80 transition-all duration-300 transform hover:scale-110 shadow-lg shadow-[#3b82f6]/20 dark:shadow-[#60a5fa]/20"
            aria-label="Toggle theme"
        >
            {isDarkMode ? (
                <Sun className="w-6 h-6 text-[#f8fafc]" />
            ) : (
                <Moon className="w-6 h-6 text-black" />
            )}
        </button>
    );
};

export default ThemeToggle; 