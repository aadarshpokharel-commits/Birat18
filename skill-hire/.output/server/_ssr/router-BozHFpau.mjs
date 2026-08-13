import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { _ as useRouter, c as HeadContent, d as Outlet, f as lazyRouteComponent, h as Link, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as workers } from "./mock-data-BixlXd30.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as Route$15 } from "./search-BJb4MqF3.mjs";
import { t as Route$16 } from "./worker._id-dAhOeuRv.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BozHFpau.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-C3Qr6z8Z.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	window.__lovableReportRuntimeError?.({
		message,
		stack: error instanceof Error ? error.stack : void 0,
		filename: window.location.pathname
	});
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$14 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "SkillHire — Hire verified local skilled workers" },
			{
				name: "description",
				content: "SkillHire connects you with verified electricians, plumbers, cleaners, tutors, and other trusted local professionals. Book in minutes."
			},
			{
				property: "og:site_name",
				content: "SkillHire"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap"
			}
		],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "Organization",
				name: "SkillHire",
				url: "https://skill-hire.lovable.app",
				description: "Marketplace connecting customers with verified local skilled workers."
			})
		}, {
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "WebSite",
				name: "SkillHire",
				url: "https://skill-hire.lovable.app",
				potentialAction: {
					"@type": "SearchAction",
					target: "https://skill-hire.lovable.app/search?q={search_term_string}",
					"query-input": "required name=search_term_string"
				}
			})
		}]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$14.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
			richColors: true,
			position: "top-center"
		})]
	});
}
var $$splitComponentImporter$12 = () => import("./terms-ButdKDnL.mjs");
var url$5 = "https://skill-hire.lovable.app/terms";
var Route$13 = createFileRoute("/terms")({
	head: () => ({
		meta: [
			{ title: "Terms of Service — SkillHire" },
			{
				name: "description",
				content: "The terms that govern your use of SkillHire's marketplace of verified local skilled workers."
			},
			{
				property: "og:title",
				content: "Terms of Service — SkillHire"
			},
			{
				property: "og:description",
				content: "The terms that govern your use of SkillHire's marketplace."
			},
			{
				property: "og:url",
				content: url$5
			}
		],
		links: [{
			rel: "canonical",
			href: url$5
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var BASE_URL = "https://skill-hire.lovable.app";
var Route$12 = createFileRoute("/sitemap.xml")({ server: { handlers: { GET: async () => {
	const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[
		{
			path: "/",
			changefreq: "weekly",
			priority: "1.0"
		},
		{
			path: "/categories",
			changefreq: "weekly",
			priority: "0.9"
		},
		{
			path: "/search",
			changefreq: "weekly",
			priority: "0.8"
		},
		{
			path: "/services/plumbing",
			changefreq: "weekly",
			priority: "0.8"
		},
		{
			path: "/about",
			changefreq: "monthly",
			priority: "0.5"
		},
		{
			path: "/contact",
			changefreq: "monthly",
			priority: "0.5"
		},
		{
			path: "/privacy",
			changefreq: "monthly",
			priority: "0.2"
		},
		{
			path: "/terms",
			changefreq: "monthly",
			priority: "0.2"
		},
		...workers.map((w) => ({
			path: `/worker/${w.id}`,
			changefreq: "weekly",
			priority: "0.7"
		}))
	].map((e) => `  <url>\n    <loc>${BASE_URL}${e.path}</loc>\n` + (e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>\n` : "") + (e.priority ? `    <priority>${e.priority}</priority>\n` : "") + `  </url>`).join("\n")}\n</urlset>`;
	return new Response(xml, { headers: {
		"Content-Type": "application/xml",
		"Cache-Control": "public, max-age=3600"
	} });
} } } });
var $$splitComponentImporter$11 = () => import("./register-ChjX4y0P.mjs");
var Route$11 = createFileRoute("/register")({
	head: () => ({ meta: [
		{ title: "Create account — SkillHire" },
		{
			name: "description",
			content: "Create a SkillHire account as a customer or become a verified worker in seconds."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./privacy-CIewIlSp.mjs");
var url$4 = "https://skill-hire.lovable.app/privacy";
var Route$10 = createFileRoute("/privacy")({
	head: () => ({
		meta: [
			{ title: "Privacy Policy — SkillHire" },
			{
				name: "description",
				content: "How SkillHire collects, uses and protects your personal information."
			},
			{
				property: "og:title",
				content: "Privacy Policy — SkillHire"
			},
			{
				property: "og:description",
				content: "How SkillHire collects, uses and protects your personal information."
			},
			{
				property: "og:url",
				content: url$4
			}
		],
		links: [{
			rel: "canonical",
			href: url$4
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./messages-Dba0QVjB.mjs");
var Route$9 = createFileRoute("/messages")({
	head: () => ({ meta: [
		{ title: "Messages — SkillHire" },
		{
			name: "description",
			content: "Chat with SkillHire workers to coordinate your booking in real time."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./login-yt_8gTxY.mjs");
var Route$8 = createFileRoute("/login")({
	head: () => ({ meta: [
		{ title: "Login — SkillHire" },
		{
			name: "description",
			content: "Login to your SkillHire account as a customer, worker or admin."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./contact-CdLdoxDT.mjs");
var url$3 = "https://skill-hire.lovable.app/contact";
var title$3 = "Contact SkillHire — Support & feedback";
var desc$3 = "Get in touch with the SkillHire team. Questions, feedback or partnership enquiries — we reply within one business day.";
var Route$7 = createFileRoute("/contact")({
	head: () => ({
		meta: [
			{ title: title$3 },
			{
				name: "description",
				content: desc$3
			},
			{
				property: "og:title",
				content: title$3
			},
			{
				property: "og:description",
				content: desc$3
			},
			{
				property: "og:url",
				content: url$3
			}
		],
		links: [{
			rel: "canonical",
			href: url$3
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./categories-CxNKMw_Y.mjs");
var url$2 = "https://skill-hire.lovable.app/categories";
var title$2 = "All service categories — SkillHire";
var desc$2 = "Browse every skilled service category on SkillHire — electricians, plumbers, cleaners, tutors, mechanics and more. Find verified local pros in your area.";
var Route$6 = createFileRoute("/categories")({
	head: () => ({
		meta: [
			{ title: title$2 },
			{
				name: "description",
				content: desc$2
			},
			{
				property: "og:title",
				content: title$2
			},
			{
				property: "og:description",
				content: desc$2
			},
			{
				property: "og:url",
				content: url$2
			}
		],
		links: [{
			rel: "canonical",
			href: url$2
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./about-BK8QScvA.mjs");
var url$1 = "https://skill-hire.lovable.app/about";
var title$1 = "About SkillHire — Verified local skilled workers";
var desc$1 = "Learn how SkillHire connects households and businesses with background-verified electricians, plumbers, cleaners, tutors and more across 45+ cities.";
var Route$5 = createFileRoute("/about")({
	head: () => ({
		meta: [
			{ title: title$1 },
			{
				name: "description",
				content: desc$1
			},
			{
				property: "og:title",
				content: title$1
			},
			{
				property: "og:description",
				content: desc$1
			},
			{
				property: "og:url",
				content: url$1
			},
			{
				property: "og:type",
				content: "website"
			}
		],
		links: [{
			rel: "canonical",
			href: url$1
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./routes-z5FWcmSd.mjs");
var Route$4 = createFileRoute("/")({
	head: () => ({
		meta: [
			{ title: "SkillHire — Hire verified local skilled workers" },
			{
				name: "description",
				content: "Book background-verified electricians, plumbers, cleaners, tutors and more in minutes. Transparent pricing, in-app chat, service guarantee."
			},
			{
				property: "og:title",
				content: "SkillHire — Hire verified local skilled workers"
			},
			{
				property: "og:description",
				content: "Book background-verified electricians, plumbers, cleaners, tutors and more in minutes. Transparent pricing, in-app chat, service guarantee."
			},
			{
				property: "og:url",
				content: "https://skill-hire.lovable.app/"
			}
		],
		links: [{
			rel: "canonical",
			href: "https://skill-hire.lovable.app/"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./services.plumbing-FMW-mGLj.mjs");
var url = "https://skill-hire.lovable.app/services/plumbing";
var title = "Hire a verified plumber near you — SkillHire";
var desc = "Book a background-verified plumber near you in minutes. Emergency leaks, blocked drains, tap and geyser fitting — transparent pricing, service guarantee.";
var Route$3 = createFileRoute("/services/plumbing")({
	head: () => ({
		meta: [
			{ title },
			{
				name: "description",
				content: desc
			},
			{
				property: "og:title",
				content: title
			},
			{
				property: "og:description",
				content: desc
			},
			{
				property: "og:url",
				content: url
			},
			{
				property: "og:type",
				content: "website"
			}
		],
		links: [{
			rel: "canonical",
			href: url
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./dashboard.worker-BiNbTxpb.mjs");
var Route$2 = createFileRoute("/dashboard/worker")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./dashboard.customer-BC792gHc.mjs");
var Route$1 = createFileRoute("/dashboard/customer")({
	head: () => ({ meta: [{ title: "Customer Dashboard — SkillHire" }] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./dashboard.admin-DTxgLeDY.mjs");
var Route = createFileRoute("/dashboard/admin")({
	head: () => ({ meta: [
		{ title: "Admin Dashboard — SkillHire" },
		{
			name: "description",
			content: "SkillHire operator console — verification, users, workers and reports."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var TermsRoute = Route$13.update({
	id: "/terms",
	path: "/terms",
	getParentRoute: () => Route$14
});
var SitemapDotxmlRoute = Route$12.update({
	id: "/sitemap.xml",
	path: "/sitemap.xml",
	getParentRoute: () => Route$14
});
var SearchRoute = Route$15.update({
	id: "/search",
	path: "/search",
	getParentRoute: () => Route$14
});
var RegisterRoute = Route$11.update({
	id: "/register",
	path: "/register",
	getParentRoute: () => Route$14
});
var PrivacyRoute = Route$10.update({
	id: "/privacy",
	path: "/privacy",
	getParentRoute: () => Route$14
});
var MessagesRoute = Route$9.update({
	id: "/messages",
	path: "/messages",
	getParentRoute: () => Route$14
});
var LoginRoute = Route$8.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$14
});
var ContactRoute = Route$7.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$14
});
var CategoriesRoute = Route$6.update({
	id: "/categories",
	path: "/categories",
	getParentRoute: () => Route$14
});
var AboutRoute = Route$5.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$14
});
var IndexRoute = Route$4.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$14
});
var WorkerIdRoute = Route$16.update({
	id: "/worker/$id",
	path: "/worker/$id",
	getParentRoute: () => Route$14
});
var ServicesPlumbingRoute = Route$3.update({
	id: "/services/plumbing",
	path: "/services/plumbing",
	getParentRoute: () => Route$14
});
var DashboardWorkerRoute = Route$2.update({
	id: "/dashboard/worker",
	path: "/dashboard/worker",
	getParentRoute: () => Route$14
});
var DashboardCustomerRoute = Route$1.update({
	id: "/dashboard/customer",
	path: "/dashboard/customer",
	getParentRoute: () => Route$14
});
var rootRouteChildren = {
	IndexRoute,
	AboutRoute,
	CategoriesRoute,
	ContactRoute,
	LoginRoute,
	MessagesRoute,
	PrivacyRoute,
	RegisterRoute,
	SearchRoute,
	SitemapDotxmlRoute,
	TermsRoute,
	DashboardAdminRoute: Route.update({
		id: "/dashboard/admin",
		path: "/dashboard/admin",
		getParentRoute: () => Route$14
	}),
	DashboardCustomerRoute,
	DashboardWorkerRoute,
	ServicesPlumbingRoute,
	WorkerIdRoute
};
var routeTree = Route$14._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
