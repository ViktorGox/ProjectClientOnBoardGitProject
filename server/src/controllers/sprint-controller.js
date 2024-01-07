import {  badRequestOnly, notFoundReq } from "./generic.js";


export function getSprints(req, res) {
    return badRequestOnly(req, res);
}

export function getSprintById(req, res) {
    return notFoundReq(req, res);
}

export function addNewSprint(req, res) {
    return badRequestOnly(req, res);
}

export function editSprintBySprintId(req, res) {
    return badRequestOnly(req, res);
}

export function removeSprintById(req, res) {
    return badRequestOnly(req, res);
}
