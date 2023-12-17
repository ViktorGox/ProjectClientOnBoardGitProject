import statusCodes from "http-status-codes";

const includes = 'Includes';
const equals = 'Equals';
const moreThan = 'More';
const lessThan = 'Less';
const moreOrEqualTo = 'MoreEqual';
const lessOrEqualTo = 'LessEqual';

export function getQueryGeneric(req, res) {
    return getQueryDataBase(req, res);
}

function getQueryDataBase(req, res) {
    let query = 'SELECT * FROM ' + req.fullpath + ' WHERE ';

    const keys = Object.keys(req.query);

    try {
        for (let i = 0; i < keys.length; i++) {
            const param = keys[i];

            // Handle non existent parameter.

            if (Array.isArray(req.query[param])) {
                // handle multiple same name query params.
            }

            const paramInfo = splitSetting(req.query[param]);
            query += addParameterToQuery(param, paramInfo);

            if (i !== keys.length - 1) {
                query += " OR ";
            }
        }
    } catch (e) {
        return res.status(statusCodes.BAD_REQUEST).json({error: e.message});
    }

    return res.status(statusCodes.OK).json({query: query});
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
    } else {
        throw new Error("Invalid setting: " + setting);
    }

    // Add for more than less ...

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

    if(lastIndex === -1) {
        throw new Error("Parameter missing a setting. Info: " + string);
    }

    const queryParams = string.substring(0, lastIndex);
    const setting = string.substring(lastIndex + 1);

    return {
        propParams: queryParams,
        setting: setting
    };
}