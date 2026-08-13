import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Button } from "./use-auth-D1Km7QHf.mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as Sparkles } from "../_libs/lucide-react.mjs";
import { n as Navbar, t as Footer } from "./footer-9RcEM18P.mjs";
import { t as Card } from "./card-Cm76wao2.mjs";
import { t as Input } from "./input-2WgE2uAN.mjs";
import { t as Label } from "./label-DjH-8qU2.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { r as registerUser } from "./auth-dZ0GvIja.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-C6YIBw_c.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/register-ChjX4y0P.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function RegisterPage() {
	const [role, setRole] = (0, import_react.useState)("customer");
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		email: "",
		password: ""
	});
	const navigate = useNavigate();
	const submit = async (e) => {
		e.preventDefault();
		if (!form.name || !form.email || !form.password) {
			toast.error("Fill in all fields");
			return;
		}
		if (form.password.length < 6) {
			toast.error("Password must be at least 6 characters");
			return;
		}
		try {
			await registerUser(form.name, form.email, form.password, role);
			toast.success("Account created successfully!");
			navigate({ to: "/login" });
		} catch (error) {
			console.error(error);
			if (typeof error === "object" && error !== null && "response" in error) {
				const err = error;
				toast.error(err.response?.data?.message || "Registration failed");
			} else toast.error("Registration failed");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen flex-col bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "gradient-hero flex flex-1 items-center justify-center px-4 py-16",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "w-full max-w-md p-8 shadow-elevated",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-6 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid h-10 w-10 place-items-center rounded-xl gradient-primary text-primary-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-5 w-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-2xl font-bold",
								children: "Create your account"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "Join SkillHire in seconds"
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
							value: role,
							onValueChange: (v) => setRole(v),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
								className: "grid grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "customer",
									children: "I need help"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "worker",
									children: "I'm a worker"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
								value: role,
								className: "mt-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
									onSubmit: submit,
									className: "space-y-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "name",
											children: "Full name"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "name",
											value: form.name,
											onChange: (e) => setForm({
												...form,
												name: e.target.value
											}),
											placeholder: "Your name"
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "email",
											children: "Email"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "email",
											type: "email",
											value: form.email,
											onChange: (e) => setForm({
												...form,
												email: e.target.value
											}),
											placeholder: "you@example.com"
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "password",
											children: "Password"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "password",
											type: "password",
											value: form.password,
											onChange: (e) => setForm({
												...form,
												password: e.target.value
											}),
											placeholder: "At least 6 characters"
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											type: "submit",
											className: "w-full",
											size: "lg",
											children: "Create account"
										})
									]
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-6 text-center text-sm text-muted-foreground",
							children: [
								"Already have an account?",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/login",
									className: "font-semibold text-primary hover:underline",
									children: "Login"
								})
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
//#endregion
export { RegisterPage as component };
