import { Router } from 'express';
import { beersController } from '../controllers/beersController';

export const router = Router();

router.get("/", beersController.get);
router.get("/:id", beersController.getByID);
router.post("/", beersController.post);
router.put("/:id", beersController.put);
router.delete("/:id", beersController.delete);