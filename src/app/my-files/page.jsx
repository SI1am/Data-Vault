"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaSearch, FaFileAlt, FaCalendarAlt, FaLock, FaPlus } from "react-icons/fa";
import { motion } from "framer-motion";
import { FloatingPaths } from "@/components/FloatingPaths";
import FloatingNav from "@/components/floating-nav";

// Dummy file data
const myFiles = [
  { id: 1, name: "Budget.xlsx", type: "Excel", date: "2025-04-01", access: "Private" },
  { id: 2, name: "Ideas.txt", type: "Text", date: "2025-03-30", access: "Private" },
];

const sharedFiles = [
  { id: 3, name: "Resume.pdf", type: "PDF", date: "2025-04-01", access: "Public", sharedBy: "Alice", sharedTo: "You" },
  { id: 4, name: "Plan.docx", type: "Word", date: "2025-03-28", access: "Shared with HR", sharedBy: "Bob", sharedTo: "You" },
];

const archivedFiles = [
  { id: 5, name: "OldNotes.txt", type: "Text", date: "2024-12-01", access: "Archived" },
];

const viewLabel = {
  my: "My Files",
  shared: "Shared Files",
  archived: "Archived Files",
};

export default function FileManager() {
  const [search, setSearch] = useState("");
  const [view, setView] = useState("my");

  const filesToDisplay = view === "my" ? myFiles : view === "shared" ? sharedFiles : archivedFiles;

  const filteredFiles = filesToDisplay.filter((file) =>
    file.name.toLowerCase().includes(search.toLowerCase()) ||
    file.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <FloatingNav name="/files" />
      <div className="fixed inset-0 z-[-10]">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-full sm:w-64 bg-white border-r p-6 space-y-6 shadow-md">
          <Button className="w-full flex items-center justify-center gap-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all">
            <FaPlus /> Add New
          </Button>

          <div className="flex flex-col gap-2 mt-6">
            {["my", "shared", "archived"].map((v) => (
              <motion.button
                key={v}
                onClick={() => setView(v)}
                whileTap={{ scale: 0.95 }}
                className={`text-left px-4 py-2 rounded-md font-medium text-sm ${
                  view === v
                    ? "bg-blue-100 text-blue-700"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                {viewLabel[v]}
              </motion.button>
            ))}
          </div>

          <div className="mt-8">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search files or types..."
              className="w-full"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
          <h1 className="text-2xl font-semibold mb-4 text-gray-800">
            {viewLabel[view]}
          </h1>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFiles.map((file) => (
              <div
                key={file.id}
                className="bg-white p-4 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-transform"
              >
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <FaFileAlt /> {file.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">Type: {file.type}</p>
                <p className="text-sm text-green-500 mt-1 flex items-center gap-1">
                  <FaCalendarAlt /> {file.date}
                </p>
                <p className="text-sm text-blue-500 mt-1 flex items-center gap-1">
                  <FaLock /> Access: {file.access}
                </p>

                {view === "shared" && file.sharedBy && (
                  <p className="text-sm text-purple-600 mt-1">
                    Shared by <b>{file.sharedBy}</b> → <b>{file.sharedTo}</b>
                  </p>
                )}

                <Button className="mt-3 bg-purple-600 hover:bg-purple-800 text-white w-full rounded-full">
                  {view === "my" ? "Edit File" : "Manage Access"}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
