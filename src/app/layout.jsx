import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/Toaster";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from '../context/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Data Vault",
  description: "Secure your digital assets with confidence",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider>
            {children}
            <ThemeToggle />
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
} 