export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-white text-zinc-900 flex items-center justify-center px-6">
      {children}
    </div>
  );
}