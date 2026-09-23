import {
  ShieldCheck,
  Volume2,
  Sun,
  Cpu,
  DoorClosed,
  Zap,
} from "lucide-react";
import automatedGatesImg from "../assets/automated-gates.jpg";
import electricalWiringImg from "../assets/electrical-wiring.jpg";

export const CONTACT = {
  phoneDisplay: "+63 991 724 2377",
  phoneHref: "tel:+639917242377",
  email: "contactus.cleverhouse@gmail.com",
  emailHref: "mailto:contactus.cleverhouse@gmail.com",
  address: "San Luis, Aurora 3201, Philippines",
  region: "Aurora & Region 3, Central Luzon",
  person: "Alexander Galvan",
};

export const IMAGES = {
  hero: "https://images.unsplash.com/photo-1748063578185-3d68121b11ff?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDV8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsdXh1cnklMjBob3VzZSUyMGV4dGVyaW9yJTIwZHVzayUyMGxpZ2h0aW5nfGVufDB8fHx8MTc4OTc4MDQ1N3ww&ixlib=rb-4.1.0&q=85",
  solar: "https://images.pexels.com/photos/9875418/pexels-photo-9875418.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  cctv: "https://images.pexels.com/photos/31970049/pexels-photo-31970049.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  smart: "https://images.pexels.com/photos/34241691/pexels-photo-34241691.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  house: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDV8MHwxfHNlYXJjaHwzfHxtb2Rlcm4lMjBsdXh1cnklMjBob3VzZSUyMGV4dGVyaW9yJTIwZHVzayUyMGxpZ2h0aW5nfGVufDB8fHx8MTc4OTc4MDQ1N3ww&ixlib=rb-4.1.0&q=85",
  audio: "https://images.unsplash.com/photo-1772475385327-ae6212f900aa?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MjJ8MHwxfHNlYXJjaHwyfHxzbWFydCUyMGhvbWUlMjBjb250cm9sJTIwaW50ZXJpb3IlMjBzb3VuZCUyMHN5c3RlbXxlbnwwfHx8fDE3ODk3ODA0NTd8MA&ixlib=rb-4.1.0&q=85",
};

export const SERVICES = [
  {
    id: "cctv",
    num: "01",
    title: "CCTV & Surveillance",
    description:
      "State-of-the-art CCTV systems tailored to your property's security needs — expert installation for maximum coverage, dependable recording, and round-the-clock peace of mind.",
    icon: ShieldCheck,
    image: IMAGES.cctv,
    tags: ["HD / 4K cameras", "Remote phone access", "Weatherproof housings"],
  },
  {
    id: "audio",
    num: "02",
    title: "Audio Systems",
    description:
      "Premium audio for homes and businesses — from home theaters to commercial sound setups, installed and tuned for optimal acoustic performance in every room.",
    icon: Volume2,
    image: IMAGES.audio,
    tags: ["Home theaters", "Commercial sound", "Multi-room zones"],
  },
  {
    id: "solar",
    num: "03",
    title: "Solar Power Systems",
    description:
      "Solar power systems designed around your actual energy needs — a practical path to lower electricity bills and sustainable, renewable power for your property.",
    icon: Sun,
    image: IMAGES.solar,
    tags: ["On-grid / off-grid / hybrid", "Load sizing", "Generation monitoring"],
  },
  {
    id: "smart-home",
    num: "04",
    title: "Smart Home Devices",
    description:
      "Smart lighting, thermostats, security cameras, and voice-controlled assistants — installed and configured so the latest technology fades naturally into daily life.",
    icon: Cpu,
    image: IMAGES.smart,
    tags: ["Smart lighting", "Voice assistants", "Climate & locks"],
  },
  {
    id: "gates",
    num: "05",
    title: "Automated Gates",
    description:
      "Custom automated gates designed and fabricated to match your property's aesthetic — convenience, security, and elegance in a single installation.",
    icon: DoorClosed,
    image: automatedGatesImg,
    tags: ["Custom fabrication", "Motorization", "Keypad & remote entry"],
  },
  {
    id: "wiring",
    num: "06",
    title: "Electrical Wiring",
    description:
      "Precision electrical wiring for new construction and renovation — safe, standards-conscious, and built to reliably carry everything else we install.",
    icon: Zap,
    image: electricalWiringImg,
    tags: ["New builds & renovation", "Breaker upgrades", "Surge protection"],
  },
];

export const SERVICE_DETAILS = {
  cctv: {
    tagline: "See everything. From anywhere.",
    overview: [
      "We design CCTV systems around your property — camera positions, sightlines, recording, and remote access are all planned before a single hole is drilled. No generic packages, no blind spots.",
      "Every camera is sealed in weatherproof, corrosion-resistant housings and mounted for coastal, typhoon-season conditions. Once installed, we configure remote viewing on your phone and walk you through playback and alerts before we leave.",
    ],
    features: [
      "Site survey & camera placement plan",
      "HD / 4K cameras with night vision",
      "Weatherproof, corrosion-resistant housings",
      "Remote viewing on your phone",
      "Local recording with easy playback",
      "Motion & perimeter alerts",
    ],
  },
  audio: {
    tagline: "Sound that fills the space — beautifully.",
    overview: [
      "Great audio is planned, not just plugged in. We map speaker placement, zones, and acoustics to the room — whether it's a home theater, a whole-house system, or background music for your café or shop.",
      "Installations are clean: concealed cabling, flush-mounted speakers where possible, and a system tuned to the space so it sounds right from day one.",
    ],
    features: [
      "Home theater design & installation",
      "Multi-room / multi-zone audio",
      "Ceiling & in-wall speakers",
      "Weatherproof outdoor audio",
      "Commercial background music & paging",
      "System calibration & tuning",
    ],
  },
  solar: {
    tagline: "Your roof, working for you.",
    overview: [
      "We start with your actual consumption — not a guess. Your system is sized from your real load profile, then designed on-grid, off-grid, or hybrid depending on how you use power and how reliable the local supply is.",
      "Mounting is engineered for typhoon season, generation monitoring goes on your phone, and we guide you through the paperwork, including net metering where it applies.",
    ],
    features: [
      "Load assessment & system sizing",
      "On-grid, off-grid & hybrid designs",
      "Typhoon-rated roof mounting",
      "Inverter & battery configuration",
      "Generation monitoring on your phone",
      "Net metering guidance",
    ],
  },
  "smart-home": {
    tagline: "One home. One tap.",
    overview: [
      "Smart lighting, locks, climate, cameras, and voice assistants — installed and configured as one system, not five apps that don't talk to each other.",
      "We set everything up around how your household actually lives: scenes for mornings and evenings, automations that make sense, and a walkthrough so everyone at home can use it.",
    ],
    features: [
      "Smart lighting scenes",
      "Smart locks & door sensors",
      "Climate & thermostat control",
      "Voice assistant setup",
      "Energy monitoring",
      "Unified app configuration",
    ],
  },
  gates: {
    tagline: "Arrive. Tap. Drive in.",
    overview: [
      "We design and fabricate custom steel and aluminum gates in-house, then motorize them to match — swing gates for driveway entrances, sliding gates where space is tight, and sectional garage doors for everyday convenience.",
      "Every installation includes keypad, remote, and app entry options, plus safety sensors and a manual override so a power outage never locks you in or out.",
    ],
    features: [
      "Swing gate automation",
      "Sliding gate automation",
      "Sectional garage door automation",
      "Custom steel & aluminum fabrication",
      "Keypad, remote & app entry",
      "Safety sensors & manual override",
    ],
  },
  wiring: {
    tagline: "The foundation everything else depends on.",
    overview: [
      "Every smart system, solar array, and automated gate is only as good as the wiring beneath it. We handle electrical work for new construction and renovation — neatly, safely, and to standard.",
      "From breaker panel upgrades and surge protection to complete rewiring and load distribution planning, everything is tested and documented before handover.",
    ],
    features: [
      "New construction wiring",
      "Renovation & full rewiring",
      "Breaker panel upgrades",
      "Whole-property surge protection",
      "Lighting & outlet installation",
      "Load distribution planning",
    ],
  },
};

export const CHAPTERS = [
  {
    chapter: "01",
    title: "The Aurora Standard",
    summary: "Coastal conditions and typhoon seasons demand higher engineering thresholds.",
    content:
      "We build electrical and security infrastructure for the heat, humidity, and salt air of Aurora province and Central Luzon. No flimsy consumer parts — corrosion-resistant housings, proper surge protection, and mounting that respects typhoon season.",
  },
  {
    chapter: "02",
    title: "Honest by Design",
    summary: "No invented badges, no overstated history. Real work, clearly scoped.",
    content:
      "We are a young company and we say so. What we offer instead of decades of borrowed history: certified local technicians, written scopes of work, honest timelines, and prompt post-installation support from the same people who did the install.",
  },
  {
    chapter: "03",
    title: "One System, Not Six",
    summary: "Power, protection, and intelligence working in total alignment.",
    content:
      "A smart home on bad wiring is fragile. Solar without load monitoring is guesswork. Cleverhouse designs solar, wiring, security, gates, and automation as one cohesive system — so every part makes the others work better.",
  },
];

export const PROCESS = [
  {
    step: "01",
    title: "Site Survey",
    text: "We visit your property in Aurora or Region 3, assess the structure, load, and layout, and listen to what you actually need.",
  },
  {
    step: "02",
    title: "Design & Written Quote",
    text: "You get a clear scope of work and itemized quotation in writing — no vague packages, no surprise add-ons.",
  },
  {
    step: "03",
    title: "Installation & Testing",
    text: "Our technicians install, terminate, and test every circuit, camera, and device before we call the job done.",
  },
  {
    step: "04",
    title: "Walkthrough & Support",
    text: "We hand over a working system, show you how to run it, and stay reachable for adjustments and support.",
  },
];

export const WHY_US = [
  {
    title: "Skilled, current expertise",
    text: "Our technicians and installers stay versed in the latest technologies and installation practices — and it shows in the finish of every job.",
  },
  {
    title: "Custom solutions, not packages",
    text: "No two spaces are alike. Every system we design is tailored to your layout, your load, and how you actually live or work.",
  },
  {
    title: "Quality you can verify",
    text: "We source high-quality products and materials chosen for durability and performance — the things we're happy to put in writing.",
  },
  {
    title: "Customer-centric, start to finish",
    text: "We answer the phone after the install too. Service doesn't end when the tools are packed — we aim to exceed expectations, every time.",
  },
];

export const MUNICIPALITIES = [
  "Baler",
  "Dingalan",
  "San Luis",
  "Maria Aurora",
  "Casiguran",
  "Dilasag",
  "Dinalungan",
  "Dipaculao",
];

export const MARQUEE_ITEMS = [
  "Smart Living",
  "Security",
  "Solar Energy",
  "Automation",
  "Electrical",
  "Aurora",
  "Region 3",
];

export const GALLERY = [
  { id: "g1", image: IMAGES.cctv, label: "CCTV & Surveillance", note: "Placeholder — project photo coming soon" },
  { id: "g2", image: IMAGES.solar, label: "Solar Power Systems", note: "Placeholder — project photo coming soon" },
  { id: "g3", image: IMAGES.smart, label: "Smart Home Automation", note: "Placeholder — project photo coming soon" },
  { id: "g4", image: IMAGES.audio, label: "Audio Systems", note: "Placeholder — project photo coming soon" },
  { id: "g5", image: automatedGatesImg, label: "Automated Gates", note: "Service illustration — project photos coming soon" },
  { id: "g6", image: electricalWiringImg, label: "Electrical Wiring", note: "Service illustration — project photos coming soon" },
];

export const SERVICE_OPTIONS = [
  "CCTV & Surveillance",
  "Audio Systems",
  "Solar Power Systems",
  "Smart Home Devices",
  "Automated Gates",
  "Electrical Wiring",
  "Multiple / Not sure yet",
];
