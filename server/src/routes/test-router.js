import express from "express";
import {
    getQuery,
    postQuery,
    putQuery,
    getTestById,
    putTestById,
    deleteTest, getTotalWeight
} from "../controllers/test-controller.js";
import testStepRouter from "./teststep-router.js";

const router = express.Router();

router.use('/:testid/teststeps', testStepRouter);

router.get('/', getQuery);
router.get('/:testid', getTestById);
router.get('/:testid/weight', getTotalWeight);

router.put('/:testid', putTestById);
router.put('/', putQuery);

router.delete('/:testid',deleteTest);

router.post('/', postQuery);

export default router;