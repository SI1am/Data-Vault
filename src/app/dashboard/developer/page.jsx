"use client";
import { useState, useEffect } from "react";
import { FaCloudUploadAlt, FaFileAlt, FaCog, FaBars, FaTimes } from "react-icons/fa";

export default function UserDashboard() {
    const [activeTab, setActiveTab] = useState("files");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([
        { name: "Report.pdf", size: "2.1MB", uploadedAt: "March 15, 2025" },
        { name: "Presentation.pptx", size: "5.4MB", uploadedAt: "March 14, 2025" },
        { name: "Project.zip", size: "10.2MB", uploadedAt: "March 10, 2025" }
    ]);

    useEffect(() => {
        const savedTab = localStorage.getItem("activeTab");
        if (savedTab) setActiveTab(savedTab);
    }, []);

    useEffect(() => {
        localStorage.setItem("activeTab", activeTab);
    }, [activeTab]);

    const tabs = [
        { id: "files", icon: <FaFileAlt />, label: "My Files" },
        { id: "upload", icon: <FaCloudUploadAlt />, label: "Upload File" },
        { id: "settings", icon: <FaCog />, label: "Settings" }
    ];

    return (
        <div className="flex h-screen bg-gray-100 text-gray-900 flex-col">
            {/* Header */}
            <header className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
                <h1 className="text-2xl font-bold">DataVault</h1>
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
                    {activeTab === "files" && (
                        <section>
                            <h2 className="text-3xl font-semibold text-gray-800 mb-4">My Uploaded Files</h2>
                            <ul className="space-y-4">
                                {uploadedFiles.map((file, index) => (
                                    <li key={index} className="bg-gray-200 p-4 rounded-lg shadow-md flex justify-between items-center">
                                        <span>{file.name} ({file.size})</span>
                                        <span className="text-sm text-gray-500">Uploaded: {file.uploadedAt}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
                    {activeTab === "upload" && (
                        <section>
                            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Upload a New File</h2>
                            <div className="flex flex-col items-center p-6 border-2 border-dashed border-gray-400 rounded-lg">
                                <FaCloudUploadAlt className="text-5xl text-gray-500 mb-4" />
                                <input type="file" className="hidden" id="fileUpload" />
                                <label htmlFor="fileUpload" className="bg-blue-500 text-white py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-700">Choose File</label>
                            </div>
                        </section>
                    )}
                </main>
            </div>
        </div>
    );
}
