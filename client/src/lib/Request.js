import {currentToken} from "../stores/TokenStore.js";
import {isBlank, stringReplace} from "./Utils.js";

let token;
export const url = "http://localhost:3000/";

currentToken.subscribe(value => {
    token = value.token;
});

/**
 * Function to call a get request with a query to the back end for multiple instances.
 * To send multiple possible answers for one property, covert to 1 string and separate with a comma(,).
 * Passing empty arrays will give all.
 * @param path path for the request after the http://localhost:3000/.
 *  <p>Look at the method generateQuery to generate something like this:</p>
 *  <p>http://localhost:3000/tests?status=Blocker,Bug&weight=2</p>
 *  <p>And give the return of the generateQuery as path parameter. </p>
 * @param fetchType the request that will be done. GET/DELETE/POST... Default is GET.
 * @param data any data to be sent as body. Nothing is accepted.
 * @returns {Promise<Response<any, Record<string, any>, number>>}
 */
export async function fetchRequest(path, fetchType = 'GET', data = {}) {
    const headers = {};

    path = url + path;

    headers['Content-Type'] = 'application/json'

    if (token) {
        headers.Authorization = `Bearer ${token}`
    }
    const options = {
        method: fetchType,
        headers: headers
    };

    if (fetchType !== 'GET' && fetchType !== 'DELETE') {
        options.body = JSON.stringify(data);
    }

    const response = await fetch(path, options);

    let responseData;

    if (fetchType !== 'DELETE') {
        responseData = await response.json();
    }

    if (response.ok) {
        return responseData;
    }

    throw {
        status: response.status,
        data: responseData
    };
}

/**
 * Used to generate a query for any given parameters.
 * <p>To generate this: http://localhost:3000/tests?status=Blocker,Bug&weight=2</p>
 * <p>Use the following: path='tests', queryProperties=['status','weight'], queryParams=['Blocker,Bug','2']</p>
 * <p>Make sure the different possible values ('Blocker,Bug') for the property you want to search (status),
 * are in the same index of the array 2 arrays. </p>
 * <p>Example of how it would look like for big query</p>
 * <p>queryProperties = ["name","status", "assignee", "weight", "module"]; </p>
 * <p>queryParams = ["som", "Blocker, Bug, Successful", "First, Second", "2", "log in, register"] </p>
 * <p>querySettings = ["Includes", "Equals", "Equals", "MoreThan", "Equals"] </p>
 * <p>Name will accept any test where the name contains "som". Status will accept only Blocker, Bug, Successful.
 * Assignee will only accept First, Second. Weight will accept anywhere where weight is > 2. Keep in mind > and =>
 * are different! Module is the same as status.</p>
 * <p>To convert an array of elements you can use the arrayToString in the Utils.js</p>
 * @param path what resource to be called. /tests  /users
 * @param queryProperties An array of strings for which properties it will be searched.
 * @param queryParams An array of strings that corresponds to the queryProperties array.
 * @param querySettings An array of strings, one for each property, which specifies how the property will be queried.
 * @returns {string} the query with the path.
 */
export function generateQuery(path, queryProperties, queryParams, querySettings) {
    if (queryProperties || queryParams) {
        if (queryProperties.length !== queryParams.length) {
            throw new Error('queryList and queryParams must have the same length! Are you missing a property or a parameter?');
        }
    }
    path = stringReplace(path, '/', '');
    let query = path + "?";
    for (let i = 0; i < queryProperties.length; i++) {
        if (isBlank(queryProperties[i]) || isBlank(queryParams[i])) continue;
        query += queryProperties[i];
        query += '=';
        query += queryParams[i];
        query += ";";
        query += querySettings[i];
        query += '&';
    }
    return query;
}
