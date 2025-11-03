import { http, urlBase } from "./http";
export const loginBE = (credenciales) => {
	return http().post(`${urlBase}/auth/login`, credenciales);
}
export const logoutBE = () => {
	return http().post(`${urlBase}/auth/logout`);
}