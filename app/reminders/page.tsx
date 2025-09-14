"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";

// Example client data


// const clients: Client[] = [
//   { id: "1", name: "Rajesh Kumar", policy: "LIC-965656565", renewalDate: "3/09/2004" },
//   { id: "2", name: "Anita Sharma", policy: "LIC-123456789", renewalDate: "10/09/2004" },
//   { id: "3", name: "Vikram Singh", policy: "LIC-987654321", renewalDate: "15/09/2004" },
// ];

// Placeholder icons
const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A9 9 0 1118.879 6.196 9 9 0 015.121 17.804z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12a3 3 0 100-6 3 3 0 000 6z" />
  </svg>
);

const DocumentTextIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2-14H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2z" />
  </svg>
);

const CalendarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
);

interface ApiCustomer {
    name: string;
    contact: string;
    mailId: string;
    PolicyNumber: string,
    nextRenewalIn: number;
    policies: number;
  }


export default function App() {
    const [clients, setClients] = useState<ApiCustomer[]>([]);
    useEffect(() => {
        const fetchCustomers = async () => {
          try {
            const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://buildathon-5n46.vercel.app';
            const res = await axios.get(`${API_BASE_URL}/dashboard-customer`);
            const data = res.data.map((c: ApiCustomer, idx: number) => ({ ...c, id: String(idx + 1) }));
            console.log(data);
            setClients(data);
          } catch (err) {
            console.error("Error fetching customers:", err);
          }
        };
        fetchCustomers();
      }, []);

  // State to track toggles per client
  const [toggles, setToggles] = useState<
    Record<string, { sms: boolean; whatsapp: boolean; mail: boolean }>
  >({});

  const handleToggle = (clientId: string, type: "sms" | "whatsapp" | "mail") => {
    setToggles((prev) => {
      const current = prev[clientId] || { sms: false, whatsapp: false, mail: false };
      return {
        ...prev,
        [clientId]: {
          ...current,
          [type]: !current[type],
        },
      };
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-inter">
      <style>{`body { font-family: 'Inter', sans-serif; }`}</style>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-10 text-center">
          <h1
            className="text-4xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl"
            style={{ fontSize: "26px" }}
          >
            Manage your customer relationships and policies
          </h1>
        </header>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div
            className="p-6 rounded-[30px] shadow text-white flex flex-col"
            style={{ backgroundColor: "#00BDAA" }}
          >
            <div className="flex items-center justify-between mb-1 min-w-[280px]">
              <h2 className="text-[24px] font-inter">Renewals this week</h2>
              <UserIcon />
            </div>
            <p className="text-[44px] text- fontwhite-bold">2</p>
            <span className="text-[14px] text-white/80">Requires Attention</span>
          </div>

          <div
            className="p-6 rounded-[30px] shadow text-white flex flex-col"
            style={{ backgroundColor: "#00BDAA" }}
          >
            <div className="flex items-center justify-between mb-1 min-w-[280px]">
              <h2 className="text-[24px] font-inter">Overdue Renewals</h2>
              <DocumentTextIcon />
            </div>
            <p className="text-[44px] text-white font-bold">1</p>
            <span className="text-[14px] text-white/80">Immediate Action NEeded</span>
          </div>

          <div
            className="p-6 rounded-[30px] shadow text-white flex flex-col"
            style={{ backgroundColor: "#00BDAA" }}
          >
            <div className="flex items-center justify-between mb-1 min-w-[280px]">
              <h2 className="text-[24px] font-inter">Active Notification</h2>
              <CalendarIcon />
            </div>
            <p className="text-[44px] text-white font-bold">6</p>
            <span className="text-[14px] text-white/80">Automated Remainders</span>
          </div>
        </div>

        {/* Client Table */}
        <div className="overflow-x-auto bg-white rounded-[30px] shadow p-6">
          <table className="w-full text-left border-collapse text-[18px]">
            <thead>
              <tr className="bg-[#D9D9D9] text-black">
                <th className="py-3 px-4">Client</th>
                <th className="py-3 px-4">Policy Number</th>
                <th className="py-3 px-4">Renewal Date</th>
                <th className="py-3 px-4">SMS</th>
                <th className="py-3 px-4">Whatsapp</th>
                <th className="py-3 px-4">Mail</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => {
                const clientToggle =
                  toggles[client.mailId] || { sms: false, whatsapp: false, mail: false };
                return (
                  <tr
                    key={client.mailId}
                    className="hover:bg-gray-200 text-black transition-colors duration-200"
                  >
                    <td className="py-3 px-4">{client.name}</td>
                    <td className="py-3 px-4">{client.PolicyNumber}</td>
                    <td className="py-3 px-4">{client.nextRenewalIn}</td>

                    {/* SMS Toggle */}
                    <td className="py-3 px-4">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={clientToggle.sms}
                          onChange={() => handleToggle(client.mailId, "sms")}
                        />
                        <div
                          className={`w-11 h-6 bg-gray-300 rounded-full transition ${
                            clientToggle.sms ? "bg-green-500" : ""
                          }`}
                        ></div>
                        <div
                          className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                            clientToggle.sms ? "translate-x-5" : ""
                          }`}
                        ></div>
                      </label>
                    </td>

                    {/* Whatsapp Toggle */}
                    <td className="py-3 px-4">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={clientToggle.whatsapp}
                          onChange={() => handleToggle(client.mailId, "whatsapp")}
                        />
                        <div
                          className={`w-11 h-6 bg-gray-300 rounded-full transition ${
                            clientToggle.whatsapp ? "bg-green-500" : ""
                          }`}
                        ></div>
                        <div
                          className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                            clientToggle.whatsapp ? "translate-x-5" : ""
                          }`}
                        ></div>
                      </label>
                    </td>

                    {/* Mail Toggle */}
                    <td className="py-3 px-4">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={clientToggle.mail}
                          onChange={() => handleToggle(client.mailId, "mail")}
                        />
                        <div
                          className={`w-11 h-6 bg-gray-300 rounded-full transition ${
                            clientToggle.mail ? "bg-green-500" : ""
                          }`}
                        ></div>
                        <div
                          className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                            clientToggle.mail ? "translate-x-5" : ""
                          }`}
                        ></div>
                      </label>
                    </td>

                    {/* Action Buttons */}
                    <td className="py-3 px-4 flex gap-3">
                      <button className="p-2 rounded-full hover:bg-green-100 text-gray-700 hover:text-green-600 transition">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 5a2 2 0 012-2h2.28a1 1 0 01.95.684l1.518 4.55a1 1 0 01-.272 1.06l-1.2 1.2a16 16 0 006.586 6.586l1.2-1.2a1 1 0 011.06-.272l4.55 1.518a1 1 0 01.684.95V19a2 2 0 01-2 2h-1C9.163 21 3 14.837 3 7V5z"
                          />
                        </svg>
                      </button>
                      <button className="p-2 rounded-full hover:bg-blue-100 text-gray-700 hover:text-blue-600 transition">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
