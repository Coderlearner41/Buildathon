"use client";

import React, { useState } from "react";

const AddPolicyForm = () => {
  const [autofill, setAutofill] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      console.log("Uploaded files:", event.target.files);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      console.log("Dropped files:", e.dataTransfer.files);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Submitted");
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 bg-white rounded-3xl p-6 shadow-lg border border-gray-200">
      {/* Left: Upload + Autofill */}
      <div className="w-full lg:w-1/3 border border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center">
        <h3 className="text-xl text-black font-semibold mb-4 text-center">Media Upload</h3>
        <p className="text-sm text-black mb-4 text-center">Add your documents here, and you can upload up to 5 files...</p>
        
        {/* Drag & Drop Upload */}
        <div 
          className="w-full border-2 border-dashed border-teal-400 rounded-xl p-8 text-center mb-4 transition-colors duration-300 hover:border-teal-600"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <svg className="mx-auto h-12 w-12 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          <input
            type="file"
            multiple
            accept=".jpg,.png,.svg,.zip"
            className="hidden"
            id="fileUpload"
            onChange={handleFileUpload}
          />
          <label
            htmlFor="fileUpload"
            className="cursor-pointer text-black text-sm mt-3 inline-block"
          >
            Drag your file(s) or{" "}
            <span className="text-teal-500 font-semibold">browse</span>
          </label>
          <p className="text-xs text-gray-400 mt-1">
            Max 10 MB per file, up to 5 files allowed
          </p>
        </div>
        <p className="text-xs text-gray-400 mb-4">
          Only support .jpg, .png and .svg and zip files
        </p>


        {/* Autofill Checkbox */}
        <div className="flex items-center space-x-2 w-full mt-4">
          <input
            type="checkbox"
            id="autofill"
            checked={autofill}
            onChange={() => setAutofill(!autofill)}
            className="h-4 w-4 text-teal-500 rounded border-gray-300 focus:ring-teal-500"
          />
          <label htmlFor="autofill" className="text-sm text-gray-700">
            Autofill from document
          </label>
        </div>
      </div>

      {/* Right: Scrollable Form */}
      <div className="w-full lg:w-2/3 max-h-[600px] overflow-y-auto pr-2">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Customer Onboarding form details</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Customer Info */}
          <div className="p-4 border border-gray-200 rounded-2xl">
            <h3 className="font-semibold text-gray-700 text-lg mb-4">Customer Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Full Name*" className="border text-black border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" />
              <div className="flex flex-col md:flex-row gap-4">
                <input type="date" className="border border-gray-300 text-black px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-teal-500" />
              </div>
              <div>
                <input type="text" placeholder="Gender*" className="border text-black border-gray-300 px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-teal-500" />
              </div>
              <div>
                <input type="text" placeholder="Alternate Contact*" className="border text-black border-gray-300 px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-teal-500" />
              </div>
              {/* <input type="text" placeholder="Address*" className="col-span-1 text-black md:col-span-2 border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" /> */}
              {/* <input type="text" placeholder="City*" className="border text-black border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" />
              <input type="text" placeholder="State*" className="border text-black border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" />
              <input type="text" placeholder="Postal Code*" className="border text-black border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" />
              <input type="text" placeholder="Country*" className="border text-black border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" /> */}
            </div>
          </div>

          {/* Contact Info */}
          <div className="p-4 border border-gray-200 rounded-2xl">
            <h3 className="font-semibold text-gray-700 text-lg mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Mobile Number*" className="border text-black border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" />
              <input type="text" placeholder="Alternate Mobile Number" className="border text-black border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
            <input type="email" placeholder="E-mail Address" className="border text-black border-gray-300 px-3 py-2 rounded-lg w-full mt-4 focus:outline-none focus:ring-2 focus:ring-teal-500" />
          </div>

          {/* Policy Info */}
          <div className="p-4 border text-black border-gray-200 text-black rounded-2xl">
            <h3 className="font-semibold text-black text-gray-700 text-lg mb-4">Policy Information</h3>
            <div className="grid grid-cols-1 text-black md:grid-cols-2 gap-4">
              <input type="text" placeholder="Policy Number*" className="border text-black border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" />
              <input type="text" placeholder="Insurance Company*" className="border text-black border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" />
              <select className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500">
                <option>Policy Type*</option>
                <option>Term Life</option>
                <option>Health</option>
                <option>Motor</option>
                <option>Travel</option>
              </select>
              <input type="text" placeholder="Policy Plan / Product Name*" className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" />
              <input type="date" placeholder="Policy Start Date*" className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" />
              <input type="text" placeholder="Policy Term*" className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
          </div>

          {/* Nominee Info */}
          <div className="p-4 border text-black border-gray-200 rounded-2xl">
            <h3 className="font-semibold text-gray-700 text-lg mb-4">Nominee Information</h3>
            <input type="text" placeholder="Nominee Name*" className="border border-gray-300 px-3 py-2 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Relationship to Policy Holder*" className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" />
              <input type="text" placeholder="Nominee Contact" className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-6 py-3 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition-colors duration-300"
          >
            Add Policy
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPolicyForm;