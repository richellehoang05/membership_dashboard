import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { MemberProgressProvider } from "@/context/MemberProgressContext";

export default function DashboardLayout({ children }) {
  return (
    <MemberProgressProvider>
      <div className="min-h-screen bg-white text-zinc-900">
        <div className="flex">
          <Sidebar />
          <div className="flex-1 min-w-0">
            <Topbar />
            <main className="px-8 py-6">{children}</main>
          </div>
        </div>
      </div>
    </MemberProgressProvider>
  );
}