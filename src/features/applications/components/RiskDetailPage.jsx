import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PageTemplate from '@/components/Common/PageTemplate';
import mockRisks from '../../../mockData/risks.js'; // Adjusted path

/**
 * Risk Detail Page
 * Displays all details of a specific risk item.
 */
const RiskDetailPage = () => {
  const { riskId } = useParams();
  const risk = mockRisks.find(r => r.id === riskId);

  // Function to format timestamp for better readability
  const formatTimestamp = (isoString) => {
    if (!isoString) return 'N/A';
    const date = new Date(isoString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  if (!risk) {
    return (
      <PageTemplate title="Risk Detail Not Found">
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <p className="text-xl text-gray-700">Risk not found.</p>
          <p className="text-gray-500 mt-2">The risk item with ID '{riskId}' could not be located.</p>
          <Link
            to="/applications/risk" // Path to RiskMonitorPage
            className="mt-6 inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-150 ease-in-out"
          >
            Back to Risk List
          </Link>
        </div>
      </PageTemplate>
    );
  }

  return (
    <PageTemplate title={`Risk Detail: ${risk.id}`}>
      <div className="bg-white shadow rounded-lg p-6">
        <div className="mb-6">
          <Link
            to="/applications/risk" // Path to RiskMonitorPage
            className="text-blue-500 hover:text-blue-700 transition duration-150 ease-in-out"
          >
            &larr; Back to Risk List
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">ID</h3>
            <p className="mt-1 text-lg text-gray-900">{risk.id}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Timestamp</h3>
            <p className="mt-1 text-lg text-gray-900">{formatTimestamp(risk.timestamp)}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Severity</h3>
            <p className="mt-1 text-lg">
              <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${
                risk.severity === 'High' ? 'bg-red-100 text-red-800' :
                risk.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {risk.severity}
              </span>
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Status</h3>
            <p className="mt-1 text-lg">
              <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${
                risk.status === 'New' ? 'bg-blue-100 text-blue-800' :
                risk.status === 'Acknowledged' ? 'bg-yellow-100 text-yellow-800' :
                risk.status === 'Investigating' ? 'bg-purple-100 text-purple-800' :
                risk.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {risk.status}
              </span>
            </p>
          </div>
          <div className="md:col-span-2">
            <h3 className="text-sm font-medium text-gray-500">Category</h3>
            <p className="mt-1 text-lg text-gray-900">{risk.category}</p>
          </div>
          <div className="md:col-span-2">
            <h3 className="text-sm font-medium text-gray-500">Entity</h3>
            <p className="mt-1 text-lg text-gray-900">{risk.entity}</p>
          </div>
          <div className="md:col-span-2">
            <h3 className="text-sm font-medium text-gray-500">Description</h3>
            <p className="mt-1 text-lg text-gray-900 whitespace-pre-wrap">{risk.description}</p>
          </div>
          <div className="md:col-span-2">
            <h3 className="text-sm font-medium text-gray-500">Recommended Action</h3>
            <p className="mt-1 text-lg text-gray-900 whitespace-pre-wrap">{risk.recommendedAction}</p>
          </div>
        </div>

        {/* Action Buttons - Display Only for Consistency */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-md font-semibold text-gray-700 mb-3">Actions</h3>
          <div className="flex items-center space-x-3">
            <button
              disabled={risk.status !== 'New'}
              className={`px-4 py-2 text-sm font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                risk.status === 'New'
                  ? 'bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-400 cursor-pointer'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Acknowledge
            </button>
            <button
              disabled={!(risk.status === 'New' || risk.status === 'Acknowledged' || risk.status === 'Investigating')}
              className={`px-4 py-2 text-sm font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                (risk.status === 'New' || risk.status === 'Acknowledged' || risk.status === 'Investigating')
                  ? 'bg-green-500 hover:bg-green-600 text-white focus:ring-green-400 cursor-pointer'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Resolve
            </button>
          </div>
          <p className="mt-3 text-xs text-gray-500">
            Note: Actions on this page are for display consistency. State changes are managed on the Risk Monitor list page.
          </p>
        </div>
      </div>
    </PageTemplate>
  );
};

export default RiskDetailPage;
