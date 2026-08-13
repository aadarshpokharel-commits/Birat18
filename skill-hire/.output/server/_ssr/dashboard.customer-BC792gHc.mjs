import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { i as getUser, t as Button } from "./use-auth-D1Km7QHf.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as LayoutDashboard, K as CalendarCheck, S as MessageSquare, j as Heart, o as User } from "../_libs/lucide-react.mjs";
import { t as Card } from "./card-Cm76wao2.mjs";
import { t as DashboardShell } from "./dashboard-shell-COSsbC9W.mjs";
import { t as Badge } from "./badge-DtdLsTq1.mjs";
import { t as WorkerCard } from "./worker-card-Lhj4cowl.mjs";
import { n as getCustomerBookings } from "./booking-CVT-s6cz.mjs";
import { r as getWorkers } from "./worker-CJ7ieySA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard.customer-BC792gHc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var items = [
	{
		to: "/dashboard/customer",
		label: "Overview",
		icon: LayoutDashboard
	},
	{
		to: "/search",
		label: "Find workers",
		icon: User
	},
	{
		to: "/messages",
		label: "Messages",
		icon: MessageSquare
	}
];
var badgeColor = {
	PENDING: "bg-yellow-100 text-yellow-700",
	ACCEPTED: "bg-blue-100 text-blue-700",
	IN_PROGRESS: "bg-purple-100 text-purple-700",
	COMPLETED: "bg-green-100 text-green-700",
	CANCELLED: "bg-red-100 text-red-700"
};
function CustomerDashboard() {
	const [bookings, setBookings] = (0, import_react.useState)([]);
	const [workers, setWorkers] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		loadDashboard();
	}, []);
	async function loadDashboard() {
		try {
			const user = getUser();
			if (!user) return;
			const bookingData = await getCustomerBookings(Number(user.id));
			const workerData = await getWorkers();
			setBookings(bookingData);
			setWorkers(workerData);
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	}
	const upcoming = bookings.filter((b) => b.status !== "COMPLETED" && b.status !== "CANCELLED");
	const history = bookings.filter((b) => b.status === "COMPLETED" || b.status === "CANCELLED");
	const favouriteWorkers = workers.slice(0, 3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DashboardShell, {
		title: "Your Dashboard",
		role: "customer",
		items,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 sm:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Upcoming",
					value: upcoming.length,
					icon: CalendarCheck
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Completed",
					value: history.length,
					icon: CalendarCheck
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Workers",
					value: workers.length,
					icon: Heart
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 grid gap-6 lg:grid-cols-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:col-span-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, { title: "Upcoming Bookings" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 space-y-4",
						children: [
							loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
								className: "p-5",
								children: "Loading..."
							}),
							!loading && upcoming.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyBookings, {}),
							upcoming.map((booking) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								className: "flex flex-wrap items-center gap-4 p-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid h-12 w-12 place-items-center rounded-xl gradient-primary text-white",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarCheck, { className: "h-5 w-5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "font-semibold",
												children: [
													booking.category,
													" — ",
													booking.workerName
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-xs text-muted-foreground",
												children: [
													booking.date,
													" · ",
													booking.time
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-xs text-muted-foreground",
												children: booking.address
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										className: badgeColor[booking.status],
										children: booking.status
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "font-semibold",
										children: ["₹", booking.price]
									})
								]
							}, booking.id))
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, { title: "Booking History" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 space-y-4",
							children: history.map((booking) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								className: "flex items-center justify-between p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "font-semibold",
									children: [
										booking.category,
										" — ",
										booking.workerName
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-muted-foreground",
									children: booking.date
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									className: badgeColor[booking.status],
									children: booking.status
								})]
							}, booking.id))
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, { title: "Available Workers" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 space-y-4",
				children: favouriteWorkers.map((worker) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkerCard, { worker }, worker.id))
			})] })]
		})]
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
function SectionHead({ title }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
		className: "text-lg font-bold",
		children: title
	});
}
function EmptyBookings() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "p-8 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground",
			children: "No bookings yet."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			className: "mt-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/search",
				children: "Find a Worker"
			})
		})]
	});
}
//#endregion
export { CustomerDashboard as component };
