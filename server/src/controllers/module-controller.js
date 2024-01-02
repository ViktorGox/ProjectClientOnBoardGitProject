import {badRequestOnly, notFoundReq} from "./generic.js";

export function getModule(req, res) {
    req.baseUrl = 'module';
    return badRequestOnly(req, res);
}

export function getTestModules(req, res) {
    req.baseUrl = 'testmodule';
    return notFoundReq(req, res);
}