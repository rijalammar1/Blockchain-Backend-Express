import Queue from "bull";
import {
  addCampaign,
} from "../services/campaignService.js";
import dotenv from "dotenv";
import { consoleForDevelop } from "../config/app.js";

dotenv.config();

const campaignQueue = new Queue("transactions");

campaignQueue.process(5, async (job) => {
  const { data } = job;
  await addCampaign(data);
});
campaignQueue.on("failed", (job, err) => {
  console.error(`Job failed with error ${err.message}`);
});

export const addCampaignToQueue = (data) => {
  consoleForDevelop("Add Transaction Process [Queue]");
  campaignQueue.add(data, { attempts: 3, backoff: 5000, priority: 1 });
};