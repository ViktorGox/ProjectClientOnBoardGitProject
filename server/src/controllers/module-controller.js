import {badRequestOnly, notFoundReq} from "./generic.js";

export function getModule(req, res) {
    return badRequestOnly(req, res);
}

export function getModuleById(req, res) {
    return notFoundReq(req, res);
}