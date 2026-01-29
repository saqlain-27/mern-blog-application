import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { create, getAll, getOne, like, comment, update, remove, getMine } from "../controllers/blogController.js";

const router = express.Router();

router.get("/",getAll);
router.get("/me",authMiddleware,getMine);
router.get("/:id", authMiddleware, getOne);
router.post("/:id/like", authMiddleware, like);
router.post("/:id/comment", authMiddleware, comment);
router.post("/", authMiddleware, create);
router.patch("/:id",authMiddleware,update);
router.delete("/:id",authMiddleware,remove);

export default router;
