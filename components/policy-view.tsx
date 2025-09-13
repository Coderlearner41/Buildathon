"use client"

import React from "react";

interface Policy {
  id: string;
  type: string;
  insuranceCompany: string;
  planName: string;
  startDate: string;
  endDate: string;
  nomineeName: string;
  nomineeRelation: string;
  nomineeContact: string;
}

interface PolicyDetailsFormProps {
  policy: Policy;
}

const PolicyDetailsForm: React.FC<PolicyDetailsFormProps> = ({ policy }) => {
  return (
    <div className="bg-white rounded-[30px] shadow p-6">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{policy.id}</h2>
        <span className="px-3 py-1 text-sm bg-gray-100 text-black rounded-full border">
          {policy.type}
        </span>
      </div>

      {/* Policy Information */}
      <h3 className="text-lg font-semibold text-gray-800 mb-3">
        Policy Information
      </h3>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Insurance Company
          </label>
          <input
            type="text"
            value={policy.insuranceCompany}
            readOnly
            className="w-full px-3 py-2 border rounded-lg bg-gray-50"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Policy Plan / Product Name
          </label>
          <input
            type="text"
            value={policy.planName}
            readOnly
            className="w-full px-3 py-2 border rounded-lg bg-gray-50"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Policy Start Date
          </label>
          <input
            type="text"
            value={policy.startDate}
            readOnly
            className="w-full px-3 py-2 border rounded-lg bg-gray-50"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Policy End Date
          </label>
          <input
            type="text"
            value={policy.endDate}
            readOnly
            className="w-full px-3 py-2 border rounded-lg bg-gray-50"
          />
        </div>
      </div>

      {/* Nominee Information */}
      <h3 className="text-lg font-semibold text-gray-800 mb-3">
        Nominee Information
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block text-sm text-gray-600 mb-1">Nominee Name</label>
          <input
            type="text"
            value={policy.nomineeName}
            readOnly
            className="w-full px-3 py-2 border rounded-lg bg-gray-50"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Relationship to Policy Holder
          </label>
          <input
            type="text"
            value={policy.nomineeRelation}
            readOnly
            className="w-full px-3 py-2 border rounded-lg bg-gray-50"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Nominee Contact</label>
          <input
            type="text"
            value={policy.nomineeContact}
            readOnly
            className="w-full px-3 py-2 border rounded-lg bg-gray-50"
          />
        </div>
      </div>
    </div>
  );
};

export default PolicyDetailsForm;
