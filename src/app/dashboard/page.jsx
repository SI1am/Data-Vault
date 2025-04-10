"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import FloatingNav from "@/components/floating-nav";
import { FloatingPaths } from "@/components/FloatingPaths";
import ProtectedRoute from "@/components/ProtectedRoute";
import SpotlightCard from "@/components/SpotlightCard";
import { FileText, Upload, BarChart2 } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <FloatingNav />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-foreground mb-8">Welcome to DataVault</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/dashboard/my-files">
              <SpotlightCard className="h-full">
                <div className="flex items-center gap-4">
                  <FileText className="text-primary" size={24} />
                  <div>
                    <h3 className="font-medium text-foreground">My Files</h3>
                    <p className="text-sm text-muted-foreground">Access and manage your files</p>
                  </div>
                </div>
              </SpotlightCard>
            </Link>

            <SpotlightCard className="h-full">
              <div className="flex items-center gap-4">
                <Upload className="text-primary" size={24} />
                <div>
                  <h3 className="font-medium text-foreground">Upload Files</h3>
                  <p className="text-sm text-muted-foreground">Upload new files to your vault</p>
                </div>
              </div>
            </SpotlightCard>

            <SpotlightCard className="h-full">
              <div className="flex items-center gap-4">
                <BarChart2 className="text-primary" size={24} />
                <div>
                  <h3 className="font-medium text-foreground">Storage Stats</h3>
                  <p className="text-sm text-muted-foreground">View your storage usage</p>
                </div>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 