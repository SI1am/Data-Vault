"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FaPlus, FaLock, FaFolder, FaShareAlt, FaArchive, FaChartPie, FaHistory } from "react-icons/fa";
import { motion } from "framer-motion";
import { FloatingPaths } from "@/components/FloatingPaths";
import FloatingNav from "@/components/floating-nav";

export default function Dashboard() {
  const user = { name: "Alex", plan: "Pro", storageUsed: 7.4, storageLimit: 15 };
  const stats = {
    myFiles: 24,
    sharedFiles: 13,
    archivedFiles: 8,
    folders: 5,
  };

  const recentActivities = [
    { id: 1, name: "Uploaded Resume.pdf", time: "2 hours ago" },
    { id: 2, name: "Archived Budget.xlsx", time: "Yesterday" },
    { id: 3, name: "Shared Report.docx with Alice", time: "3 days ago" },
  ];

  const storagePercent = (user.storageUsed / user.storageLimit) * 100;

  return (
    <>
      <FloatingNav name="/dashboard" />
      <div className="fixed inset-0 z-[-10]">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      <div className="min-h-screen flex flex-col px-6 sm:px-10 py-10 bg-gray-50">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome back, <span className="text-blue-600">{user.name}</span> 👋
        </h1>

        {/* Stats + Shortcuts */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <DashboardCard icon={<FaFolder />} label="My Files" value={stats.myFiles} color="blue" />
          <DashboardCard icon={<FaShareAlt />} label="Shared Files" value={stats.sharedFiles} color="purple" />
          <DashboardCard icon={<FaArchive />} label="Archived Files" value={stats.archivedFiles} color="gray" />
          <DashboardCard icon={<FaLock />} label="Secure Folders" value={stats.folders} color="green" />
        </div>

        {/* Add + Storage + Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Actions */}
          <div className="col-span-2 space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-md border">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-5">
                  <FaPlus className="mr-2" /> Add New
                </Button>
                <Button variant="outline">View My Files</Button>
                <Button variant="outline">View Shared Files</Button>
                <Button variant="outline">View Archived Files</Button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl p-6 shadow-md border">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FaHistory /> Recent Activity
              </h2>
              <ul className="space-y-3">
                {recentActivities.map((item) => (
                  <li key={item.id} className="text-sm text-gray-700 border-b pb-2 last:border-0 last:pb-0">
                    <span className="font-medium">{item.name}</span> – <span className="text-gray-500">{item.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Storage */}
          <div className="bg-white rounded-xl p-6 shadow-md border">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FaChartPie /> Storage Usage
            </h2>
            <div className="text-sm text-gray-700 mb-3">
              {user.storageUsed} GB of {user.storageLimit} GB used
            </div>
            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${storagePercent}%` }}
                transition={{ duration: 1 }}
                className="h-full bg-blue-600 rounded-full"
              />
            </div>
            <div className="mt-4 text-xs text-gray-500">
              {user.storageLimit - user.storageUsed} GB remaining. Your plan: <strong>{user.plan}</strong>.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function DashboardCard(props) {
  const { icon, label, value, color } = props;
  let colorClass = "text-gray-600";
  if (color === "blue") colorClass = "text-blue-600";
  else if (color === "purple") colorClass = "text-purple-600";
  else if (color === "gray") colorClass = "text-gray-600";
  else if (color === "green") colorClass = "text-green-600";

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white p-5 rounded-xl shadow-md border border-gray-200 flex flex-col items-start justify-between"
    >
      <div className={`text-2xl ${colorClass} mb-3`}>{icon}</div>
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-2xl font-bold text-gray-800">{value}</div>
    </motion.div>
  );
}
