import statusCodes from "http-status-codes";


// HAS TO BE UPDATED WHEN DATABASE IS WORKING


export function filterOnProperty(elementList, combinedString, property) {
    if (combinedString === '') {
        return elementList
    }
    const strings = String(combinedString).split(",");

    return elementList.filter(nft => {
        for (let i = 0; i < strings.length; i++) {
            const propertyValue = String(nft[property]);
            if (propertyValue === strings[i]) {
                return true;
            }
        }
        return false;
    });
}

export function findElementById(id, array) {
    const idNum = Number(id);
    for (let element of array) {
        if (element.id === idNum) {
            return element;
        }
    }
}

export function getQueryGeneric(req, res) {
    return res.status(statusCodes.OK).json(getQueryGenericNonJSON(req));
}

export function getQueryGenericNonJSON(req) {
    // Should be full list from database.
    let filteredList = [];

    const queryParams = req.query;
    for (const param in queryParams) {
        if (queryParams.hasOwnProperty(param)) {
            if (param === 'name') {
                filteredList = filteredList.filter(nft => nft.name.toLowerCase().includes(queryParams[param].toLowerCase()));
            } else {
                filteredList = filterOnProperty(filteredList, queryParams[param], param);
            }
        }
    }
    return filteredList;
}