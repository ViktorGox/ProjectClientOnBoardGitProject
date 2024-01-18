import statusCodes from "http-status-codes";
import {performInnerQuery, performSimpleOneQuery} from "./generic.js";

import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import * as path from 'path';

// console.log('Resolved Path:', path.join(__dirname, '../../uploads'));

export async function handleFileUpload(req, res) {
    if (!req.file) {
        return res.status(statusCodes.BAD_REQUEST).json({error: 'No file uploaded.'});
    }

    const body = {
        teststepid: 1,
        path: req.file.filename
    }

    await performInnerQuery('attachment', 'post', {}, body)

    res.status(statusCodes.CREATED).json({message: "File added."});
}

export async function getAttachment(req, res) {
    const result = await performSimpleOneQuery('attachment','get','teststepid',req.params.stepid)
    if(!result[0]) return res.status(404).json({error: "Attachment was not found."})
    const filePath = path.join(__dirname, `../../uploads/${result[0].path}`);
    return res.sendFile(filePath);
}
