// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CampaignContract {
    address public owner;
    uint256 private campaignCount;
    string[] private campaignIds;

    struct Campaign {
        string id;
        string projectId;
        string campaignCode;
        uint256 approvedAmount;
        uint256 offeredTokenAmount;
        uint256 pricePerUnit;
        uint256 minimumPurchase;
        uint256 maximumPurchase;
        uint256 fundraisingPeriodStart;
        uint256 fundraisingPeriodEnd;
        uint256 soldTokenAmount;
        string status;
        uint256 createdAt;
        uint256 updatedAt;
    }

    mapping(string => Campaign) private campaigns;
    mapping(string => bool) private campaignCodeExists;

    event CampaignCreated(string indexed id, string projectId, string campaignCode);

    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }

    constructor() {
        owner = msg.sender;
        campaignCount = 0;
    }

    function createCampaign(
        string memory id,
        string memory projectId,
        string memory campaignCode,
        uint256 approvedAmount,
        uint256 offeredTokenAmount,
        uint256 pricePerUnit,
        uint256 minimumPurchase,
        uint256 maximumPurchase,
        uint256 fundraisingPeriodStart,
        uint256 fundraisingPeriodEnd
    ) public onlyOwner {
        require(!campaignCodeExists[campaignCode], "Campaign code already exists");

        campaigns[id] = Campaign({
            id: id,
            projectId: projectId,
            campaignCode: campaignCode,
            approvedAmount: approvedAmount,
            offeredTokenAmount: offeredTokenAmount,
            pricePerUnit: pricePerUnit,
            minimumPurchase: minimumPurchase,
            maximumPurchase: maximumPurchase,
            fundraisingPeriodStart: fundraisingPeriodStart,
            fundraisingPeriodEnd: fundraisingPeriodEnd,
            soldTokenAmount: 0,
            status: "pending",
            createdAt: block.timestamp,
            updatedAt: block.timestamp
        });

        campaignCodeExists[campaignCode] = true;
        campaignIds.push(id);

        emit CampaignCreated(id, projectId, campaignCode);
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](campaignIds.length);
        for (uint256 i = 0; i < campaignIds.length; i++) {
            allCampaigns[i] = campaigns[campaignIds[i]];
        }
        return allCampaigns;
    }

    // Fungsi baru untuk mendapatkan id, projectId, dan campaignCode saja
    function getCampaignDetails() public view returns (string[] memory ids, string[] memory projectIds, string[] memory campaignCodes) {
        uint256 length = campaignIds.length;
        ids = new string[](length);
        projectIds = new string[](length);
        campaignCodes = new string[](length);

        for (uint256 i = 0; i < length; i++) {
            Campaign memory campaign = campaigns[campaignIds[i]];
            ids[i] = campaign.id;
            projectIds[i] = campaign.projectId;
            campaignCodes[i] = campaign.campaignCode;
        }
    }
}
