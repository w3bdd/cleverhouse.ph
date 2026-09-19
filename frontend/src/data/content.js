import {
  ShieldCheck,
  Volume2,
  Sun,
  Cpu,
  DoorClosed,
  Zap,
} from "lucide-react";

export const CONTACT = {
  phoneDisplay: "+63 965 093 3555",
  phoneHref: "tel:+639650933555",
  email: "contact.us@chphil.com",
  emailHref: "mailto:contact.us@chphil.com",
  region: "Aurora & Region 3, Central Luzon",
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
      "High-definition smart cameras with remote phone monitoring and perimeter alerts — housed and sealed for coastal, typhoon-season conditions.",
    icon: ShieldCheck,
    image: IMAGES.cctv,
    tags: ["HD / 4K cameras", "Remote phone access", "Weatherproof housings"],
  },
  {
    id: "audio",
    num: "02",
    title: "Audio Systems",
    description:
      "Multi-room acoustic planning, ceiling-integrated speakers, and weatherproof outdoor audio for homes, cafés, and commercial spaces.",
    icon: Volume2,
    image: IMAGES.audio,
    tags: ["Multi-room zones", "Ceiling speakers", "Outdoor setups"],
  },
  {
    id: "solar",
    num: "03",
    title: "Solar Power Systems",
    description:
      "On-grid, off-grid, and hybrid solar installations sized to your actual load — built to cut heavy electric bills across Region 3.",
    icon: Sun,
    image: IMAGES.solar,
    tags: ["On-grid / off-grid / hybrid", "Load sizing", "Generation monitoring"],
  },
  {
    id: "smart-home",
    num: "04",
    title: "Smart Home Devices",
    description:
      "Centralized control for lighting scenes, climate, smart locks, and energy monitoring — configured around how your household actually lives.",
    icon: Cpu,
    image: IMAGES.smart,
    tags: ["Lighting scenes", "Smart locks", "Energy monitoring"],
  },
  {
    id: "gates",
    num: "05",
    title: "Automated Gates",
    description:
      "Custom steel and aluminum gate design and fabrication with heavy-duty motorization, keypad entry, and remote control.",
    icon: DoorClosed,
    image: IMAGES.house,
    tags: ["Custom fabrication", "Motorization", "Keypad & remote entry"],
  },
  {
    id: "wiring",
    num: "06",
    title: "Electrical Wiring",
    description:
      "Full-house rewiring, circuit breaker upgrades, load distribution, and surge protection — the foundation every smart system depends on.",
    icon: Zap,
    image: IMAGES.hero,
    tags: ["Full rewiring", "Breaker upgrades", "Surge protection"],
  },
];

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
    title: "One team, whole system",
    text: "Solar, wiring, security, and automation designed together — not patched together by four different contractors.",
  },
  {
    title: "Built for coastal Aurora",
    text: "Corrosion-resistant hardware, typhoon-aware mounting, and surge protection treated as standard, not upgrades.",
  },
  {
    title: "Straight answers",
    text: "Written scopes, itemized quotes, honest timelines. We are a startup — we earn trust the slow way, on purpose.",
  },
  {
    title: "Local & reachable",
    text: "Based in Aurora. The people who install your system are the same people who answer the phone.",
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
  { id: "g5", image: IMAGES.house, label: "Automated Gates", note: "Placeholder — project photo coming soon" },
  { id: "g6", image: IMAGES.hero, label: "Electrical Wiring", note: "Placeholder — project photo coming soon" },
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
