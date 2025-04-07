"use client";
import { FloatingPaths } from "@/components/FloatingPaths";
import { motion } from "framer-motion";
import FloatingNav from "@/components/floating-nav";
import { Button } from "@/components/ui/button";
import React from "react";
import { Code, Users, Rocket } from "lucide-react";
import SpotlightCard from "@/components/SpotlightCard";
import Steps from "@/components/steps";
import { WorldMap } from "@/components/world-map";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-4 mt-8 text-center">
            <nav className="flex justify-center space-x-6">
                <a href="/about" className="hover:underline">About</a>
                <a href="/blog" className="hover:underline">Blog</a>
                <a href="/faqs" className="hover:underline">FAQs</a>
                <a href="/terms" className="hover:underline">Terms</a>
                <a href="/privacy-policy" className="hover:underline">Privacy Policy</a>
            </nav>
        </footer>
    );
};

export default function Home({ title = "Secure Your Digital Vault with Confidence" }) {
    const words = title.split(" ");
    return (
        <>
            <FloatingNav />
            <div
                suppressHydrationWarning
                className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
            >
                <div className="absolute inset-0">
                    <FloatingPaths position={1} />
                    <FloatingPaths position={-1} />
                </div>
                <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 2 }}
                        className="max-w-4xl mx-auto"
                    >
                        <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold mb-8 tracking-tighter">
                            {words.map((word, wordIndex) => (
                                <span key={wordIndex} className="inline-block mr-4 last:mr-0">
                                    {word.split("").map((letter, letterIndex) => (
                                        <motion.span
                                            key={`${wordIndex}-${letterIndex}`}
                                            initial={{ y: 100, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{
                                                delay: wordIndex * 0.1 + letterIndex * 0.03,
                                                type: "spring",
                                                stiffness: 150,
                                                damping: 25,
                                            }}
                                            className="inline-block text-transparent bg-clip-text 
                                                bg-gradient-to-r from-neutral-900 to-neutral-700/80 
                                                dark:from-white dark:to-white/80"
                                        >
                                            {letter}
                                        </motion.span>
                                    ))}
                                </span>
                            ))}
                        </h1>

                        <div className="inline-block group bg-gradient-to-b from-black/10 to-white/10 dark:from-white/10 dark:to-black/10 p-px rounded-2xl backdrop-blur-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <Link href="/login">
                                <Button
                                    variant="ghost"
                                    className="rounded-[1.15rem] px-8 py-6 text-lg font-semibold backdrop-blur-md 
                                        bg-white/95 hover:bg-white/100 dark:bg-black/95 dark:hover:bg-black/100 
                                        text-black dark:text-white transition-all duration-300 
                                        group-hover:-translate-y-0.5 border border-black/10 dark:border-white/10
                                        hover:shadow-md dark:hover:shadow-neutral-800/50"
                                >
                                    Access Vault
                                    <span
                                        className="ml-3 opacity-70 group-hover:opacity-100 group-hover:translate-x-1.5 
                                            transition-all duration-300"
                                    >
                                        →
                                    </span>
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>

            <Steps />

            <div className="bg-white p-4 text-center p-x-5">
                <h2 className="text-3xl text-black text-center font-bold mt-10 mb-10">
                    {"Our Mission".split(" ").map((word, idx) => (
                        <motion.span
                            key={idx}
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: idx * 0.04 }}
                        >
                            {word + " "}
                        </motion.span>
                    ))}
                </h2>
                <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 w-full h-full">
                    {[
                        {
                            icon: <Rocket size={40} className="text-blue-400" />,
                            title: "Secure Infrastructure",
                            text: "Leverage encryption to build airtight systems for storing sensitive data.",
                            color: "rgba(96, 165, 250,1)",
                        },
                        {
                            icon: <Code size={40} className="text-green-400" />,
                            title: "Smart Automation",
                            text: "Use AI-powered threat analysis and compliance tracking for intelligent vault management.",
                            color: "rgba(74 ,222 ,128 ,1)",
                        },
                        {
                            icon: <Users size={40} className="text-purple-400" />,
                            title: "Trust through Transparency",
                            text: "Establish user trust through open-source tech, real-time auditing, and user empowerment.",
                            color: "rgba(192, 132, 252,1)",
                        },
                    ].map((item, index) => (
                        <SpotlightCard
                            key={index}
                            className="custom-spotlight-card w-full max-w-xs sm:max-w-sm shadow"
                            spotlightColor={item.color}
                        >
                            <div className="p-4 sm:p-6 flex flex-col items-center text-center">
                                <div className="mb-4">{item.icon}</div>
                                <div className="mb-4 text-lg font-semibold">{item.title}</div>
                                <p className="text-sm text-gray-300">{item.text}</p>
                            </div>
                        </SpotlightCard>
                    ))}
                </div>
            </div>

            <div className="py-40 dark:bg-black bg-white w-full">
                <div className="max-w-7xl mx-auto text-center">
                    <p className="font-bold text-xl md:text-4xl dark:text-white text-black">
                        Global{" "}
                        <span className="text-green-400">
                            {"Access".split("").map((letter, idx) => (
                                <motion.span
                                    key={idx}
                                    className="inline-block"
                                    initial={{ x: -10, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.5, delay: idx * 0.04 }}
                                >
                                    {letter}
                                </motion.span>
                            ))}
                        </span>
                    </p>
                    <p className="text-sm md:text-lg text-neutral-500 max-w-2xl mx-auto py-4">
                        Access your files from anywhere in the world — securely, reliably, and instantly.
                    </p>
                </div>
                <WorldMap
                    lineColor="#000000"
                    dots={[
                        { start: { lat: 64.2008, lng: -149.4937 }, end: { lat: 34.0522, lng: -118.2437 } },
                        { start: { lat: 64.2008, lng: -149.4937 }, end: { lat: -15.7975, lng: -47.8919 } },
                        { start: { lat: -15.7975, lng: -47.8919 }, end: { lat: 38.7223, lng: -9.1393 } },
                        { start: { lat: 51.5074, lng: -0.1278 }, end: { lat: 28.6139, lng: 77.209 } },
                        { start: { lat: 28.6139, lng: 77.209 }, end: { lat: 43.1332, lng: 131.9113 } },
                        { start: { lat: 28.6139, lng: 77.209 }, end: { lat: -1.2921, lng: 36.8219 } },
                    ]}
                />
            </div>

            <section className="py-16 flex justify-center">
                <div className="max-w-screen-xl mx-auto text-center">
                    <h2 className="text-3xl text-black font-bold mb-6">
                        {"User Feedback".split(" ").map((word, idx) => (
                            <motion.span
                                key={idx}
                                initial={{ x: -10, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: idx * 0.04 }}
                            >
                                {word + " "}
                            </motion.span>
                        ))}
                    </h2>
                    <div className="flex flex-wrap justify-center gap-8">
                        {[
                            { name: "Anish", review: "Data-Vault gave me control over my sensitive data like never before." },
                            { name: "Priya", review: "Impressive security and a user-friendly vaulting experience!" },
                            { name: "Abhay", review: "The perfect platform for encrypted file storage and backup." },
                        ].map(({ name, review }) => (
                            <SpotlightCard
                                key={name}
                                className="custom-spotlight-card w-full max-w-xs sm:max-w-sm bg-black flex flex-col items-center text-center"
                                spotlightColor={"rgba(255,255,255,0.5)"}
                            >
                                <div className="p-4 sm:p-6 flex flex-col items-center text-center">
                                    <div className="mb-4 text-lg text-white font-semibold">{name}</div>
                                    <p className="text-sm text-gray-300">{review}</p>
                                </div>
                            </SpotlightCard>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
