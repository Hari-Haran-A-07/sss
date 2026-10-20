import { Link } from "react-router-dom";
import GlassCard from "../../components/ui/GlassCard";

import {
  FaImage,
  FaLayerGroup,
  FaVideo,
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaTiktok,
  FaYoutube,
  FaExternalLinkAlt,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

import {
  Sparkles,
  ArrowRight,
  FileText,
  TrendingUp,
  Users,
  BarChart3,
  Target,
  Rocket,
} from "lucide-react";

/* ─────────────── PLATFORM BADGE ─────────────── */

const PlatformBadge = ({ icon, name, color }) => (
  <span
    className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${color}`}
  >
    {icon}
    {name}
  </span>
);

/* ─────────────── STAT CARD ─────────────── */

const QuickStatCard = ({ label, value, icon }) => (
  <GlassCard className="relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-cyan-400"></div>

    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-gray-500 text-sm">{label}</h3>
        <p className="text-3xl font-bold mt-1 text-gray-900">{value}</p>
      </div>

      <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 text-2xl">
        {icon}
      </div>
    </div>
  </GlassCard>
);

/* ─────────────── TOOL CARD ─────────────── */

const ToolCard = ({ emoji, name, description, color, url }) => (
  <div
    className={`
      flex items-start gap-3 p-4 rounded-2xl border border-gray-100
      bg-white/60 backdrop-blur-sm
      hover:shadow-md hover:-translate-y-0.5
      transition-all duration-300
    `}
  >
    <span
      className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 ${color}`}
    >
      {emoji}
    </span>

    <div className="flex-1 min-w-0">
      <h4 className="text-sm font-semibold text-gray-900">{name}</h4>
      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
        {description}
      </p>
    </div>

    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-500 hover:text-blue-700 transition-colors mt-1 flex-shrink-0"
      title={`Visit ${name}`}
    >
      <FaExternalLinkAlt className="text-xs" />
    </a>
  </div>
);

/* ─────────────── TOOL SECTION HEADER ─────────────── */

const ToolSectionHeader = ({ title }) => (
  <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3 mt-6 first:mt-0">
    {title}
  </h4>
);

/* ─────────────── CONTENT FORMAT CARD ─────────────── */

const ContentFormatCard = ({
  icon,
  title,
  description,
  platforms,
  dimensions,
  link,
  gradient,
}) => (
  <GlassCard className="flex flex-col h-full group">
    {/* Icon */}
    <div
      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-2xl mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}
    >
      {icon}
    </div>

    {/* Title */}
    <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>

    {/* Description */}
    <p className="text-sm text-gray-600 leading-relaxed mb-4">{description}</p>

    {/* Dimensions / Format Info */}
    <div className="bg-gray-50 rounded-xl px-4 py-3 mb-4">
      <p className="text-xs text-gray-500 font-medium">{dimensions}</p>
    </div>

    {/* Best For Badges */}
    <div className="mb-5">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
        Best for
      </p>
      <div className="flex flex-wrap gap-2">{platforms}</div>
    </div>

    {/* Spacer */}
    <div className="flex-1"></div>

    {/* CTA */}
    <Link
      to={link}
      className="
        inline-flex items-center justify-center gap-2
        w-full py-3 rounded-xl font-semibold text-sm
        bg-gradient-to-r from-blue-600 to-cyan-500
        text-white shadow-md
        hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]
        transition-all duration-200
      "
    >
      Create Now <ArrowRight size={16} />
    </Link>
  </GlassCard>
);

/* ═══════════════════════════════════════════════════
   CREATIVE STUDIO — MAIN PAGE
   ═══════════════════════════════════════════════════ */

const CreativeStudio = () => {
  return (
    <div className="space-y-8">
      {/* ──────────── 1. HERO SECTION ──────────── */}
      <GlassCard className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="w-8 h-8" />
              <h1 className="text-3xl font-bold">Creative Studio</h1>
            </div>
            <p className="text-sm text-blue-100 mt-1 max-w-lg">
              Professional content creation tools for social media excellence
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Link
              to="/studio/static-post"
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
            >
              <FaImage /> Static Post
            </Link>

            <Link
              to="/studio/carousel-post"
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
            >
              <FaLayerGroup /> Carousel Post
            </Link>

            <Link
              to="/studio/reel-video"
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
            >
              <FaVideo /> Reel / Video
            </Link>
          </div>
        </div>
      </GlassCard>

      {/* ──────────── 2. CONTENT TYPE CARDS ──────────── */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Choose Your Content Format
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Card 1 — Static Post */}
          <ContentFormatCard
            icon={<FaImage />}
            title="Static Post"
            description="Create stunning single-image posts that stop the scroll. Perfect for announcements, quotes, product showcases, and brand storytelling."
            gradient="from-pink-500 to-rose-500"
            dimensions="Recommended: 1080×1080 (Square) · 1080×1350 (Portrait) · 1200×628 (Landscape)"
            link="/studio/static-post"
            platforms={
              <>
                <PlatformBadge
                  icon={<FaInstagram />}
                  name="Instagram"
                  color="bg-pink-50 text-pink-600"
                />
                <PlatformBadge
                  icon={<FaFacebook />}
                  name="Facebook"
                  color="bg-blue-50 text-blue-600"
                />
                <PlatformBadge
                  icon={<FaLinkedin />}
                  name="LinkedIn"
                  color="bg-sky-50 text-sky-700"
                />
                <PlatformBadge
                  icon={<FaXTwitter />}
                  name="X"
                  color="bg-gray-100 text-gray-800"
                />
              </>
            }
          />

          {/* Card 2 — Carousel Post */}
          <ContentFormatCard
            icon={<FaLayerGroup />}
            title="Carousel Post"
            description="Design multi-slide carousels that boost engagement by 3.1x. Tell stories, share tips, or showcase products across up to 10 slides."
            gradient="from-violet-500 to-purple-600"
            dimensions="Up to 10 slides · 1080×1080 recommended"
            link="/studio/carousel-post"
            platforms={
              <>
                <PlatformBadge
                  icon={<FaInstagram />}
                  name="Instagram"
                  color="bg-pink-50 text-pink-600"
                />
                <PlatformBadge
                  icon={<FaLinkedin />}
                  name="LinkedIn"
                  color="bg-sky-50 text-sky-700"
                />
                <PlatformBadge
                  icon={<FaFacebook />}
                  name="Facebook"
                  color="bg-blue-50 text-blue-600"
                />
              </>
            }
          />

          {/* Card 3 — Reel / Short Video */}
          <ContentFormatCard
            icon={<FaVideo />}
            title="Reel / Short Video"
            description="Produce high-impact short-form videos that drive 67% more engagement. Ideal for tutorials, behind-the-scenes, product demos, and trends."
            gradient="from-amber-500 to-orange-500"
            dimensions="Duration: 15s · 30s · 60s · 90s formats"
            link="/studio/reel-video"
            platforms={
              <>
                <PlatformBadge
                  icon={<FaInstagram />}
                  name="Reels"
                  color="bg-pink-50 text-pink-600"
                />
                <PlatformBadge
                  icon={<FaYoutube />}
                  name="Shorts"
                  color="bg-red-50 text-red-600"
                />
                <PlatformBadge
                  icon={<FaTiktok />}
                  name="TikTok"
                  color="bg-gray-100 text-gray-800"
                />
                <PlatformBadge
                  icon={<FaFacebook />}
                  name="FB Reels"
                  color="bg-blue-50 text-blue-600"
                />
              </>
            }
          />
        </div>
      </div>

      {/* ──────────── 3. QUICK STATS ──────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <QuickStatCard
          label="Posts Created This Month"
          value="47"
          icon={<FileText size={24} />}
        />
        <QuickStatCard
          label="Avg. Engagement Rate"
          value="4.8%"
          icon={<TrendingUp size={24} />}
        />
        <QuickStatCard
          label="Content Published"
          value="156"
          icon={<BarChart3 size={24} />}
        />
        <QuickStatCard
          label="Team Members Active"
          value="12"
          icon={<Users size={24} />}
        />
      </div>

      {/* ──────────── 4. POWERED BY TOOLS ──────────── */}
      <GlassCard hover={false}>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white">
            <Sparkles size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Powered By Industry-Leading Tools
            </h2>
            <p className="text-sm text-gray-500">
              Recommended tools to supercharge your content workflow
            </p>
          </div>
        </div>

        {/* Design & Graphics */}
        <ToolSectionHeader title="Design & Graphics" />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
          <ToolCard
            emoji="🎨"
            name="Canva"
            description="Drag-and-drop design for social media graphics"
            color="bg-teal-100 text-teal-700"
            url="https://canva.com"
          />
          <ToolCard
            emoji="📐"
            name="Adobe Photoshop"
            description="Professional image editing & manipulation"
            color="bg-blue-100 text-blue-700"
            url="https://www.adobe.com/products/photoshop.html"
          />
          <ToolCard
            emoji="✏️"
            name="Adobe Illustrator"
            description="Vector graphics & brand illustrations"
            color="bg-orange-100 text-orange-700"
            url="https://www.adobe.com/products/illustrator.html"
          />
          <ToolCard
            emoji="🔷"
            name="Figma"
            description="Collaborative design & prototyping"
            color="bg-purple-100 text-purple-700"
            url="https://figma.com"
          />
        </div>

        {/* Video Production */}
        <ToolSectionHeader title="Video Production" />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
          <ToolCard
            emoji="🎬"
            name="CapCut"
            description="AI-powered video editing for short-form content"
            color="bg-gray-200 text-gray-800"
            url="https://capcut.com"
          />
          <ToolCard
            emoji="🎥"
            name="Adobe Premiere Pro"
            description="Professional video editing suite"
            color="bg-purple-100 text-purple-700"
            url="https://www.adobe.com/products/premiere.html"
          />
          <ToolCard
            emoji="⚡"
            name="Adobe After Effects"
            description="Motion graphics & visual effects"
            color="bg-blue-100 text-blue-700"
            url="https://www.adobe.com/products/aftereffects.html"
          />
          <ToolCard
            emoji="🎞️"
            name="DaVinci Resolve"
            description="Color grading & professional editing"
            color="bg-red-100 text-red-700"
            url="https://www.blackmagicdesign.com/products/davinciresolve"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 mt-3">
          <ToolCard
            emoji="📱"
            name="InShot"
            description="Quick mobile video editing"
            color="bg-pink-100 text-pink-700"
            url="https://inshot.com"
          />
        </div>

        {/* Animation & Motion */}
        <ToolSectionHeader title="Animation & Motion" />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
          <ToolCard
            emoji="🔄"
            name="Lottie"
            description="Lightweight animations for social posts"
            color="bg-green-100 text-green-700"
            url="https://lottiefiles.com"
          />
          <ToolCard
            emoji="🎭"
            name="Rive"
            description="Interactive motion design"
            color="bg-cyan-100 text-cyan-700"
            url="https://rive.app"
          />
        </div>

        {/* AI-Powered Tools */}
        <ToolSectionHeader title="AI-Powered Tools" />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
          <ToolCard
            emoji="🤖"
            name="ChatGPT"
            description="AI copywriting & caption generation"
            color="bg-green-100 text-green-700"
            url="https://chat.openai.com"
          />
          <ToolCard
            emoji="🖼️"
            name="Midjourney"
            description="AI image generation for creative concepts"
            color="bg-blue-100 text-blue-700"
            url="https://midjourney.com"
          />
          <ToolCard
            emoji="🚀"
            name="Runway ML"
            description="AI video generation & editing"
            color="bg-purple-100 text-purple-700"
            url="https://runwayml.com"
          />
          <ToolCard
            emoji="🎨"
            name="DALL·E"
            description="AI artwork & visual concept creation"
            color="bg-pink-100 text-pink-700"
            url="https://openai.com/dall-e"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 mt-3">
          <ToolCard
            emoji="🎙️"
            name="ElevenLabs"
            description="AI voiceover & narration"
            color="bg-orange-100 text-orange-700"
            url="https://elevenlabs.io"
          />
        </div>

        {/* Scheduling & Publishing */}
        <ToolSectionHeader title="Scheduling & Publishing" />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
          <ToolCard
            emoji="📅"
            name="Buffer"
            description="Multi-platform post scheduling"
            color="bg-blue-100 text-blue-700"
            url="https://buffer.com"
          />
          <ToolCard
            emoji="🦉"
            name="Hootsuite"
            description="Enterprise social media management"
            color="bg-green-100 text-green-700"
            url="https://hootsuite.com"
          />
          <ToolCard
            emoji="📱"
            name="Later"
            description="Visual content planning & scheduling"
            color="bg-orange-100 text-orange-700"
            url="https://later.com"
          />
          <ToolCard
            emoji="🌱"
            name="Sprout Social"
            description="Social listening & publishing"
            color="bg-green-100 text-green-700"
            url="https://sproutsocial.com"
          />
        </div>

        {/* Analytics & Insights */}
        <ToolSectionHeader title="Analytics & Insights" />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
          <ToolCard
            emoji="📊"
            name="Google Analytics"
            description="Website & campaign tracking"
            color="bg-yellow-100 text-yellow-700"
            url="https://analytics.google.com"
          />
          <ToolCard
            emoji="📘"
            name="Meta Business Suite"
            description="Facebook & Instagram insights"
            color="bg-blue-100 text-blue-700"
            url="https://business.facebook.com"
          />
          <ToolCard
            emoji="👁️"
            name="Brandwatch"
            description="Social listening & sentiment analysis"
            color="bg-teal-100 text-teal-700"
            url="https://brandwatch.com"
          />
        </div>
      </GlassCard>

      {/* ──────────── 5. PRO TIPS ──────────── */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Pro Tips</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
              <Target size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              🎯 Consistency is Key
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Post at least 4-5 times per week. Use our calendar to plan ahead
              and maintain a consistent brand voice.
            </p>
          </GlassCard>

          <GlassCard>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4">
              <BarChart3 size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              📊 Data-Driven Decisions
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Track performance of each content type. Our analytics show that
              carousels get 3.1x more engagement than static posts.
            </p>
          </GlassCard>

          <GlassCard>
            <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600 mb-4">
              <Rocket size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              🚀 Batch Create Content
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Save 10+ hours per week by batch creating content. Design all
              week's posts in one session using our templates.
            </p>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default CreativeStudio;
