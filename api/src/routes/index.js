import { Router } from "express";
import Photos from "../controllers/photos";

const router = Router();

router.get("/photos", Photos.photos);
router.get("/download", Photos.download);

export { router };
