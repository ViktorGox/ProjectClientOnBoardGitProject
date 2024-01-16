import {badRequestOnly, notFoundReq} from "./generic.js";

export function getQuery(req, res) {
    req.baseUrl = 'teststep';
    return badRequestOnly(req, res);
}

export function getTestStepById(req, res) {
    req.baseUrl = 'teststep';
    return notFoundReq(req, res);
}

export function deleteQuery(req, res) {
    req.baseUrl = 'teststep';
    return badRequestOnly(req, res);
}

export function postQuery(req, res) {
    req.baseUrl = 'teststep';

    return badRequestOnly(req, res);
}

export async function putQuery(req, res) {
    req.baseUrl = 'teststep';

    return badRequestOnly(req, res);
}