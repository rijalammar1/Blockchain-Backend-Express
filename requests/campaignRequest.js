import { body } from "express-validator";

export const validateAddCampaign = [
  body("id").isString(),
  body("projectId").isString(),
  body("campaignCode").isString(),
  body("approvedAmount").isString(),
  body("offeredTokenAmount").isString(),
  body("pricePerUnit").isString(),
  body("minimumPurchase").isNumeric(),
  body("maximumPurchase").isNumeric(),
  body("fundraisingPeriodStart").isNumeric(),
  body("fundraisingPeriodEnd").isNumeric(),
];
