import {generateQueryGeneric} from "./generic.js";
import {performQuery} from "../database/database.js";

export async function getQuery(req, res) {
    req.table = 'test';
    req.request = 'get';
    return await generateQueryGeneric(req, res);
}

export async function deleteQuery(req, res) {
    req.table = 'test';
    req.request = 'delete';
    return await generateQueryGeneric(req, res);
}

export async function postQuery(req, res) {
    req.table = 'test';
    req.request = 'insert';
    return await generateQueryGeneric(req, res);
}

export async function putQuery(req, res) {
    req.table = 'test';
    req.request = 'update';
    return await generateQueryGeneric(req, res);
}

export async function testingWithin(req, res) {
    // const table = 'test';
    // const request = 'get';
    //
    // const props = ["testid", "testid"];
    // const params = ["15","13"];
    // const setting = ["Equals","Equals"];
    //
    // const body = {
    //     "name": "adding a new one",
    //     "userid": 7,
    //     "description": "new description",
    //     "status": "blocker",
    //     "completiondate": "2023-12-19"
    // }
    // let query = generateQueryForInnerCall(props, params, setting);
    // return await performInnerQuery(table, request, res, query, body);
    return performQuery('SELECT * FROM test WHERE status = \'bug\' OR status = \'blocker\'');
}

//?testid=15;Equals&testid=13;Equals
//?description=e;Includes&description=a;Equals&name=c;Includes