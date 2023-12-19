import {performQueryFromReq, performSimpleOneQuery} from "./generic.js";
import statusCodes from "http-status-codes";

export async function getQuery(req, res) {
    return await performQueryFromReq(req, res).then((response) => {
        return res.status(statusCodes.OK).json(response);
    });
}

export async function deleteQuery(req, res) {
    return await performQueryFromReq(req, res).then((response) => {
        return res.status(statusCodes.OK).json(response);
    });
}

export async function postQuery(req, res) {
    return await performQueryFromReq(req, res).then((response) => {
        return res.status(statusCodes.OK).json(response);
    });
}

export async function putQuery(req, res) {
    return await performQueryFromReq(req, res).then((response) => {
        return res.status(statusCodes.OK).json(response);
    });
}

export async function testingWithin(req, res) {
    return await performSimpleOneQuery('test', 'get', res, 'testid', req.params.id).then((response)=> {
        return res.status(statusCodes.OK).json(response);
    });
}