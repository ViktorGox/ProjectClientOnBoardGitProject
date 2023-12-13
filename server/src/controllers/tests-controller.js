import statusCodes from "http-status-codes";

export function doso(req, res) {
    const param = req.query;
    console.log(req.query);
    return res.status(statusCodes.OK).json({param});
}