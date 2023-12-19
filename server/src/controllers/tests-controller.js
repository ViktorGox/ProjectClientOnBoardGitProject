import {generateQueryGeneric} from "./generic.js";

export async function getQuery(req, res) {
    req.table = 'test';
    req.request = 'get';
    return await generateQueryGeneric(req, res);
}

export async function deleteQuery(req, res) {
    req.table = 'test';
    req.request = 'delete';
    return await generateQueryGeneric(req, res);
}

export async function postQuery(req ,res) {
    req.table = 'test';
    req.request = 'insert';
    return await generateQueryGeneric(req, res);
}