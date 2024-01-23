import {
    badRequestOnly,
    notFoundReq, performQueryFromReq, performSimpleOneQuery,
    removeBodyParametersIgnoreCase
} from "./generic.js";

export function getAll(req, res) {
    return badRequestOnly(req, res);
}

export function updateTestStatus(req, res) {
    req = removeBodyParametersIgnoreCase(req, 'sprintid, testid, completiondate, userid');
    if(req.body.statusid === 2) {
        req.body.completionDate = new Date().toDateString();
    } else {
        req.body.completionDate = null;
    }
    console.log(req.body);
    return notFoundReq(req, res);
}

export function postTestStatus(req, res) {
    return badRequestOnly(req, res);
}export function postTesting(req, res) {
    return badRequestOnly(req, res);
}

export function updateTestAssignee(req, res) {
    req.query.combinatory = true;
    req = removeBodyParametersIgnoreCase(req, 'sprintid, testid, completiondate, statusid');
    return notFoundReq(req, res);
}

export async function getTestAssignee(req, res) {
    req.query.combinatory = true;
    req.query.columns = 'userid'
    const userIdResult = await performQueryFromReq(req);
    if(!userIdResult[0]) return res.status(400).json({error: "User not found."})
    const userEmailResult = await performSimpleOneQuery('users','get','userid', userIdResult[0].userid);
    return res.status(200).json({email: userEmailResult[0].email});
}