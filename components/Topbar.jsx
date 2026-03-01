import MembershipProgress from "@/components/MembershipProgress";

export default function Topbar() {
  return (
    <header className="border-b border-zinc-200 bg-white flex items-center px-8 py-4">
      <div className="flex-1 min-w-0">
        <MembershipProgress currentStage="Active" />
      </div>
    </header>
  );
}