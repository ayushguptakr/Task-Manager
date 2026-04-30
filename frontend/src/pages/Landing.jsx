import {
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import AppLogo from "../components/AppLogo.jsx";

const features = [
  {
    title: "Tasks have the basics",
    copy: "Each task can include a title, notes, priority, category, deadline, and current status.",
  },
  {
    title: "Filters are simple",
    copy: "Move between all tasks, pending tasks, active tasks, completed tasks, and category views.",
  },
  {
    title: "Progress is easy to see",
    copy: "See how many tasks are done and how many are still open before you start working.",
  },
  {
    title: "AI help is optional",
    copy: "Ask for a suggested priority, category, or short daily summary only when you want it.",
  },
  {
    title: "Your tasks stay in your account",
    copy: "Login, protected pages, user-specific tasks, and password hashing are already set up.",
  },
  {
    title: "Frontend and backend are separate",
    copy: "The React app and API are split so they are easier to run, update, and deploy.",
  },
];

const Landing = () => (
  <main className="min-h-screen bg-[#f7f8f4] font-sans text-slate-950">
    <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6 sm:px-8">
      <Link className="flex items-center gap-3" to="/">
        <AppLogo flat animated={false} className="h-11 w-11 shrink-0" />
        <span className="text-lg font-bold">FlowPilot</span>
      </Link>

      <nav className="flex items-center gap-3">
        <Link className="hidden text-sm font-semibold text-slate-700 hover:text-emerald-700 sm:inline" to="/login">
          Log in
        </Link>
        <Link
          className="inline-flex items-center gap-2 rounded-md bg-emerald-700 px-4 py-2 text-sm font-bold text-white transition hover:bg-emerald-800"
          to="/signup"
        >
          Get started
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </nav>
    </header>

    <section className="mx-auto grid max-w-7xl items-start gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:py-20">
      <div>
        <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">A simple place for your tasks</p>
        <h1 className="mt-5 max-w-3xl text-5xl font-black leading-[1.02] tracking-normal text-slate-950 sm:text-6xl">
          Keep your tasks, deadlines, and priorities in one place.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-[1.55] text-slate-700">
          FlowPilot helps you write down what needs to get done, see what matters first, and track your progress through the day.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link
            className="inline-flex items-center justify-center gap-2 rounded-md bg-emerald-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-800"
            to="/signup"
          >
            Create account
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
          <Link
            className="inline-flex items-center justify-center rounded-md border border-slate-300 px-5 py-3 text-sm font-bold text-slate-800 transition hover:border-emerald-700 hover:text-emerald-700"
            to="/login"
          >
            Open dashboard
          </Link>
        </div>

        <div className="mt-10 grid gap-5 border-t border-slate-300 pt-6 sm:grid-cols-3">
          <div>
            <p className="text-3xl font-black text-slate-950">7d</p>
            <p className="mt-1 text-sm font-medium text-slate-600">Login token length</p>
          </div>
          <div>
            <p className="text-3xl font-black text-slate-950">5</p>
            <p className="mt-1 text-sm font-medium text-slate-600">Priority levels</p>
          </div>
          <div>
            <p className="text-3xl font-black text-slate-950">24h</p>
            <p className="mt-1 text-sm font-medium text-slate-600">Daily planning view</p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-slate-300 p-5 sm:p-6">
        <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">What is already built</p>
        <h2 className="mt-3 text-2xl font-black leading-tight">Working app pieces, not placeholder sections.</h2>

        <div className="mt-6 divide-y divide-slate-300 border-y border-slate-300">
          {[
            ["Auth", "Register, login, JWT sessions, bcrypt password hashing"],
            ["Tasks", "Create, read, update, delete, filter, and change status"],
            ["AI", "Suggestion and daily summary endpoints using provider-neutral config"],
            ["Deploy", "Environment variables, CORS, Vercel frontend, Render backend"],
          ].map(([label, detail]) => (
            <div className="grid gap-2 py-4 sm:grid-cols-[120px_1fr]" key={label}>
              <p className="text-sm font-black text-slate-950">{label}</p>
              <p className="text-sm leading-[1.55] text-slate-700">{detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-7xl border-y border-slate-300 px-5 py-16 sm:px-8 lg:py-20">
      <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">Why it exists</p>
          <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">Your task list should be easy to read.</h2>
        </div>
        <p className="max-w-3xl text-lg leading-[1.55] text-slate-700">
          A lot of task apps ask you to manage the app instead of the work. FlowPilot keeps the important parts visible: what the task is, when it is due, how important it is, and whether it is done.
        </p>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
      <div className="grid gap-8 rounded-lg border border-slate-300 p-5 sm:p-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">Proof it is real</p>
          <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
            The project has working code behind it.
          </h2>
          <p className="mt-5 text-base leading-[1.55] text-slate-700">
            The app already has a working frontend, backend routes, authentication, task CRUD, and AI endpoints wired into the dashboard.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            ["Build result", "Frontend production build passes"],
            ["API coverage", "Auth, task, and AI routes are implemented"],
            ["Task actions", "Create, read, update, and delete are ready"],
            ["Dependency check", "Backend production audit shows 0 vulnerabilities"],
          ].map(([label, result]) => (
            <div className="border-l-4 border-emerald-700 py-2 pl-4" key={label}>
              <p className="text-sm font-black uppercase tracking-wide text-emerald-700">{label}</p>
              <p className="mt-2 text-lg font-black text-slate-950">{result}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
      <div className="max-w-2xl">
        <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">What you get</p>
        <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">The parts you need for everyday planning.</h2>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {features.map((feature) => (
          <article className="rounded-lg border border-slate-300 p-5" key={feature.title}>
            <h3 className="text-lg font-black">{feature.title}</h3>
            <p className="mt-3 text-sm leading-[1.55] text-slate-700">{feature.copy}</p>
          </article>
        ))}
      </div>
    </section>

    <section className="mx-auto grid max-w-7xl gap-8 border-y border-slate-300 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:py-20">
      <div>
        <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">AI help</p>
        <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
          Get a suggestion when you are not sure how to rank a task.
        </h2>
        <p className="mt-5 text-base leading-[1.55] text-slate-700">
          FlowPilot can suggest a priority and category for a new task. You can apply the suggestion or ignore it.
        </p>
      </div>

      <div className="space-y-4">
        <div className="rounded-lg border border-slate-300 p-5">
          <h3 className="font-black">Task suggestion</h3>
          <p className="mt-4 text-sm leading-[1.55] text-slate-700">
            Priority: 4 | Category: Work | Reason: This task has a clear deadline and needs focused time.
          </p>
        </div>
        <div className="rounded-lg border border-slate-300 p-5">
          <h3 className="font-black">Daily summary</h3>
          <p className="mt-4 text-sm leading-[1.55] text-slate-700">
            Start with the most urgent task first, then handle smaller tasks after that.
          </p>
        </div>
      </div>
    </section>

    <section className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:py-20">
      <div>
        <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">Ready to run</p>
        <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
          Set it up locally, then deploy it when you are ready.
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {[
          ["Frontend", "The app uses React, Vite, Tailwind CSS, Axios, and protected routes."],
          ["Backend", "The API uses Express, MongoDB, Mongoose, JWT auth, and user-specific routes."],
          ["Security", "Passwords are hashed, and login tokens expire after seven days."],
          ["Deployment", "Environment variables and CORS settings are already included."],
        ].map(([title, copy]) => (
          <div className="rounded-lg border border-slate-300 p-5" key={title}>
            <h3 className="font-black">{title}</h3>
            <p className="mt-2 text-sm leading-[1.55] text-slate-700">{copy}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
      <div className="rounded-lg border border-slate-300 px-5 py-8 sm:px-8 lg:flex lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">Try it now</p>
          <h2 className="mt-3 text-3xl font-black leading-tight">Add your tasks and see what needs attention.</h2>
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:mt-0">
          <Link
            className="inline-flex items-center justify-center gap-2 rounded-md bg-emerald-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-800"
            to="/signup"
          >
            Create account
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
          <Link
            className="inline-flex items-center justify-center rounded-md border border-slate-300 px-5 py-3 text-sm font-bold text-slate-800 transition hover:border-emerald-700 hover:text-emerald-700"
            to="/login"
          >
            Log in
          </Link>
        </div>
      </div>
    </section>

    <footer className="border-t border-slate-300 px-5 py-10 sm:px-8 lg:py-12">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <Link className="inline-flex items-center gap-3" to="/">
            <AppLogo flat animated={false} className="h-10 w-10 shrink-0" />
            <span className="text-lg font-black">FlowPilot</span>
          </Link>
          <p className="mt-4 max-w-md text-sm leading-[1.55] text-slate-700">
            A simple task app for planning your day, setting priorities, and tracking what is done.
          </p>
          <p className="mt-5 text-sm font-semibold text-slate-600">Built with React, Express, MongoDB, and JWT auth.</p>
        </div>

        <div>
          <h2 className="text-sm font-black uppercase tracking-wide text-emerald-700">Product</h2>
          <nav className="mt-4 space-y-3 text-sm font-semibold text-slate-700">
            <a className="block hover:text-emerald-700" href="#top">
              Overview
            </a>
            <Link className="block hover:text-emerald-700" to="/login">
              Dashboard
            </Link>
            <Link className="block hover:text-emerald-700" to="/signup">
              Create account
            </Link>
          </nav>
        </div>

        <div>
          <h2 className="text-sm font-black uppercase tracking-wide text-emerald-700">Project</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-700">
            <p>Frontend: ready for Vercel</p>
            <p>Backend: ready for Render</p>
            <p>API: routes are protected</p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 flex max-w-7xl flex-col gap-3 border-t border-slate-300 pt-5 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
        <p>(c) 2026 FlowPilot. All rights reserved.</p>
        <p className="font-semibold text-emerald-700">Know what to do next.</p>
      </div>
    </footer>
  </main>
);

export default Landing;
