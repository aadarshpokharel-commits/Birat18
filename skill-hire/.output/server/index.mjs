globalThis.__nitro_main__ = import.meta.url;
import { a as FastResponse, n as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4f95-3RXc3p2mhEAs1WBwaIvE0Y0uu0Y\"",
		"mtime": "2026-07-17T10:27:09.429Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/assets/badge-check-rosQePdd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"134-Ne0S07//IpiwKLVsdMMxRxJPrko\"",
		"mtime": "2026-07-25T08:12:07.239Z",
		"size": 308,
		"path": "../public/assets/badge-check-rosQePdd.js"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a3-72Y+0vEw1jobUcDzox3qOV0+Io4\"",
		"mtime": "2026-07-17T10:27:09.429Z",
		"size": 163,
		"path": "../public/robots.txt"
	},
	"/assets/about-BS3z8Upa.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6e5-1Y2e6lA0QindwvXUmUMbEKrmiq4\"",
		"mtime": "2026-07-25T08:12:07.238Z",
		"size": 1765,
		"path": "../public/assets/about-BS3z8Upa.js"
	},
	"/llms.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"314-1j/vn0JX9UKk9jbKDAsZAxc7mc4\"",
		"mtime": "2026-07-17T10:27:09.429Z",
		"size": 788,
		"path": "../public/llms.txt"
	},
	"/assets/auth-BusrTA-X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"af9d-paMfV17IhA866VSDv5HvTL8FaQA\"",
		"mtime": "2026-07-25T08:12:07.238Z",
		"size": 44957,
		"path": "../public/assets/auth-BusrTA-X.js"
	},
	"/assets/badge-DVIu3bHj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"305-xnlRQwD29iwubKiKrflrCtumk6k\"",
		"mtime": "2026-07-25T08:12:07.239Z",
		"size": 773,
		"path": "../public/assets/badge-DVIu3bHj.js"
	},
	"/assets/booking-BuvNlOy7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"120-Bg+tztyoL36vTU+LiO09mL8M/CE\"",
		"mtime": "2026-07-25T08:12:07.240Z",
		"size": 288,
		"path": "../public/assets/booking-BuvNlOy7.js"
	},
	"/assets/categories-BmZsDIhm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"529-vzT3CI9HF+vBxilWRy90yX6rn58\"",
		"mtime": "2026-07-25T08:12:07.240Z",
		"size": 1321,
		"path": "../public/assets/categories-BmZsDIhm.js"
	},
	"/assets/card-B3BKP6oT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"403-vcE3jxy4HtkQ35ppTKc8/OkCkmI\"",
		"mtime": "2026-07-25T08:12:07.240Z",
		"size": 1027,
		"path": "../public/assets/card-B3BKP6oT.js"
	},
	"/assets/calendar-check-BkwvjpTQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"129-p7OxQrrfjDFSzbFbUyLggIqbgJA\"",
		"mtime": "2026-07-25T08:12:07.240Z",
		"size": 297,
		"path": "../public/assets/calendar-check-BkwvjpTQ.js"
	},
	"/assets/clock-B31ptKt-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a1-USyS/cS39MGrWH2SvOE10RSMuUI\"",
		"mtime": "2026-07-25T08:12:07.241Z",
		"size": 161,
		"path": "../public/assets/clock-B31ptKt-.js"
	},
	"/assets/dashboard.customer-CD7tRqs2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10e4-DG4pmKOMBYmhmZqCH4bhtU8lED8\"",
		"mtime": "2026-07-25T08:12:07.242Z",
		"size": 4324,
		"path": "../public/assets/dashboard.customer-CD7tRqs2.js"
	},
	"/assets/dashboard.admin-eszkdEM_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"182e-kOvHazdAAEmFTJMtX/WAG9WGGYk\"",
		"mtime": "2026-07-25T08:12:07.242Z",
		"size": 6190,
		"path": "../public/assets/dashboard.admin-eszkdEM_.js"
	},
	"/assets/dist-B0AxWB6p.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a70-sFnt6sBrHqQ/JuQUwcsLUtpuMw4\"",
		"mtime": "2026-07-25T08:12:07.243Z",
		"size": 2672,
		"path": "../public/assets/dist-B0AxWB6p.js"
	},
	"/assets/dashboard.worker-Bts-mdsS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11e0-Is0npjiZuqatfaYe7nPfZV0Cemo\"",
		"mtime": "2026-07-25T08:12:07.242Z",
		"size": 4576,
		"path": "../public/assets/dashboard.worker-Bts-mdsS.js"
	},
	"/assets/dashboard-shell-0NGX1L_Z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a90-eUKIcch92jVeDlMCL/dgH8YATfA\"",
		"mtime": "2026-07-25T08:12:07.242Z",
		"size": 2704,
		"path": "../public/assets/dashboard-shell-0NGX1L_Z.js"
	},
	"/assets/dist-B-SD9hRm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7f15-IeRMAuTPFtO51ZneLbwNSKwJx7s\"",
		"mtime": "2026-07-25T08:12:07.243Z",
		"size": 32533,
		"path": "../public/assets/dist-B-SD9hRm.js"
	},
	"/assets/dist-BXIwILRR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"53c-CHoSf9FQbWPOmgTrmzoHzYDl13I\"",
		"mtime": "2026-07-25T08:12:07.244Z",
		"size": 1340,
		"path": "../public/assets/dist-BXIwILRR.js"
	},
	"/assets/input-Ded--Opt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"269-ogxa6zw3pJr4HNXnN3YnKtQmgyM\"",
		"mtime": "2026-07-25T08:12:07.244Z",
		"size": 617,
		"path": "../public/assets/input-Ded--Opt.js"
	},
	"/assets/hero-DNtaLySj.jpg": {
		"type": "image/jpeg",
		"etag": "\"1b9c5-1/D0jFEnY8ILBF6Px+N42wbsX+4\"",
		"mtime": "2026-07-25T08:12:07.256Z",
		"size": 113093,
		"path": "../public/assets/hero-DNtaLySj.jpg"
	},
	"/assets/label-B5kji_oB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"26d-lQu0QkdcfBKzmmqv0NXHdqZRm0Q\"",
		"mtime": "2026-07-25T08:12:07.244Z",
		"size": 621,
		"path": "../public/assets/label-B5kji_oB.js"
	},
	"/assets/contact-D3NdoZal.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"97b-dfhScr0sRpKv7CpAjbsUbgS4l70\"",
		"mtime": "2026-07-25T08:12:07.241Z",
		"size": 2427,
		"path": "../public/assets/contact-D3NdoZal.js"
	},
	"/assets/index-BkdzUw9X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4c7cc-sfudYPV1grWUDKqqOmdrE+32uQU\"",
		"mtime": "2026-07-25T08:12:07.237Z",
		"size": 313292,
		"path": "../public/assets/index-BkdzUw9X.js"
	},
	"/assets/footer-8fH8K9UU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8942-yjTEIZj+BSixOZQkjJbahUuY0DU\"",
		"mtime": "2026-07-25T08:12:07.244Z",
		"size": 35138,
		"path": "../public/assets/footer-8fH8K9UU.js"
	},
	"/assets/link-Dx7jvYPA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8a5e-7+3gCrXVlkDRRb63dyWxAi+Dwfk\"",
		"mtime": "2026-07-25T08:12:07.245Z",
		"size": 35422,
		"path": "../public/assets/link-Dx7jvYPA.js"
	},
	"/assets/message-square-nRuugHF2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e1-7jnW08MoeqVP0rNzBOmNKege27w\"",
		"mtime": "2026-07-25T08:12:07.246Z",
		"size": 225,
		"path": "../public/assets/message-square-nRuugHF2.js"
	},
	"/assets/login-DND5DjaC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a7c-WnuOVf3uMVt0bsMD24fvR4Gv4Tc\"",
		"mtime": "2026-07-25T08:12:07.245Z",
		"size": 2684,
		"path": "../public/assets/login-DND5DjaC.js"
	},
	"/assets/mock-data-Bw1kRwZ2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"21f2-XcjvKtcD/ALkB801ml07m8IKEUs\"",
		"mtime": "2026-07-25T08:12:07.247Z",
		"size": 8690,
		"path": "../public/assets/mock-data-Bw1kRwZ2.js"
	},
	"/assets/map-pin-BjDz4yvz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fb-zN4giLvDYj+Xq0hxD6R1g6mhjWA\"",
		"mtime": "2026-07-25T08:12:07.246Z",
		"size": 251,
		"path": "../public/assets/map-pin-BjDz4yvz.js"
	},
	"/assets/messages-DpZwWPaV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ca5-LEmDrvWGKqeL/iXHhCnz4eTvCHw\"",
		"mtime": "2026-07-25T08:12:07.246Z",
		"size": 3237,
		"path": "../public/assets/messages-DpZwWPaV.js"
	},
	"/assets/preload-helper-B6SBWbk9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17d9-5/bb89gsFuH8ahhMT1jMwqGbbtc\"",
		"mtime": "2026-07-25T08:12:07.247Z",
		"size": 6105,
		"path": "../public/assets/preload-helper-B6SBWbk9.js"
	},
	"/assets/privacy-DDHyjMkh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"271-YG9QyrY0aUV1Fsj12VYe4RzlZ2Y\"",
		"mtime": "2026-07-25T08:12:07.247Z",
		"size": 625,
		"path": "../public/assets/privacy-DDHyjMkh.js"
	},
	"/assets/routes-FtDkJlet.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"22d4-aB5+/AalrmeeUyQ/ll0pQcg9FBw\"",
		"mtime": "2026-07-25T08:12:07.248Z",
		"size": 8916,
		"path": "../public/assets/routes-FtDkJlet.js"
	},
	"/assets/register-CBVY3iDr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bdb-LDLuaiNVX54bHx/NVpXUBmQz8Uo\"",
		"mtime": "2026-07-25T08:12:07.248Z",
		"size": 3035,
		"path": "../public/assets/register-CBVY3iDr.js"
	},
	"/assets/search-BVDTn4B1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"df9c-P8t+E3xLamn9yexKRkhEVn5gLYw\"",
		"mtime": "2026-07-25T08:12:07.249Z",
		"size": 57244,
		"path": "../public/assets/search-BVDTn4B1.js"
	},
	"/assets/search-BI4ecpE8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f687-NsRA4ClDvQavoaYmeicd200SS+M\"",
		"mtime": "2026-07-25T08:12:07.249Z",
		"size": 63111,
		"path": "../public/assets/search-BI4ecpE8.js"
	},
	"/assets/shield-NW3-LF3e.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"178-2Xq7cRD7nUrx7UK/wI+nu4AxdKE\"",
		"mtime": "2026-07-25T08:12:07.250Z",
		"size": 376,
		"path": "../public/assets/shield-NW3-LF3e.js"
	},
	"/assets/services.plumbing-DI2BK6Q3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fe0-Az1Gjb+oqnRAlt3OT4QYNjUhDf8\"",
		"mtime": "2026-07-25T08:12:07.249Z",
		"size": 4064,
		"path": "../public/assets/services.plumbing-DI2BK6Q3.js"
	},
	"/assets/star-_lrhOoOq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d0-p/6JzrKMjSkmsq2MhEsqMoVb/gc\"",
		"mtime": "2026-07-25T08:12:07.251Z",
		"size": 464,
		"path": "../public/assets/star-_lrhOoOq.js"
	},
	"/assets/styles-C3Qr6z8Z.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"146e7-gjaLUiTtOsQycAOdbBcDoEnjlLI\"",
		"mtime": "2026-07-25T08:12:07.256Z",
		"size": 83687,
		"path": "../public/assets/styles-C3Qr6z8Z.css"
	},
	"/assets/switch-OW9Grmac.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1137-Qqnshi5cdu5fZiBaGgSzO39ajoc\"",
		"mtime": "2026-07-25T08:12:07.251Z",
		"size": 4407,
		"path": "../public/assets/switch-OW9Grmac.js"
	},
	"/assets/tabs-XD0HH4Ui.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b71-/dHd0jGhIed3vIrGSukB11oXb9Q\"",
		"mtime": "2026-07-25T08:12:07.251Z",
		"size": 7025,
		"path": "../public/assets/tabs-XD0HH4Ui.js"
	},
	"/assets/use-auth-Dic-qUea.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"83fa-fBxYQ8MCuS/eKRnRlblIya3UDzU\"",
		"mtime": "2026-07-25T08:12:07.253Z",
		"size": 33786,
		"path": "../public/assets/use-auth-Dic-qUea.js"
	},
	"/assets/worker-card-BaCidllt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8fe-794iL4uGmaFKnRvuuAW4T1Icy3E\"",
		"mtime": "2026-07-25T08:12:07.254Z",
		"size": 2302,
		"path": "../public/assets/worker-card-BaCidllt.js"
	},
	"/assets/textarea-Bhct4dSv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"203-Ynl7jbSV6pNiT7mKlHFqky/g/Yw\"",
		"mtime": "2026-07-25T08:12:07.252Z",
		"size": 515,
		"path": "../public/assets/textarea-Bhct4dSv.js"
	},
	"/assets/terms-Cslg-WXX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"22d-f411ZOLAORpyjVGWYiESDfdy5iI\"",
		"mtime": "2026-07-25T08:12:07.252Z",
		"size": 557,
		"path": "../public/assets/terms-Cslg-WXX.js"
	},
	"/assets/worker-DbU-2brJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"105-TqRbC+ALyZXbyJmgO8GAlHBRvvQ\"",
		"mtime": "2026-07-25T08:12:07.253Z",
		"size": 261,
		"path": "../public/assets/worker-DbU-2brJ.js"
	},
	"/assets/worker._id-Dg-bhQL_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"35a-nkuyCgI22SRN9//RhV7tSzFfPws\"",
		"mtime": "2026-07-25T08:12:07.254Z",
		"size": 858,
		"path": "../public/assets/worker._id-Dg-bhQL_.js"
	},
	"/assets/worker._id-Dn5xl8tG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"28e7-Dx3GO3J01biUMiezImjrlf/coko\"",
		"mtime": "2026-07-25T08:12:07.255Z",
		"size": 10471,
		"path": "../public/assets/worker._id-Dn5xl8tG.js"
	},
	"/assets/wrench-neywQ4DD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"127-ykUdQnw86Gvu5GYnaQ2fPScxh04\"",
		"mtime": "2026-07-25T08:12:07.255Z",
		"size": 295,
		"path": "../public/assets/wrench-neywQ4DD.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_4E_JVv = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_4E_JVv
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
