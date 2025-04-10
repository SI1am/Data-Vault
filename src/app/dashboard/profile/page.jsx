"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import FloatingNav from "@/components/floating-nav";
import FloatingPaths from "@/components/FloatingPaths";
import ProtectedRoute from "@/components/ProtectedRoute";
import { FaUser, FaEnvelope, FaLock, FaSave } from "react-icons/fa";

export default function ProfilePage() {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your profile update logic here
        console.log("Profile update submitted:", formData);
    };

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-background">
                <FloatingNav />
                <div className="fixed inset-0 z-[-10]">
                    <FloatingPaths position={1} />
                    <FloatingPaths position={-1} />
                </div>

                <div className="container mx-auto px-4 py-8 pt-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-2xl mx-auto"
                    >
                        <div className="bg-card p-6 rounded-xl shadow-lg border border-border/40">
                            <h1 className="text-2xl font-bold text-foreground mb-6">Profile Settings</h1>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-1">
                                            Name
                                        </label>
                                        <div className="relative">
                                            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                                            <Input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="pl-10"
                                                placeholder="Your name"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-1">
                                            Email
                                        </label>
                                        <div className="relative">
                                            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                                            <Input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="pl-10"
                                                placeholder="Your email"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h2 className="text-lg font-semibold text-foreground">Change Password</h2>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-1">
                                            Current Password
                                        </label>
                                        <div className="relative">
                                            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                                            <Input
                                                type="password"
                                                name="currentPassword"
                                                value={formData.currentPassword}
                                                onChange={handleChange}
                                                className="pl-10"
                                                placeholder="Current password"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-1">
                                            New Password
                                        </label>
                                        <div className="relative">
                                            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                                            <Input
                                                type="password"
                                                name="newPassword"
                                                value={formData.newPassword}
                                                onChange={handleChange}
                                                className="pl-10"
                                                placeholder="New password"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-1">
                                            Confirm New Password
                                        </label>
                                        <div className="relative">
                                            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                                            <Input
                                                type="password"
                                                name="confirmPassword"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                className="pl-10"
                                                placeholder="Confirm new password"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90"
                                >
                                    <FaSave className="w-4 h-4" />
                                    Save Changes
                                </Button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </ProtectedRoute>
    );
} 