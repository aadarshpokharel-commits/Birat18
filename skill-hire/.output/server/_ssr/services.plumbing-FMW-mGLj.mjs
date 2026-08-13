import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Button } from "./use-auth-D1Km7QHf.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { J as BadgeCheck, L as Clock, Y as ArrowRight, h as Shield, r as Wrench } from "../_libs/lucide-react.mjs";
import { n as Navbar, t as Footer } from "./footer-9RcEM18P.mjs";
import { t as Card } from "./card-Cm76wao2.mjs";
import { t as WorkerCard } from "./worker-card-Lhj4cowl.mjs";
import { r as getWorkers } from "./worker-CJ7ieySA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/services.plumbing-FMW-mGLj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PlumbingPage() {
	const [plumbers, setPlumbers] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		loadWorkers();
	}, []);
	async function loadWorkers() {
		try {
			const workers = await getWorkers();
			setPlumbers(workers.filter((w) => w.category.toLowerCase() === "plumber").slice(0, 8));
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen flex-col bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "gradient-hero",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col justify-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex w-fit items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs font-medium shadow-soft",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { className: "h-3.5 w-3.5 text-primary" }), "Plumbing services"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "mt-5 font-display text-4xl font-bold leading-tight sm:text-5xl",
								children: [
									"Hire a ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-gradient",
										children: "verified plumber"
									}),
									" near you."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 max-w-lg text-lg text-muted-foreground",
								children: "Leaky taps, blocked drains, geyser installation or a full bathroom refit — SkillHire's background-checked plumbers arrive on time with upfront pricing."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 flex flex-wrap gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									size: "lg",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/search",
										search: { category: "plumber" },
										children: ["Find a plumber", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-1 h-4 w-4" })]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									size: "lg",
									variant: "outline",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/categories",
										children: "Browse other services"
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "h-4 w-4 text-primary" }), "ID-verified plumbers"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-4 w-4 text-primary" }), "Service guarantee"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4 text-primary" }), "Same-day availability"]
									})
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [
							{
								title: "Emergency leaks",
								desc: "Burst pipes and overflowing tanks fixed fast, any time of day."
							},
							{
								title: "Blocked drains",
								desc: "Kitchen sinks, bathroom drains and sewer lines cleared."
							},
							{
								title: "Tap & faucet fitting",
								desc: "New taps, mixers and showers installed cleanly."
							},
							{
								title: "Geyser & water heater",
								desc: "Installation, repair and annual servicing."
							}
						].map((service) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "p-5 shadow-soft",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-semibold",
								children: service.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: service.desc
							})]
						}, service.title))
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl font-bold",
						children: "Top-rated plumbers on SkillHire"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-xl text-muted-foreground",
						children: "Each pro is background-verified with real customer reviews."
					}),
					loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 text-center",
						children: "Loading plumbers..."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4",
						children: plumbers.map((worker) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkerCard, { worker }, worker.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "lg",
							variant: "outline",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/search",
								search: { category: "plumber" },
								children: "See all plumbers"
							})
						})
					})
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
//#endregion
export { PlumbingPage as component };
