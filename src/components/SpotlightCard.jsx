"use client";

import { useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";

const SpotlightCard = ({ children, className = "", spotlightColor = "rgba(255, 255, 255, 0.25)" }) => {
    const { isDarkMode } = useTheme();
    const divRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e) => {
        if (!divRef.current || isFocused) return;

        const rect = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleFocus = () => {
        setIsFocused(true);
        setOpacity(0.6);
    };

    const handleBlur = () => {
        setIsFocused(false);
        setOpacity(0);
    };

    const handleMouseEnter = () => {
        setOpacity(0.6);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`relative rounded-3xl overflow-hidden p-6 sm:p-8 transition-all duration-300 transform hover:scale-[1.02] ${
                isDarkMode 
                    ? 'bg-[#0f172a] text-[#f8fafc] border border-[#1e293b] hover:border-[#3b82f6] shadow-lg shadow-[#1e293b]/20 hover:shadow-[#3b82f6]/20' 
                    : 'bg-[rgb(247,244,244)] text-black shadow-md hover:shadow-lg'
            } ${className}`}
        >
            <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out"
                style={{
                    opacity,
                    background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${
                        isDarkMode ? 'rgba(59, 130, 246, 0.2)' : spotlightColor
                    }, transparent 80%)`,
                }}
            />
            {children}
        </div>
    );
};

export default SpotlightCard;