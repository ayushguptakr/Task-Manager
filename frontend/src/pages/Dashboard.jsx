import { Plus, RefreshCw, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import api, { getErrorMessage } from "../api/axios.js";
import AISummaryPanel from "../components/AISummaryPanel.jsx";
import Navbar from "../components/Navbar.jsx";
import TaskCard from "../components/TaskCard.jsx";
import TaskForm from "../components/TaskForm.jsx";
import { categories } from "../utils/taskMeta.js";
import { useAuth } from "../context/AuthContext.jsx";

const filterOptions = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "In-Progress", value: "in-progress" },
  { label: "Completed", value: "completed" },
];

const greeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

const Dashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summary, setSummary] = useState("");

  const completedCount = tasks.filter((task) => task.status === "completed").length;
  const progress = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0;

  const filteredTasks = useMemo(
    () =>
      tasks.filter((task) => {
        const matchesStatus = filter === "all" || task.status === filter;
        const matchesCategory = categoryFilter === "All" || task.category === categoryFilter;
        return matchesStatus && matchesCategory;
      }),
    [tasks, filter, categoryFilter]
  );

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/tasks");
      setTasks(data.tasks);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const upsertTask = (task) => {
    setTasks((current) => {
      const exists = current.some((item) => item._id === task._id);
      if (exists) {
        return current.map((item) => (item._id === task._id ? task : item));
      }
      return [task, ...current];
    });
  };

  const handleDelete = async (id) => {
    const shouldDelete = window.confirm("Delete this task?");
    if (!shouldDelete) return;

    try {
      await api.delete(`/tasks/${id}`);
      setTasks((current) => current.filter((task) => task._id !== id));
      toast.success("Task deleted");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const { data } = await api.put(`/tasks/${id}`, { status });
      upsertTask(data.task);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const openEdit = (task) => {
    setEditingTask(task);
    setFormOpen(true);
  };

  const openCreate = () => {
    setEditingTask(null);
    setFormOpen(true);
  };

  const getSummary = async () => {
    setSummaryOpen(true);
    setSummaryLoading(true);

    try {
      const { data } = await api.post("/ai/summary", { tasks });
      setSummary(data.summary);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setSummaryLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 lg:grid lg:grid-cols-[288px_1fr]">
      <div className="hidden lg:sticky lg:top-0 lg:block lg:h-dvh lg:overflow-hidden">
        <Navbar />
      </div>

      <div className="lg:hidden">
        <Navbar />
      </div>

      <section className="min-w-0 px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <header className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">Dashboard</p>
              <h1 className="mt-1 text-2xl font-bold text-slate-950 sm:text-3xl">
                {greeting()}, {user?.name}!
              </h1>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="btn-secondary" onClick={fetchTasks} type="button">
                <RefreshCw size={17} aria-hidden="true" />
                Refresh
              </button>
              <button className="btn-secondary" onClick={getSummary} type="button">
                <Sparkles size={17} aria-hidden="true" />
                Get AI Summary
              </button>
              <button className="btn-primary" onClick={openCreate} type="button">
                <Plus size={18} aria-hidden="true" />
                New Task
              </button>
            </div>
          </header>

          <section
            className="mt-5 grid gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-[1fr_320px]"
            id="progress"
          >
            <div>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-950">Progress</h2>
                  <p className="text-sm text-slate-500">
                    {completedCount} of {tasks.length} tasks completed
                  </p>
                </div>
                <p className="text-2xl font-bold text-emerald-700">{progress}%</p>
              </div>
              <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-emerald-700 transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-md bg-slate-50 p-3">
                <p className="text-2xl font-bold text-slate-950">{tasks.length}</p>
                <p className="text-xs font-semibold uppercase text-slate-500">Total</p>
              </div>
              <div className="rounded-md bg-cyan-50 p-3">
                <p className="text-2xl font-bold text-cyan-700">
                  {tasks.filter((task) => task.status === "in-progress").length}
                </p>
                <p className="text-xs font-semibold uppercase text-cyan-700">Active</p>
              </div>
              <div className="rounded-md bg-emerald-50 p-3">
                <p className="text-2xl font-bold text-emerald-700">{completedCount}</p>
                <p className="text-xs font-semibold uppercase text-emerald-700">Done</p>
              </div>
            </div>
          </section>

          <section className="mt-5 rounded-lg border border-slate-200 bg-white p-5 shadow-sm" id="categories">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex flex-wrap gap-2">
                {filterOptions.map((option) => (
                  <button
                    className={`rounded-md px-3 py-2 text-sm font-semibold transition ${
                      filter === option.value
                        ? "bg-slate-950 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                    key={option.value}
                    onClick={() => setFilter(option.value)}
                    type="button"
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              <label className="flex flex-col gap-1 text-sm font-semibold text-slate-700 sm:w-64">
                Category
                <select
                  className="field"
                  onChange={(event) => setCategoryFilter(event.target.value)}
                  value={categoryFilter}
                >
                  <option value="All">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </section>

          <section className="mt-5 space-y-3">
            {loading ? (
              <div className="flex h-64 items-center justify-center rounded-lg border border-slate-200 bg-white">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-700" />
              </div>
            ) : filteredTasks.length ? (
              filteredTasks.map((task) => (
                <TaskCard
                  key={task._id}
                  onDelete={handleDelete}
                  onEdit={openEdit}
                  onStatusChange={handleStatusChange}
                  task={task}
                />
              ))
            ) : (
              <div className="rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center">
                <h2 className="text-lg font-bold text-slate-950">No tasks found</h2>
                <p className="mt-2 text-sm text-slate-500">Create a task or adjust your filters.</p>
                <button className="btn-primary mt-5" onClick={openCreate} type="button">
                  <Plus size={18} aria-hidden="true" />
                  New Task
                </button>
              </div>
            )}
          </section>
        </div>
      </section>

      {formOpen && (
        <TaskForm
          onClose={() => setFormOpen(false)}
          onSaved={upsertTask}
          task={editingTask}
        />
      )}

      <AISummaryPanel
        loading={summaryLoading}
        onClose={() => setSummaryOpen(false)}
        onRefresh={getSummary}
        open={summaryOpen}
        summary={summary}
      />
    </main>
  );
};

export default Dashboard;
