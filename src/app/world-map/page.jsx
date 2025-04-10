"use client";

import WorldMap from "@/components/WorldMap";
import FloatingNav from "@/components/floating-nav";

export default function WorldMapPage() {
    return (
        <>
            <FloatingNav />
            <div className="relative h-screen w-screen bg-background">
                <div className="absolute inset-0">
                    <WorldMap />
                </div>
                <div className="relative z-10 flex items-center justify-center h-full">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-black dark:text-white mb-4">
                            Global Connections
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                            Watch the dots connect across the world
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
} 