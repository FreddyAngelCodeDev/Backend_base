import express from "express";
import { verifyValidationToken } from "../middlewares/ValidatorTokens.js";
import { createPost, getPost } from "../controllers/post.controller.js";


const router = express.Router();


router.post('/create', verifyValidationToken, createPost); 
router.get('/getPost',verifyValidationToken,getPost);

export default router;
