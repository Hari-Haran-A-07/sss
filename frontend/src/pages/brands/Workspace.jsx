import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import GlassCard from "../../components/ui/GlassCard";
import LoadingSkeleton from "../../components/ui/LoadingSkeleton";
import toast from "react-hot-toast";
import { getBrandById } from "../../services/brandService";

import {
  Calendar,
  FileText,
  Link2,
  BarChart3,
  Sparkles,
  Wrench,
  ArrowRight,
} from "lucide-react";

const Workspace = () => {
  const { brandId } = useParams();
  const navigate = useNavigate();

  const [brand, setBrand] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const data = await getBrandById(brandId);
        setBrand(data);
      } catch {
        toast.error("Failed to load brand");
      }

      setLoading(false);
    };

    fetchBrand();
  }, [brandId]);

  if (loading) {
    return (
      <div className="p-6">
        <LoadingSkeleton />
      </div>
    );
  }

  if (!brand) {
    return <p>Brand not found</p>;
  }

  /* Core workspace modules */
  const modules = [
    {
      title: "Content Calendar",
      description: "Plan upcoming social media posts and scheduling queue.",
      icon: Calendar,
      path: `/brand/${brandId}/calendar`,
      buttonText: "Open Calendar",
    },
    {
      title: "Posts",
      description: "Manage, review, and publish social media content.",
      icon: FileText,
      path: `/brand/${brandId}/posts`,
      buttonText: "Open Posts",
    },
    {
      title: "Backlinks",
      description: "Track backlink building, target sites, and outreach status.",
      icon: Link2,
      path: `/brand/${brandId}/backlinks`,
      buttonText: "Open Backlinks",
    },
    {
      title: "Analytics",
      description: "View audience insights, platform metrics, and performance.",
      icon: BarChart3,
      path: `/brand/${brandId}/analytics`,
      buttonText: "Open Analytics",
    },
  ];

  /* Creative & Strategy shortcuts */
  const toolsShortcuts = [
    {
      title: "Creative Studio",
      description:
        "Access specs and templates for reels, carousels, and image posts.",
      icon: Sparkles,
      path: "/studio",
      accent: "from-purple-500 to-indigo-600",
      buttonText: "Launch Studio",
    },
    {
      title: "Tools & Resources Hub",
      description:
        "Curated directory of design, copy, video, and growth tools.",
      icon: Wrench,
      path: "/tools",
      accent: "from-blue-500 to-cyan-600",
      buttonText: "Browse Tools",
    },
  ];

  return (
    <>
      {/* BRAND HEADER */}
      <GlassCard className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{brand.name}</h1>
            <p className="text-gray-600 mt-1">{brand.field}</p>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full w-fit">
            Brand Workspace
          </div>
        </div>
      </GlassCard>

      {/* WORKSPACE MODULES */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Core Management</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.map((module, index) => {
            const Icon = module.icon;

            return (
              <GlassCard
                key={index}
                onClick={() => navigate(module.path)}
                className="group cursor-pointer flex flex-col justify-between min-h-[240px]"
              >
                <div className="flex flex-col items-start space-y-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition">
                    <Icon size={22} />
                  </div>

                  <h3 className="text-lg font-semibold text-gray-800">
                    {module.title}
                  </h3>

                  <p className="text-sm text-gray-600 leading-relaxed">
                    {module.description}
                  </p>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(module.path);
                  }}
                  className="mt-5 w-full relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-[length:200%_200%] px-3 py-2 text-sm font-medium text-white shadow-md shadow-blue-500/20 transition-all duration-500 hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-400/30 hover:bg-right active:scale-95"
                >
                  <span className="relative z-10">{module.buttonText} →</span>
                  <span className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition duration-500" />
                </button>
              </GlassCard>
            );
          })}
        </div>
      </div>

      {/* CREATION & STRATEGY SHORTCUTS */}
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          Creation & Strategy Resources
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {toolsShortcuts.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <GlassCard
                key={index}
                onClick={() => navigate(tool.path)}
                className="group cursor-pointer flex items-center justify-between p-6 hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.accent} flex items-center justify-center text-white shadow-md flex-shrink-0`}
                  >
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-800">
                      {tool.title}
                    </h3>
                    <p className="text-xs text-gray-600 mt-1 max-w-sm">
                      {tool.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm font-semibold text-blue-600 group-hover:translate-x-1 transition-transform">
                  <span>{tool.buttonText}</span>
                  <ArrowRight size={16} />
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Workspace;
