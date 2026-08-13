import {
  Zap,
  Wrench,
  Hammer,
  Paintbrush,
  Car,
  Snowflake,
  Sparkles,
  Home,
  ChefHat,
  GraduationCap,
  Camera,
  Video,
  Trees,
  CarFront,
  Scissors,
  Shirt,
  Flame,
  Building2,
  Laptop,
  Smartphone,
  MoreHorizontal,
  type LucideIcon,
} from "lucide-react";

export interface Category {
  slug: string;
  name: string;
  icon: LucideIcon;
  color: string;
  workers: number;
}

export const categories: Category[] = [
  { slug: "electrician", name: "Electrician", icon: Zap, color: "#f59e0b", workers: 128 },
  { slug: "plumber", name: "Plumber", icon: Wrench, color: "#0ea5e9", workers: 96 },
  { slug: "carpenter", name: "Carpenter", icon: Hammer, color: "#a16207", workers: 74 },
  { slug: "painter", name: "Painter", icon: Paintbrush, color: "#ec4899", workers: 82 },
  { slug: "mechanic", name: "Mechanic", icon: Car, color: "#334155", workers: 61 },
  { slug: "ac-technician", name: "AC Technician", icon: Snowflake, color: "#38bdf8", workers: 54 },
  { slug: "cleaner", name: "Cleaner", icon: Sparkles, color: "#22c55e", workers: 210 },
  { slug: "home-maid", name: "Home Maid", icon: Home, color: "#8b5cf6", workers: 143 },
  { slug: "cook", name: "Cook", icon: ChefHat, color: "#ef4444", workers: 39 },
  { slug: "tutor", name: "Tutor", icon: GraduationCap, color: "#2563eb", workers: 88 },
  { slug: "photographer", name: "Photographer", icon: Camera, color: "#0f172a", workers: 45 },
  { slug: "videographer", name: "Videographer", icon: Video, color: "#7c3aed", workers: 21 },
  { slug: "gardener", name: "Gardener", icon: Trees, color: "#16a34a", workers: 33 },
  { slug: "driver", name: "Driver", icon: CarFront, color: "#0891b2", workers: 71 },
  { slug: "beautician", name: "Beautician", icon: Scissors, color: "#f43f5e", workers: 66 },
  { slug: "tailor", name: "Tailor", icon: Shirt, color: "#db2777", workers: 29 },
  { slug: "welder", name: "Welder", icon: Flame, color: "#ea580c", workers: 24 },
  { slug: "mason", name: "Mason", icon: Building2, color: "#78350f", workers: 41 },
  { slug: "computer-repair", name: "Computer Repair", icon: Laptop, color: "#475569", workers: 37 },
  { slug: "mobile-repair", name: "Mobile Repair", icon: Smartphone, color: "#0d9488", workers: 52 },
  { slug: "others", name: "Others", icon: MoreHorizontal, color: "#6b7280", workers: 18 },
];

export interface Worker {
  id: string;
  name: string;
  profession: string;
  category: string;
  rating: number;
  reviewsCount: number;
  experience: number;
  price: number;
  location: string;
  languages: string[];
  skills: string[];
  about: string;
  available: boolean;
  completedJobs: number;
  verified: boolean;
  initials: string;
  color: string;
}

const firstNames = [
  "Arjun",
  "Priya",
  "Rahul",
  "Meera",
  "Vikram",
  "Ananya",
  "Rohan",
  "Divya",
  "Karan",
  "Sneha",
  "Aditya",
  "Kavya",
  "Rajesh",
  "Neha",
  "Suresh",
  "Pooja",
];
const lastNames = [
  "Sharma",
  "Patel",
  "Kumar",
  "Singh",
  "Reddy",
  "Gupta",
  "Iyer",
  "Nair",
  "Verma",
  "Joshi",
  "Mehta",
  "Rao",
];
const locations = [
  "Mumbai",
  "Bengaluru",
  "Delhi",
  "Pune",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Ahmedabad",
];
const languagesPool = [
  "English",
  "Hindi",
  "Marathi",
  "Tamil",
  "Telugu",
  "Kannada",
  "Bengali",
  "Gujarati",
];
const colors = [
  "#2563eb",
  "#7c3aed",
  "#0891b2",
  "#16a34a",
  "#ea580c",
  "#db2777",
  "#0f766e",
  "#9333ea",
];

function seeded(i: number) {
  return (i * 9301 + 49297) % 233280;
}
function pick<T>(arr: T[], i: number): T {
  return arr[seeded(i) % arr.length];
}

export const workers: Worker[] = categories.flatMap((cat, ci) =>
  Array.from({ length: 4 }, (_, wi) => {
    const idx = ci * 4 + wi + 1;
    const first = pick(firstNames, idx);
    const last = pick(lastNames, idx + 3);
    const skillsBase = [cat.name, "Repair", "Installation", "Maintenance", "Consultation"];
    return {
      id: `${cat.slug}-${wi + 1}`,
      name: `${first} ${last}`,
      profession: cat.name,
      category: cat.slug,
      rating: Math.round((4 + (seeded(idx) % 100) / 100) * 10) / 10,
      reviewsCount: 20 + (seeded(idx + 1) % 400),
      experience: 1 + (seeded(idx + 2) % 15),
      price: 200 + (seeded(idx + 3) % 20) * 50,
      location: pick(locations, idx + 5),
      languages: [pick(languagesPool, idx), pick(languagesPool, idx + 7)].filter(
        (v, i, a) => a.indexOf(v) === i,
      ),
      skills: skillsBase.slice(0, 3 + (seeded(idx) % 3)),
      about: `Experienced ${cat.name.toLowerCase()} with a passion for delivering quality service on time. Trusted by hundreds of customers across the city.`,
      available: seeded(idx) % 5 !== 0,
      completedJobs: 20 + (seeded(idx + 4) % 500),
      verified: seeded(idx) % 4 !== 0,
      initials: `${first[0]}${last[0]}`,
      color: pick(colors, idx),
    } satisfies Worker;
  }),
);

export function getWorker(id: string) {
  return workers.find((w) => w.id === id);
}

export interface Booking {
  id: string;
  workerId: string;
  workerName: string;
  customerName: string;
  category: string;
  date: string;
  time: string;
  address: string;
  description: string;
  status: "Pending" | "Accepted" | "In Progress" | "Completed" | "Cancelled";
  price: number;
}

export const mockBookings: Booking[] = [
  {
    id: "b1",
    workerId: "electrician-1",
    workerName: workers[0].name,
    customerName: "You",
    category: "Electrician",
    date: "2026-07-22",
    time: "10:00",
    address: "12 Palm Ave, Mumbai",
    description: "Fan installation in living room",
    status: "Accepted",
    price: 450,
  },
  {
    id: "b2",
    workerId: "plumber-1",
    workerName: workers[4].name,
    customerName: "You",
    category: "Plumber",
    date: "2026-07-19",
    time: "14:30",
    address: "12 Palm Ave, Mumbai",
    description: "Kitchen sink leak",
    status: "Completed",
    price: 600,
  },
  {
    id: "b3",
    workerId: "cleaner-1",
    workerName: workers[24].name,
    customerName: "You",
    category: "Cleaner",
    date: "2026-07-25",
    time: "09:00",
    address: "12 Palm Ave, Mumbai",
    description: "Deep cleaning 2BHK",
    status: "Pending",
    price: 1200,
  },
];

export const testimonials = [
  {
    name: "Aisha K.",
    role: "Homeowner",
    text: "Booked an electrician in 5 minutes. He arrived on time and fixed everything. SkillHire is a lifesaver!",
    initials: "AK",
  },
  {
    name: "Rohit S.",
    role: "Restaurant Owner",
    text: "We use SkillHire weekly for cleaning and repairs. The workers are verified and always professional.",
    initials: "RS",
  },
  {
    name: "Meera P.",
    role: "Working Mom",
    text: "The chat feature makes coordinating so easy. Best local services app I've used.",
    initials: "MP",
  },
];

export const stats = [
  { label: "Verified workers", value: "12,000+" },
  { label: "Jobs completed", value: "180K+" },
  { label: "Cities covered", value: "45" },
  { label: "Avg. rating", value: "4.8 ★" },
];
