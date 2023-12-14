import statusCodes from "http-status-codes";
import {getQueryGeneric} from "./generic.js";

export function doso(req, res) {
    return getQueryGeneric(req, res, [""]);
    const param = req.query;
    console.log(req.query);
    return res.status(statusCodes.OK).json({param});
}