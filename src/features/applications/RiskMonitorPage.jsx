import React, { useState, useEffect } from 'react'; // Import useState, useEffect
import { Link } from 'react-router-dom';
import PageTemplate from '@/components/Common/PageTemplate';
import initialMockRisks from '../../mockData/risks.js'; // Renamed for clarity

/**
 * 风险预警监控页面
 * 用于监控和管理风险预警
 */
const RiskMonitorPage = () => {
  const [currentRisks, setCurrentRisks] = useState(initialMockRisks);

  // Effect to log changes to currentRisks, useful for debugging
  // useEffect(() => {
  //   console.log("currentRisks updated:", currentRisks);
  // }, [currentRisks]);

  const handleAcknowledge = (riskId) => {
    setCurrentRisks(prevRisks =>
      prevRisks.map(risk =>
        risk.id === riskId ? { ...risk, status: 'Acknowledged' } : risk
      )
    );
  };

  const handleResolve = (riskId) => {
    setCurrentRisks(prevRisks =>
      prevRisks.map(risk =>
        risk.id === riskId ? { ...risk, status: 'Resolved' } : risk
      )
    );
  };

  // Function to format timestamp for better readability
  const formatTimestamp = (isoString) => {
    if (!isoString) return 'N/A';
    const date = new Date(isoString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <PageTemplate title="风险预警监控">
      <div className="bg-white shadow rounded-lg p-4 sm:p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entity</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentRisks && currentRisks.length > 0 ? (
                currentRisks.map((risk) => (
                  <tr key={risk.id} className={`hover:bg-gray-50 ${
                    risk.status === 'Resolved' ? 'bg-green-50' : ''
                  }`}>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <Link to={`/applications/risk/${risk.id}`} className="text-blue-600 hover:text-blue-800 hover:underline">
                        {risk.id}
                      </Link>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{formatTimestamp(risk.timestamp)}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        risk.severity === 'High' ? 'bg-red-100 text-red-800' :
                        risk.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {risk.severity}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{risk.category}</td>
                    <td className="px-4 py-4 text-sm text-gray-500 max-w-xs truncate" title={risk.description}>{risk.description}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        risk.status === 'New' ? 'bg-blue-100 text-blue-800' :
                        risk.status === 'Acknowledged' ? 'bg-yellow-100 text-yellow-800' :
                        risk.status === 'Investigating' ? 'bg-purple-100 text-purple-800' :
                        risk.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800' // Default/fallback
                      }`}>
                        {risk.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{risk.entity}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleAcknowledge(risk.id)}
                        disabled={risk.status !== 'New'}
                        className={`px-3 py-1 text-xs font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                          risk.status === 'New'
                            ? 'bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-400'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        Acknowledge
                      </button>
                      <button
                        onClick={() => handleResolve(risk.id)}
                        disabled={!(risk.status === 'New' || risk.status === 'Acknowledged' || risk.status === 'Investigating')}
                        className={`px-3 py-1 text-xs font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                          (risk.status === 'New' || risk.status === 'Acknowledged' || risk.status === 'Investigating')
                            ? 'bg-green-500 hover:bg-green-600 text-white focus:ring-green-400'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        Resolve
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-4 py-4 text-center text-sm text-gray-500">
                    No risk warnings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </PageTemplate>
  );
};

export default RiskMonitorPage;
