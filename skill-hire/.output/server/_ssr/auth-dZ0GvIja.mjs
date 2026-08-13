import { t as axios } from "../_libs/axios+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-dZ0GvIja.js
var API = axios.create({ baseURL: "http://localhost:8080/api" });
var registerUser = async (name, email, password, role) => {
	return (await API.post("/auth/register", {
		name,
		email,
		password,
		role: role.toUpperCase()
	})).data;
};
var loginUser = async (email, password) => {
	return (await API.post("/auth/login", {
		email,
		password
	})).data;
};
//#endregion
export { loginUser as n, registerUser as r, API as t };
