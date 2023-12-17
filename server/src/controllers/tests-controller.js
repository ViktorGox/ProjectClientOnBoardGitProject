import {getQueryGeneric} from "./generic.js";

export function getQuery(req, res) {
    req.fullpath = 'test';
    return getQueryGeneric(req, res);
}