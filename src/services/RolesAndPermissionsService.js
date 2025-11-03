import { http, urlBase } from "./http";
export const indexRoles = () => {
    return http().get(`${urlBase}/roles`);
}