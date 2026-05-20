"use client";

interface SyncBadgeProps {
  lastSynced: string;
  source: string;
}

export default function SyncBadge({ lastSynced, source }: SyncBadgeProps) {
  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-theme-nav backdrop-blur-sm border border-theme-border rounded-lg px-4 py-2 text-xs text-theme-subtle flex items-center gap-2 hover:border-blue-500/30 transition-colors duration-300">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
        </span>
        <span>
          Synced: {formatDate(lastSynced)}
        </span>
        <span className="text-theme-border">•</span>
        <span className="text-theme-subtle capitalize">{source}</span>
      </div>
    </div>
  );
}
