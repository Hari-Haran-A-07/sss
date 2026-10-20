import { Link } from "react-router-dom";
import GlassCard from "../../components/ui/GlassCard";

import {
  FaArrowLeft,
  FaCheckCircle,
  FaTimesCircle,
  FaExternalLinkAlt,
} from "react-icons/fa";

import {
  Image,
  Target,
  Palette,
  Ruler,
  PenTool,
  FileText,
  CalendarClock,
  Lightbulb,
  ShieldCheck,
  Sparkles,
  Layers,
  Monitor,
} from "lucide-react";

/* ─── data ────────────────────────────────────────────────────────── */

const platformSpecs = [
  { platform: "Instagram", square: "1080×1080", portrait: "1080×1350", landscape: "1080×566" },
  { platform: "Facebook", square: "1200×1200", portrait: "1080×1350", landscape: "1200×628" },
  { platform: "X (Twitter)", square: "1200×1200", portrait: "1080×1350", landscape: "1600×900" },
  { platform: "LinkedIn", square: "1200×1200", portrait: "1080×1350", landscape: "1200×628" },
  { platform: "Pinterest", square: "1000×1000", portrait: "1000×1500", landscape: "—" },
];

const workflowSteps = [
  { emoji: "📋", title: "Define Your Objective", desc: "What's the goal? Brand awareness, engagement, conversion?", icon: Target },
  { emoji: "🎨", title: "Choose Your Tool", desc: "Pick from Canva, Photoshop, Figma based on your skill level", icon: Palette },
  { emoji: "📐", title: "Select Dimensions", desc: "Use platform-specific sizes for optimal display", icon: Ruler },
  { emoji: "✍️", title: "Design the Visual", desc: "Use brand colors, fonts, and high-quality imagery", icon: PenTool },
  { emoji: "📝", title: "Write the Caption", desc: "Craft engaging copy with CTAs and relevant hashtags", icon: FileText },
  { emoji: "📅", title: "Schedule & Publish", desc: "Use SocialPulse to schedule at optimal posting times", icon: CalendarClock },
];

const tools = {
  beginner: [
    {
      name: "Canva",
      url: "https://canva.com",
      desc: "1000+ social media templates. Drag-and-drop editor. Free tier available. Best for: Quick professional designs without design experience.",
      level: "Beginner",
      pricing: "Freemium",
      color: "border-emerald-500",
      bg: "bg-emerald-50",
      text: "text-emerald-700",
    },
    {
      name: "Adobe Express",
      url: "https://adobe.com/express",
      desc: "Powered by Adobe's creative engine. AI-powered design suggestions. Brand kit support.",
      level: "Beginner",
      pricing: "Freemium",
      color: "border-red-500",
      bg: "bg-red-50",
      text: "text-red-700",
    },
    {
      name: "Crello / VistaCreate",
      url: "https://create.vista.com",
      desc: "Animation-ready templates. 50,000+ design templates. Background remover included.",
      level: "Beginner",
      pricing: "Freemium",
      color: "border-violet-500",
      bg: "bg-violet-50",
      text: "text-violet-700",
    },
  ],
  professional: [
    {
      name: "Adobe Photoshop",
      url: "https://adobe.com/photoshop",
      desc: "Industry standard for image editing. Advanced layer management. AI-powered neural filters. Extensive plugin ecosystem.",
      level: "Pro",
      pricing: "Paid",
      color: "border-blue-600",
      bg: "bg-blue-50",
      text: "text-blue-700",
    },
    {
      name: "Adobe Illustrator",
      url: "https://adobe.com/illustrator",
      desc: "Vector-based design. Perfect for logos, icons, and scalable graphics. Integration with Creative Cloud.",
      level: "Pro",
      pricing: "Paid",
      color: "border-orange-500",
      bg: "bg-orange-50",
      text: "text-orange-700",
    },
    {
      name: "Figma",
      url: "https://figma.com",
      desc: "Collaborative design platform. Real-time team editing. Component libraries. Auto-layout for social templates.",
      level: "Intermediate",
      pricing: "Freemium",
      color: "border-purple-600",
      bg: "bg-purple-50",
      text: "text-purple-700",
    },
    {
      name: "Sketch",
      url: "https://sketch.com",
      desc: "macOS design tool. Clean interface. Extensive plugin library.",
      level: "Intermediate",
      pricing: "Paid",
      color: "border-amber-500",
      bg: "bg-amber-50",
      text: "text-amber-700",
    },
  ],
  ai: [
    {
      name: "Midjourney",
      url: "https://midjourney.com",
      desc: "Generate unique visuals from text prompts. Create custom illustrations and backgrounds.",
      level: "Intermediate",
      pricing: "Paid",
      color: "border-indigo-500",
      bg: "bg-indigo-50",
      text: "text-indigo-700",
    },
    {
      name: "DALL·E",
      url: "https://openai.com/dall-e",
      desc: "OpenAI's image generation. Realistic images from descriptions. Great for concept art.",
      level: "Beginner",
      pricing: "Freemium",
      color: "border-teal-500",
      bg: "bg-teal-50",
      text: "text-teal-700",
    },
    {
      name: "Remove.bg",
      url: "https://remove.bg",
      desc: "AI background removal. One-click clean backgrounds. API available for automation.",
      level: "Beginner",
      pricing: "Freemium",
      color: "border-cyan-500",
      bg: "bg-cyan-50",
      text: "text-cyan-700",
    },
  ],
};

const bestPractices = [
  { type: "do", text: "Use high-resolution images (minimum 72 DPI for web)" },
  { type: "do", text: "Maintain brand consistency with colors and fonts" },
  { type: "do", text: "Keep text overlay under 20% of image area" },
  { type: "do", text: "Use visual hierarchy — one focal point" },
  { type: "do", text: "Include clear CTA (Call to Action)" },
  { type: "do", text: "A/B test different visual styles" },
  { type: "dont", text: "Don't use too many fonts (max 2-3)" },
  { type: "dont", text: "Don't ignore accessibility (contrast, alt text)" },
  { type: "dont", text: "Don't stretch or pixelate images" },
];

const contentIdeas = [
  { emoji: "💡", title: "Motivational Quotes" },
  { emoji: "📊", title: "Data / Statistics Graphics" },
  { emoji: "🎉", title: "Announcement Posts" },
  { emoji: "🏷️", title: "Product Showcase" },
  { emoji: "💬", title: "Customer Testimonials" },
  { emoji: "📋", title: "Tips & How-to Lists" },
  { emoji: "🔄", title: "Before / After Comparisons" },
  { emoji: "📰", title: "Industry News Highlights" },
];

/* ─── sub-components ──────────────────────────────────────────────── */

const ToolCard = ({ tool }) => (
  <GlassCard className={`border-l-4 ${tool.color} !p-5`}>
    <div className="flex items-start justify-between gap-3 mb-2">
      <h4 className="text-lg font-bold text-gray-900">{tool.name}</h4>
      <div className="flex items-center gap-2 shrink-0">
        <span
          className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${tool.bg} ${tool.text}`}
        >
          {tool.level}
        </span>
        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600">
          {tool.pricing}
        </span>
      </div>
    </div>

    <p className="text-sm text-gray-600 leading-relaxed mb-3">{tool.desc}</p>

    <a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
    >
      Visit Website <FaExternalLinkAlt className="text-[10px]" />
    </a>
  </GlassCard>
);

const ToolCategory = ({ title, icon: Icon, items }) => (
  <div className="space-y-4">
    <div className="flex items-center gap-2">
      <Icon className="w-5 h-5 text-blue-600" />
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {items.map((t) => (
        <ToolCard key={t.name} tool={t} />
      ))}
    </div>
  </div>
);

/* ─── page ────────────────────────────────────────────────────────── */

const StaticPostGuide = () => {
  return (
    <div className="space-y-8">
      {/* BACK BUTTON */}
      <Link
        to="/studio"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
      >
        <FaArrowLeft /> Back to Creative Studio
      </Link>

      {/* ─── 1. HERO BANNER ────────────────────────────────────────── */}
      <GlassCard className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white !p-10">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
            <Image className="w-8 h-8" />
          </div>

          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Static Post Creation Guide
            </h1>
            <p className="text-blue-100 mt-2 max-w-2xl text-base leading-relaxed">
              Master the art of single-image social media posts that capture
              attention and drive engagement
            </p>
          </div>
        </div>
      </GlassCard>

      {/* ─── 2. WHAT IS A STATIC POST? ─────────────────────────────── */}
      <GlassCard>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
            <Lightbulb className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            What is a Static Post?
          </h2>
        </div>

        <p className="text-gray-600 leading-relaxed mb-4">
          A <strong>static post</strong> is a single image post designed for
          social media platforms. It's the most common and versatile content
          format — used for announcements, quotes, product features,
          testimonials, tips, and infographics.
        </p>

        <p className="text-gray-500 text-sm mb-5">
          Each platform has specific dimension recommendations for optimal
          display. Use the table below as your quick reference.
        </p>

        {/* Dimension Specs Table */}
        <div className="overflow-x-auto rounded-2xl border border-gray-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-blue-50 to-indigo-50 text-left">
                <th className="px-5 py-3.5 font-semibold text-gray-700">
                  Platform
                </th>
                <th className="px-5 py-3.5 font-semibold text-gray-700">
                  Square
                </th>
                <th className="px-5 py-3.5 font-semibold text-gray-700">
                  Portrait
                </th>
                <th className="px-5 py-3.5 font-semibold text-gray-700">
                  Landscape
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {platformSpecs.map((row) => (
                <tr
                  key={row.platform}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-5 py-3 font-medium text-gray-900">
                    {row.platform}
                  </td>
                  <td className="px-5 py-3 text-gray-600 font-mono text-xs">
                    {row.square}
                  </td>
                  <td className="px-5 py-3 text-gray-600 font-mono text-xs">
                    {row.portrait}
                  </td>
                  <td className="px-5 py-3 text-gray-600 font-mono text-xs">
                    {row.landscape}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* ─── 3. STEP-BY-STEP WORKFLOW ──────────────────────────────── */}
      <GlassCard>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
            <Layers className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Step-by-Step Workflow
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {workflowSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              >
                {/* step number */}
                <div className="absolute -top-3 -left-1 w-7 h-7 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-md">
                  {idx + 1}
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{step.emoji}</span>
                  <Icon className="w-5 h-5 text-indigo-500 opacity-60" />
                </div>

                <h4 className="text-base font-bold text-gray-900 mb-1">
                  {step.title}
                </h4>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </GlassCard>

      {/* ─── 4. RECOMMENDED TOOLS ──────────────────────────────────── */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
            <Monitor className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Recommended Tools for Static Posts
          </h2>
        </div>

        <ToolCategory
          title="Beginner-Friendly"
          icon={Sparkles}
          items={tools.beginner}
        />
        <ToolCategory
          title="Professional"
          icon={ShieldCheck}
          items={tools.professional}
        />
        <ToolCategory
          title="AI-Powered"
          icon={Sparkles}
          items={tools.ai}
        />
      </div>

      {/* ─── 5. DESIGN BEST PRACTICES ─────────────────────────────── */}
      <GlassCard>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Design Best Practices
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {bestPractices.map((item, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 rounded-xl border p-4 transition-colors ${
                item.type === "do"
                  ? "border-green-200 bg-green-50/50 hover:bg-green-50"
                  : "border-red-200 bg-red-50/50 hover:bg-red-50"
              }`}
            >
              {item.type === "do" ? (
                <FaCheckCircle className="text-green-500 mt-0.5 shrink-0" />
              ) : (
                <FaTimesCircle className="text-red-500 mt-0.5 shrink-0" />
              )}
              <span className="text-sm text-gray-700 leading-relaxed">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* ─── 6. CONTENT IDEAS ──────────────────────────────────────── */}
      <GlassCard>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
            <Lightbulb className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Content Ideas</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {contentIdeas.map((idea, idx) => (
            <div
              key={idx}
              className="group flex flex-col items-center text-center gap-2 rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 hover:border-blue-200"
            >
              <span className="text-3xl group-hover:scale-110 transition-transform">
                {idea.emoji}
              </span>
              <span className="text-sm font-semibold text-gray-700">
                {idea.title}
              </span>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* BOTTOM BACK LINK */}
      <div className="text-center pb-4">
        <Link
          to="/studio"
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
        >
          <FaArrowLeft /> Back to Creative Studio
        </Link>
      </div>
    </div>
  );
};

export default StaticPostGuide;
