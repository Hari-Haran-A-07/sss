import { useState, useMemo } from "react";
import GlassCard from "../../components/ui/GlassCard";
import {
  FaSearch,
  FaPaintBrush,
  FaVideo,
  FaRobot,
  FaCalendarAlt,
  FaChartBar,
  FaMusic,
  FaStar,
  FaExternalLinkAlt,
  FaBuilding,
} from "react-icons/fa";
import { FaWrench } from "react-icons/fa6";

/* ─────────────── Tool Data ─────────────── */
const TOOLS = [
  // ── DESIGN & GRAPHICS ──
  {
    id: 1,
    name: "Canva",
    url: "https://canva.com",
    price: "Free / Pro $13/mo",
    priceType: "freemium",
    editorPick: true,
    category: "Design",
    description:
      "All-in-one design platform with 250,000+ templates. Drag-and-drop editor, brand kit, magic resize, background remover, and AI design tools.",
    tags: ["Templates", "Social Media", "Presentations", "Free"],
  },
  {
    id: 2,
    name: "Adobe Photoshop",
    url: "https://adobe.com/photoshop",
    price: "$22.99/mo",
    priceType: "paid",
    editorPick: false,
    category: "Design",
    description:
      "The gold standard for image editing. Neural filters, content-aware fill, generative AI features, RAW editing, and professional retouching.",
    tags: ["Photo Editing", "Professional", "Layers", "Filters"],
  },
  {
    id: 3,
    name: "Adobe Illustrator",
    url: "https://adobe.com/illustrator",
    price: "$22.99/mo",
    priceType: "paid",
    editorPick: false,
    category: "Design",
    description:
      "Vector graphics editor for logos, icons, typography, and illustrations. Scalable designs that look perfect at any size.",
    tags: ["Vector", "Logo Design", "Typography", "Scalable"],
  },
  {
    id: 4,
    name: "Figma",
    url: "https://figma.com",
    price: "Free / Pro $15/mo",
    priceType: "freemium",
    editorPick: false,
    category: "Design",
    description:
      "Collaborative interface design tool. Real-time multiplayer editing, auto-layout, component libraries, and design systems.",
    tags: ["Collaborative", "UI/UX", "Components", "Free"],
  },
  {
    id: 5,
    name: "Adobe Express",
    url: "https://adobe.com/express",
    price: "Free / Premium $10/mo",
    priceType: "freemium",
    editorPick: false,
    category: "Design",
    description:
      "Quick content creation powered by Adobe. Thousands of templates, brand management, and AI features.",
    tags: ["Quick Design", "Templates", "Brand Kit", "Free"],
  },
  {
    id: 6,
    name: "Crello / VistaCreate",
    url: "https://create.vista.com",
    price: "Free / Pro $10/mo",
    priceType: "freemium",
    editorPick: false,
    category: "Design",
    description:
      "Design platform with animated templates. 50,000+ templates, background remover, brand kit.",
    tags: ["Animation", "Templates", "Social Media"],
  },

  // ── VIDEO PRODUCTION ──
  {
    id: 7,
    name: "CapCut",
    url: "https://capcut.com",
    price: "FREE",
    priceType: "free",
    editorPick: true,
    category: "Video",
    description:
      "All-in-one video editing app by ByteDance. Auto-captions, background remover, text-to-speech, trending effects, green screen, speed ramping.",
    tags: ["Free", "AI Captions", "Effects", "Mobile"],
  },
  {
    id: 8,
    name: "Adobe Premiere Pro",
    url: "https://adobe.com/premiere",
    price: "$22.99/mo",
    priceType: "paid",
    editorPick: false,
    category: "Video",
    description:
      "Industry-leading video editing software. Multi-cam editing, color grading, audio mixing, VR support, and extensive plugin ecosystem.",
    tags: ["Professional", "Multi-track", "Color Grading"],
  },
  {
    id: 9,
    name: "DaVinci Resolve",
    url: "https://blackmagicdesign.com/products/davinciresolve",
    price: "FREE / Studio $295",
    priceType: "freemium",
    editorPick: false,
    category: "Video",
    description:
      "Professional editing, color correction, visual effects, and audio post-production. The only tool that combines all these in one.",
    tags: ["Free", "Color Grading", "VFX", "Audio"],
  },
  {
    id: 10,
    name: "Final Cut Pro",
    url: "https://apple.com/final-cut-pro",
    price: "$299.99",
    priceType: "paid",
    editorPick: false,
    category: "Video",
    description:
      "Apple's professional video editor. Magnetic timeline, HDR support, 360° video, Motion and Compressor integration.",
    tags: ["Mac Only", "Professional", "HDR"],
  },
  {
    id: 11,
    name: "Adobe After Effects",
    url: "https://adobe.com/aftereffects",
    price: "$22.99/mo",
    priceType: "paid",
    editorPick: false,
    category: "Video",
    description:
      "Motion graphics and visual effects. Title animations, logo reveals, lower thirds, and compositing.",
    tags: ["Motion Graphics", "VFX", "Animation"],
  },
  {
    id: 12,
    name: "InShot",
    url: "https://inshot.com",
    price: "Free / Pro $3.99/mo",
    priceType: "freemium",
    editorPick: false,
    category: "Video",
    description:
      "Mobile-first video editor. Trim, merge, speed control, music, text, filters. Perfect for quick social media edits.",
    tags: ["Mobile", "Quick Edit", "Free"],
  },

  // ── AI TOOLS ──
  {
    id: 13,
    name: "ChatGPT",
    url: "https://chat.openai.com",
    price: "Free / Plus $20/mo",
    priceType: "freemium",
    editorPick: true,
    category: "AI",
    description:
      "AI assistant for content strategy. Caption writing, hashtag research, content calendar planning, audience analysis, and creative brainstorming.",
    tags: ["AI", "Copywriting", "Strategy", "Free"],
  },
  {
    id: 14,
    name: "Midjourney",
    url: "https://midjourney.com",
    price: "From $10/mo",
    priceType: "paid",
    editorPick: false,
    category: "AI",
    description:
      "AI image generation from text prompts. Create unique visuals, concept art, illustrations, and brand imagery.",
    tags: ["AI Images", "Creative", "Unique"],
  },
  {
    id: 15,
    name: "DALL·E 3",
    url: "https://openai.com/dall-e",
    price: "Via ChatGPT Plus $20/mo",
    priceType: "paid",
    editorPick: false,
    category: "AI",
    description:
      "OpenAI's image generation. Photorealistic images, illustrations, concept art from detailed text descriptions.",
    tags: ["AI Images", "Photorealistic"],
  },
  {
    id: 16,
    name: "Runway ML",
    url: "https://runwayml.com",
    price: "Free / Pro $12/mo",
    priceType: "freemium",
    editorPick: false,
    category: "AI",
    description:
      "AI-powered creative toolkit. Gen-2 video generation, image editing, background removal, inpainting, motion tracking.",
    tags: ["AI Video", "Generative", "Creative"],
  },
  {
    id: 17,
    name: "Jasper AI",
    url: "https://jasper.ai",
    price: "From $49/mo",
    priceType: "paid",
    editorPick: false,
    category: "AI",
    description:
      "AI marketing copywriter. Brand voice training, campaign creation, 50+ content templates, SEO optimization.",
    tags: ["AI Writing", "Marketing", "Brand Voice"],
  },
  {
    id: 18,
    name: "Copy.ai",
    url: "https://copy.ai",
    price: "Free / Pro $49/mo",
    priceType: "freemium",
    editorPick: false,
    category: "AI",
    description:
      "AI-powered copywriting. Social media captions, ad copy, blog posts, email sequences. 90+ content types.",
    tags: ["Copywriting", "Social Media", "Free"],
  },
  {
    id: 19,
    name: "Synthesia",
    url: "https://synthesia.io",
    price: "From $22/mo",
    priceType: "paid",
    editorPick: false,
    category: "AI",
    description:
      "AI video creation with virtual presenters. 140+ avatars, 120+ languages. No camera or studio needed.",
    tags: ["AI Video", "Avatars", "Multilingual"],
  },
  {
    id: 20,
    name: "ElevenLabs",
    url: "https://elevenlabs.io",
    price: "Free / Starter $5/mo",
    priceType: "freemium",
    editorPick: false,
    category: "AI",
    description:
      "Ultra-realistic AI voiceover. Voice cloning, text-to-speech, 29 languages. Professional narration without a studio.",
    tags: ["AI Voice", "Voiceover", "Multilingual"],
  },

  // ── SCHEDULING & PUBLISHING ──
  {
    id: 21,
    name: "Buffer",
    url: "https://buffer.com",
    price: "Free / Essentials $6/mo",
    priceType: "freemium",
    editorPick: true,
    category: "Scheduling",
    description:
      "Simple social media scheduling. Multi-platform publishing, optimal time suggestions, link-in-bio, analytics.",
    tags: ["Scheduling", "Multi-platform", "Free"],
  },
  {
    id: 22,
    name: "Hootsuite",
    url: "https://hootsuite.com",
    price: "From $99/mo",
    priceType: "paid",
    editorPick: false,
    category: "Scheduling",
    description:
      "Enterprise social media management. 35+ integrations, social listening, team collaboration, compliance tools.",
    tags: ["Enterprise", "Team", "Analytics"],
  },
  {
    id: 23,
    name: "Later",
    url: "https://later.com",
    price: "Free / Starter $25/mo",
    priceType: "freemium",
    editorPick: false,
    category: "Scheduling",
    description:
      "Visual content calendar. Instagram-focused planning, Linkin.bio, best time to post, user-generated content.",
    tags: ["Visual Planning", "Instagram", "Calendar"],
  },
  {
    id: 24,
    name: "Sprout Social",
    url: "https://sproutsocial.com",
    price: "From $249/mo",
    priceType: "paid",
    editorPick: false,
    category: "Scheduling",
    description:
      "Enterprise-grade social management. CRM integration, social listening, employee advocacy, premium analytics.",
    tags: ["Enterprise", "CRM", "Analytics"],
  },
  {
    id: 25,
    name: "Loomly",
    url: "https://loomly.com",
    price: "From $32/mo",
    priceType: "paid",
    editorPick: false,
    category: "Scheduling",
    description:
      "Brand success platform. Post ideas, scheduling, interaction management, analytics, and advanced analytics.",
    tags: ["Brand", "Ideas", "Collaboration"],
  },

  // ── ANALYTICS & INSIGHTS ──
  {
    id: 26,
    name: "Google Analytics",
    url: "https://analytics.google.com",
    price: "FREE",
    priceType: "free",
    editorPick: false,
    category: "Analytics",
    description:
      "Website & campaign tracking. Traffic sources, user behavior, conversion tracking, custom reports.",
    tags: ["Free", "Website", "Conversion"],
  },
  {
    id: 27,
    name: "Meta Business Suite",
    url: "https://business.facebook.com",
    price: "FREE",
    priceType: "free",
    editorPick: false,
    category: "Analytics",
    description:
      "Facebook & Instagram management. Insights, scheduling, inbox, ad management. All-in-one Meta platform tool.",
    tags: ["Free", "Facebook", "Instagram"],
  },
  {
    id: 28,
    name: "Brandwatch",
    url: "https://brandwatch.com",
    price: "Enterprise pricing",
    priceType: "paid",
    editorPick: false,
    category: "Analytics",
    description:
      "Social intelligence platform. Brand monitoring, sentiment analysis, trend identification, competitive analysis.",
    tags: ["Enterprise", "Listening", "Sentiment"],
  },
  {
    id: 29,
    name: "Sprinklr",
    url: "https://sprinklr.com",
    price: "Enterprise pricing",
    priceType: "paid",
    editorPick: false,
    category: "Analytics",
    description:
      "Unified customer experience management. Social listening, care, marketing, and advertising in one platform.",
    tags: ["Enterprise", "Unified", "CX"],
  },
  {
    id: 30,
    name: "Socialbakers (Emplifi)",
    url: "https://emplifi.io",
    price: "From $200/mo",
    priceType: "paid",
    editorPick: false,
    category: "Analytics",
    description:
      "AI-powered social analytics. Content optimization, influencer marketing, competitive benchmarking.",
    tags: ["AI Analytics", "Influencer", "Benchmarking"],
  },

  // ── AUDIO & MUSIC ──
  {
    id: 31,
    name: "Epidemic Sound",
    url: "https://epidemicsound.com",
    price: "From $9/mo",
    priceType: "paid",
    editorPick: false,
    category: "Audio",
    description:
      "Royalty-free music library. 40,000+ tracks, sound effects. Safe for social media, YouTube monetization.",
    tags: ["Music", "Royalty-Free", "YouTube Safe"],
  },
  {
    id: 32,
    name: "Artlist",
    url: "https://artlist.io",
    price: "From $9.99/mo",
    priceType: "paid",
    editorPick: false,
    category: "Audio",
    description:
      "Curated royalty-free music. Film-quality tracks, SFX, footage. Universal license for all platforms.",
    tags: ["Music", "Premium", "Universal License"],
  },
];

/* ─────────────── Category Config ─────────────── */
const CATEGORIES = [
  { key: "All", label: "All", icon: FaWrench },
  { key: "Design", label: "Design", icon: FaPaintBrush },
  { key: "Video", label: "Video", icon: FaVideo },
  { key: "AI", label: "AI", icon: FaRobot },
  { key: "Scheduling", label: "Scheduling", icon: FaCalendarAlt },
  { key: "Analytics", label: "Analytics", icon: FaChartBar },
  { key: "Audio", label: "Audio", icon: FaMusic },
];

const CATEGORY_META = {
  Design: {
    border: "border-l-blue-500",
    bg: "bg-blue-50",
    text: "text-blue-700",
    title: "Design & Graphics",
    description:
      "Create stunning visuals, social media posts, and brand assets with industry-leading design tools.",
  },
  Video: {
    border: "border-l-purple-500",
    bg: "bg-purple-50",
    text: "text-purple-700",
    title: "Video Production",
    description:
      "Edit, produce, and publish professional video content for every social platform.",
  },
  AI: {
    border: "border-l-emerald-500",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    title: "AI Tools",
    description:
      "Leverage artificial intelligence for content generation, image creation, and smart automation.",
  },
  Scheduling: {
    border: "border-l-orange-500",
    bg: "bg-orange-50",
    text: "text-orange-700",
    title: "Scheduling & Publishing",
    description:
      "Plan, schedule, and auto-publish content across all your social channels.",
  },
  Analytics: {
    border: "border-l-teal-500",
    bg: "bg-teal-50",
    text: "text-teal-700",
    title: "Analytics & Insights",
    description:
      "Track performance, monitor mentions, and gain actionable insights from your social data.",
  },
  Audio: {
    border: "border-l-pink-500",
    bg: "bg-pink-50",
    text: "text-pink-700",
    title: "Audio & Music",
    description:
      "Find royalty-free music, sound effects, and AI voiceover for your video content.",
  },
};

/* ─────────────── Price Badge ─────────────── */
const PriceBadge = ({ priceType, price }) => {
  const styles = {
    free: "bg-green-100 text-green-700 border-green-200",
    freemium: "bg-blue-100 text-blue-700 border-blue-200",
    paid: "bg-gray-100 text-gray-600 border-gray-200",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles[priceType]}`}
    >
      {price}
    </span>
  );
};

/* ─────────────── Tool Card ─────────────── */
const ToolCard = ({ tool }) => {
  const meta = CATEGORY_META[tool.category];

  return (
    <GlassCard className={`border-l-4 ${meta.border} !p-0`}>
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-lg font-bold text-gray-900 truncate">
                {tool.name}
              </h3>
              {tool.editorPick && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-700 border border-amber-200 whitespace-nowrap">
                  <FaStar className="w-3 h-3" />
                  Editor's Pick
                </span>
              )}
            </div>
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-500 hover:text-blue-700 hover:underline transition-colors truncate block mt-0.5"
            >
              {tool.url.replace("https://", "")}
            </a>
          </div>
          <PriceBadge priceType={tool.priceType} price={tool.price} />
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          {tool.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tool.tags.map((tag) => (
            <span
              key={tag}
              className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${meta.bg} ${meta.text}`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action */}
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors group"
        >
          Visit Tool
          <FaExternalLinkAlt className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </a>
      </div>
    </GlassCard>
  );
};

/* ─────────────── Main Component ─────────────── */
const ToolsHub = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredTools = useMemo(() => {
    return TOOLS.filter((tool) => {
      const matchesCategory =
        activeCategory === "All" || tool.category === activeCategory;
      const matchesSearch =
        search.trim() === "" ||
        tool.name.toLowerCase().includes(search.toLowerCase()) ||
        tool.tags.some((tag) =>
          tag.toLowerCase().includes(search.toLowerCase())
        ) ||
        tool.description.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  /* Group tools by category for sectioned view */
  const groupedTools = useMemo(() => {
    const groups = {};
    filteredTools.forEach((tool) => {
      if (!groups[tool.category]) groups[tool.category] = [];
      groups[tool.category].push(tool);
    });
    return groups;
  }, [filteredTools]);

  const categoryOrder = [
    "Design",
    "Video",
    "AI",
    "Scheduling",
    "Analytics",
    "Audio",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ═══════════ HERO ═══════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-600">
        {/* Decorative background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-300 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-300 rounded-full blur-3xl opacity-30" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm mb-6 ring-1 ring-white/20">
            <FaWrench className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4">
            Tools & Integrations Hub
          </h1>
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-indigo-100 leading-relaxed">
            Enterprise-grade toolkit powering your social media strategy. 50+
            tools across design, video, analytics, and automation.
          </p>

          {/* Stats row */}
          <div className="flex items-center justify-center gap-8 sm:gap-12 mt-10">
            {[
              { num: "32+", label: "Tools" },
              { num: "6", label: "Categories" },
              { num: "100%", label: "Curated" },
            ].map(({ num, label }) => (
              <div key={label} className="text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-white">
                  {num}
                </div>
                <div className="text-sm text-indigo-200 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ SEARCH & FILTERS ═══════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <GlassCard className="!rounded-2xl !shadow-lg">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
            {/* Search */}
            <div className="relative flex-1">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search tools by name, tag, or description..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border ${
                    activeCategory === key
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200"
                      : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-semibold text-gray-700">
                {filteredTools.length}
              </span>{" "}
              of {TOOLS.length} tools
              {search && (
                <span>
                  {" "}
                  matching "
                  <span className="font-medium text-indigo-600">{search}</span>"
                </span>
              )}
              {activeCategory !== "All" && (
                <span>
                  {" "}
                  in{" "}
                  <span className="font-medium text-indigo-600">
                    {activeCategory}
                  </span>
                </span>
              )}
            </p>
          </div>
        </GlassCard>
      </section>

      {/* ═══════════ TOOL SECTIONS ═══════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredTools.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <FaSearch className="w-6 h-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-1">
              No tools found
            </h3>
            <p className="text-sm text-gray-500">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        ) : (
          <div className="space-y-14">
            {categoryOrder.map((cat) => {
              const tools = groupedTools[cat];
              if (!tools || tools.length === 0) return null;
              const meta = CATEGORY_META[cat];

              return (
                <div key={cat}>
                  {/* Section Header */}
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {meta.title}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      {meta.description}
                    </p>
                  </div>

                  {/* Tool Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {tools.map((tool) => (
                      <ToolCard key={tool.id} tool={tool} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ═══════════ ENTERPRISE FOOTER ═══════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <GlassCard className="!bg-gradient-to-br !from-gray-900 !to-gray-800 !border-gray-700 text-center">
          <div className="max-w-2xl mx-auto py-4">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm mb-5 ring-1 ring-white/10">
              <FaBuilding className="w-7 h-7 text-amber-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              💼 Enterprise Solutions
            </h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              Need custom integrations or enterprise licensing? SocialPulse
              partners with leading tool providers to offer bundled enterprise
              packages. Contact our enterprise team for custom solutions.
            </p>
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-0.5 transition-all duration-200">
              Contact Enterprise Team
              <FaExternalLinkAlt className="w-3.5 h-3.5" />
            </button>
          </div>
        </GlassCard>
      </section>
    </div>
  );
};

export default ToolsHub;
