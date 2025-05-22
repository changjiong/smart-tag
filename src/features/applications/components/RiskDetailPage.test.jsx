import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import RiskDetailPage from './RiskDetailPage';
import mockInitialRisks from '../../../mockData/risks'; // Uses the __mocks__ version

// Mock the PageTemplate component
jest.mock('@/components/Common/PageTemplate', () => ({ children, title }) => (
  <div>
    <h1>{title}</h1>
    {children}
  </div>
));

// Mock react-router-dom's useParams and useNavigate
const mockedNavigate = jest.fn();
let mockRiskId = null;

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ riskId: mockRiskId }),
  useNavigate: () => mockedNavigate,
}));


describe('RiskDetailPage', () => {
  beforeEach(() => {
    mockedNavigate.mockClear();
    // Ensure the mock for risks.js is active if not globally mocked via jest.config.js's automock
    // For this setup, it's assumed that __mocks__ is automatically picked up.
  });

  const renderComponentWithRiskId = (id) => {
    mockRiskId = id;
    render(
      <MemoryRouter initialEntries={[`/applications/risk/${id}`]}>
        <Routes>
          <Route path="/applications/risk/:riskId" element={<RiskDetailPage />} />
          <Route path="/applications/risk" element={<div>Mock Risk List Page</div>} />
        </Routes>
      </MemoryRouter>
    );
  };

  describe('Rendering', () => {
    test('renders correctly with a valid riskId', () => {
      const validRisk = mockInitialRisks[0];
      renderComponentWithRiskId(validRisk.id);

      expect(screen.getByText(`Risk Detail: ${validRisk.id}`)).toBeInTheDocument();
      expect(screen.getByText(validRisk.id)).toBeInTheDocument(); // ID value
      // Timestamp needs formatting, check for a part of it or mock formatTimestamp if complex
      // For now, we assume formatTimestamp works and displays something.
      // A more robust test would be to check against the formatted value.
      expect(screen.getByText(new Date(validRisk.timestamp).toLocaleDateString())).toBeInTheDocument();
      expect(screen.getByText(validRisk.severity)).toBeInTheDocument();
      expect(screen.getByText(validRisk.category)).toBeInTheDocument();
      expect(screen.getByText(validRisk.description)).toBeInTheDocument();
      expect(screen.getByText(validRisk.status)).toBeInTheDocument(); // Check for the status badge text
      expect(screen.getByText(validRisk.entity)).toBeInTheDocument();
      expect(screen.getByText(validRisk.recommendedAction)).toBeInTheDocument();
    });

    test('displays "Risk not found" for an invalid riskId', () => {
      renderComponentWithRiskId('INVALID_ID_XYZ');
      expect(screen.getByText('Risk Detail Not Found')).toBeInTheDocument();
      expect(screen.getByText(/The risk item with ID 'INVALID_ID_XYZ' could not be located./)).toBeInTheDocument();
    });

    test('renders "Back to Risk List" link and it navigates correctly', () => {
      const validRisk = mockInitialRisks[0];
      renderComponentWithRiskId(validRisk.id);
      
      const backLink = screen.getByText(/Back to Risk List/i); // Use regex for flexibility
      expect(backLink).toBeInTheDocument();
      fireEvent.click(backLink);
      
      // Check if navigation occurred to the list page
      expect(screen.getByText('Mock Risk List Page')).toBeInTheDocument();
    });
  });

  describe('Action Buttons (Visual State)', () => {
    test('Acknowledge and Resolve buttons state for "New" risk', () => {
      const newRisk = mockInitialRisks.find(r => r.status === 'New');
      if (!newRisk) {
        console.warn("Mock data does not contain a 'New' risk for testing RiskDetailPage button states. Skipping specific button state test.");
        return;
      }
      renderComponentWithRiskId(newRisk.id);

      const acknowledgeButton = screen.getByRole('button', { name: /Acknowledge/i });
      const resolveButton = screen.getByRole('button', { name: /Resolve/i });

      expect(acknowledgeButton).not.toBeDisabled();
      expect(resolveButton).not.toBeDisabled();
    });

    test('Acknowledge and Resolve buttons state for "Acknowledged" risk', () => {
      const acknowledgedRisk = mockInitialRisks.find(r => r.status === 'Acknowledged');
      if (!acknowledgedRisk) {
        console.warn("Mock data does not contain an 'Acknowledged' risk for testing RiskDetailPage button states. Skipping specific button state test.");
        return;
      }
      renderComponentWithRiskId(acknowledgedRisk.id);

      const acknowledgeButton = screen.getByRole('button', { name: /Acknowledge/i });
      const resolveButton = screen.getByRole('button', { name: /Resolve/i });

      expect(acknowledgeButton).toBeDisabled();
      expect(resolveButton).not.toBeDisabled();
    });

    test('Acknowledge and Resolve buttons state for "Resolved" risk', () => {
      const resolvedRisk = mockInitialRisks.find(r => r.status === 'Resolved');
      if (!resolvedRisk) {
        console.warn("Mock data does not contain a 'Resolved' risk for testing RiskDetailPage button states. Skipping specific button state test.");
        return;
      }
      renderComponentWithRiskId(resolvedRisk.id);

      const acknowledgeButton = screen.getByRole('button', { name: /Acknowledge/i });
      const resolveButton = screen.getByRole('button', { name: /Resolve/i });

      expect(acknowledgeButton).toBeDisabled();
      expect(resolveButton).toBeDisabled();
    });
     test('Acknowledge and Resolve buttons state for "Investigating" risk', () => {
      const investigatingRisk = mockInitialRisks.find(r => r.status === 'Investigating');
      if (!investigatingRisk) {
        console.warn("Mock data does not contain an 'Investigating' risk for testing RiskDetailPage button states. Skipping specific button state test.");
        return;
      }
      renderComponentWithRiskId(investigatingRisk.id);

      const acknowledgeButton = screen.getByRole('button', { name: /Acknowledge/i });
      const resolveButton = screen.getByRole('button', { name: /Resolve/i });
      
      expect(acknowledgeButton).toBeDisabled(); // Cannot Acknowledge if Investigating
      expect(resolveButton).not.toBeDisabled(); // Can Resolve if Investigating
    });
  });
});
