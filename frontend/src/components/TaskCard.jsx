import { format, isPast, isToday } from "date-fns";
import { CalendarDays, Pencil, Trash2 } from "lucide-react";
import { categoryStyles, priorityStars, statusLabel, statuses } from "../utils/taskMeta.js";

const TaskCard = ({ task, onDelete, onEdit, onStatusChange }) => {
  const deadline = task.deadline ? new Date(task.deadline) : null;
  const isOverdue = deadline && isPast(deadline) && !isToday(deadline) && task.status !== "completed";

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-bold ring-1 ${
                categoryStyles[task.category] || categoryStyles.Other
              }`}
            >
              {task.category}
            </span>
            {task.aiSuggested && (
              <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700 ring-1 ring-amber-200">
                AI tuned
              </span>
            )}
          </div>
          <h3 className="mt-3 break-words text-base font-bold text-slate-950">{task.title}</h3>
          {task.description && (
            <p className="mt-2 line-clamp-2 break-words text-sm leading-6 text-slate-600">
              {task.description}
            </p>
          )}
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
            <span className="font-semibold text-amber-500" aria-label={`Priority ${task.priority} of 5`}>
              {priorityStars(task.priority)}
            </span>
            <span
              className={`inline-flex items-center gap-1.5 font-medium ${
                isOverdue ? "text-red-600" : "text-slate-500"
              }`}
            >
              <CalendarDays size={16} aria-hidden="true" />
              {deadline ? format(deadline, "MMM d, yyyy") : "No deadline"}
            </span>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <select
            className="field min-w-36"
            value={task.status}
            onChange={(event) => onStatusChange(task._id, event.target.value)}
            aria-label={`Change status for ${task.title}`}
          >
            {statuses.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
          <button
            className="rounded-md border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
            onClick={() => onEdit(task)}
            type="button"
            title="Edit task"
            aria-label={`Edit ${task.title}`}
          >
            <Pencil size={17} aria-hidden="true" />
          </button>
          <button
            className="rounded-md border border-red-100 p-2 text-red-600 transition hover:bg-red-50"
            onClick={() => onDelete(task._id)}
            type="button"
            title="Delete task"
            aria-label={`Delete ${task.title}`}
          >
            <Trash2 size={17} aria-hidden="true" />
          </button>
        </div>
      </div>

      <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
        {statusLabel(task.status)}
      </p>
    </article>
  );
};

export default TaskCard;
