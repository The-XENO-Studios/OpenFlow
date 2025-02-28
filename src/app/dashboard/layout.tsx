import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, FolderOpen, Settings, LogOut } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 border-r bg-muted/30">
        <div className="h-16 border-b flex items-center px-6">
          <Link href="/" className="font-bold text-xl">
            OpenFlow
          </Link>
        </div>
        <nav className="p-4">
          <div className="space-y-2">
            <Link href="/dashboard">
              <Button variant="ghost" className="w-full justify-start">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Link href="/dashboard/projects">
              <Button variant="ghost" className="w-full justify-start">
                <FolderOpen className="mr-2 h-4 w-4" />
                Projects
              </Button>
            </Link>
            <Link href="/dashboard/settings">
              <Button variant="ghost" className="w-full justify-start">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </Link>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-500 hover:text-red-500 hover:bg-red-50"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </nav>
      </aside>
      <main className="flex-1">
        <div className="h-16 border-b flex items-center px-6">
          <h1 className="font-semibold">Dashboard</h1>
        </div>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
