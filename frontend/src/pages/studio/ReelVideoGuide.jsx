import { Link } from "react-router-dom";
import GlassCard from "../../components/ui/GlassCard";

import {
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaFacebook,
  FaCheckCircle,
  FaTimesCircle,
  FaExternalLinkAlt,
  FaArrowLeft,
} from "react-icons/fa";

import {
  Video,
  Clapperboard,
  Scissors,
  Music,
  Captions,
  Sparkles,
  CalendarClock,
  Lightbulb,
  Play,
  Mic,
  Type,
  Wand2,
  MonitorPlay,
  Smartphone,
  Bot,
  AudioLines,
} from "lucide-react";

/* ───────── platform specs table data ───────── */

const platformSpecs = [
  {
    platform: "Instagram Reels",
    icon: <FaInstagram className="text-pink-500" />,
    duration: "15-90s",
    dimensions: "1080×1920",
    aspect: "9:16",
    maxSize: "4GB",
  },
  {
    platform: "YouTube Shorts",
    icon: <FaYoutube className="text-red-600" />,
    duration: "Up to 60s",
    dimensions: "1080×1920",
    aspect: "9:16",
    maxSize: "256MB",
  },
  {
    platform: "TikTok",
    icon: <FaTiktok className="text-gray-900" />,
    duration: "15s-10min",
    dimensions: "1080×1920",
    aspect: "9:16",
    maxSize: "287.6MB",
  },
  {
    platform: "Facebook Reels",
    icon: <FaFacebook className="text-blue-600" />,
    duration: "15-90s",
    dimensions: "1080×1920",
    aspect: "9:16",
    maxSize: "4GB",
  },
];

/* ───────── workflow steps ───────── */

const workflowSteps = [
  {
    num: 1,
    emoji: "💡",
    icon: <Lightbulb className="w-5 h-5" />,
    title: "Concept & Script",
    desc: "Plan your hook (first 3 seconds), body content, and CTA",
    color: "from-amber-400 to-yellow-500",
  },
  {
    num: 2,
    emoji: "🎬",
    icon: <Clapperboard className="w-5 h-5" />,
    title: "Shoot / Record",
    desc: "Use proper lighting, stable camera, clean audio",
    color: "from-red-400 to-rose-500",
  },
  {
    num: 3,
    emoji: "✂️",
    icon: <Scissors className="w-5 h-5" />,
    title: "Edit & Cut",
    desc: "Trim, add transitions, effects, text overlays",
    color: "from-violet-400 to-purple-500",
  },
  {
    num: 4,
    emoji: "🎵",
    icon: <Music className="w-5 h-5" />,
    title: "Add Audio",
    desc: "Use trending sounds, voiceover, background music",
    color: "from-pink-400 to-fuchsia-500",
  },
  {
    num: 5,
    emoji: "📝",
    icon: <Captions className="w-5 h-5" />,
    title: "Add Captions",
    desc: "Auto-generated or manual subtitles (85% watch on mute!)",
    color: "from-cyan-400 to-teal-500",
  },
  {
    num: 6,
    emoji: "🎨",
    icon: <Sparkles className="w-5 h-5" />,
    title: "Add Effects",
    desc: "Filters, stickers, text animations",
    color: "from-emerald-400 to-green-500",
  },
  {
    num: 7,
    emoji: "📅",
    icon: <CalendarClock className="w-5 h-5" />,
    title: "Schedule & Publish",
    desc: "Post at optimal times using SocialPulse",
    color: "from-blue-400 to-indigo-500",
  },
];

/* ───────── tool data ───────── */

const professionalEditors = [
  {
    name: "CapCut",
    url: "https://capcut.com",
    desc: "FREE professional video editing. AI-powered auto-captions. Trending effects & filters. Music library. Best for: Instagram Reels, TikTok.",
    skill: "Beginner",
    price: "FREE",
    features: ["Auto-captions", "Background remover", "Text-to-speech", "Speed ramping"],
    color: "bg-gray-900",
    textColor: "text-white",
  },
  {
    name: "Adobe Premiere Pro",
    url: "https://adobe.com/premiere",
    desc: "Industry-standard video editing. Multi-track timeline. Color grading. Plugin ecosystem. Best for: Professional productions.",
    skill: "Pro",
    price: "$22.99/mo",
    features: [],
    color: "bg-indigo-700",
    textColor: "text-white",
  },
  {
    name: "Adobe After Effects",
    url: "https://adobe.com/aftereffects",
    desc: "Motion graphics & VFX. Text animations. Logo reveals. Visual effects. Best for: Animated intros, branded elements.",
    skill: "Expert",
    price: "$22.99/mo",
    features: [],
    color: "bg-purple-700",
    textColor: "text-white",
  },
  {
    name: "DaVinci Resolve",
    url: "https://blackmagicdesign.com/products/davinciresolve",
    desc: "Professional color grading. FREE version available. Multi-track editing. Fusion VFX. Best for: Cinematic color grading.",
    skill: "Pro",
    price: "FREE / Studio $295 one-time",
    features: [],
    color: "bg-orange-600",
    textColor: "text-white",
  },
  {
    name: "Final Cut Pro",
    url: "https://apple.com/final-cut-pro",
    desc: "Apple's professional editor. Magnetic timeline. Optimized for Mac. Best for: Mac users.",
    skill: "Pro",
    price: "$299.99 one-time",
    features: [],
    color: "bg-gray-800",
    textColor: "text-white",
  },
];

const mobileEditors = [
  {
    name: "InShot",
    url: "https://inshot.com",
    desc: "Quick mobile editing. Easy text & music addition. Speed control. Best for: Quick edits on the go.",
    skill: "Beginner",
    price: "Free / Pro $3.99/mo",
  },
  {
    name: "VN Video Editor",
    url: "https://vlognow.me",
    desc: "Feature-rich free editor. Multi-track editing on mobile. Green screen. Best for: Mobile-first creators.",
    skill: "Beginner",
    price: "FREE",
  },
  {
    name: "KineMaster",
    url: "https://kinemaster.com",
    desc: "Layer-based mobile editing. Chroma key. Asset store. Best for: Advanced mobile editing.",
    skill: "Intermediate",
    price: "Free / Premium $4.99/mo",
  },
];

const aiTools = [
  {
    name: "Runway ML",
    url: "https://runwayml.com",
    desc: "AI video generation. Gen-2 text-to-video. Background removal. Inpainting. Best for: AI-generated video content.",
    skill: "Intermediate",
    price: "Free / Pro $12/mo",
  },
  {
    name: "Synthesia",
    url: "https://synthesia.io",
    desc: "AI avatar videos. 140+ AI presenters. 120+ languages. Best for: Talking-head videos without filming.",
    skill: "Beginner",
    price: "From $22/mo",
  },
  {
    name: "Descript",
    url: "https://descript.com",
    desc: "Edit video by editing text. AI filler word removal. Screen recording. Best for: Tutorial & educational content.",
    skill: "Beginner",
    price: "Free / Pro $24/mo",
  },
  {
    name: "Opus Clip",
    url: "https://opus.pro",
    desc: "AI long-to-short video clipper. Auto-generates viral clips. AI curation score. Best for: Repurposing long content.",
    skill: "Beginner",
    price: "Free / Pro $15/mo",
  },
];

const audioTools = [
  {
    name: "ElevenLabs",
    url: "https://elevenlabs.io",
    desc: "AI voice cloning. Ultra-realistic voiceover. 29 languages. Best for: Professional narration.",
    skill: "Beginner",
    price: "Free / Starter $5/mo",
  },
  {
    name: "Epidemic Sound",
    url: "https://epidemicsound.com",
    desc: "Royalty-free music library. 40,000+ tracks. Copyright safe. Best for: Background music.",
    skill: "Beginner",
    price: "From $9/mo",
  },
  {
    name: "Artlist",
    url: "https://artlist.io",
    desc: "Curated music & SFX. Universal license. Best for: Premium background tracks.",
    skill: "Beginner",
    price: "From $9.99/mo",
  },
];

const captionTools = [
  {
    name: "CapCut Auto Captions",
    url: "https://capcut.com",
    desc: "Free auto-captions. Animated text styles. Multi-language.",
  },
  {
    name: "Zubtitle",
    url: "https://zubtitle.com",
    desc: "Auto-generate subtitles. Custom styling. SRT export.",
  },
  {
    name: "Kapwing",
    url: "https://kapwing.com",
    desc: "Auto subtitles. Translate. Custom fonts & colors.",
  },
];

/* ───────── best practices ───────── */

const doItems = [
  "Hook viewers in the first 3 seconds",
  "Use trending audio/sounds when relevant",
  "Add captions — 85% of social video is watched on mute",
  "Keep it vertical (9:16 aspect ratio)",
  "Use text overlays to reinforce key points",
  "End with a clear CTA (Follow, Share, Comment)",
  "Optimal length: 15-30 seconds for maximum retention",
  "Use jump cuts to maintain pacing",
];

const dontItems = [
  "Don't use copyrighted music",
  "Don't make overly long intros",
  "Don't forget to add a cover thumbnail",
  "Don't ignore video quality (shoot in 1080p minimum)",
];

/* ───────── content ideas ───────── */

const contentIdeas = [
  { emoji: "🎬", title: "Behind-the-scenes footage" },
  { emoji: "📚", title: "Quick tutorials / How-to" },
  { emoji: "🗣️", title: "Talking head tips" },
  { emoji: "📦", title: "Product unboxing / demos" },
  { emoji: "🔄", title: "Before / After transformations" },
  { emoji: "💬", title: "Customer testimonial clips" },
  { emoji: "📊", title: "Data visualization animations" },
  { emoji: "🎵", title: "Trending audio challenges" },
  { emoji: "🏢", title: "Day in the life / Office culture" },
  { emoji: "❓", title: "FAQ answer series" },
];

/* ───────── helper components ───────── */

const SkillBadge = ({ level }) => {
  const colors = {
    Beginner: "bg-green-100 text-green-700",
    Intermediate: "bg-yellow-100 text-yellow-700",
    Pro: "bg-blue-100 text-blue-700",
    Expert: "bg-purple-100 text-purple-700",
  };

  return (
    <span
      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${colors[level] || "bg-gray-100 text-gray-700"}`}
    >
      {level}
    </span>
  );
};

const ToolCard = ({ tool, accent = "bg-gradient-to-r from-rose-500 to-orange-400" }) => (
  <GlassCard className="relative overflow-hidden group">
    <div className={`absolute top-0 left-0 w-full h-1 ${accent}`}></div>

    <div className="flex items-start justify-between mb-3">
      <h4 className="text-lg font-bold text-gray-900">{tool.name}</h4>
      <a
        href={tool.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-rose-500 hover:text-rose-600 transition-colors"
      >
        <FaExternalLinkAlt className="w-3.5 h-3.5" />
      </a>
    </div>

    <p className="text-sm text-gray-600 leading-relaxed mb-4">{tool.desc}</p>

    {tool.features && tool.features.length > 0 && (
      <div className="flex flex-wrap gap-1.5 mb-4">
        {tool.features.map((f, i) => (
          <span
            key={i}
            className="text-xs bg-rose-50 text-rose-600 px-2 py-0.5 rounded-full font-medium"
          >
            {f}
          </span>
        ))}
      </div>
    )}

    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
      {tool.skill && <SkillBadge level={tool.skill} />}
      {tool.price && (
        <span className="text-sm font-semibold text-gray-800">{tool.price}</span>
      )}
    </div>
  </GlassCard>
);

const SectionTitle = ({ icon, title, subtitle }) => (
  <div className="flex items-start gap-4 mb-6">
    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 to-orange-400 flex items-center justify-center text-white flex-shrink-0 shadow-lg">
      {icon}
    </div>
    <div>
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
    </div>
  </div>
);

const CategoryHeader = ({ icon, title }) => (
  <div className="flex items-center gap-3 mb-4 mt-8 first:mt-0">
    <div className="w-8 h-8 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600">
      {icon}
    </div>
    <h3 className="text-lg font-bold text-gray-800">{title}</h3>
  </div>
);

/* ═══════════════════════════════════════════ */
/*                 MAIN PAGE                  */
/* ═══════════════════════════════════════════ */

const ReelVideoGuide = () => {
  return (
    <div className="space-y-8">
      {/* ── HERO BANNER ── */}
      <GlassCard className="bg-gradient-to-r from-rose-600 to-orange-500 text-white border-none">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <Video className="w-6 h-6" />
              </div>
              <h1 className="text-3xl font-bold">Reel & Video Creation Guide</h1>
            </div>
            <p className="text-rose-100 text-sm md:text-base max-w-2xl leading-relaxed">
              Produce high-impact short-form videos that drive 67% more engagement
              than static content
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-5 py-2.5 rounded-xl">
            <Play className="w-4 h-4" />
            <span className="text-sm font-medium">Short-Form Video</span>
          </div>
        </div>
      </GlassCard>

      {/* ── UNDERSTANDING SHORT-FORM VIDEO ── */}
      <GlassCard>
        <SectionTitle
          icon={<Clapperboard className="w-6 h-6" />}
          title="Understanding Short-Form Video"
          subtitle="The dominant content format for 2024-2025"
        />

        {/* key stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            {
              stat: "#1",
              label: "Content Format",
              detail: "Short-form video (15-90s) is the #1 content format in 2024-2025",
            },
            {
              stat: "22%",
              label: "More Engagement",
              detail: "Instagram Reels get 22% more engagement than regular video posts",
            },
            {
              stat: "73%",
              label: "Consumer Preference",
              detail: "73% of consumers prefer short-form video for product discovery",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-rose-50 to-orange-50 rounded-2xl p-5 border border-rose-100"
            >
              <p className="text-3xl font-extrabold bg-gradient-to-r from-rose-600 to-orange-500 bg-clip-text text-transparent">
                {item.stat}
              </p>
              <p className="text-sm font-semibold text-gray-800 mt-1">{item.label}</p>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">{item.detail}</p>
            </div>
          ))}
        </div>

        {/* platform specs table */}
        <h3 className="text-lg font-bold text-gray-800 mb-4">Platform Specifications</h3>
        <div className="overflow-x-auto rounded-2xl border border-gray-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-rose-50 to-orange-50">
                <th className="text-left px-5 py-3.5 font-semibold text-gray-700">Platform</th>
                <th className="text-left px-5 py-3.5 font-semibold text-gray-700">Duration</th>
                <th className="text-left px-5 py-3.5 font-semibold text-gray-700">Dimensions</th>
                <th className="text-left px-5 py-3.5 font-semibold text-gray-700">Aspect Ratio</th>
                <th className="text-left px-5 py-3.5 font-semibold text-gray-700">Max File Size</th>
              </tr>
            </thead>
            <tbody>
              {platformSpecs.map((spec, i) => (
                <tr
                  key={i}
                  className="border-t border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-5 py-3.5 font-medium text-gray-900">
                    <div className="flex items-center gap-2">
                      {spec.icon}
                      {spec.platform}
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-gray-600">{spec.duration}</td>
                  <td className="px-5 py-3.5 text-gray-600 font-mono text-xs">{spec.dimensions}</td>
                  <td className="px-5 py-3.5">
                    <span className="bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full text-xs font-semibold">
                      {spec.aspect}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-gray-600">{spec.maxSize}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* ── VIDEO PRODUCTION WORKFLOW ── */}
      <GlassCard>
        <SectionTitle
          icon={<Scissors className="w-6 h-6" />}
          title="Video Production Workflow"
          subtitle="Follow this 7-step process for consistent quality"
        />

        <div className="relative">
          {/* connecting line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-rose-300 to-orange-300 hidden md:block"></div>

          <div className="space-y-4">
            {workflowSteps.map((step) => (
              <div key={step.num} className="flex items-start gap-4 md:ml-0">
                {/* step number */}
                <div
                  className={`relative z-10 w-12 h-12 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-md`}
                >
                  {step.num}
                </div>

                {/* step content */}
                <div className="bg-gray-50 rounded-2xl p-4 flex-1 border border-gray-100 hover:border-rose-200 transition-colors">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{step.emoji}</span>
                    <h4 className="font-bold text-gray-900">{step.title}</h4>
                  </div>
                  <p className="text-sm text-gray-600">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>

      {/* ── RECOMMENDED TOOLS ── */}
      <GlassCard>
        <SectionTitle
          icon={<Wand2 className="w-6 h-6" />}
          title="Recommended Tools for Video Creation"
          subtitle="Curated selection of the best tools across categories"
        />

        {/* Professional Video Editors */}
        <CategoryHeader icon={<MonitorPlay className="w-4 h-4" />} title="Professional Video Editors" />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {professionalEditors.map((tool, i) => (
            <ToolCard key={i} tool={tool} />
          ))}
        </div>

        {/* Mobile-First Editors */}
        <CategoryHeader icon={<Smartphone className="w-4 h-4" />} title="Mobile-First Editors" />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {mobileEditors.map((tool, i) => (
            <ToolCard key={i} tool={tool} accent="bg-gradient-to-r from-cyan-500 to-blue-500" />
          ))}
        </div>

        {/* AI Video Tools */}
        <CategoryHeader icon={<Bot className="w-4 h-4" />} title="AI Video Tools" />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {aiTools.map((tool, i) => (
            <ToolCard key={i} tool={tool} accent="bg-gradient-to-r from-violet-500 to-purple-500" />
          ))}
        </div>

        {/* Audio & Voiceover */}
        <CategoryHeader icon={<AudioLines className="w-4 h-4" />} title="Audio & Voiceover" />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {audioTools.map((tool, i) => (
            <ToolCard key={i} tool={tool} accent="bg-gradient-to-r from-pink-500 to-fuchsia-500" />
          ))}
        </div>

        {/* Caption & Subtitle Tools */}
        <CategoryHeader icon={<Type className="w-4 h-4" />} title="Caption & Subtitle Tools" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {captionTools.map((tool, i) => (
            <GlassCard key={i} className="relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-emerald-400"></div>
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-base font-bold text-gray-900">{tool.name}</h4>
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-500 hover:text-teal-600 transition-colors"
                >
                  <FaExternalLinkAlt className="w-3 h-3" />
                </a>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{tool.desc}</p>
            </GlassCard>
          ))}
        </div>
      </GlassCard>

      {/* ── BEST PRACTICES ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Do's */}
        <GlassCard>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
              <FaCheckCircle className="text-green-600 text-lg" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Best Practices</h3>
          </div>

          <div className="space-y-3">
            {doItems.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 bg-green-50 rounded-xl border border-green-100"
              >
                <FaCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Don'ts */}
        <GlassCard>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
              <FaTimesCircle className="text-red-600 text-lg" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Common Mistakes</h3>
          </div>

          <div className="space-y-3">
            {dontItems.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 bg-red-50 rounded-xl border border-red-100"
              >
                <FaTimesCircle className="text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* ── VIDEO CONTENT IDEAS ── */}
      <GlassCard>
        <SectionTitle
          icon={<Lightbulb className="w-6 h-6" />}
          title="Video Content Ideas"
          subtitle="Proven formats that drive engagement and growth"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {contentIdeas.map((idea, i) => (
            <div
              key={i}
              className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-5 border border-gray-100 hover:border-rose-200 hover:shadow-md transition-all duration-300 text-center"
            >
              <span className="text-3xl block mb-3">{idea.emoji}</span>
              <p className="text-sm font-semibold text-gray-800 leading-snug">{idea.title}</p>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* ── NAVIGATION ── */}
      <div className="flex items-center">
        <Link
          to="/studio"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-rose-600 transition-colors group"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Back to Creative Studio
        </Link>
      </div>
    </div>
  );
};

export default ReelVideoGuide;
