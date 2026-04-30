import { X } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api, { getErrorMessage } from "../api/axios.js";
import { categories, statuses } from "../utils/taskMeta.js";

const initialForm = {
  title: "",
  description: "",
  category: "Other",
  deadline: "",
  status: "pending",
  priority: 3,
};

const toDateInput = (date) => (date ? new Date(date).toISOString().slice(0, 10) : "");

const TaskForm = ({ task, onClose, onSaved }) => {
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);

  const isEditing = Boolean(task);

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title || "",
        description: task.description || "",
        category: task.category || "Other",
        deadline: toDateInput(task.deadline),
        status: task.status || "pending",
        priority: task.priority || 3,
      });
    } else {
      setForm(initialForm);
    }
  }, [task]);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const requestSuggestion = async (savedTask) => {
    try {
      const { data } = await api.post("/ai/suggest", {
        title: savedTask.title,
        description: savedTask.description,
      });

      toast.custom(
        (toastInstance) => (
          <div className="w-80 rounded-lg border border-slate-200 bg-white p-4 shadow-soft">
            <p className="text-sm font-bold text-slate-950">
              AI suggests Priority: {data.priority}, Category: {data.category}
            </p>
            <p className="mt-1 text-sm text-slate-600">{data.reason}</p>
            <p className="mt-3 text-sm font-semibold text-slate-700">Apply AI suggestion?</p>
            <div className="mt-3 flex gap-2">
              <button
                className="btn-primary flex-1 px-3 py-2"
                onClick={async () => {
                  toast.dismiss(toastInstance.id);
                  try {
                    const response = await api.put(`/tasks/${savedTask._id}`, {
                      priority: data.priority,
                      category: data.category,
                      aiSuggested: true,
                    });
                    onSaved(response.data.task);
                    toast.success("AI suggestion applied");
                  } catch (error) {
                    toast.error(getErrorMessage(error));
                  }
                }}
                type="button"
              >
                Yes
              </button>
              <button
                className="btn-secondary flex-1 px-3 py-2"
                onClick={() => toast.dismiss(toastInstance.id)}
                type="button"
              >
                No
              </button>
            </div>
          </div>
        ),
        { duration: 10000 }
      );
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);

    try {
      const payload = {
        ...form,
        priority: Number(form.priority),
        deadline: form.deadline || null,
      };

      const { data } = isEditing
        ? await api.put(`/tasks/${task._id}`, payload)
        : await api.post("/tasks", payload);

      onSaved(data.task);
      toast.success(isEditing ? "Task updated" : "Task created");
      onClose();

      if (!isEditing) {
        await requestSuggestion(data.task);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/50 px-4 py-6">
      <div className="max-h-full w-full max-w-2xl overflow-y-auto rounded-lg bg-white shadow-soft">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h2 className="text-lg font-bold text-slate-950">{isEditing ? "Edit Task" : "New Task"}</h2>
          <button
            className="rounded-md p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-950"
            onClick={onClose}
            type="button"
            aria-label="Close form"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <form className="space-y-5 p-5" onSubmit={handleSubmit}>
          <div>
            <label className="label" htmlFor="title">
              Title
            </label>
            <input
              className="field mt-1"
              id="title"
              maxLength={140}
              onChange={(event) => updateField("title", event.target.value)}
              required
              value={form.title}
            />
          </div>

          <div>
            <label className="label" htmlFor="description">
              Description
            </label>
            <textarea
              className="field mt-1 min-h-28 resize-y"
              id="description"
              maxLength={2000}
              onChange={(event) => updateField("description", event.target.value)}
              value={form.description}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label" htmlFor="category">
                Category
              </label>
              <select
                className="field mt-1"
                id="category"
                onChange={(event) => updateField("category", event.target.value)}
                value={form.category}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="label" htmlFor="deadline">
                Deadline
              </label>
              <input
                className="field mt-1"
                id="deadline"
                onChange={(event) => updateField("deadline", event.target.value)}
                type="date"
                value={form.deadline}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label" htmlFor="status">
                Status
              </label>
              <select
                className="field mt-1"
                id="status"
                onChange={(event) => updateField("status", event.target.value)}
                value={form.status}
              >
                {statuses.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="label" htmlFor="priority">
                Priority
              </label>
              <input
                className="mt-3 w-full accent-emerald-600"
                id="priority"
                max="5"
                min="1"
                onChange={(event) => updateField("priority", event.target.value)}
                type="range"
                value={form.priority}
              />
              <p className="mt-1 text-sm font-semibold text-slate-600">{form.priority} of 5</p>
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
            <button className="btn-secondary" onClick={onClose} type="button">
              Cancel
            </button>
            <button className="btn-primary" disabled={saving} type="submit">
              {saving ? "Saving..." : isEditing ? "Save Changes" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
