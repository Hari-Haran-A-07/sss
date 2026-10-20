import { useState } from "react";
import { Copy, Check } from "lucide-react";
import toast from "react-hot-toast";

/**
 * Copy to Clipboard Button with animated feedback
 */
const CopyButton = ({ text, label, successMessage = "Copied to clipboard!", className = "" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success(successMessage, { id: "clipboard-toast", duration: 2000 });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy to clipboard");
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 transition-all ${
        copied ? "border-emerald-300 text-emerald-700 bg-emerald-50" : ""
      } ${className}`}
      title={label || "Copy to clipboard"}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-600" />
          <span>{label ? "Copied" : ""}</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5 text-gray-500" />
          <span>{label || ""}</span>
        </>
      )}
    </button>
  );
};

export default CopyButton;
