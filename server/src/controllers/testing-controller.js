import {
    badRequestOnly,
    notFoundReq,
    removeBodyParametersIgnoreCase} from "./generic.js";

export function getAll(req, res) {
    return badRequestOnly(req, res);
}

export function updateTestStatus(req, res) {
    req = removeBodyParametersIgnoreCase(req, 'sprintid, testid, completiondate');
    return notFoundReq(req, res);
}