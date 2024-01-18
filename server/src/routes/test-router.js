import express from "express";
import {
    getQuery,
    postQuery,
    putQuery,
    getTestById,
    putTestById,
    deleteTest
} from "../controllers/test-controller.js";
import testStepRouter from "./teststep-router.js";

const router = express.Router();

router.use('/:testid/teststeps', testStepRouter);

router.get('/', getQuery);
router.get('/:testid', getTestById);

router.put('/:testid', putTestById);

router.delete('/:testid',deleteTest);
router.post('/', postQuery);
router.put('/', putQuery) //TODO: should be patch, and all other puts.

export default router;