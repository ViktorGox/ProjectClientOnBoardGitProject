import {badRequestOnly, notFoundReq} from "./generic.js";
import {performQuery} from "../database/database.js";

export function getQuery(req, res) {
    return badRequestOnly(req, res);
}

export function deleteTest(req, res) {
    return notFoundReq(req, res);
}

export function postQuery(req, res) {
    return badRequestOnly(req, res);
}

export async function putQuery(req, res) {
    return badRequestOnly(req, res);
}

export function getTestById(req, res) {
    return notFoundReq(req, res);
}

export function putTestById(req, res) {
    return notFoundReq(req, res);
}

export async function getTotalWeight(req, res) {
    const sumWeightQuery = 'select sum(weight) from teststep where testid=$1';
    const weight = await performQuery(sumWeightQuery, [req.params.testid]);
    console.log(weight);
    if (weight[0].sum === null) return res.status(404).json({"erorr": "The test was not found."})
    return res.status(200).json(weight[0]);
}