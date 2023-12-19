import express from "express";
import {deleteQuery, getQuery, postQuery, putQuery, testingWithin} from "../controllers/test-controller.js";

const router = express.Router();

router.get('/', getQuery);
router.get('/:id', testingWithin);

router.delete('/',deleteQuery);
router.post('/', postQuery);
router.put('/', putQuery) //TODO: should be patch, and all other puts.

export default router;