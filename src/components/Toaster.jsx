"use client";

import { Toaster as HotToaster } from "react-hot-toast";

export function Toaster() {
  return (
    <HotToaster
      position="top-center"
      toastOptions={{
        duration: 3000,
        style: {
          background: "#333",
          color: "#fff",
        },
        success: {
          duration: 3000,
          style: {
            background: "#4CAF50",
            color: "#fff",
          },
        },
        error: {
          duration: 3000,
          style: {
            background: "#f44336",
            color: "#fff",
          },
        },
      }}
    />
  );
} 