import {badRequestOnly, notFoundReq} from "./generic.js";

export function getQuery(req, res) {
    return badRequestOnly(req, res);
}

export function deleteQuery(req, res) {
    return badRequestOnly(req, res);
}

export function postQuery(req, res) {
    return badRequestOnly(req, res);
}

export async function putQuery(req, res) {
    return badRequestOnly(req, res);
}

export function getTestById(req, res) {
    return notFoundReq(req, res);
}