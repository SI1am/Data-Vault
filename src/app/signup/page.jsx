"use client";
import { Github, Chrome } from "lucide-react";
import { FloatingPaths } from "@/components/FloatingPaths";
import FloatingNav from "@/components/floating-nav";
import Link from "next/link";

export default function AuthPage() {
    return (
        <>
            <FloatingNav />
            <div className="relative h-screen w-screen flex items-center justify-center bg-background text-foreground">
                <div className="absolute inset-0">
                    <FloatingPaths position={1} />
                    <FloatingPaths position={-1} />
                </div>
                <div className="relative z-10 w-96 p-6 bg-card border border-border rounded-xl shadow-lg shadow-primary/10 backdrop-blur-md">
                    <h2 className="text-3xl font-semibold text-center mb-6 animate-fade-in">
                        Sign Up
                    </h2>

                    {/* Sign Up Form */}
                    <form className="space-y-4">
                        <input
                            type="text"
                            placeholder="Username"
                            className="w-full h-14 p-3 border border-border bg-input text-foreground rounded-lg focus:ring-2 focus:ring-primary"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full h-14 p-3 border border-border bg-input text-foreground rounded-lg focus:ring-2 focus:ring-primary"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full h-14 p-3 border border-border bg-input text-foreground rounded-lg focus:ring-2 focus:ring-primary"
                        />
                        <button
                            type="submit"
                            className="w-full h-14 bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition-transform transform hover:scale-105"
                        >
                            Sign Up
                        </button>
                    </form>

                    {/* Social Auth */}
                    <div className="flex items-center justify-center mt-6 space-x-4 animate-slide-in">
                        {[
                            { icon: <Github size={24} />, name: "GitHub" },
                            { icon: <Chrome size={24} className="text-red-500" />, name: "Google" }
                        ].map((social, index) => (
                            <button
                                key={index}
                                className="relative flex items-center justify-center bg-muted p-3 rounded-full hover:bg-muted-dark group shadow-md shadow-primary/50 transition-transform transform hover:scale-110"
                            >
                                {social.icon}
                                <span className="absolute opacity-0 group-hover:opacity-100 transition-opacity bg-card text-foreground text-xs rounded-lg px-2 py-1 top-10">
                                    {social.name}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Redirect to Login */}
                    <p className="text-center mt-6 text-sm">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="text-blue-500 hover:text-blue-700 ml-1"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}
