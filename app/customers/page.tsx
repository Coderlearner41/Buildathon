"use client"

import React, { useState } from 'react';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const policiesData: Record<string, { id: string; type: string; premium: string; renewal: string; status: string; }[]> = {
  "1": [
    { id: "LIC-12345", type: "Term Life", premium: "₹25,000", renewal: "Mar 15, 2024", status: "Pending" },
    { id: "HLT-67890", type: "Health", premium: "₹20,000", renewal: "Jun 20, 2024", status: "Paid" },
  ],
  "2": [
    { id: "MTR-54321", type: "Motor", premium: "₹18,500", renewal: "Apr 8, 2024", status: "Paid" },
    { id: "TRV-98765", type: "Travel", premium: "₹10,000", renewal: "Nov 1, 2024", status: "Pending" },
  ],
};

const customers = [
  { id: "1", name: "Rajesh Kumar", phone: "+91 98765 43210", email: "rajesh@email.com", policiesCount: 2, nextRenewal: "Mar 15, 2024" },
  { id: "2", name: "Priya Sharma", phone: "+91 87654 32109", email: "priya@email.com", policiesCount: 2, nextRenewal: "Apr 8, 2024" },
];

const App = () => {
  const [expandedCustomer, setExpandedCustomer] = useState<string | null>(null);

  const toggleExpand = (customerId: string) => {
    setExpandedCustomer(expandedCustomer === customerId ? null : customerId);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Customers</h1>
            <p className="text-gray-600">Manage your customer relationships and policies</p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <span>Add Customer</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search customers by name or phone..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
          />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2">
            <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.594 5.558L21.56 21.56a.75.75 0 11-1.06-1.06l-4.722-4.722A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
          </svg>
        </div>

        {/* Customer Directory */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Customer Directory ({customers.length})
          </h2>
          <div className="space-y-4">
            {customers.map((customer) => (
              <div key={customer.id}>
                <div
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50 transition-colors"
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
                  <div className="flex items-center space-x-6 text-sm text-gray-600">
                    <span className="min-w-[120px] text-right">{customer.policiesCount} Policies</span>
                    <span className="min-w-[120px] text-right">
                      Next Renewal <br />
                      <span className="font-semibold text-gray-900">{customer.nextRenewal}</span>
                    </span>
                    <div className="flex items-center space-x-4">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500 hover:text-emerald-500 cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500 hover:text-emerald-500 cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.182.44L14.47 17.5a19.167 19.167 0 01-2.326-3.04l-.066-.088-.066-.088a19.167 19.167 0 01-3.04-2.326l-1.424-1.424c-.385-.28-.55-.742-.44-1.182L5.44 5.597c-.125-.501-.575-.852-1.091-.852H2.25A2.25 2.25 0 000 6.75z" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500 hover:text-emerald-500 cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    </div>
                  </div>
                </div>
                {expandedCustomer === customer.id && (
                  <div className="mt-2 pl-12 pr-4 py-4 bg-gray-50 rounded-md">
                    <h4 className="text-sm font-semibold text-gray-800 mb-2">Policy Details</h4>
                    <div className="space-y-3">
                      {policiesData[customer.id]?.map((policy) => (
                        <div key={policy.id} className="flex justify-between items-center p-3 bg-white border border-gray-200 rounded-md">
                          <div className="flex-1">
                            <h5 className="font-semibold text-gray-900">{policy.id} • <span className="text-gray-600">{policy.type}</span></h5>
                            <p className="text-xs text-gray-500">Premium: {policy.premium} • Renewal: {policy.renewal}</p>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              policy.status === "Pending" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"
                            }`}>
                              {policy.status}
                            </span>
                            <button className="px-3 py-1 text-sm bg-black text-white rounded-md hover:bg-gray-300 transition-colors">
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
    </div>
  );
};

export default App;
