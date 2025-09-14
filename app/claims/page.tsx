"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

// Inline SVG icons for the app
const LuFileSignature = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <path d="M12 18h.01" />
    <path d="M15 12c-2.4 2.1-3 5-3 5s-.4-2.5-3-5c-2.4-2.1-3-4-3-4h12s-.6 1.9-3 4z" />
  </svg>
);

const LuUploadCloud = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 7.5l-2.5 2.5" />
    <polyline points="9 16 12 13 15 16" />
    <line x1="12" x2="12" y1="13" y2="22" />
  </svg>
);

const LuSearch = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const LuFilter = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

const LuEye = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const LuCheckSquare = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 11 12 14 22 4" />
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
  </svg>
);

interface Policy {
  id: string;
  name: string;
  policyNumber: string;
  type: string;
}

interface UploadedFile {
  name: string;
  size: string;
  url?: string;
  verified: boolean;
}

// Policy list
const policiesData: Policy[] = [
  { id: "1", name: "Rajesh Kumar", policyNumber: "LIC-789456123", type: "Life Insurance" },
  { id: "2", name: "Priya Sharma", policyNumber: "HDFC-325406", type: "Health Insurance" },
  { id: "3", name: "Rajesh Patel", policyNumber: "ICICI-1239398", type: "Motor Insurance" },
];

// Claim status sample data
const claimStatusData = {
  status: "Under Review",
  progress: 50,
  uploadedDocuments: [
    { name: "Document_1", size: "1.2MB", url: "#" },
    { name: "Document_2", size: "2.5MB", url: "#" },
    { name: "Document_3", size: "800KB", url: "#" },
  ],
  claimant: "Rajesh Kumar",
  policyNumber: "LIC-789456123",
  claimAmount: "₹5,00,000",
  trackingSteps: ["Document Submission", "Verification", "Approval", "Claim Settled"],
};

// Required documents
const requiredDocuments = [
  "FIR Copy",
  "Driving License",
  "RC Copy",
  "Repair Estimates",
  "Photos of Damage",
  "Policy Document",
];

// A dummy claims map to show pre-uploaded documents
const initialClaimsMap = {
  "1": { // Rajesh Kumar's policy
    "FIR Copy": [{ name: "fir_report.pdf", size: "2.1MB", verified: false }],
    "Driving License": [{ name: "dl_scan.jpg", size: "0.5MB", verified: false }],
    "RC Copy": [],
    "Repair Estimates": [],
    "Photos of Damage": [],
    "Policy Document": [{ name: "policy.pdf", size: "1.2MB", verified: false }],
  },
  "2": { // Priya Sharma's policy
    "FIR Copy": [{ name: "medical_records.pdf", size: "3.5MB", verified: false }],
    "Driving License": [],
    "RC Copy": [],
    "Repair Estimates": [],
    "Photos of Damage": [],
    "Policy Document": [{ name: "policy_doc.pdf", size: "1.2MB", verified: false }],
  },
  "3": { // Rajesh Patel's policy
    "FIR Copy": [{ name: "fir_doc.pdf", size: "1.9MB", verified: false }],
    "Driving License": [{ name: "dl_copy.jpg", size: "0.4MB", verified: false }],
    "RC Copy": [{ name: "rc_copy.pdf", size: "0.9MB", verified: false }],
    "Repair Estimates": [],
    "Photos of Damage": [],
    "Policy Document": [{ name: "motor_policy.pdf", size: "1.1MB", verified: false }],
  },
};

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-11/12 md:w-3/4 max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl font-bold">
            &times;
          </button>
        </div>
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  );
};

const App = () => {
  const [activeTab, setActiveTab] = useState<"initiate" | "track">("initiate");
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);
  const [claimsMap, setClaimsMap] = useState<Record<string, Record<string, UploadedFile[]>>>(initialClaimsMap);
  const [initiateDocModalOpen, setInitiateDocModalOpen] = useState<boolean>(false);
  const [initiateDocumentToView, setInitiateDocumentToView] = useState<UploadedFile | null>(null);
  const [trackDocModalOpen, setTrackDocModalOpen] = useState<boolean>(false);
  const [trackDocumentToView, setTrackDocumentToView] = useState<UploadedFile | null>(null);
  const [finalDocModalOpen, setFinalDocModalOpen] = useState<boolean>(false);

  // When selecting a policy, initialize its claim documents map if not already
  const handlePolicySelect = (policy: Policy) => {
    setSelectedPolicy(policy);
    // Use the dummy data for demonstration
    if (!claimsMap[policy.id]) {
      const initDocs: Record<string, UploadedFile[]> = {};
      requiredDocuments.forEach((doc) => {
        initDocs[doc] = [];
      });
      setClaimsMap((prev) => ({ ...prev, [policy.id]: initDocs }));
    }
  };

  const handleToggleVerification = (docName: string) => {
    if (!selectedPolicy) return;
    setClaimsMap((prev) => {
      const updatedPolicyDocs = { ...prev[selectedPolicy.id] };
      const docFiles = updatedPolicyDocs[docName];
      if (docFiles && docFiles.length > 0) {
        // Toggle the verified status of the first file for simplicity
        docFiles[0] = { ...docFiles[0], verified: !docFiles[0].verified };
      }
      return { ...prev, [selectedPolicy.id]: updatedPolicyDocs };
    });
  };

  const handleOpenInitiateDocument = (doc: UploadedFile) => {
    setInitiateDocumentToView(doc);
    setInitiateDocModalOpen(true);
  };

  const handleOpenTrackDocument = (doc: UploadedFile) => {
    setTrackDocumentToView(doc);
    setTrackDocModalOpen(true);
  };

  const allDocumentsVerified = selectedPolicy && Object.values(claimsMap[selectedPolicy.id])
    .flatMap(docFiles => docFiles)
    .every(file => file.verified);

  const finalVouchChecked = selectedPolicy && allDocumentsVerified;

  const handleGenerateClaimLetter = () => {
    if (finalVouchChecked) {
      setFinalDocModalOpen(true);
    }
  };

  // Render Initiate Claim tab
  const renderInitiateClaim = () => {
    const uploadedFiles = selectedPolicy ? claimsMap[selectedPolicy.id] : null;
    const documentsWithFiles = uploadedFiles ? Object.entries(uploadedFiles).filter(([_, docFiles]) => docFiles.length > 0) : [];
    const uploadedCount = documentsWithFiles.length;

    const renderDocumentVerificationSection = () => (
      <>
        <div className="flex items-center space-x-2 mb-4">
          <LuUploadCloud className="text-gray-500" size={24} />
          <h2 className="text-lg font-semibold text-black">Required Documents</h2>
        </div>
        {selectedPolicy ? (
          <>
            <div className="flex items-center justify-end mb-4">
              <span className="text-sm font-medium text-black">
                {uploadedCount}
              </span>
            </div>
            {uploadedCount > 0 ? (
              <div className="space-y-4">
                {documentsWithFiles.map(([docName, docFiles], index) => {
                  const file = docFiles[0]; // Assuming one file per document type for this demo
                  const isVerified = file?.verified || false;
  
                  return (
                    <div key={index} className="flex flex-col rounded-xl border border-gray-200 transition-colors p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => handleOpenInitiateDocument(file)}>
                          <LuEye className="text-gray-500" size={20} />
                          <span className="text-black">{docName}</span>
                        </div>
                        {file && (
                          <div
                            className={`flex items-center justify-center w-8 h-8 rounded-full cursor-pointer transition-colors ${
                              isVerified ? "bg-emerald-500 text-white" : "bg-gray-200 text-gray-400 hover:bg-gray-300"
                            }`}
                            onClick={() => handleToggleVerification(docName)}
                          >
                            <LuCheckSquare size={20} />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-center text-gray-400">
                <span className="p-4">No documents have been uploaded for this policy yet.</span>
              </div>
            )}
            <div className="mt-6 p-4 rounded-xl border border-gray-200 bg-gray-50">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500"
                  checked={finalVouchChecked as boolean}
                  disabled={!allDocumentsVerified}
                  onChange={() => {}} // Checkbox is controlled by `allDocumentsVerified`
                />
                <span className="text-sm font-medium text-gray-900">
                  I have read and verified all the documents and can vouch for their legitimacy.
                </span>
              </label>
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <button
                className={`px-6 py-3 rounded-lg text-white font-semibold transition-colors ${
                  finalVouchChecked ? "bg-emerald-500 hover:bg-emerald-600" : "bg-gray-300 cursor-not-allowed"
                }`}
                disabled={!finalVouchChecked}
                onClick={handleGenerateClaimLetter}
              >
                Generate Claim Letter
              </button>
              <button
                className={`px-6 py-3 rounded-lg text-white font-semibold transition-colors ${
                  finalVouchChecked ? "bg-emerald-500 hover:bg-emerald-600" : "bg-gray-300 cursor-not-allowed"
                }`}
                disabled={!finalVouchChecked}
              >
                Submit Claim
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-center text-gray-400">
            <span className="p-4">Select a policy to view the required documents</span>
          </div>
        )}
      </>
    );

    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Policy selection */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <LuFileSignature className="text-gray-500" size={24} />
            <h2 className="text-lg font-semibold text-gray-800">Select Policy</h2>
          </div>
          <div className="space-y-4">
            {policiesData.map((policy) => (
              <div
                key={policy.id}
                onClick={() => handlePolicySelect(policy)}
                className={`p-4 rounded-xl border cursor-pointer transition-colors ${
                  selectedPolicy?.id === policy.id
                    ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">{policy.name}</h3>
                    <p className="text-sm text-gray-600">{policy.policyNumber}</p>
                  </div>
                  {selectedPolicy?.id === policy.id && <span className="text-emerald-500 font-bold">✓</span>}
                </div>
                <span className="mt-2 inline-block px-2 py-1 text-xs font-medium text-emerald-800 bg-emerald-200 rounded-full">{policy.type}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Document verification and buttons */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          {renderDocumentVerificationSection()}
        </div>

        {/* Document Viewer Modal */}
        <Modal isOpen={initiateDocModalOpen} onClose={() => setInitiateDocModalOpen(false)} title={`Viewing: ${initiateDocumentToView?.name || ""}`}>
          <div className="bg-gray-200 h-[60vh] flex items-center justify-center rounded-lg">
            <p className="text-gray-500">This is a placeholder for the document viewer for: {initiateDocumentToView?.name}</p>
          </div>
        </Modal>

        {/* Final Claim Letter Modal */}
        <Modal isOpen={finalDocModalOpen} onClose={() => setFinalDocModalOpen(false)} title="Generated Claim Letter">
          <div className="prose max-w-none">
            <p>Dear Sir/Madam,</p>
            <p>I am writing to formally submit a claim for policy number **{selectedPolicy?.policyNumber}** on behalf of **{selectedPolicy?.name}**. All required documents have been uploaded and verified for legitimacy.</p>
            <p>I kindly request that you review the attached documents and proceed with the claim settlement process at your earliest convenience.</p>
            <p>Sincerely,</p>
            <p>The Claim Department</p>
          </div>
        </Modal>
      </motion.div>
    );
  };

  // Render Track Claims tab
  const renderTrackClaims = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-white rounded-xl shadow-lg p-6">
      {/* Search and Filter */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-1">
          <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search claims by policy number or customer name..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
          />
        </div>
        <button className="flex items-center space-x-2 px-4 py-3 bg-gray-100 rounded-lg text-gray-700 font-medium hover:bg-gray-200 transition-colors">
          <LuFilter size={20} />
          <span>Filter</span>
        </button>
      </div>

      {/* Claim Status Card */}
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{claimStatusData.claimant}</h3>
            <p className="text-sm text-gray-600">{claimStatusData.policyNumber}</p>
          </div>
          <div className="text-right">
            <span className="block text-lg font-semibold text-emerald-600">{claimStatusData.claimAmount}</span>
            <span className="flex items-center justify-end space-x-1 text-sm text-yellow-600">{claimStatusData.status}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-1">Progress</p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${claimStatusData.progress}%` }}></div>
          </div>
        </div>

        <p className="text-sm font-medium text-black mb-4">Documents verified, processing claim</p>
        
        {/* Uploaded Documents */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-800 mb-2">Uploaded Documents</h4>
          <div className="flex flex-wrap gap-4">
            {claimStatusData.uploadedDocuments.map((doc, idx) => (
              <div
                key={idx}
                className="flex items-center text-black space-x-1 px-4 py-2 bg-white rounded-lg border border-gray-200 text-sm hover:bg-gray-100 cursor-pointer"
                onClick={() => handleOpenTrackDocument(doc as unknown as UploadedFile)} // Cast to unknown and then UploadedFile
                title="Click to open PDF"
              >
                <span>{doc.name}</span>
                <LuEye className="text-gray-500" />
              </div>
            ))}
          </div>
        </div>

        {/* Claim Status Steps */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-800 mb-2">Claim Status</h4>
          <div className="flex items-center justify-between text-center">
            {claimStatusData.trackingSteps.map((step, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className={`w-3 h-3 rounded-full ${index <= 1 ? "bg-emerald-500" : "bg-gray-300"}`}></div>
                <p className={`mt-2 text-xs font-medium ${index <= 1 ? "text-gray-800" : "text-gray-500"}`}>{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="bg-gray-100 min-h-screen p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl  text-black">Initiate new claims and track existing ones</h1>
        </div>

        {/* Tabs */}
        <div className="flex items-center mb-6 space-x-2">
          <button
            onClick={() => setActiveTab("initiate")}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeTab === "initiate" ? "bg-emerald-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Initiate Claim
          </button>
          <button
            onClick={() => setActiveTab("track")}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeTab === "track" ? "bg-emerald-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Track Claims
          </button>
        </div>

        {/* Content */}
        {activeTab === "initiate" ? renderInitiateClaim() : renderTrackClaims()}
      </div>
      {/* Modals outside of the main content to avoid re-rendering issues */}
      <Modal isOpen={initiateDocModalOpen} onClose={() => setInitiateDocModalOpen(false)} title={`Viewing: ${initiateDocumentToView?.name || ""}`}>
        <div className="bg-gray-200 h-[60vh] flex items-center justify-center rounded-lg">
          <p className="text-gray-500">This is a placeholder for the document viewer for: {initiateDocumentToView?.name}</p>
        </div>
      </Modal>

      <Modal isOpen={finalDocModalOpen} onClose={() => setFinalDocModalOpen(false)} title="Generated Claim Letter">
        <div className="prose max-w-none">
          <p>Dear Sir/Madam,</p>
          <p>I am writing to formally submit a claim for policy number **{selectedPolicy?.policyNumber}** on behalf of **{selectedPolicy?.name}**. All required documents have been uploaded and verified for legitimacy.</p>
          <p>I kindly request that you review the attached documents and proceed with the claim settlement process at your earliest convenience.</p>
          <p>Sincerely,</p>
          <p>The Claim Department</p>
        </div>
      </Modal>

      <Modal isOpen={trackDocModalOpen} onClose={() => setTrackDocModalOpen(false)} title={`Viewing: ${trackDocumentToView?.name || ""}`}>
        <div className="bg-gray-200 h-[60vh] flex items-center justify-center rounded-lg">
          <p className="text-gray-500">This is a placeholder for the document viewer for: {trackDocumentToView?.name}</p>
        </div>
      </Modal>
    </div>
  );
};

export default App;
