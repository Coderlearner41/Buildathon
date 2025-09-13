"use client"

import React, { useState } from 'react';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import AddPolicyForm from '../../components/AddPolicyForm';
import PolicyDetailsForm from '../../components/policy-view';


const policiesData: Record<string, { id: string; type: string; premium: string; renewal: string; status: string; insuranceCompany: string; planName: string; startDate: string; endDate: string; }[]> = {
  "1": [
    { id: "LIC-12345", type: "Term Life", premium: "₹25,000", renewal: "Mar 15, 2024", status: "Pending", insuranceCompany: "LIC", planName: "Jeevan Anand", startDate: "Mar 15, 2023", endDate: "Mar 15, 2043" },
    { id: "HLT-67890", type: "Health", premium: "₹20,000", renewal: "Jun 20, 2024", status: "Paid", insuranceCompany: "Star Health", planName: "Family Health Optima", startDate: "Jun 20, 2023", endDate: "Jun 20, 2024" },
  ],
  "2": [
    { id: "MTR-54321", type: "Motor", premium: "₹18,500", renewal: "Apr 8, 2024", status: "Paid", insuranceCompany: "Bajaj Allianz", planName: "Car Insurance", startDate: "Apr 8, 2023", endDate: "Apr 8, 2024" },
    { id: "TRV-98765", type: "Travel", premium: "₹10,000", renewal: "Nov 1, 2024", status: "Pending", insuranceCompany: "ICICI Lombard", planName: "Overseas Travel", startDate: "Nov 1, 2023", endDate: "Nov 1, 2024" },
  ],
};

const customers = [
  { id: "1", name: "Rajesh Kumar", phone: "+91 98765 43210", email: "rajesh@email.com", policiesCount: 2, nextRenewal: "Mar 15, 2024" },
  { id: "2", name: "Priya Sharma", phone: "+91 87654 32109", email: "priya@email.com", policiesCount: 2, nextRenewal: "Apr 8, 2024" },
];

const App = () => {
    type Policy = {
      id: string;
      type: string;
      premium: string;
      renewal: string;
      status: string;
      insuranceCompany: string;
      planName: string;
      startDate: string;
      endDate: string;
    };

    const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);
    const [formMode, setFormMode] = useState<"customer" | "policy" | null>(null);
    
  const [expandedCustomer, setExpandedCustomer] = useState<string | null>(null);
  const [showFormFor, setShowFormFor] = useState<string | null>(null);

  const toggleForm = (customerId: string) => {
    setShowFormFor(showFormFor === customerId ? null : customerId);
  };

  const toggleExpand = (customerId: string) => {
    setExpandedCustomer(expandedCustomer === customerId ? null : customerId);
  };

  return (
    <div className="min-h-screen p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <p className="text-gray-600 font-inter text-[18px] sm:text-[20px]">
              Manage your customer relationships and policies
            </p>
          </div>
          <button className="flex items-center space-x-2 px-5 py-2.5 bg-[#00BDAA] text-white font-inter text-[26px] rounded-[15px] hover:opacity-90     transition-colors" onClick={() => setFormMode("customer")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            <span >Add Customer</span>
          </button>
        </div>


        {/* Search Bar */}
        <div className="relative mb-8">
          <div className="w-full rounded-[30px] bg-white px-3 py-2 flex items-center border">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 text-gray-400 ml-1"
            >
              <path
                fillRule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.594 5.558L21.56 21.56a.75.75 0 11-1.06-1.06l-4.     722-4.722A8.25 8.25 0 012.25 10.5z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="text"
              placeholder="search customer by name or phone..."
              className="flex-1 ml-2 bg-gray-100 text-gray-700 placeholder-gray-400 rounded-[20px] px-4 py-2 focus:outline-none focus:ring-1     focus:ring-gray-400"
            />
          </div>
        </div>
        {/* Customer Directory */}
        <div className="bg-white rounded-[30px] shadow-2xs shadow-[0_-10px_10px_rgba(0,0,0,0.1)] p-6">
            <h2 className="text-lg text-[37px] font-semibold text-gray-800 mb-4">
                Customer Directory ({customers.length})
            </h2>
          <div className="space-y-4">
              {customers.map((customer) => (
                  <div key={customer.id} className="border border-gray-200 rounded-[30px] shadow-[0_6px_16px_rgba(0,0,0,0.1)] overflow-hidden">
                      {/* Customer Row */}
                      <div
                        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => toggleExpand(customer.id)}
                      >
                        <div className="flex items-center space-x-3">
                          {expandedCustomer === customer.id ? (
                            <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                          ) : (
                            <ChevronRightIcon className="w-5 h-5 text-gray-500" />
                          )}
                          <div>
                            <h3 className="text-base font-semibold text-gray-900">{customer.name}</h3>
                            <p className="text-sm text-gray-500">
                              {customer.phone} • {customer.email}
                            </p>
                          </div>
                        </div>
                      
                        <div className="flex items-center space-x-8 text-sm text-gray-600">
                          <span className="min-w-[90px] text-right">
                            {customer.policiesCount} {customer.policiesCount > 1 ? "Policies" : "Policy"}
                          </span>
                          <span className="min-w-[120px] text-right">
                            Next Renewal <br />
                            <span className="font-semibold text-gray-900">{customer.nextRenewal}</span>
                          </span>
                          <button
                            className="flex items-center space-x-1 text-gray-700 font-medium hover:text-emerald-600"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleForm(customer.id);
                            }}
                          >
                              <div className="flex flex-col items-center space-y-1" onClick={() => setFormMode("policy")}>
                              <div className="w-6 h-6 flex items-center justify-center border border-gray-700 rounded-full text-lg leading-none">
                                +
                              </div>
                              <div >Add New Policy</div>
                              </div>
                          </button>
                        </div>
                      </div>
                      
                {/* Expanded Section */}
                {expandedCustomer === customer.id && (
                  <div className="mt-2 pl-12 pr-4 py-4 bg-gray-50 rounded-b-[30px]">
                    <h4 className="text-sm font-semibold text-gray-800 mb-2">Policy Details</h4>
                    <div className="space-y-3">
                      {policiesData[customer.id]?.map((policy) => (
                        <div
                          key={policy.id}
                          className="flex justify-between items-center p-3 bg-gray-200 rounded-[20px]"
                        >
                          <div className="flex-1">
                            <h5 className="font-semibold text-gray-900">
                              {policy.id}{" "}
                              <span className="ml-2 px-2 py-0.5 rounded-full bg-gray-300 text-xs">
                                {policy.type}
                              </span>
                            </h5>
                            <p className="text-xs text-gray-600">
                              Premium: {policy.premium} • Renewal: {policy.renewal}
                            </p>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                policy.status === "Pending"
                                  ? "bg-teal-500 text-white"
                                  : "bg-green-600 text-white"
                              }`}
                            >
                              {policy.status.toLowerCase()}
                            </span>
                            <button className="px-3 py-1 text-sm text-black hover:text-white border border-gray-300 rounded-full   hover:bg-black" onClick={() => setSelectedPolicy(policy)}>
                              View
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
      {selectedPolicy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-[30px] max-w-4xl w-full p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
              onClick={() => setSelectedPolicy(null)}
            >
              ✕
            </button>
            <PolicyDetailsForm policy={selectedPolicy} />
          </div>
        </div>
      )}
       {formMode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-[30px] max-w-4xl w-full p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
              onClick={() => setFormMode(null)}
            >
              ✕
            </button>
            {/* Pass mode to form */}
            <AddPolicyForm />  
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
