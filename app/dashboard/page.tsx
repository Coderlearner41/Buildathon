"use client";

import { useEffect, useState } from "react";
import type { Customer, RenewalResult } from "../models/customer";
import { Phone, Mail } from "lucide-react";
import axios from "axios";

export default function DashboardPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [upcomingRenewals, setUpcomingRenewals] = useState<RenewalResult[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [stats, setStats] = useState({
    totalCustomers: 0,
    activePolicies: 0,
    recommitments: 0,
    totalClaims: 0,
    claimsInProgress: 0,
  });

  const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://buildathon-5n46.vercel.app";

  async function fetchData() {
    try {
      console.log("Fetching dashboard data from backend...");

      // Fetch both endpoints in parallel
      const [customerRes, renewalsRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/dashboard-customer`),
        axios.get(`${API_BASE_URL}/dashboard-values`),
      ]);

      const customerData: ICustomer[] = customerRes.data || [];
      const renewalsData = renewalsRes.data;

      console.log("Customer data:", customerData);
      console.log("Upcoming renewals:", renewalsData);

      // Update stats based on customerData
      setStats({
        totalCustomers: renewalsData.totalCustomers || customerData.length,
        activePolicies: renewalsData.totalPolicies,
        recommitments: 0,
        totalClaims: renewalsData.totalClaims || 0,
        claimsInProgress: renewalsData.lastMonthClaims || 0,
      });

      // Set customers for table
      setCustomers(customerData);

      // Keep renewals as is
      if (Array.isArray(renewalsData)) {
        setUpcomingRenewals(renewalsData);
      } else if (Array.isArray(renewalsData.renewals)) {
        setUpcomingRenewals(renewalsData.renewals);
      } else {
        setUpcomingRenewals([]);
        console.warn("Upcoming renewals is not an array, using []");
      }
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    } finally {
      setLoading(false);
      console.log("Finished fetching data");
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <p className="text-center mt-10 text-gray-600">Loading dashboard...</p>;
  }

  return (
    <div className="p-6 space-y-8 bg-gray-100 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-[34px] font-bold text-gray-900 font-inter">Hello Arnav!!</h1>
        <p className="text-[20px] text-gray-600 font-inter">
          Welcome back, here&apos;s your business overview
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-x-10 gap-y-6">
        {/* Total Customers */}
        <div className="p-6 rounded-[30px] shadow text-white flex flex-col" style={{ backgroundColor: "#00BDAA" }}>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center justify-between mb-1 min-w-[280px]">
              <h2 className="text-[24px] font-inter">Total Customers</h2>
            </div>
          </div>
          <p className="text-[44px] text-white font-bold">{stats.totalCustomers}</p>
          <span className="text-[14px] text-white/80">+12 from last month</span>
        </div>

        {/* Active Policies */}
        <div className="p-6 rounded-[30px] shadow text-white flex flex-col" style={{ backgroundColor: "#00BDAA" }}>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center justify-between mb-1 min-w-[280px]">
              <h2 className="text-[24px] font-inter">Active Policies</h2>
            </div>
          </div>
          <p className="text-[44px] text-white font-bold">{stats.activePolicies}</p>
          <span className="text-[14px] text-white/80">+12 from last month</span>
        </div>

        {/* Recommitments */}
        <div className="p-6 rounded-[30px] shadow text-white flex flex-col" style={{ backgroundColor: "#00BDAA" }}>
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-[24px] font-inter">Recommitments</h2>
          </div>
          <p className="text-[44px] text-white font-bold">{stats.recommitments}</p>
          <span className="text-[14px] text-white/80">This Week</span>
        </div>

        {/* Claims in Progress */}
        <div className="p-6 rounded-[30px] shadow text-white flex flex-col" style={{ backgroundColor: "#00BDAA" }}>
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-[24px] font-inter">Claims in Progress</h2>
          </div>
          <p className="text-[44px] text-white font-bold">{stats.totalClaims}</p>
          <span className="text-[14px] text-white/80">-{stats.claimsInProgress} from last month</span>
        </div>
      </div>

      {/* Customer Table */}
      <div className="bg-white rounded-[30px] shadow p-6 overflow-y-auto max-h-[400px] scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-green-200">
        <h2 className="text-black font-semibold text-xl mb-4">Priority Renewals</h2>
        <div className="overflow-hidden w-full">
          <table className="w-full text-left border-collapse text-[18px]">
            <thead>
              <tr className="bg-[#D9D9D9] text-black mb-2">
                <th className="py-3 px-4 rounded-tl-[30px]">Customer</th>
                <th className="py-3 px-4">Policy Number</th>
                <th className="py-3 px-4">Policies</th>
                <th className="py-3 px-4">Premium</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 rounded-tr-[30px]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer, idx) => {
                // const policiesCount = customer.policy?.length || 0;
                const statusColor = customer.nextRenewalIn && customer.nextRenewalIn <= 7 ? "bg-red-300 text-white" : "bg-yellow-200 text-black";

                return (
                  <tr key={idx} className="mb-2 text-black hover:bg-gray-200 transition-colors duration-200">
                    <td className="py-3 px-4">{customer.name}</td>
                    <td className="py-3 px-4">{customer.policyNumber}</td>{/* Policy number not in customer data */}
                    <td className="py-3 px-4">{customer.policyNumber}</td>
                    <td className="py-3 px-4">{customer.premium}</td>
                    <td className="py-3 px-4">
                      {customer.nextRenewalIn !== undefined && (
                        <span className={`${statusColor} px-3 py-1 rounded-full`}>
                          due in {customer.nextRenewalIn} days
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 flex gap-3">
                      <a href={`tel:${customer.contact}`} className="p-2 rounded-full hover:bg-green-100 text-gray-700 hover:text-green-600 transition">
                        <Phone size={20} />
                      </a>
                      <a href={`mailto:${customer.mailId}`} className="p-2 rounded-full hover:bg-blue-100 text-gray-700 hover:text-blue-600 transition">
                        <Mail size={20} />
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {customers.length === 0 && (
            <p className="text-center text-gray-500 mt-4">No customer data available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
