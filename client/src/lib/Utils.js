export function isBlank(string) {
    if(string === undefined || string === null) return true;
    string = string.toString();
    for (let stringElement of string) {
        if (stringElement === " ") {
            continue;
        }
        return false;
    }
    return true;
}

export function stringReplace(fullString, toRemove, replaceWith) {
    if (fullString === undefined || fullString === null) return fullString;
    if (fullString.includes(toRemove)) {
        return fullString.replace(toRemove, replaceWith);
    }
    return fullString
}