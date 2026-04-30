import { Loader2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { getErrorMessage } from "../api/axios.js";
import AppLogo from "../components/AppLogo.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const Login = () => {
  const { isAuthenticated, login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await login(form);
      toast.success("Welcome back");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="grid min-h-screen bg-slate-100 lg:grid-cols-[1fr_560px]">
      <section className="hidden bg-slate-950 px-12 py-10 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="group flex items-center gap-3">
          <AppLogo className="h-12 w-12 shrink-0 drop-shadow-[0_10px_22px_rgba(45,212,191,0.2)] transition duration-300 group-hover:-rotate-2 group-hover:scale-105 group-hover:drop-shadow-[0_16px_30px_rgba(45,212,191,0.34)]" />
          <p className="text-xl font-bold">FlowPilot</p>
        </div>
        <div className="max-w-xl">
          <h1 className="text-5xl font-bold leading-tight">Plan the day with a sharper signal.</h1>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            Sign in to manage work, deadlines, and AI-powered productivity insights from one focused dashboard.
          </p>
        </div>
      </section>

      <section className="flex items-center justify-center px-5 py-10">
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-soft">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-emerald-600">Login</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-950">Welcome back</h2>
          </div>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="label" htmlFor="email">
                Email
              </label>
              <input
                autoComplete="email"
                className="field mt-1"
                id="email"
                onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                required
                type="email"
                value={form.email}
              />
            </div>

            <div>
              <label className="label" htmlFor="password">
                Password
              </label>
              <input
                autoComplete="current-password"
                className="field mt-1"
                id="password"
                minLength={6}
                onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                required
                type="password"
                value={form.password}
              />
            </div>

            <button className="btn-primary w-full" disabled={loading} type="submit">
              {loading && <Loader2 className="animate-spin" size={18} aria-hidden="true" />}
              Log In
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            New here?{" "}
            <Link className="font-bold text-emerald-700 hover:text-emerald-800" to="/signup">
              Create an account
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Login;
