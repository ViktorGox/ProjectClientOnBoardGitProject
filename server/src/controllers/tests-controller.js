import {performQueryFromReq, performSimpleOneQuery} from "./generic.js";
import {performQuery} from "../database/database.js";

export async function getQuery(req, res) {
    req.table = 'test';
    req.request = 'get';
    return await performQueryFromReq(req, res);
}

export async function deleteQuery(req, res) {
    req.table = 'test';
    req.request = 'delete';
    return await performQueryFromReq(req, res);
}

export async function postQuery(req, res) {
    req.table = 'test';
    req.request = 'insert';
    return await performQueryFromReq(req, res);
}

export async function putQuery(req, res) {
    req.table = 'test';
    req.request = 'update';
    return await performQueryFromReq(req, res);
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
    console.log(req.param);
    return await performSimpleOneQuery('users', 'get', res, 'userid', 6);
    // return performQuery('SELECT * FROM test WHERE status = \'bug\' OR status = \'blocker\'');
}

//?testid=15;Equals&testid=13;Equals
//?description=e;Includes&description=a;Equals&name=c;Includes