import { createContractInstance, sendRawTx } from "../services/web3Service.js";
import { consoleForDevelop } from "../config/app.js";

// Helper function to map transaction data
const mapCampaign = (campaign) => {
  return {
    id: campaign[0].toString(),
    projectId: campaign[1].toString(),
    campaignCode: campaign[2].toString(),
    approvedAmount: campaign[3],
    offeredTokenAmount: campaign[4],
    pricePerUnit: campaign[5],
    minimumPurchase: campaign[6],
    maximumPurchase: campaign[7],
    fundraisingPeriodStart: campaign[8],
    fundraisingPeriodEnd: campaign[9],
    soldTokenAmount: campaign[10],
    status: campaign[11],
    createdAt: campaign[12],
    updatedAt: campaign[13],
  };
};

// GET 
export const getCampaigns = async () => {
  consoleForDevelop("Get Campaign Process [Transaction Service]");
  const contract = await createContractInstance("transaction");
  const campaigns = await contract.methods.getCampaigns().call();
  const mappedCampaigns = campaigns.map(mapCampaign); // Gunakan .map(mapCampaign) untuk memetakan setiap elemen
  console.log(mappedCampaigns);
  consoleForDevelop("Campaign fetched successfully", "footer");
  return mappedCampaigns;
};

export const getCampaignDetails = async (id) => {
  consoleForDevelop("Get Campaign by Id Process [Service]");
  const contract = await createContractInstance("transaction");
  // console.log("id", id);
  const campaign = await contract.methods.getCampaignDetails(id).call();
  // console.log(campaign);
  if (!campaign) {
    throw new Error("Campaign not found");
  }
  const mappedCampaign = mapCampaign(campaign);
  console.log(mappedCampaign);
  consoleForDevelop("Campaign fetched successfully", "footer");
  return mappedCampaign;
};


// POST
export const addCampaign = async (req) => {
  consoleForDevelop("Add Transaction Process [Service]");
  const {
    id,
    projectId,
    campaignCode,
    approvedAmount,
    offeredTokenAmount,
    minimumPurchase,
    maximumPurchase,
    pricePerUnit,
    fundraisingPeriodStart,
    fundraisingPeriodEnd,
  } = req;
  let arrayParams = [
    id,
    projectId,
    campaignCode,
    approvedAmount,
    offeredTokenAmount,
    minimumPurchase,
    pricePerUnit,
    maximumPurchase,
    fundraisingPeriodStart,
    fundraisingPeriodEnd,
  ];
  var response = await sendRawTx(arrayParams, "addCampaign", "transaction");
  if (response.transactionHash) {
    consoleForDevelop(
      [
        "Transaction added successfully",
        "Transaction Hash: " + response.transactionHash,
        "Transaction: " + response,
      ],
      "footer"
    );
    return response.transactionHash;
  }
};
