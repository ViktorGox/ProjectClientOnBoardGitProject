import {badRequestOnly} from "./generic.js";

export function getAll(req, res) {
    return badRequestOnly(req, res);
}