import { A as House, B as ChefHat, F as Ellipsis, H as Car, M as Hammer, N as GraduationCap, O as Laptop, P as Flame, U as CarFront, W as Camera, d as Snowflake, f as Smartphone, i as Video, m as Shirt, q as Building2, r as Wrench, s as Trees, t as Zap, u as Sparkles, x as Paintbrush, y as Scissors } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/mock-data-BixlXd30.js
var categories = [
	{
		slug: "electrician",
		name: "Electrician",
		icon: Zap,
		color: "#f59e0b",
		workers: 128
	},
	{
		slug: "plumber",
		name: "Plumber",
		icon: Wrench,
		color: "#0ea5e9",
		workers: 96
	},
	{
		slug: "carpenter",
		name: "Carpenter",
		icon: Hammer,
		color: "#a16207",
		workers: 74
	},
	{
		slug: "painter",
		name: "Painter",
		icon: Paintbrush,
		color: "#ec4899",
		workers: 82
	},
	{
		slug: "mechanic",
		name: "Mechanic",
		icon: Car,
		color: "#334155",
		workers: 61
	},
	{
		slug: "ac-technician",
		name: "AC Technician",
		icon: Snowflake,
		color: "#38bdf8",
		workers: 54
	},
	{
		slug: "cleaner",
		name: "Cleaner",
		icon: Sparkles,
		color: "#22c55e",
		workers: 210
	},
	{
		slug: "home-maid",
		name: "Home Maid",
		icon: House,
		color: "#8b5cf6",
		workers: 143
	},
	{
		slug: "cook",
		name: "Cook",
		icon: ChefHat,
		color: "#ef4444",
		workers: 39
	},
	{
		slug: "tutor",
		name: "Tutor",
		icon: GraduationCap,
		color: "#2563eb",
		workers: 88
	},
	{
		slug: "photographer",
		name: "Photographer",
		icon: Camera,
		color: "#0f172a",
		workers: 45
	},
	{
		slug: "videographer",
		name: "Videographer",
		icon: Video,
		color: "#7c3aed",
		workers: 21
	},
	{
		slug: "gardener",
		name: "Gardener",
		icon: Trees,
		color: "#16a34a",
		workers: 33
	},
	{
		slug: "driver",
		name: "Driver",
		icon: CarFront,
		color: "#0891b2",
		workers: 71
	},
	{
		slug: "beautician",
		name: "Beautician",
		icon: Scissors,
		color: "#f43f5e",
		workers: 66
	},
	{
		slug: "tailor",
		name: "Tailor",
		icon: Shirt,
		color: "#db2777",
		workers: 29
	},
	{
		slug: "welder",
		name: "Welder",
		icon: Flame,
		color: "#ea580c",
		workers: 24
	},
	{
		slug: "mason",
		name: "Mason",
		icon: Building2,
		color: "#78350f",
		workers: 41
	},
	{
		slug: "computer-repair",
		name: "Computer Repair",
		icon: Laptop,
		color: "#475569",
		workers: 37
	},
	{
		slug: "mobile-repair",
		name: "Mobile Repair",
		icon: Smartphone,
		color: "#0d9488",
		workers: 52
	},
	{
		slug: "others",
		name: "Others",
		icon: Ellipsis,
		color: "#6b7280",
		workers: 18
	}
];
var firstNames = [
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
	"Pooja"
];
var lastNames = [
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
	"Rao"
];
var locations = [
	"Mumbai",
	"Bengaluru",
	"Delhi",
	"Pune",
	"Hyderabad",
	"Chennai",
	"Kolkata",
	"Ahmedabad"
];
var languagesPool = [
	"English",
	"Hindi",
	"Marathi",
	"Tamil",
	"Telugu",
	"Kannada",
	"Bengali",
	"Gujarati"
];
var colors = [
	"#2563eb",
	"#7c3aed",
	"#0891b2",
	"#16a34a",
	"#ea580c",
	"#db2777",
	"#0f766e",
	"#9333ea"
];
function seeded(i) {
	return (i * 9301 + 49297) % 233280;
}
function pick(arr, i) {
	return arr[seeded(i) % arr.length];
}
var workers = categories.flatMap((cat, ci) => Array.from({ length: 4 }, (_, wi) => {
	const idx = ci * 4 + wi + 1;
	const first = pick(firstNames, idx);
	const last = pick(lastNames, idx + 3);
	const skillsBase = [
		cat.name,
		"Repair",
		"Installation",
		"Maintenance",
		"Consultation"
	];
	return {
		id: `${cat.slug}-${wi + 1}`,
		name: `${first} ${last}`,
		profession: cat.name,
		category: cat.slug,
		rating: Math.round((4 + seeded(idx) % 100 / 100) * 10) / 10,
		reviewsCount: 20 + seeded(idx + 1) % 400,
		experience: 1 + seeded(idx + 2) % 15,
		price: 200 + seeded(idx + 3) % 20 * 50,
		location: pick(locations, idx + 5),
		languages: [pick(languagesPool, idx), pick(languagesPool, idx + 7)].filter((v, i, a) => a.indexOf(v) === i),
		skills: skillsBase.slice(0, 3 + seeded(idx) % 3),
		about: `Experienced ${cat.name.toLowerCase()} with a passion for delivering quality service on time. Trusted by hundreds of customers across the city.`,
		available: seeded(idx) % 5 !== 0,
		completedJobs: 20 + seeded(idx + 4) % 500,
		verified: seeded(idx) % 4 !== 0,
		initials: `${first[0]}${last[0]}`,
		color: pick(colors, idx)
	};
}));
workers[0].name, workers[4].name, workers[24].name;
var testimonials = [
	{
		name: "Aisha K.",
		role: "Homeowner",
		text: "Booked an electrician in 5 minutes. He arrived on time and fixed everything. SkillHire is a lifesaver!",
		initials: "AK"
	},
	{
		name: "Rohit S.",
		role: "Restaurant Owner",
		text: "We use SkillHire weekly for cleaning and repairs. The workers are verified and always professional.",
		initials: "RS"
	},
	{
		name: "Meera P.",
		role: "Working Mom",
		text: "The chat feature makes coordinating so easy. Best local services app I've used.",
		initials: "MP"
	}
];
var stats = [
	{
		label: "Verified workers",
		value: "12,000+"
	},
	{
		label: "Jobs completed",
		value: "180K+"
	},
	{
		label: "Cities covered",
		value: "45"
	},
	{
		label: "Avg. rating",
		value: "4.8 ★"
	}
];
//#endregion
export { workers as i, stats as n, testimonials as r, categories as t };
