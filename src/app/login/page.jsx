"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Github, Chrome } from "lucide-react";
import FloatingPaths from "@/components/FloatingPaths";
import FloatingNav from "@/components/floating-nav";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-hot-toast";

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { user, login, register } = useAuth();
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (user) {
            router.push("/dashboard");
        }
    }, [user, router]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        try {
            if (isLogin) {
                await login(formData.email, formData.password);
                toast.success("Login successful!");
                router.push("/dashboard");
            } else {
                await register(formData.name, formData.email, formData.password);
                toast.success("Account created successfully!");
                router.push("/dashboard");
            }
        } catch (error) {
            setErrors({ submit: error.message });
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (user) {
        return null;
    }

    return (
        <>
            <FloatingNav name="/login" />
            <div className="relative min-h-screen w-screen flex items-center justify-center bg-background p-4 overflow-y-auto">
                <div className="absolute inset-0 overflow-hidden">
                    <FloatingPaths position={1} />
                    <FloatingPaths position={-1} />
                </div>
                <div className="relative z-10 w-full max-w-md my-8 p-6 sm:p-8 rounded-2xl bg-white/10 backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.3)] dark:bg-[#0f172a] dark:border dark:border-[#1e293b] border border-white/30 hover:border-white/40 transition-all duration-300">
                    <h2 className="text-3xl font-semibold text-center mb-6 animate-fade-in text-black dark:text-[#f8fafc]">
                        {isLogin ? "Login" : "Sign Up"}
                    </h2>

                    {errors.submit && (
                        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 rounded-lg">
                            {errors.submit}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLogin && (
                            <div>
                                <Input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full text-black dark:text-[#f8fafc] placeholder-gray-500 dark:placeholder-[#94a3b8] bg-white/50 dark:bg-[#1e293b]/50 border border-gray-200 dark:border-[#1e293b] focus:border-[#3b82f6] dark:focus:border-[#60a5fa] focus:ring-2 focus:ring-[#3b82f6]/20 dark:focus:ring-[#60a5fa]/20"
                                />
                            </div>
                        )}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-black dark:text-[#f8fafc]">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <Input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                title="Please enter a valid email address"
                                className="w-full h-14 p-3 text-black dark:text-[#f8fafc] placeholder-gray-500 dark:placeholder-[#94a3b8] bg-white/50 dark:bg-[#1e293b]/50 border border-gray-200 dark:border-[#1e293b] focus:border-[#3b82f6] dark:focus:border-[#60a5fa] focus:ring-2 focus:ring-[#3b82f6]/20 dark:focus:ring-[#60a5fa]/20 rounded-lg"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-black dark:text-[#f8fafc]">
                                Password <span className="text-red-500">*</span>
                            </label>
                            <Input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                minLength="8"
                                title="Password must be at least 8 characters long"
                                className="w-full h-14 p-3 text-black dark:text-[#f8fafc] placeholder-gray-500 dark:placeholder-[#94a3b8] bg-white/50 dark:bg-[#1e293b]/50 border border-gray-200 dark:border-[#1e293b] focus:border-[#3b82f6] dark:focus:border-[#60a5fa] focus:ring-2 focus:ring-[#3b82f6]/20 dark:focus:ring-[#60a5fa]/20 rounded-lg"
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-[#3b82f6] hover:bg-[#2563eb] dark:bg-[#3b82f6] dark:hover:bg-[#60a5fa] text-white transition-colors duration-300"
                            disabled={loading}
                        >
                            {loading ? "Loading..." : isLogin ? "Login" : "Sign Up"}
                        </Button>
                    </form>

                    <div className="flex items-center justify-center mt-6 space-x-4 animate-slide-in">
                        {[
                            { icon: <Github size={24} className="text-black dark:text-[#f8fafc]" />, name: "GitHub" },
                            { icon: <Chrome size={24} className="text-red-500" />, name: "Google" },
                        ].map((social, index) => (
                            <button
                                key={index}
                                className="relative flex items-center justify-center bg-white/50 dark:bg-[#1e293b]/50 p-3 rounded-full hover:bg-white/80 dark:hover:bg-[#1e293b]/80 group shadow-md shadow-[#3b82f6]/20 dark:shadow-[#60a5fa]/20 transition-transform transform hover:scale-110"
                            >
                                {social.icon}
                                <span className="absolute opacity-0 group-hover:opacity-100 transition-opacity bg-white dark:bg-[#0f172a] text-black dark:text-[#f8fafc] text-xs rounded-lg px-2 py-1 top-10">
                                    {social.name}
                                </span>
                            </button>
                        ))}
                    </div>

                    <p className="text-center mt-6 text-sm text-black dark:text-[#f8fafc]">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}
                        <Link
                            href={isLogin ? "/signup" : "/login"}
                            className="text-[#3b82f6] hover:text-[#2563eb] dark:text-[#60a5fa] dark:hover:text-[#93c5fd] ml-1 transition-colors duration-300"
                        >
                            {isLogin ? "Sign Up" : "Login"}
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}
