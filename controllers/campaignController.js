import { validationResult } from "express-validator";

// service
import {
  getCampaigns as getCampaignsService,
  getCampaignDetails as getCampaignDetailsService,
} from "../services/campaignService.js";

// request validation
import {
  validateAddCampaign,
} from "../requests/campaignRequest.js";

// queue
import {
  addCampaignToQueue,
} from "../queue/campaignQueue.js";
import { consoleForDevelop } from "../config/app.js";

// GET
export const getCampaigns = async (req, res) => {
  consoleForDevelop("Get Transactions Process [Controller]", "header");
  try {
    const transactions = await getCampaignsService();
    if (!transactions.length) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    // untuk nilai BigInt dalam setiap objek transaksi dikonversi menjadi string
    const serializedTransactions = transactions.map(transaction =>
      Object.fromEntries(
        Object.entries(transaction).map(([key, value]) =>
          [key, typeof value === 'bigint' ? value.toString() : value]
        )
      )
    );

    return res.status(200).json({
      message: "Transactions fetched successfully",
      data: serializedTransactions,
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getCampaignDetails = async (req, res) => {
  consoleForDevelop("Get Transaction by Code Process [Controller]", "header");
  try {
    const transaction = await getCampaignDetailsService(
      req.params.id
    );
    if (transaction.length === 0) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    return res.status(200).json({
      message: "Transaction fetched successfully",
      data: transaction,
    });
  } catch (error) {
    console.error("Error fetching transaction by code:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


// POST
export const addCampaign = async (req, res) => {
  consoleForDevelop("Add Transaction Process [Controller]", "header");
  try {
    consoleForDevelop("Validating transaction data [Controller]");
    Promise.all(
      validateAddCampaign.map((validator) => validator.run(req))
    ).then(() => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      addCampaignToQueue(req.body);
      return res.status(200).json({
        message: "Transaction add in progress...",
      });
    });
  } catch (error) {
    console.error("Error adding transaction:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};