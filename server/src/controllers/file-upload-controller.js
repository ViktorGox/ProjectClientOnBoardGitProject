import statusCodes from "http-status-codes";
import {performInnerQuery} from "./generic.js";

export async function handleFileUpload(req, res) {
    if (!req.file) {
        return res.status(statusCodes.BAD_REQUEST).json({error: 'No file uploaded.'});
    }

    const body = {
        teststepid: 1,
        path: req.file.destination + req.file.filename
    }

    const response = await performInnerQuery('attachment', 'post', {}, body)
    console.log(response);

    res.status(statusCodes.OK).json();
}

export async function get(req, res) {
    return res.status(statusCodes.OK).json({message: 'Nasdasdasdd.'});
}
