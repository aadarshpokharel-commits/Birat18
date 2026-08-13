import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { i as getUser, t as Button } from "./use-auth-D1Km7QHf.mjs";
import { D as LayoutDashboard, I as DollarSign, K as CalendarCheck, S as MessageSquare, c as ToggleLeft, l as Star } from "../_libs/lucide-react.mjs";
import { t as Card } from "./card-Cm76wao2.mjs";
import { t as Label } from "./label-DjH-8qU2.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as DashboardShell } from "./dashboard-shell-COSsbC9W.mjs";
import { t as Badge } from "./badge-DtdLsTq1.mjs";
import { i as updateBookingStatus, r as getWorkerBookings } from "./booking-CVT-s6cz.mjs";
import { n as getWorkerByUserId } from "./worker-CJ7ieySA.mjs";
import { t as Switch } from "./switch-Db4RmlUk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard.worker-BiNbTxpb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var items = [
	{
		to: "/dashboard/worker",
		label: "Overview",
		icon: LayoutDashboard
	},
	{
		to: "/messages",
		label: "Messages",
		icon: MessageSquare
	},
	{
		to: "/dashboard/worker",
		label: "Availability",
		icon: ToggleLeft
	}
];
function WorkerDashboard() {
	const [available, setAvailable] = (0, import_react.useState)(true);
	const [requests, setRequests] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		loadDashboard();
	}, []);
	async function loadDashboard() {
		try {
			const user = getUser();
			if (!user) return;
			const worker = await getWorkerByUserId(Number(user.id));
			setAvailable(worker.available);
			const bookings = await getWorkerBookings(worker.id);
			setRequests(bookings);
		} catch (err) {
			console.error(err);
			toast.error("Failed to load dashboard");
		} finally {
			setLoading(false);
		}
	}
	async function decide(bookingId, status) {
		try {
			await updateBookingStatus(bookingId, status);
			setRequests((prev) => prev.map((b) => b.id === bookingId ? {
				...b,
				status
			} : b));
			toast.success(status === "ACCEPTED" ? "Booking accepted" : "Booking declined");
		} catch {
			toast.error("Failed to update booking");
		}
	}
	const today = requests.filter((b) => b.status === "ACCEPTED" || b.status === "IN_PROGRESS");
	const pending = requests.filter((b) => b.status === "PENDING");
	const completed = requests.filter((b) => b.status === "COMPLETED");
	const earnings = completed.reduce((sum, b) => sum + b.price, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DashboardShell, {
		title: "Worker Dashboard",
		role: "worker",
		items,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Today",
						value: String(today.length),
						icon: CalendarCheck
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Pending",
						value: String(pending.length),
						icon: CalendarCheck
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Completed",
						value: String(completed.length),
						icon: Star
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Earnings",
						value: `₹${earnings}`,
						icon: DollarSign
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "mt-6 flex items-center justify-between p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "avail",
					className: "text-base font-semibold",
					children: "Available for bookings"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "Toggle off to stop receiving requests."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
					id: "avail",
					checked: available,
					onCheckedChange: setAvailable
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-6 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-bold",
					children: "Booking Requests"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 space-y-3",
					children: [
						loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							className: "p-4",
							children: "Loading..."
						}),
						!loading && pending.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							className: "p-4",
							children: "No pending requests."
						}),
						pending.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-semibold",
										children: b.category
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-xs text-muted-foreground",
										children: [
											b.date,
											" • ",
											b.time
										]
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, { children: ["₹", b.price] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm text-muted-foreground",
									children: b.description
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										onClick: () => decide(b.id, "ACCEPTED"),
										children: "Accept"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										variant: "outline",
										onClick: () => decide(b.id, "CANCELLED"),
										children: "Decline"
									})]
								})
							]
						}, b.id))
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-bold",
					children: "Today's Schedule"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 space-y-3",
					children: [today.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "p-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-semibold",
								children: b.category
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs text-muted-foreground",
								children: [
									b.time,
									" • ",
									b.address
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: b.status })]
						})
					}, b.id)), !loading && today.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "p-4",
						children: "Nothing scheduled today."
					})]
				})] })]
			})
		]
	});
}
function StatCard({ label, value, icon: Icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "flex items-center gap-4 p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid h-12 w-12 place-items-center rounded-xl bg-accent",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-2xl font-bold",
			children: value
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-xs uppercase tracking-wider text-muted-foreground",
			children: label
		})] })]
	});
}
//#endregion
export { WorkerDashboard as component };
