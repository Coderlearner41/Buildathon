"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const policies = [
  {
    id: '1',
    company: 'HDFC Life',
    product: 'Click 2 Protect Life',
    type: 'Term Life Insurance',
    annualPremium: '₹12,000/year',
    coverage: '₹1 Crore',
    policyTenure: '30 years',
    rating: 4.5,
    highlights: [
      'No medical tests up to 50L',
      'Quick claim settlement',
      'Waiver of premium',
    ],
    riders: ['Accidental Death', 'Critical Illness', 'Waiver of Premium'],
  },
  {
    id: '2',
    company: 'ICICI Prudential',
    product: 'iProtect Smart',
    type: 'Term Life Insurance',
    annualPremium: '₹11,500/year',
    coverage: '₹1.2 Crore',
    policyTenure: '25 years',
    rating: 4.2,
    highlights: [
      'Flexible payout options',
      'Lower premium for non-smokers',
      'Increase coverage on life events',
    ],
    riders: ['Accidental Death', 'Critical Illness'],
  },
  {
    id: '3',
    company: 'Bajaj Allianz',
    product: 'Smart Protect Goal',
    type: 'Term Life Insurance',
    annualPremium: '₹13,000/year',
    coverage: '₹1 Crore',
    policyTenure: '35 years',
    rating: 4.8,
    highlights: [
      'Lump-sum, monthly income or part lump-sum part income payouts.',
      'Comprehensive coverage.',
    ],
    riders: ['Critical Illness', 'Accidental Death'],
  },
];

const App = () => {
  const [shortlisted, setShortlisted] = useState<typeof policies>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showShortlisted, setShowShortlisted] = useState(false);
  const [showComparison, setShowComparison] = useState(false);

  const handleSwipe = (direction: 'shortlist' | 'reject') => {
    if (direction === 'shortlist') {
      setShortlisted((prev) => [...prev, policies[currentIndex]]);
    }
    setCurrentIndex((prev) => (prev + 1));
  };

  const handleRemove = (policyId: string) => {
    setShortlisted((prev) => prev.filter((p) => p.id !== policyId));
  };

  const renderSwipeableCard = () => {
    if (currentIndex >= policies.length) {
      return (
        <div className="text-center text-gray-600 mt-20">
          <p className="text-xl font-semibold">No more policies to compare.</p>
          <p className="mt-2">Please shortlist policies to view the comparison.</p>
          <button
            onClick={() => setShowShortlisted(true)}
            className="mt-6 px-6 py-2 bg-emerald-500 text-white font-semibold rounded-md hover:bg-emerald-600 transition-colors"
          >
            View Shortlisted Policies
          </button>
        </div>
      );
    }
    const policy = policies[currentIndex];
    return (
      <AnimatePresence>
        <motion.div
          key={policy.id}
          className="relative bg-white rounded-xl shadow-lg p-8 w-full max-w-sm mx-auto flex flex-col items-center"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
        >
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-900">{policy.company}</h2>
            <p className="text-md text-gray-600 mt-1">{policy.product}</p>
            <span className="inline-block mt-2 px-2 py-1 text-xs font-medium text-gray-500 bg-gray-100 rounded-full">
              {policy.type}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6 w-full text-center">
            <div className="bg-gray-50 p-4 rounded-md">
              <span className="block text-xl font-semibold text-emerald-600">{policy.annualPremium}</span>
              <p className="text-sm text-gray-500">Annual Premium</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-md">
              <span className="block text-xl font-semibold text-emerald-600">{policy.coverage}</span>
              <p className="text-sm text-gray-500">Coverage</p>
            </div>
          </div>
          
          <div className="flex items-center mt-4">
            <span className="text-yellow-400">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M10.788 3.21c.44-.949 1.768-.949 2.206 0l.448.968a1.05 1.05 0 00.785.578l1.04.152c1.026.15 1.43 1.488.665 2.212l-.768.751a1.05 1.05 0 00-.317.925l.182 1.036c.18.995-.824 1.76-1.745 1.25l-.94-.522a1.05 1.05 0 00-1.02 0l-.94.522c-.92.51-1.924-.255-1.745-1.25l.182-1.036a1.05 1.05 0 00-.317-.925l-.768-.751c-.765-.724-.36-2.062.665-2.212l1.04-.152a1.05 1.05 0 00.785-.578l.448-.968z" clipRule="evenodd" />
              </svg>
            </span>
            <span className="ml-1 text-gray-700 font-semibold">{policy.rating}</span>
            <span className="ml-1 text-gray-400">/5.0</span>
          </div>

          <div className="mt-6 w-full">
            <h4 className="text-sm font-semibold text-gray-800">Key Highlights</h4>
            <ul className="mt-2 space-y-1 text-sm text-gray-600">
              {policy.highlights.map((h, i) => (
                <li key={i} className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-emerald-500 flex-shrink-0">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 w-full">
            <h4 className="text-sm font-semibold text-gray-800">Available Riders</h4>
            <div className="mt-2 flex flex-wrap gap-2">
              {policy.riders.map((r, i) => (
                <span key={i} className="px-3 py-1 bg-gray-100 text-xs font-medium text-gray-600 rounded-full">
                  {r}
                </span>
              ))}
            </div>
          </div>

          <div className="flex w-full space-x-4 mt-8">
            <button
              onClick={() => handleSwipe('reject')}
              className="flex-1 py-2 text-sm font-semibold text-red-500 border border-red-500 rounded-md hover:bg-red-50 transition-colors"
            >
              Reject
            </button>
            <button
              onClick={() => handleSwipe('shortlist')}
              className="flex-1 py-2 text-sm font-semibold text-white bg-emerald-500 rounded-md hover:bg-emerald-600 transition-colors"
            >
              Shortlist
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  };

  const renderShortlisted = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Shortlisted Policies ({shortlisted.length})</h2>
        <button
          onClick={() => setShowComparison(true)}
          disabled={shortlisted.length === 0}
          className="px-4 py-2 bg-emerald-500 text-white font-semibold rounded-md disabled:bg-gray-400 hover:bg-emerald-600 transition-colors"
        >
          Compare Policies
        </button>
      </div>

      <div className="space-y-4">
        {shortlisted.map((policy) => (
          <div key={policy.id} className="flex justify-between items-center p-4 rounded-md border border-gray-200">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{policy.company}</h3>
              <p className="text-sm text-gray-600">{policy.product}</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-lg font-bold text-emerald-600">{policy.annualPremium}</span>
              <button
                onClick={() => handleRemove(policy.id)}
                className="text-red-500 hover:text-red-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );

  const renderComparisonTable = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Recommended Policies</h2>
        <button
          onClick={() => setShowShortlisted(true)}
          className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-md hover:bg-gray-300 transition-colors"
        >
          Back to Shortlisted
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full table-fixed divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Features</th>
              {shortlisted.map((policy) => (
                <th key={policy.id} className="w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">{policy.company}</h3>
                    <p className="text-xs text-gray-500">{policy.product}</p>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Annual Premium</td>
              {shortlisted.map((policy) => (
                <td key={policy.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className="text-emerald-600 font-bold">{policy.annualPremium}</span>
                </td>
              ))}
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Coverage Amount</td>
              {shortlisted.map((policy) => (
                <td key={policy.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className="font-semibold">{policy.coverage}</span>
                </td>
              ))}
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Policy Tenure</td>
              {shortlisted.map((policy) => (
                <td key={policy.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {policy.policyTenure}
                </td>
              ))}
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Rating</td>
              {shortlisted.map((policy) => (
                <td key={policy.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center">
                    <span className="text-yellow-400">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M10.788 3.21c.44-.949 1.768-.949 2.206 0l.448.968a1.05 1.05 0 00.785.578l1.04.152c1.026.15 1.43 1.488.665 2.212l-.768.751a1.05 1.05 0 00-.317.925l.182 1.036c.18.995-.824 1.76-1.745 1.25l-.94-.522a1.05 1.05 0 00-1.02 0l-.94.522c-.92.51-1.924-.255-1.745-1.25l.182-1.036a1.05 1.05 0 00-.317-.925l-.768-.751c-.765-.724-.36-2.062.665-2.212l1.04-.152a1.05 1.05 0 00.785-.578l.448-.968z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="ml-1 font-semibold">{policy.rating}</span>
                  </div>
                </td>
              ))}
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Available Riders</td>
              {shortlisted.map((policy) => (
                <td key={policy.id} className="px-6 py-4 text-sm text-gray-500">
                  <div className="flex flex-wrap gap-2">
                    {policy.riders.map((r, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-100 text-xs font-medium text-gray-600 rounded-full">
                        {r}
                      </span>
                    ))}
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className="flex justify-center space-x-4 mt-8">
        <button className="px-6 py-2 bg-emerald-500 text-white font-semibold rounded-md hover:bg-emerald-600 transition-colors">
          Generate Client Proposal
        </button>
        <button className="px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-md hover:bg-gray-300 transition-colors">
          Export Comparison
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="bg-gray-100 min-h-screen p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              {showComparison ? "Recommended Policies" : "Policy Comparison"}
            </h1>
            <p className="text-gray-600">
              {showComparison
                ? `${shortlisted.length} policies shortlisted for comparison`
                : "Swipe right to shortlist, left to reject"}
            </p>
          </div>
          {!showComparison && (
            <button
              onClick={() => setShowShortlisted(!showShortlisted)}
              className="px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors"
            >
              {showShortlisted ? "Back to Swiping" : "View Shortlisted"}
            </button>
          )}
          {showComparison && (
             <button
              onClick={() => {
                setShowShortlisted(false);
                setShowComparison(false);
              }}
              className="px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors"
             >
              Back
             </button>
          )}
        </div>
        
        {!showShortlisted && !showComparison && (
          <div className="flex flex-col items-center">
            {renderSwipeableCard()}
          </div>
        )}
        {showShortlisted && !showComparison && renderShortlisted()}
        {showComparison && shortlisted.length > 0 && renderComparisonTable()}
      </div>
    </div>
  );
};

export default App;
