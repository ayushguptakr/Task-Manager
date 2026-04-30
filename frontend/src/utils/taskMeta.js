export const categories = ["Work", "Personal", "Study", "Health", "Other"];

export const statuses = [
  { label: "Pending", value: "pending" },
  { label: "In-Progress", value: "in-progress" },
  { label: "Completed", value: "completed" },
];

export const categoryStyles = {
  Work: "bg-blue-50 text-blue-700 ring-blue-200",
  Personal: "bg-purple-50 text-purple-700 ring-purple-200",
  Study: "bg-green-50 text-green-700 ring-green-200",
  Health: "bg-red-50 text-red-700 ring-red-200",
  Other: "bg-slate-100 text-slate-700 ring-slate-200",
};

export const priorityStars = (priority = 3) => {
  const filled = Math.max(1, Math.min(5, Number(priority) || 3));
  return `${"★".repeat(filled)}${"☆".repeat(5 - filled)}`;
};

export const statusLabel = (status) =>
  statuses.find((item) => item.value === status)?.label || "Pending";
