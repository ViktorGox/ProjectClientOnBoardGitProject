import {badRequestOnly, notFoundReq} from "./generic.js";

export function getModule(req, res) {
    return badRequestOnly(req, res);
}

export function getModuleById(req, res) {
    return notFoundReq(req, res);
}

export function postModule(req, res) {
    return badRequestOnly(req, res);
}

export function deleteModuleById(req, res) {
    return badRequestOnly(req, res);
}

export function editModule(req, res) {
    return badRequestOnly(req, res);
}