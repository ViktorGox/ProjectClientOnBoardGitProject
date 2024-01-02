import {performQuery} from "../database/database.js";
import statusCodes from "http-status-codes";

const includes = 'Includes';
const equals = 'Equals';
const moreThan = 'More';
const lessThan = 'Less';
const moreOrEqualTo = 'MoreEqual';
const lessOrEqualTo = 'LessEqual';

/**
 * This method takes a req object, auto generates a query, executes it and returns the result.
 * You can create a custom req and provide it, to fake a request and still be able to use this method. Look at method.
 * Errors are caught and returned as response.error. So you can check if an error was encountered by checking if
 * .error exists.
 * {@link performInnerQuery} or {@link performSimpleOneQuery}.
 * @param req The req is required to have the following sub variables:
 * <p> "baseUrl" for table name</p>
 * <p> "method" for request type</p>
 * <p> "query" for if the request can, and is wanted to have a where clause</p>
 * <p> "params" for if looking for one element particular element (test/:id)</p>
 * <p> "body" for post/put request, the that will actually be inserted/updated</p>
 * @returns {Promise<unknown>} the result of the query, or an error object.
 * The error object contains error.message, is text about the message and error.code, which is the possible code
 * you want to return.
 */
export async function performQueryFromReq(req) {
    let query;

    try {
        if (req.method.toLowerCase() === 'get') {
            query = generateGetQuery(req);
        } else if (req.method.toLowerCase() === 'delete') {
            query = generateDeleteQuery(req);
        } else if (req.method.toLowerCase() === 'post') {
            query = generateInsertQuery(req);
        } else if (req.method.toLowerCase() === 'put' || req.method.toLowerCase() === 'patch') {
            query = generateUpdateQuery(req);
        } else {
            return {error: "Unknown request. " + req.method};
        }
    } catch (e) {
        return {error: e.message};
    }
    console.log(query);

    return await performQuery(query).then((data) => {
        return data;
    }).catch((e) => {
        if (query.error) {
            return {error: e.message, query: query};
            // return query.error;
        }
        if (e.routine) {
            if (e.routine === "op_error") {
                return {
                    error: "Operator doesn't exist. You are probably using Includes on a digit.",
                    query: query,
                };
            }
            if (e.routine === "pg_strtoint32_safe") {
                return {
                    error: "You are trying to compare non-digits with digit value.",
                    query: query
                };
            }
            if (e.routine === "checkInsertTargets" || e.routine === "errorMissingColumn") {
                return {
                    error: "One or more of the columns do not exist. Wrong table?",
                    query: query
                };
            }
            if (e.routine === "scanner_yyerror") {
                return {
                    error: "Query was not properly generated. Or some other unknown error (scanner_yyerror)",
                    query: query
                };
            }
        }
        return {error: e.message};
    });
}

function generateGetQuery(req) {
    let query = 'SELECT * FROM ' + removeLeadingSlash(req.baseUrl);

    query += generateWhereClause(req);
    return query;
}

function generateDeleteQuery(req) {
    let query = 'DELETE FROM ' + removeLeadingSlash(req.baseUrl);

    query += generateWhereClause(req);
    return query;
}

function generateInsertQuery(req) {
    const keys = Object.keys(req.body);

    // TODO: Handle not all columns filled?

    let query = 'INSERT INTO ' + removeLeadingSlash(req.baseUrl) + " (";

    for (let i = 0; i < keys.length; i++) {
        const param = keys[i];
        query += param;

        if (i !== keys.length - 1) {
            query += ", ";
        }
    }

    query += ") VALUES (";

    for (let i = 0; i < keys.length; i++) {
        const param = keys[i];
        query += "'" + req.body[param] + "'";

        if (i !== keys.length - 1) {
            query += ", ";
        }
    }

    query += ');'

    return query;
}

function generateUpdateQuery(req) {
    let query = 'UPDATE ' + removeLeadingSlash(req.baseUrl) + ' SET ';

    const keys = Object.keys(req.body);

    for (let i = 0; i < keys.length; i++) {
        const param = keys[i];
        const paramLoad = "'" + req.body[param] + "'";

        query += param + " = " + paramLoad;

        if (i !== keys.length - 1) {
            query += ", ";
        }
    }

    query += generateWhereClause(req);
    return query;
}

/**
 * Takes query parameters from req and turns them into a where clause.
 */
function generateWhereClause(req) {
    let whereClause = "";

    let paramsKeys = [];
    let queryKeys = [];
    if (req.params) {
        paramsKeys = Object.keys(req.params);
    }
    if (req.query) {
        queryKeys = Object.keys(req.query);
    }
    if (queryKeys.length > 0 || paramsKeys.length > 0) {
        whereClause += ' WHERE ';
    }

    whereClause += whereClauseFromPath(req);
    if (queryKeys.length > 0 && paramsKeys.length > 0) {
        whereClause += ' OR ';
    }
    whereClause += whereClauseFromQuery(req);
    return whereClause;
}

/**
 * Adds a where clause based only on the req.params.
 */
function whereClauseFromPath(req) {
    let paramsKeys = [];
    if (req.params) {
        paramsKeys = Object.keys(req.params);
    }
    let whereClause = "";

    for (let i = 0; i < paramsKeys.length; i++) {
        const param = paramsKeys[i];

        whereClause += param + " = " + req.params[param];

        if (i !== paramsKeys.length - 1) {
            whereClause += " OR ";
        }
    }

    return whereClause;
}

/**
 * Adds a where clause based only on the req.query.
 */
function whereClauseFromQuery(req) {
    let queryKeys = [];
    if (req.query) {
        queryKeys = Object.keys(req.query);
    }
    let whereClause = "";

    for (let i = 0; i < queryKeys.length; i++) {
        const param = queryKeys[i];

        if (Array.isArray(req.query[param])) {
            whereClause = handleParamDuplicate(req, param, whereClause);
            continue;
        }

        const paramInfo = splitSetting(req.query[param]);
        whereClause += addParameterToQuery(param, paramInfo);

        if (i !== queryKeys.length - 1) {
            whereClause += " OR ";
        }
    }

    return whereClause;
}

/**
 * If two query parameters with the same name are sent, then its an array, and needs to be handled separately.
 */
function handleParamDuplicate(req, param, query) {
    for (let i = 0; i < req.query[param].length; i++) {
        const paramInfo = splitSetting(req.query[param][i]);
        query += addParameterToQuery(param, paramInfo);

        if (i !== req.query[param].length - 1) {
            query += " AND ";
        }
    }

    return query;
}

/**
 * Takes part of the query like testid=1,2,3,4;Equals and adds a OR clause for all possible options.
 */
function addParameterToQuery(param, paramInfo) {
    const queryParametersString = paramInfo.propParams;
    const setting = paramInfo.setting;

    let query = "";

    const queryParams = queryParametersString.split(",");

    for (let i = 0; i < queryParams.length; i++) {
        query += param + " " + addSetting(setting) + " '" + addSpecialChars(setting, queryParams[i]) + "'";
        if (i + 1 < queryParams.length) {
            query += ' OR '
        }
    }

    return query;
}

function addSetting(setting) {
    if (setting === includes) {
        setting = 'ILIKE';
    } else if (setting === equals) {
        setting = '=';
    } else if (setting === moreThan) {
        setting = '>'
    } else if (setting === lessThan) {
        setting = '<'
    } else if (setting === moreOrEqualTo) {
        setting = '>='
    } else if (setting === lessOrEqualTo) {
        setting = '<='
    } else {
        throw new Error("Invalid setting: " + setting);
    }

    return setting;
}

/**
 * If the setting is Includes, then % must be added so it actually works.
 */
function addSpecialChars(setting, string) {
    if (setting === includes) {
        return '%' + string + "%";
    }
    return string;
}

/**
 * Takes a parameter value like 1,2,3,4;More and splits it. So the generate query knows which is the setting.
 */
function splitSetting(string) {
    const lastIndex = string.lastIndexOf(';');

    if (lastIndex === -1) {
        throw new Error("Parameter missing a setting. Info: " + string);
    }

    const queryParams = string.substring(0, lastIndex);
    const setting = string.substring(lastIndex + 1);

    return {
        propParams: queryParams,
        setting: setting
    };
}

/**
 * Used to do a simple query with 1 search parameter, possibly for id or any unique value.
 * Only possible for Get and Delete, if you want other look at the {@link performInnerQuery}.
 * It does not query with a limit of 1, so you can use it to search for multiple occurrences of foreign keys.
 * If you want to query on multiple factors, use the {@link performInnerQuery}.
 * <p> Example: </p>
 * <p> SELECT * FROM test WHERE testid = 5 </p>
 * <p> DELETE FROM test WHERE testid = 5 </p>
 * @param table The table you want to query. Example: 'test'.
 * @param method The type of query you want to make. Example 'get' / 'delete'.
 * @param queryProperty The property you want to search. Example 'testid'.
 * @param queryParam The value of the parameter. Example 5.
 * @returns The found data. Empty array if nothing was found.
 */
export async function performSimpleOneQuery(table, method, queryProperty, queryParam) {
    let fakeReq = {
        baseUrl: table,
        method: method,
        query: {}
    }

    // TODO: should return 404 if nothing found?

    fakeReq.query[queryProperty] = queryParam + ";Equals";

    return await performQueryFromReq(fakeReq);
}

/**
 * Used to generate a query from the back end for the back end.
 * @param table The table you want to query. Example: 'test'.
 * @param method The type of query you want to make. Example 'get'.
 * @param query The query parameters which can be added to the query as a where clause to filter the search.
 * Look at {@link generateQueryForInnerCall} to generate it.
 * @param body For insert and update query. Just a normal default body. "Variable" : "value"
 * @param params Any data that might be wanted as path parameter. Simulates test/{:id}
 * @returns The results of the database query. Empty array if nothing was found.
 */
export async function performInnerQuery(table, method, query, body = {}, params = {}) {
    const fakeReq = {
        baseUrl: table,
        method: method,
        query: query,
        body: body,
        params: params
    }
    return await performQueryFromReq(fakeReq).then((result) => {
        return result;
    });
}

/**
 * Takes in 3 array objects and coverts them into a query object. The arrays must be the same length.
 * The items in the 3 arrays must match indexes. It takes property[i], parameter[i] and setting[i] for one where clause.
 * If they are not on the same index, the parameters will be mixed up.
 * <p>You can also have the same property queried multiple times with different values and settings.
 * For example, you can query for weight > 2 and weight &lt; 5 by doing ["status","status"] [2,5] ["More", "Less"]</p>
 * @param queryProperties The properties that will be checked. Example: ["status", "name", "weight"].
 * @param queryParams The values for the properties. Example: ["blocker, bug", "som", "3"].
 * Make sure to put multiple options for one parameter in the same index position. Look at {@link arrayToString}
 * to convert an array of elements into a string separated by commas, like the "blocker, bug".
 * @param querySettings The compare function that will be used. Example ["Equals", "Includes", "MoreEqual"]
 * Look at the variables at the top of the file {@link includes}, {@link equals}, {@link moreThan} and the other 3.
 * @returns the query object.
 */
export function generateQueryForInnerCall(queryProperties = [], queryParams = [], querySettings = []) {
    const query = {};

    if (queryProperties.length !== queryParams.length || queryProperties.length !== querySettings.length) {
        throw new Error("The provided arrays must have the same lengths! Did you not combine queryParam for one " +
            "queryProperty? QueryProperty length: " + queryProperties.length + " | QueryParams length: " +
            queryParams.length + " | QuerySetting length; " + querySettings.length);
    }

    for (let i = 0; i < queryProperties.length; i++) {
        query[queryProperties[i]] = queryParams[i] + ";" + querySettings[i];
    }

    return query;
}

/**
 * Can be used to convert an array of strings or numbers, to a single string with elements separated
 * by a comma in order to create queryParams.
 * @param array
 * @returns {string}
 */
function arrayToString(array) {
    // Not actually duplicate, just this function exists in front end and back end. Can't import from front end.
    if (array === undefined || array === null) return "";
    let result = "";
    for (let i = 0; i < array.length; i++) {
        let element = array[i];
        if (element === undefined || element === null || element === "") continue;
        if (Array.isArray(element)) {
            if (array[i][0] === undefined) continue;
            element = array[i][0];
        }
        result += element;
        if (i < array.length - 1) {
            result += ",";
        }
    }
    if (result.charAt(result.length - 1) === ',') {
        result = removeLastCharacter(result);
    }
    return result;
}

function removeLastCharacter(string) {
    return string.slice(0, -1);
}

function removeLeadingSlash(inputString) {
    if (inputString && inputString.charAt(0) === '/') {
        return inputString.slice(1);
    }
    return inputString;
}

/**
 * Intended purpose of this is if you don't want to do any special
 * error handling, and you are okay with returning no elements.
 */
export async function badRequestOnly(req, res) {
    return await performQueryFromReq(req).then((response) => {
        if (response.error) {
            return res.status(statusCodes.BAD_REQUEST).json(response);
        }
        return res.status(statusCodes.OK).json(response);
    });
}

/**
 * Intended purpose of this is if you don't want to do any special
 * error handling, and you want to return a 404 when nothing is found.
 */
export async function notFoundReq(req,res) {
    return await performQueryFromReq(req).then((response) => {
        if (response.error) {
            return res.status(statusCodes.BAD_REQUEST).json(response);
        }
        if(response.length === 0) {
            return res.status(statusCodes.NOT_FOUND).json(response);
        }
        return res.status(statusCodes.OK).json(response);
    });
}