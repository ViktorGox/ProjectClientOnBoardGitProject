import {badRequestOnly, notFoundReq} from "./generic.js";
import {performQuery} from "../database/database.js";

export function getQuery(req, res) {
    req.baseUrl = 'teststep';
    return badRequestOnly(req, res);
}

export function getTestStepById(req, res) {
    req.baseUrl = 'teststep';
    return notFoundReq(req, res);
}

export function deleteQuery(req, res) {
    req.baseUrl = 'teststep';
    return badRequestOnly(req, res);
}

export async function postQuery(req, res) {
    req.baseUrl = 'teststep';
    console.log(req.body);
    const query = `DO $$ 
DECLARE 
    _TestID INT := ` + req.body.testid + `; -- Replace with the actual TestID
    _NewPosition INT := ` + req.body.stepnr + `; -- The desired position for the new step
BEGIN
    -- Find the next available position in the sequence
    _NewPosition := COALESCE(
        (SELECT MIN(StepNR) FROM TestStep WHERE TestID = _TestID AND StepNR > _NewPosition),
        (SELECT MAX(StepNR) + 1 FROM TestStep WHERE TestID = _TestID)
    );

    -- Increment the Position for steps after the adjusted position
    UPDATE TestStep
    SET StepNR = StepNR + 1
    WHERE TestStep.TestID = _TestID AND TestStep.StepNR >= _NewPosition;

    -- Insert the new step at the adjusted position
    INSERT INTO TestStep (TestID, StepNR, Title, TestLog, Weight)
    VALUES (_TestID, _NewPosition, '` + req.body.title + `',  '` + req.body.testlog + `', '` + req.body.weight + `');
END $$;`
    await performQuery(query);
    return res.status(200).json();
}

export async function putQuery(req, res) {
    req.baseUrl = 'teststep';

    return badRequestOnly(req, res);
}