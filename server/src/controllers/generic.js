import statusCodes from "http-status-codes";
import {performQuery} from "../database/database.js";

const includes = 'Includes';
const equals = 'Equals';
const moreThan = 'More';
const lessThan = 'Less';
const moreOrEqualTo = 'MoreEqual';
const lessOrEqualTo = 'LessEqual';

export async function performQueryFromReq(req, res) {
    if (!req.table) throw new Error("Full path was not set!");

    let query;

    try {
        if (req.request.toLowerCase() === 'get') {
            query = generateGetQuery(req);
        } else if (req.request.toLowerCase() === 'delete') {
            query = generateDeleteQuery(req);
        } else if (req.request.toLowerCase() === 'insert') {
            query = generateInsertQuery(req);
        } else if (req.request.toLowerCase() === 'update') {
            query = generateUpdateQuery(req);
        } else {
            throw new Error("Unknown request. " + req.request);
        }
    } catch (e) {
        return res.status(statusCodes.BAD_REQUEST).json(e.message);
    }

    console.log(query);
    return await performQuery(query).then((data) => {
        return res.status(statusCodes.OK).json(data);
    }).catch((e) => {
        if (query.error) {
            return res.status(statusCodes.BAD_REQUEST).json({error: query.error});
        }
        if (e.routine) {
            if (e.routine === "op_error") {
                return res.status(statusCodes.BAD_REQUEST).json({
                    error: "Operator doesn't exist. You are probably using Includes on a digit.",
                    query: query
                });
            }
            if (e.routine === "pg_strtoint32_safe") {
                return res.status(statusCodes.BAD_REQUEST).json({
                    error: "You are trying to compare non-digits with digit value.",
                    query: query
                });
            }
            if (e.routine === "checkInsertTargets" || e.routine === "errorMissingColumn") {
                return res.status(statusCodes.BAD_REQUEST).json({
                    error: "One or more of the columns do not exist. Wrong table?",
                    query: query
                })
            }
            if(e.routine === "scanner_yyerror") {
                return res.status(statusCodes.BAD_REQUEST).json({
                    error: "Query was not properly generated. Or some other unknown error (scanner_yyerror)",
                    query: query
                })
            }
        }
        return res.status(statusCodes.BAD_REQUEST).json({error: e});
    });
}

function generateGetQuery(req) {
    let query = 'SELECT * FROM ' + req.table;

    query += generateWhereClause(req);
    return query;
}

function generateDeleteQuery(req) {
    let query = 'DELETE FROM ' + req.table;

    query += generateWhereClause(req);
    return query;
}

function generateInsertQuery(req) {
    const keys = Object.keys(req.body);

    // TODO: Handle not all columns filled?

    let query = 'INSERT INTO ' + req.table + " (";

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
    let query = 'UPDATE ' + req.table + ' SET ';

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
    const keys = Object.keys(req.query);
    if (keys.length > 0) {
        whereClause += ' WHERE ';
    }

    for (let i = 0; i < keys.length; i++) {
        const param = keys[i];

        if (Array.isArray(req.query[param])) {
            whereClause = handleParamDuplicate(req, param, whereClause);
            continue;
        }

        const paramInfo = splitSetting(req.query[param]);
        whereClause += addParameterToQuery(param, paramInfo);

        if (i !== keys.length - 1) {
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
 * @param request The type of query you want to make. Example 'get' / 'delete'.
 * @param res Just your res from the request. Required to return the data. You can override it after.
 * @param queryProperty The property you want to search. Example 'testid'.
 * @param queryParam The value of the parameter. Example 5.
 * @returns The found data. Empty array if nothing was found.
 */
export async function performSimpleOneQuery(table, request, res, queryProperty, queryParam) {
    let fakeReq = {
        table: table,
        request: request,
        query: {}
    }

    // TODO: should return 404 if nothing found?

    fakeReq.query[queryProperty] = queryParam + ";Equals";

    return await performQueryFromReq(fakeReq, res);
}

/**
 * Used to generate a query from the back end for the back end.
 * @param table The table you want to query. Example: 'test'.
 * @param request The type of query you want to make. Example 'get'.
 * @param res Just your res from the request. Required to return the data. You can override it after.
 * @param query The query parameters which can be added to the query as a where clause to filter the search.
 * Look at {@link generateQueryForInnerCall} to generate it.
 * @param body For insert and update query. Just a normal default body. "Variable" : "value"
 * @returns The results of the database query. Empty array if nothing was found.
 */
export async function performInnerQuery(table, request, res, query, body = {}) {
    const fakeReq = {
        table: table,
        request: request,
        query: query,
        body: body
    }

    return await performQueryFromReq(fakeReq, res);
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
export function generateQueryForInnerCall(queryProperties = [], queryParams= [], querySettings= []) {
    const query = {};

    if(queryProperties.length !== queryParams.length || queryProperties.length !== querySettings.length) {
        throw new Error("The provided arrays must have the same lengths! Did you not combine queryParam for one " +
            "queryProperty? QueryProperty length: " + queryProperties.length + " | QueryParams length: " +
            queryParams.length + " | QuerySetting length; " + querySettings.length);
    }

    for (let i = 0; i < queryProperties.length; i++) {
        console.log("1 "+query[queryProperties[i]]);
        console.log("2 "+queryParams[i]);
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