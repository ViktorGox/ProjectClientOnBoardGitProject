import statusCodes from "http-status-codes";

export function handleFileUpload(req,res) {
    if (!req.file) {
        return res.status(statusCodes.BAD_REQUEST).json({error: 'No file uploaded.'});
    }
    res.status(statusCodes.OK).json();
}
