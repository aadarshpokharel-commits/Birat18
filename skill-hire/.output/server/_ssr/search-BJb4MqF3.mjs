import { f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/search-BJb4MqF3.js
var $$splitComponentImporter = () => import("./search-DaGDBtHq.mjs");
var searchSchema = objectType({
	q: stringType().optional(),
	category: stringType().optional()
});
var Route = createFileRoute("/search")({
	validateSearch: (s) => searchSchema.parse(s),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
