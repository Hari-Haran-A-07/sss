import { Link } from "react-router-dom";
import GlassCard from "../components/ui/GlassCard";
import { Compass, Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <GlassCard className="max-w-lg w-full text-center py-12 px-6">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 shadow-inner">
          <Compass className="w-10 h-10 animate-pulse" />
        </div>

        <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">404</h1>
        <h2 className="text-xl font-bold text-gray-800 mt-2">Page Not Found</h2>
        <p className="text-sm text-gray-500 mt-2 max-w-sm mx-auto leading-relaxed">
          The page or workspace view you are looking for doesn't exist or may have been moved.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 transition shadow-md shadow-blue-500/20"
          >
            <Home size={16} />
            Back to Dashboard
          </Link>
          <Link
            to="/brands"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-medium text-sm hover:bg-gray-200 transition"
          >
            <ArrowLeft size={16} />
            View Brands
          </Link>
        </div>
      </GlassCard>
    </div>
  );
};

export default NotFound;
