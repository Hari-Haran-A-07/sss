import {
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaImage,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const PLATFORM_ICONS = {
  Instagram: <FaInstagram className="text-pink-500" />,
  Facebook: <FaFacebook className="text-blue-600" />,
  X: <FaXTwitter className="text-gray-900" />,
  YouTube: <FaYoutube className="text-red-600" />,
};

const PLATFORM_LIMITS = {
  Instagram: 2200,
  Facebook: 63206,
  X: 280,
  YouTube: 5000,
};

/**
 * Social Media Preview Mockup
 */
const SocialPreviewCard = ({
  platform = "Instagram",
  title = "",
  caption = "",
  mediaUrls = [],
  brandName = "Your Brand",
}) => {
  const charLimit = PLATFORM_LIMITS[platform] || 2200;
  const charsUsed = caption.length;
  const isOverLimit = charsUsed > charLimit;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
      {/* Platform Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50/50">
        <div className="flex items-center gap-2">
          {PLATFORM_ICONS[platform] || <FaInstagram />}
          <span className="text-xs font-semibold text-gray-700">{platform} Preview</span>
        </div>
        <div
          className={`text-xs font-mono font-medium ${
            isOverLimit ? "text-rose-600 font-bold" : "text-gray-500"
          }`}
        >
          {charsUsed} / {charLimit} chars
        </div>
      </div>

      {/* Mock Account Info */}
      <div className="p-4 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white text-xs font-bold">
          {brandName.slice(0, 2).toUpperCase()}
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-900 leading-none">{brandName}</h4>
          <span className="text-xs text-gray-400">Sponsored • Just now</span>
        </div>
      </div>

      {/* Media Mockup */}
      <div className="w-full aspect-square bg-slate-100 flex items-center justify-center overflow-hidden border-y border-gray-100">
        {mediaUrls && mediaUrls.length > 0 ? (
          <img
            src={mediaUrls[0]}
            alt={title || "Preview"}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-400 p-6 text-center">
            <FaImage className="w-10 h-10 mb-2 opacity-50" />
            <span className="text-xs font-medium">No media uploaded yet</span>
          </div>
        )}
      </div>

      {/* Content & Caption */}
      <div className="p-4 space-y-1">
        {title && (
          <h5 className="text-sm font-bold text-gray-900 leading-tight">{title}</h5>
        )}
        <p className="text-xs text-gray-700 whitespace-pre-wrap leading-relaxed line-clamp-4">
          {caption || <span className="text-gray-400 italic">Post caption will appear here...</span>}
        </p>
      </div>
    </div>
  );
};

export default SocialPreviewCard;
