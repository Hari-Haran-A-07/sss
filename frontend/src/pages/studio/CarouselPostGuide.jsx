import { Link } from "react-router-dom";
import GlassCard from "../../components/ui/GlassCard";
import { Layers, ExternalLink, ArrowLeft } from "lucide-react";

import {
  FaPaintBrush,
  FaRobot,
  FaMagic,
  FaCheckCircle,
  FaTimesCircle,
  FaInstagram,
  FaLinkedin,
  FaFacebook,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

/* ───────────── data ───────────── */

const platformSpecs = [
  {
    platform: "Instagram",
    icon: <FaInstagram className="text-pink-500" />,
    maxSlides: "10",
    dimensions: "1080×1080 (square), 1080×1350 (portrait)",
    fileTypes: "JPG, PNG",
  },
  {
    platform: "LinkedIn",
    icon: <FaLinkedin className="text-blue-700" />,
    maxSlides: "20 (as PDF)",
    dimensions: "1080×1080 or 1920×1080",
    fileTypes: "PDF, Images",
  },
  {
    platform: "Facebook",
    icon: <FaFacebook className="text-blue-600" />,
    maxSlides: "10",
    dimensions: "1080×1080",
    fileTypes: "JPG, PNG",
  },
  {
    platform: "X (Twitter)",
    icon: <FaXTwitter className="text-gray-800" />,
    maxSlides: "4",
    dimensions: "1200×675",
    fileTypes: "JPG, PNG",
  },
];

const carouselStructure = [
  {
    slide: "Slide 1 — Hook",
    emoji: "🎣",
    color: "from-orange-500 to-amber-400",
    text: "Stop the scroll. Use a bold headline, question, or surprising stat.",
  },
  {
    slide: "Slides 2–8 — Value",
    emoji: "💎",
    color: "from-blue-600 to-cyan-400",
    text: "Deliver the core content. Each slide should have ONE key point. Use consistent design.",
  },
  {
    slide: "Slide 9 — Summary",
    emoji: "📋",
    color: "from-emerald-500 to-teal-400",
    text: "Recap the key takeaways in a quick list.",
  },
  {
    slide: "Slide 10 — CTA",
    emoji: "🚀",
    color: "from-purple-600 to-pink-500",
    text: "Tell them what to do next: Follow, Save, Share, Visit Link, Comment.",
  },
];

const designTools = [
  {
    name: "Canva",
    url: "https://canva.com",
    desc: "Best carousel template library. Multi-page design. Brand kit. Auto-resize across platforms. FREE carousel templates.",
    skill: "Beginner",
    price: "Free / Pro $13/mo",
  },
  {
    name: "Adobe InDesign",
    url: "https://adobe.com/indesign",
    desc: "Multi-page layout mastery. Master pages for consistent design. PDF carousel export for LinkedIn.",
    skill: "Pro",
    price: "$22.99/mo",
  },
  {
    name: "Figma",
    url: "https://figma.com",
    desc: "Frame-based carousel design. Auto-layout for consistent slides. Community carousel templates. Export individual slides.",
    skill: "Intermediate",
    price: "Free / Pro $15/mo",
  },
  {
    name: "Adobe Photoshop",
    url: "https://adobe.com/photoshop",
    desc: "Artboard feature for multi-slide. Advanced effects per slide. Batch export.",
    skill: "Pro",
    price: "$22.99/mo",
  },
];

const carouselTools = [
  {
    name: "Carousel Maker by Later",
    url: "https://later.com",
    desc: "Dedicated carousel creation tool. Auto-split long content. Preview before posting.",
    skill: "Beginner",
    price: "Free",
  },
  {
    name: "Predis.ai",
    url: "https://predis.ai",
    desc: "AI-generated carousel content. Auto-design from text input. Multi-platform export.",
    skill: "Beginner",
    price: "Freemium",
  },
];

const aiCaptionTools = [
  {
    name: "ChatGPT",
    url: "https://chat.openai.com",
    desc: "Generate slide-by-slide content. Create engaging hooks and CTAs. Hashtag research.",
    skill: "Beginner",
    price: "Free / Plus $20/mo",
  },
  {
    name: "Jasper",
    url: "https://jasper.ai",
    desc: "AI copywriting for each slide. Brand voice training. Template-based generation.",
    skill: "Intermediate",
    price: "From $49/mo",
  },
  {
    name: "Copy.ai",
    url: "https://copy.ai",
    desc: "Social media post templates. Carousel outline generator. Multi-language support.",
    skill: "Beginner",
    price: "Free / Pro $49/mo",
  },
];

const bestPracticesDo = [
  "Maintain consistent design across all slides (same fonts, colors, layout)",
  "Number your slides (1/10, 2/10…) for context",
  "Use a strong hook on slide 1 — it's your thumbnail",
  "One idea per slide — don't overcrowd",
  'Use swipe indicators (arrows, "Swipe →")',
  "End with a strong CTA",
  "Save as high-quality PNG (not JPEG) for text-heavy slides",
];

const bestPracticesDont = [
  "Don't change visual style between slides",
  "Don't exceed 150 words per slide",
  "Don't skip the CTA slide",
];

const contentIdeas = [
  { emoji: "📚", text: '"10 Tips for…" educational series' },
  { emoji: "📊", text: "Data storytelling with stats" },
  { emoji: "🔄", text: "Before / After transformations" },
  { emoji: "📖", text: "Mini case studies" },
  { emoji: "🎓", text: "Tutorial walkthroughs" },
  { emoji: "💡", text: "Myth vs. Fact comparisons" },
  { emoji: "🗓️", text: "Weekly roundups" },
  { emoji: "🏆", text: '"Best of" lists' },
];

const bestContentTypes = [
  "Educational content",
  "Step-by-step tutorials",
  "Product collections",
  "Before / After",
  "Storytelling",
  "Data presentations",
];

/* ───────────── skill badge ───────────── */

const SkillBadge = ({ level }) => {
  const colors = {
    Beginner: "bg-green-100 text-green-700",
    Intermediate: "bg-yellow-100 text-yellow-700",
    Pro: "bg-red-100 text-red-700",
  };
  return (
    <span
      className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${colors[level] || "bg-gray-100 text-gray-600"}`}
    >
      {level}
    </span>
  );
};

/* ───────────── tool card ───────────── */

const ToolCard = ({ tool }) => (
  <GlassCard className="flex flex-col justify-between h-full">
    <div>
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-lg font-bold text-gray-900">{tool.name}</h4>
        <SkillBadge level={tool.skill} />
      </div>
      <p className="text-sm text-gray-600 leading-relaxed mb-4">{tool.desc}</p>
    </div>

    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
      <span className="text-xs font-semibold text-gray-500">{tool.price}</span>
      <a
        href={tool.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
      >
        Visit <ExternalLink size={14} />
      </a>
    </div>
  </GlassCard>
);

/* ───────────── section heading ───────────── */

const SectionHeading = ({ children, sub }) => (
  <div className="mb-6">
    <h2 className="text-2xl font-bold text-gray-900">{children}</h2>
    {sub && <p className="text-sm text-gray-500 mt-1">{sub}</p>}
  </div>
);

/* ───────────── tool category ───────────── */

const ToolCategory = ({ icon, title, tools, gradient }) => (
  <div className="space-y-4">
    <div className="flex items-center gap-3">
      <div
        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-lg`}
      >
        {icon}
      </div>
      <h3 className="text-lg font-bold text-gray-800">{title}</h3>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {tools.map((tool) => (
        <ToolCard key={tool.name} tool={tool} />
      ))}
    </div>
  </div>
);

/* ═══════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════ */

const CarouselPostGuide = () => {
  return (
    <div className="space-y-8">
      {/* ── Back nav ── */}
      <Link
        to="/studio"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Creative Studio
      </Link>

      {/* ═══════ 1. HERO BANNER ═══════ */}
      <GlassCard className="bg-gradient-to-r from-purple-600 to-pink-500 text-white">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Carousel Post Creation Guide
            </h1>
            <p className="text-sm md:text-base text-purple-100 mt-2 max-w-2xl leading-relaxed">
              Design multi-slide stories that boost engagement by 3.1× and keep
              your audience swiping.
            </p>
          </div>

          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center shrink-0">
            <Layers size={32} />
          </div>
        </div>
      </GlassCard>

      {/* ═══════ 2. WHAT IS A CAROUSEL POST? ═══════ */}
      <GlassCard hover={false}>
        <SectionHeading>What is a Carousel Post?</SectionHeading>

        <div className="space-y-6">
          {/* intro */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-5">
            <p className="text-sm text-gray-700 leading-relaxed">
              A carousel post contains{" "}
              <strong className="text-purple-700">2–10 slides</strong> that
              users swipe through horizontally. According to{" "}
              <span className="font-semibold text-pink-600">Hootsuite</span>{" "}
              data, carousels receive{" "}
              <strong className="text-purple-700">
                3.1× more engagement
              </strong>{" "}
              than regular single-image posts, making them the highest-performing
              organic format across platforms.
            </p>
          </div>

          {/* best content types */}
          <div>
            <h3 className="text-md font-semibold text-gray-800 mb-3">
              Best Content Types for Carousels
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {bestContentTypes.map((type) => (
                <div
                  key={type}
                  className="flex items-center gap-2 bg-white border border-gray-100 rounded-xl px-4 py-2.5 shadow-sm"
                >
                  <span className="w-2 h-2 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 shrink-0" />
                  <span className="text-sm text-gray-700 font-medium">
                    {type}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* platform specs table */}
          <div>
            <h3 className="text-md font-semibold text-gray-800 mb-3">
              Platform Specifications
            </h3>
            <div className="overflow-x-auto rounded-2xl border border-gray-100">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left text-gray-500 uppercase text-xs tracking-wider">
                    <th className="px-5 py-3 font-semibold">Platform</th>
                    <th className="px-5 py-3 font-semibold">Max Slides</th>
                    <th className="px-5 py-3 font-semibold">Dimensions</th>
                    <th className="px-5 py-3 font-semibold">File Types</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {platformSpecs.map((row) => (
                    <tr
                      key={row.platform}
                      className="hover:bg-gray-50/60 transition-colors"
                    >
                      <td className="px-5 py-3.5 font-semibold text-gray-800 flex items-center gap-2">
                        {row.icon} {row.platform}
                      </td>
                      <td className="px-5 py-3.5 text-gray-600">
                        {row.maxSlides}
                      </td>
                      <td className="px-5 py-3.5 text-gray-600 font-mono text-xs">
                        {row.dimensions}
                      </td>
                      <td className="px-5 py-3.5 text-gray-600">
                        {row.fileTypes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* ═══════ 3. CAROUSEL STRUCTURE FRAMEWORK ═══════ */}
      <GlassCard hover={false}>
        <SectionHeading sub="The ideal anatomy of a high-performing carousel">
          Carousel Structure Framework
        </SectionHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {carouselStructure.map((item) => (
            <div
              key={item.slide}
              className="relative rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden"
            >
              <div
                className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${item.color}`}
              />
              <div className="p-5 pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{item.emoji}</span>
                  <h4 className="font-bold text-gray-900">{item.slide}</h4>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* ═══════ 4. RECOMMENDED TOOLS ═══════ */}
      <div className="space-y-6">
        <SectionHeading sub="Everything you need to create, write, and polish carousel posts">
          Recommended Tools for Carousel Posts
        </SectionHeading>

        <ToolCategory
          icon={<FaPaintBrush />}
          title="Design Tools"
          gradient="from-blue-600 to-cyan-400"
          tools={designTools}
        />

        <ToolCategory
          icon={<FaMagic />}
          title="Carousel-Specific Tools"
          gradient="from-purple-600 to-pink-500"
          tools={carouselTools}
        />

        <ToolCategory
          icon={<FaRobot />}
          title="AI Caption Writers"
          gradient="from-emerald-500 to-teal-400"
          tools={aiCaptionTools}
        />
      </div>

      {/* ═══════ 5. DESIGN BEST PRACTICES ═══════ */}
      <GlassCard hover={false}>
        <SectionHeading>Design Best Practices for Carousels</SectionHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Do */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-green-600 mb-1">
              Do
            </h3>
            {bestPracticesDo.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <FaCheckCircle className="text-green-500 mt-0.5 shrink-0" />
                <span className="text-sm text-gray-700 leading-relaxed">
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* Don't */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-red-600 mb-1">
              Don't
            </h3>
            {bestPracticesDont.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <FaTimesCircle className="text-red-500 mt-0.5 shrink-0" />
                <span className="text-sm text-gray-700 leading-relaxed">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>

      {/* ═══════ 6. CAROUSEL CONTENT IDEAS ═══════ */}
      <GlassCard hover={false}>
        <SectionHeading sub="Quick-start prompts to spark your next carousel">
          Carousel Content Ideas
        </SectionHeading>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contentIdeas.map((idea) => (
            <div
              key={idea.text}
              className="group flex items-center gap-3 bg-gradient-to-br from-gray-50 to-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">
                {idea.emoji}
              </span>
              <span className="text-sm font-medium text-gray-700">
                {idea.text}
              </span>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};

export default CarouselPostGuide;
