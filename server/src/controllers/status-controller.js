import {performQueryFromReq} from "./generic.js";
import statusCodes from "http-status-codes";

export async function getStatus(req,res) {
    req.baseUrl = 'testStatus';
    return await performQueryFromReq(req).then((response) => {
        if(response.error) {
            return res.status(statusCodes.BAD_REQUEST).json(response);
        }
        return res.status(statusCodes.OK).json(response);
    });
}