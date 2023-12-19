import {getQueryGeneric} from "./generic.js";

export async function getQuery(req, res) {
    req.fullpath = 'test';
    return await getQueryGeneric(req, res);
}