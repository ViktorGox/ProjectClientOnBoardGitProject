import {  badRequestOnly, notFoundReq } from "./generic.js";

export function getAllroles(req, res) {
    return badRequestOnly(req, res);
}
