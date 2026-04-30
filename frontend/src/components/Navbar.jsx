import { BarChart3, FolderKanban, LayoutDashboard, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import AppLogo from "./AppLogo.jsx";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const initials = user?.name
    ?.split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <aside className="flex h-full min-h-0 w-full flex-col bg-slate-950 px-5 py-6 text-white lg:h-dvh lg:w-72 lg:overflow-hidden">
      <div className="group flex shrink-0 items-center gap-3">
        <AppLogo className="h-12 w-12 shrink-0 drop-shadow-[0_10px_22px_rgba(45,212,191,0.2)] transition duration-300 group-hover:-rotate-2 group-hover:scale-105 group-hover:drop-shadow-[0_16px_30px_rgba(45,212,191,0.34)]" />
        <div>
          <p className="text-lg font-bold">FlowPilot</p>
          <p className="text-xs text-slate-400">Smart task command center</p>
        </div>
      </div>

      <nav className="mt-9 flex-1 space-y-2 overflow-y-auto pr-1">
        <a
          className="flex items-center gap-3 rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white"
          href="/dashboard"
        >
          <LayoutDashboard size={18} aria-hidden="true" />
          Dashboard
        </a>
        <a
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
          href="#categories"
        >
          <FolderKanban size={18} aria-hidden="true" />
          Categories
        </a>
        <a
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
          href="#progress"
        >
          <BarChart3 size={18} aria-hidden="true" />
          Progress
        </a>
      </nav>

      <div className="mt-6 shrink-0 rounded-md border border-white/10 bg-white/5 p-3 shadow-[0_18px_50px_rgba(0,0,0,0.22)]">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-500 text-sm font-bold text-slate-950">
            {initials || "U"}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{user?.name}</p>
            <p className="truncate text-xs text-slate-400">{user?.email}</p>
          </div>
        </div>
        <button
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-md border border-white/10 px-3 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white"
          onClick={handleLogout}
          type="button"
        >
          <LogOut size={16} aria-hidden="true" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Navbar;
