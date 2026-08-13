import { t as API } from "./auth-dZ0GvIja.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/worker-CJ7ieySA.js
var getWorkers = async () => {
	const { data } = await API.get("/workers");
	return data;
};
var getWorker = async (id) => {
	const { data } = await API.get(`/workers/${id}`);
	return data;
};
var getWorkerByUserId = async (userId) => {
	const { data } = await API.get(`/workers/user/${userId}`);
	return data;
};
//#endregion
export { getWorkerByUserId as n, getWorkers as r, getWorker as t };
