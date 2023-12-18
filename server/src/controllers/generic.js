import statusCodes from "http-status-codes";
import {performQuery} from "../database/database.js";

const includes = 'Includes';
const equals = 'Equals';
const moreThan = 'More';
const lessThan = 'Less';
const moreOrEqualTo = 'MoreEqual';
const lessOrEqualTo = 'LessEqual';

export async function getQueryGeneric(req, res) {
    const query = generateGetQuery(req, res);
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
                    error: "Operator doesn't exist. You are probably using " +
                        "Includes on a digit.",
                    query: query
                });
            }
            if (e.routine === "pg_strtoint32_safe") {
                return res.status(statusCodes.BAD_REQUEST).json({
                    error: "You are trying to compare non-digits with" +
                        " digit value.",
                    query: query
                });
            }
        }
        return res.status(statusCodes.BAD_REQUEST).json({error: e});
    });
}

function generateGetQuery(req) {
    if (!req.fullpath) throw new Error("Full path was not set!");
    let query = 'SELECT * FROM ' + req.fullpath;

    const keys = Object.keys(req.query);
    if(keys.length > 0) {
        query += ' WHERE ';
    }

    try {
        for (let i = 0; i < keys.length; i++) {
            const param = keys[i];

            if (Array.isArray(req.query[param])) {
                query = handleParamDuplicate(req, param, query);
                continue;
            }

            const paramInfo = splitSetting(req.query[param]);
            query += addParameterToQuery(param, paramInfo);

            if (i !== keys.length - 1) {
                query += " OR ";
            }
        }
    } catch (e) {
        return {error: e.message}
    }

    return query;
}

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

function addSpecialChars(setting, string) {
    if (setting === includes) {
        return '%' + string + "%";
    }
    return string;
}

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