/**
 * Date and Time Formatting Helpers
 */

export const formatDateTime = (date) => {
  if (!date) return "";

  return new Date(date).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

export const formatDateOnly = (date) => {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const formatTimeOnly = (date) => {
  if (!date) return "";

  return new Date(date).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Calculates human-readable relative time (e.g. "2 hours ago", "in 3 days")
 */
export const formatRelativeTime = (dateInput) => {
  if (!dateInput) return "";

  const date = new Date(dateInput);
  const now = new Date();
  const diffInSeconds = Math.round((date.getTime() - now.getTime()) / 1000);
  const isFuture = diffInSeconds > 0;
  const absSeconds = Math.abs(diffInSeconds);

  if (absSeconds < 60) {
    return isFuture ? "in a few seconds" : "just now";
  }

  const minutes = Math.floor(absSeconds / 60);
  if (minutes < 60) {
    return isFuture ? `in ${minutes}m` : `${minutes}m ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return isFuture ? `in ${hours}h` : `${hours}h ago`;
  }

  const days = Math.floor(hours / 24);
  if (days < 30) {
    return isFuture ? `in ${days}d` : `${days}d ago`;
  }

  const months = Math.floor(days / 30);
  if (months < 12) {
    return isFuture ? `in ${months}mo` : `${months}mo ago`;
  }

  const years = Math.floor(days / 365);
  return isFuture ? `in ${years}y` : `${years}y ago`;
};

export const isFutureDate = (date) => {
  if (!date) return false;
  return new Date(date).getTime() > Date.now();
};
