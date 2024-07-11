import express from "express";
import {
  deployTransactionContract,
  deployTransactionDetailContract,
  deployTokenContract,
  deployCampaignContract
} from "../controllers/web3Controller.js";

import { validateTokenDeploySmartContract } from "../middleware/validateToken.js";

const router = express.Router();

router.use(validateTokenDeploySmartContract);

router.get("/deploy/transaction", deployTransactionContract);
router.get("/deploy/transaction-detail", deployTransactionDetailContract);
router.get("/deploy/token", deployTokenContract);
router.get("/deploy/campaign", deployCampaignContract);

export default router;
