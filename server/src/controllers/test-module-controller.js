import {badRequestOnly} from "./generic.js";

export function getById(req ,res) {
    return badRequestOnly(req,res);
}