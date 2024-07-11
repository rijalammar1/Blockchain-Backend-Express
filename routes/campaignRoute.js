import express from "express";
import {
    getCampaigns,
    getCampaignDetails,
    addCampaign,
} from "../controllers/campaignController.js";
import { validateTokenGeneral } from "../middleware/validateToken.js";

const router = express.Router();

router.use(validateTokenGeneral);

// GET
router.get("/", getCampaigns);
router.get("/campaign/:id", getCampaignDetails);

// POST
router.post("/", addCampaign);

export default router;
