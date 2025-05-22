// src/mockData/__mocks__/risks.js

export const mockRiskArray = [
  {
    id: "R001",
    timestamp: "2023-10-26T10:00:00Z",
    severity: "High",
    category: "Credit Risk",
    description: "Mocked: Large unsecured loan.",
    status: "New",
    entity: "Client X Corp Mock",
    recommendedAction: "Mocked: Request collateral."
  },
  {
    id: "R002",
    timestamp: "2023-10-25T14:30:00Z",
    severity: "Medium",
    category: "Market Risk",
    description: "Mocked: Currency fluctuation.",
    status: "Acknowledged",
    entity: "Portfolio FX-Global Mock",
    recommendedAction: "Mocked: Hedge exposure."
  },
  {
    id: "R003",
    timestamp: "2023-10-24T09:15:00Z",
    severity: "Low",
    category: "Operational Risk",
    description: "Mocked: Minor system outage.",
    status: "Resolved",
    entity: "Internal System Mock",
    recommendedAction: "Mocked: Monitor system."
  },
  {
    id: "R004",
    timestamp: "2023-11-01T11:00:00Z",
    severity: "High",
    category: "Fraud Risk",
    description: "Mocked: Suspicious logins.",
    status: "Investigating",
    entity: "Customer Accounts Mock",
    recommendedAction: "Mocked: Lock accounts."
  }
];

// The actual module exports a default array.
// So, the mock should also export a default array.
export default mockRiskArray;

// Helper function to get a fresh copy of mock data for each test,
// especially if tests might modify the data.
export const getFreshMockRisks = () => JSON.parse(JSON.stringify(mockRiskArray));
