import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import RiskMonitorPage from './RiskMonitorPage';
import mockInitialRisks, { getFreshMockRisks } from '../../mockData/risks'; // Uses the __mocks__ version

// Mock the PageTemplate component as it's not relevant to these unit tests
jest.mock('@/components/Common/PageTemplate', () => ({ children, title }) => (
  <div>
    <h1>{title}</h1>
    {children}
  </div>
));

// Mock react-router-dom's useNavigate
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // import and retain default behavior
  useNavigate: () => mockedNavigate,
}));

describe('RiskMonitorPage', () => {
  // Use a fresh set of mock data for each test to avoid interference
  let currentMockRisks;

  beforeEach(() => {
    currentMockRisks = getFreshMockRisks();
    // Reset a specific module mock if its internal state changes,
    // or re-import if the mock itself needs to be reset.
    // For this case, `getFreshMockRisks` handles data isolation.
    // If RiskMonitorPage imported `mockInitialRisks` directly AND modified it,
    // we'd need to reset that module. However, it uses useState with initialMockRisks.
    jest.mock('../../mockData/risks.js', () => {
      const originalModule = jest.requireActual('../../mockData/__mocks__/risks.js');
      return {
        __esModule: true,
        ...originalModule,
        default: getFreshMockRisks(), // Provide a fresh copy for each test suite run
      };
    });
    mockedNavigate.mockClear(); // Clear navigate mock calls before each test
  });

  const renderComponent = (risks = currentMockRisks) => {
    // Override the mock for this specific render if custom risks are provided
    if (risks !== currentMockRisks) {
        jest.mock('../../mockData/risks.js', () => {
            const originalModule = jest.requireActual('../../mockData/__mocks__/risks.js');
            return {
              __esModule: true,
              ...originalModule,
              default: risks,
            };
          });
    }

    return render(
      <MemoryRouter initialEntries={['/applications/risk']}>
        <Routes>
          <Route path="/applications/risk" element={<RiskMonitorPage />} />
          <Route path="/applications/risk/:riskId" element={<div>Mock Risk Detail Page</div>} />
        </Routes>
      </MemoryRouter>
    );
  };

  describe('Rendering', () => {
    test('renders correctly with a list of risks', () => {
      renderComponent();
      expect(screen.getByText('风险预警监控')).toBeInTheDocument(); // From PageTemplate mock
      expect(screen.getByText(currentMockRisks[0].id)).toBeInTheDocument();
      expect(screen.getByText(currentMockRisks[1].id)).toBeInTheDocument();
    });

    test('renders table headers correctly', () => {
      renderComponent();
      expect(screen.getByText('ID')).toBeInTheDocument();
      expect(screen.getByText('Timestamp')).toBeInTheDocument();
      expect(screen.getByText('Severity')).toBeInTheDocument();
      expect(screen.getByText('Category')).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();
      expect(screen.getByText('Status')).toBeInTheDocument();
      expect(screen.getByText('Entity')).toBeInTheDocument();
      expect(screen.getByText('Actions')).toBeInTheDocument();
    });

    test('renders the correct number of risk rows', () => {
      renderComponent();
      // Each risk generates a row, find by role or a common element within rows
      // Excluding header row, so length of mockRisks
      const rows = screen.getAllByRole('row');
      expect(rows.length).toBe(currentMockRisks.length + 1); // +1 for the header row
    });

    test('shows "No risk warnings found." message if data is empty', () => {
      renderComponent([]); // Pass empty array to mock
      expect(screen.getByText('No risk warnings found.')).toBeInTheDocument();
    });
  });

  describe('Actions (State Updates)', () => {
    test('Acknowledge button works and updates status', async () => {
      renderComponent();
      const riskToAcknowledge = currentMockRisks.find(r => r.status === 'New');
      expect(riskToAcknowledge).toBeDefined();

      // Find the Acknowledge button for the specific risk
      // Buttons might not have unique text, so find row then button
      const riskRow = screen.getByText(riskToAcknowledge.id).closest('tr');
      const acknowledgeButton = Array.from(riskRow.querySelectorAll('button')).find(btn => btn.textContent === 'Acknowledge');
      
      expect(acknowledgeButton).not.toBeDisabled();
      fireEvent.click(acknowledgeButton);

      await waitFor(() => {
        // Status in the UI should update
        expect(riskRow.textContent).toContain('Acknowledged');
        // Button should now be disabled
        expect(acknowledgeButton).toBeDisabled();
      });
    });

    test('Resolve button works and updates status', async () => {
      renderComponent();
      const riskToResolve = currentMockRisks.find(r => r.status === 'New'); // Or 'Acknowledged'
      expect(riskToResolve).toBeDefined();

      const riskRow = screen.getByText(riskToResolve.id).closest('tr');
      const resolveButton = Array.from(riskRow.querySelectorAll('button')).find(btn => btn.textContent === 'Resolve');
      
      expect(resolveButton).not.toBeDisabled();
      fireEvent.click(resolveButton);

      await waitFor(() => {
        expect(riskRow.textContent).toContain('Resolved');
        // Both buttons should be disabled or Resolve button could be gone/disabled
        const ackButton = Array.from(riskRow.querySelectorAll('button')).find(btn => btn.textContent === 'Acknowledge');
        if(ackButton) expect(ackButton).toBeDisabled();
        expect(resolveButton).toBeDisabled();
      });
    });

    test('buttons are appropriately disabled', () => {
      renderComponent();
      const acknowledgedRisk = currentMockRisks.find(r => r.status === 'Acknowledged');
      const resolvedRisk = currentMockRisks.find(r => r.status === 'Resolved');

      if (acknowledgedRisk) {
        const ackRow = screen.getByText(acknowledgedRisk.id).closest('tr');
        const ackButtonOnAckRow = Array.from(ackRow.querySelectorAll('button')).find(btn => btn.textContent === 'Acknowledge');
        expect(ackButtonOnAckRow).toBeDisabled();
        const resolveButtonOnAckRow = Array.from(ackRow.querySelectorAll('button')).find(btn => btn.textContent === 'Resolve');
        expect(resolveButtonOnAckRow).not.toBeDisabled();
      }

      if (resolvedRisk) {
        const resolvedRow = screen.getByText(resolvedRisk.id).closest('tr');
        const ackButtonOnResolved = Array.from(resolvedRow.querySelectorAll('button')).find(btn => btn.textContent === 'Acknowledge');
        const resolveButtonOnResolved = Array.from(resolvedRow.querySelectorAll('button')).find(btn => btn.textContent === 'Resolve');
        expect(ackButtonOnResolved).toBeDisabled();
        expect(resolveButtonOnResolved).toBeDisabled();
      }
    });
  });

  describe('Navigation (Mocked)', () => {
    test('clicking risk ID navigates to detail page', () => {
      renderComponent();
      const riskToView = currentMockRisks[0];
      const riskIdLink = screen.getByText(riskToView.id); // This is the Link
      
      fireEvent.click(riskIdLink);
      
      // Check if the URL changed in MemoryRouter (or if navigate was called if Link is more complex)
      // For simple <Link to="...">, checking the content of the destination route is one way.
      expect(screen.getByText('Mock Risk Detail Page')).toBeInTheDocument(); 
      // Or, if Link directly used `navigate`, you'd check `mockedNavigate`
      // In this setup, MemoryRouter handles the navigation state.
    });
  });
});
