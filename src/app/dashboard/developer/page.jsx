"use client";
import { useState, useEffect } from "react";
import { FaUser, FaFileAlt, FaCog, FaBars, FaTimes, FaUpload, FaDownload } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

type UserRole = "Admin" | "Manager" | "User";

type SharedFile = {
    id: number;
    name: string;
    sharedWith: string; 
    url: string;
};

export default function UserDashboard() {
    const [activeTab, setActiveTab] = useState<string>("dashboard");
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const [userRole, setUserRole] = useState<UserRole>("User"); 
    const [files, setFiles] = useState<SharedFile[]>([]);

    useEffect(() => {
        const savedTab = localStorage.getItem("activeTab");
        if (savedTab) setActiveTab(savedTab);

        // Simulating fetching user role & shared files from a backend
        setTimeout(() => {
            setUserRole("Manager"); 
            setFiles([
                { id: 1, name: "Project_Plan.pdf", sharedWith: "Admin", url: "#" },
                { id: 2, name: "Budget_Report.xlsx", sharedWith: "User", url: "#" },
                { id: 3, name: "Design_Docs.zip", sharedWith: "Manager", url: "#" }
            ]);
        }, 1000);
    }, []);

    useEffect(() => {
        localStorage.setItem("activeTab", activeTab);
    }, [activeTab]);

    const tabs = [
        { id: "dashboard", icon: <MdDashboard />, label: "Dashboard" },
        { id: "files", icon: <FaFileAlt />, label: "Shared Files" },
        { id: "settings", icon: <FaCog />, label: "Settings" },
    ];

    return (
        <div className="flex h-screen bg-gray-100 text-gray-900 flex-col">
            {/* Header */}
            <header className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
                <h1 className="text-2xl font-bold">User Dashboard</h1>
                <button className="text-white text-2xl md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
                    {sidebarOpen ? <FaTimes /> : <FaBars />}
                </button>
            </header>

            <div className="flex flex-1">
                {/* Sidebar */}
                <aside className={`absolute md:relative w-64 bg-white p-6 shadow-lg transition-all duration-300 ${sidebarOpen ? "left-0" : "-left-64"} md:left-0 md:block`}>
                    <nav className="mt-6 space-y-3">
                        {tabs.map(({ id, icon, label }) => (
                            <button
                                key={id}
                                className={`flex items-center space-x-3 p-3 rounded-lg w-full text-gray-700 hover:bg-blue-100 transition-all ${activeTab === id ? "bg-blue-500 text-white" : ""}`}
                                onClick={() => {
                                    setActiveTab(id);
                                    setSidebarOpen(false);
                                }}
                            >
                                {icon} <span>{label}</span>
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-8 bg-white shadow-md rounded-lg mx-6 my-4">
                    {activeTab === "dashboard" && (
                        <section>
                            <h2 className="text-3xl font-semibold text-gray-800 mb-4">User Overview</h2>
                            <div className="flex items-center space-x-6">
                                <img src="https://avatar.iran.liara.run/public" alt="User Avatar" className="w-20 h-20 rounded-full shadow-md" />
                                <div>
                                    <h3 className="text-xl font-bold">John Doe</h3>
                                    <p className="text-gray-600 flex items-center"><FaUser className="mr-2" /> Role: <span className="ml-2 font-semibold">{userRole}</span></p>
                                </div>
                            </div>
                            <p className="mt-6 text-gray-700 leading-relaxed">
                                Welcome to your dashboard! Here you can view your role, manage your shared files, and adjust settings.
                            </p>
                        </section>
                    )}

                    {activeTab === "files" && (
                        <section>
                            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Files You Have Shared</h2>
                            <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                                <label className="flex items-center justify-center cursor-pointer border-2 border-dashed border-blue-500 p-4 rounded-lg text-blue-500 hover:bg-blue-50">
                                    <FaUpload className="mr-2" /> Upload File
                                    <input type="file" className="hidden" />
                                </label>
                            </div>

                            <ul className="mt-6 space-y-3">
                                {files.length > 0 ? files.map((file) => (
                                    <li key={file.id} className="bg-gray-100 p-4 rounded-lg shadow flex justify-between items-center">
                                        <div>
                                            <p className="font-semibold">{file.name}</p>
                                            <p className="text-gray-500 text-sm">Shared with: {file.sharedWith}</p>
                                        </div>
                                        <a href={file.url} download={file.name} className="text-blue-500 hover:underline flex items-center">
                                            <FaDownload className="mr-1" /> Download
                                        </a>
                                    </li>
                                )) : (
                                    <p className="text-gray-500">No files shared yet.</p>
                                )}
                            </ul>
                        </section>
                    )}
                </main>
            </div>
        </div>
    );
}
