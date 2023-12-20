import {performQueryFromReq} from "./generic.js";
import statusCodes from "http-status-codes";

export async function getQuery(req, res) {
    return await performQueryFromReq(req).then((response) => {
        return res.status(statusCodes.OK).json(response);
    });
}

export async function deleteQuery(req, res) {
    return await performQueryFromReq(req).then((response) => {
        return res.status(statusCodes.OK).json(response);
    });
}

export async function postQuery(req, res) {
    return await performQueryFromReq(req).then((response) => {
        return res.status(statusCodes.OK).json(response);
    });
}

export async function putQuery(req, res) {
    return await performQueryFromReq(req).then((response) => {
        return res.status(statusCodes.OK).json(response);
    });
}

export async function getTestById(req, res) {
    return await performQueryFromReq(req).then((response) => {
        return res.status(statusCodes.OK).json(response);
    });
}