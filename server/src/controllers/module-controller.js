import {badRequestOnly, isBlank, notFoundReq} from "./generic.js";

export function getModule(req, res) {
    if (req.params.testid)
    req.baseUrl = 'testmodule';
    return badRequestOnly(req, res);
}

export function getModuleById(req, res) {
    if (req.params.testid)
        req.baseUrl = 'testmodule';
    return notFoundReq(req, res);
}

export function postModule(req, res) {
    if (req.params.testid)
        req.baseUrl = 'testmodule';
    if(isBlank(req.body.label)) return res.status(400).json({error: "Label missing in body."})
    req.body.label = req.body.label.trim();
    return badRequestOnly(req, res);
}

export function deleteModuleById(req, res) {
    if (req.params.testid)
        req.baseUrl = 'testmodule';
    return badRequestOnly(req, res);
}

export function editModule(req, res) {
    if(isBlank(req.body.label)) return res.status(400).json({error: "Label missing in body."})
    req.body.label = req.body.label.trim();
    req.baseUrl = 'testmodule';
    return badRequestOnly(req, res);
}