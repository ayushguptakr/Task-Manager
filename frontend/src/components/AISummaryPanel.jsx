import { RefreshCw, X } from "lucide-react";

const AISummaryPanel = ({ loading, onClose, onRefresh, open, summary }) => (
  <div
    className={`fixed inset-y-0 right-0 z-30 w-full max-w-md transform bg-white shadow-soft transition duration-300 ${
      open ? "translate-x-0" : "translate-x-full"
    }`}
    aria-hidden={!open}
  >
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
        <div>
          <h2 className="text-lg font-bold text-slate-950">AI Daily Summary</h2>
          <p className="text-sm text-slate-500">A focused read on today.</p>
        </div>
        <button
          className="rounded-md p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-950"
          onClick={onClose}
          type="button"
          aria-label="Close summary"
        >
          <X size={20} aria-hidden="true" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        {loading ? (
          <div className="flex h-52 items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-600" />
          </div>
        ) : (
          <div className="rounded-lg border border-emerald-100 bg-emerald-50 p-4 text-sm leading-7 text-slate-700">
            {summary || "Your summary will appear here after AI reviews your tasks."}
          </div>
        )}
      </div>

      <div className="border-t border-slate-200 p-5">
        <button className="btn-primary w-full" disabled={loading} onClick={onRefresh} type="button">
          <RefreshCw size={17} className={loading ? "animate-spin" : ""} aria-hidden="true" />
          Refresh
        </button>
      </div>
    </div>
  </div>
);

export default AISummaryPanel;
