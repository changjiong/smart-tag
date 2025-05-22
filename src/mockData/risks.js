// Defines the structure for risk items and provides mock data.

/**
 * @typedef {Object} RiskItem
 * @property {string|number} id - Unique identifier for the risk item.
 * @property {string} timestamp - ISO date-time string when the risk was recorded.
 * @property {('High'|'Medium'|'Low')} severity - Severity level of the risk.
 * @property {string} category - Category of the risk (e.g., 'Credit Risk', 'Market Risk').
 * @property {string} description - Detailed description of the risk.
 * @property {('New'|'Acknowledged'|'Resolved'|'Investigating')} status - Current status of the risk.
 * @property {string} entity - The customer or entity associated with the risk.
 * @property {string} recommendedAction - Suggested action to mitigate the risk.
 */

/**
 * @type {RiskItem[]}
 */
const mockRisks = [
  {
    id: "R001",
    timestamp: "2023-10-26T10:00:00Z",
    severity: "High",
    category: "Credit Risk",
    description: "Large unsecured loan to a new client with a volatile credit history.",
    status: "New",
    entity: "Client X Corp",
    recommendedAction: "Request additional collateral or reduce loan amount."
  },
  {
    id: "R002",
    timestamp: "2023-10-25T14:30:00Z",
    severity: "Medium",
    category: "Market Risk",
    description: "Unexpected fluctuation in currency exchange rates affecting portfolio value.",
    status: "Investigating",
    entity: "Portfolio FX-Global",
    recommendedAction: "Hedge currency exposure or rebalance portfolio."
  },
  {
    id: "R003",
    timestamp: "2023-10-24T09:15:00Z",
    severity: "Low",
    category: "Operational Risk",
    description: "Minor system outage in a non-critical internal reporting tool.",
    status: "Acknowledged",
    entity: "Internal Reporting System",
    recommendedAction: "Monitor system performance and schedule routine maintenance."
  },
  {
    id: "R004",
    timestamp: "2023-11-01T11:00:00Z",
    severity: "High",
    category: "Fraud Risk",
    description: "Suspicious login attempts detected on multiple high-value accounts.",
    status: "New",
    entity: "Customer Accounts Group A",
    recommendedAction: "Immediately lock affected accounts and notify customers. Investigate IP addresses."
  },
  {
    id: "R005",
    timestamp: "2023-10-28T16:45:00Z",
    severity: "Medium",
    category: "Compliance Risk",
    description: "Upcoming regulatory changes require updates to KYC procedures.",
    status: "Acknowledged",
    entity: "Regulatory Body XYZ",
    recommendedAction: "Review new regulations and update internal KYC policies and training materials by Q4."
  },
  {
    id: "R006",
    timestamp: "2023-10-29T08:20:00Z",
    severity: "Low",
    category: "Liquidity Risk",
    description: "Slight decrease in short-term cash reserves, still within acceptable limits.",
    status: "New",
    entity: "Treasury Department",
    recommendedAction: "Monitor cash flow daily and prepare contingency funding plan if trend continues."
  },
  {
    id: "R007",
    timestamp: "2023-10-30T17:00:00Z",
    severity: "Medium",
    category: "Credit Risk",
    description: "Customer ABC missed a payment deadline for a medium-sized loan.",
    status: "Investigating",
    entity: "Customer ABC",
    recommendedAction: "Contact customer to understand reason for missed payment and arrange a new payment schedule."
  }
];

// Export the mock data (if using ES modules, otherwise it's globally available in a script tag)
// For Node.js/CommonJS environment:
// module.exports = mockRisks;
// For ES Modules environment:
// export default mockRisks;

// For now, let's assume this file will be directly included or imported,
// so we might not need an explicit export if it's part of a simple frontend setup.
// If this were part of a larger JS application, an export would be standard.
// For the purpose of this task, defining the array should be sufficient.
// If a specific export method is needed, the task should specify it.
console.log("Mock risks data loaded:", mockRisks.length, "records.");
