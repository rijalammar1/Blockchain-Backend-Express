import { body } from "express-validator";

export const validateAddCampaign = [
  body("id").isString(),
  body("projectId").isString(),
  body("campaignCode").isString(),
  body("approvedAmount").isNumeric(),
  body("offeredTokenAmount").isNumeric(),
  body("pricePerUnit").isNumeric(),
  body("minimumPurchase").isNumeric(),
  body("maximumPurchase").isNumeric(),
  body("fundraisingPeriodStart").isNumeric(),
  body("fundraisingPeriodEnd").isNumeric(),
];
