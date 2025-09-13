"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

const navItems = [
  { key: "dashboard", href: "/dashboard", icon: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6.75z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v11.25a2.25 2.25 0 002.25 2.25h2.25a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H12" />
    </svg>
  )},
  { key: "customers", href: "/customers", icon: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.5L12 22.5L9 19.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21V6" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 21h4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 9V3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 9V3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18V6" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 12L21 9L18 6" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3 9L6 6" />
    </svg>
  )},
  { key: "reminders", href: "/reminders", icon: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25L12 7.5L4.5 14.25" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12H3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 9L12 15.75L4.5 9" />
    </svg>
  )},
  { key: "claims", href: "/claims", icon: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21L3 12M12 21L21 12M12 21V3" />
    </svg>
  )},
  { key: "compare policies", href: "/compare-policies", icon: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3L3 12M12 3L21 12M12 3V21" />
    </svg>
  )},
  { key: "payments", href: "/payments", icon: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 22.5L3 13.5M12 22.5L21 13.5M12 22.5V1.5" />
    </svg>
  )},
];

const languageOptions = {
  en: "English",
  hi: "हिंदी",
  mr: "मराठी",
};

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { t, i18n } = useTranslation();

  const [activePath, setActivePath] = useState(pathname || "/dashboard");
  const [activeLanguage, setActiveLanguage] = useState(i18n.language || "en");

  const handleNavClick = (href: string) => {
    setActivePath(href);
    router.push(href);
  };

  const handleLanguageChange = (lng: string) => {
    setActiveLanguage(lng);
    i18n.changeLanguage(lng);
  };

  const handleSignOut = () => {
    // Clear any auth tokens here if needed
    router.push("/");
  };

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-md font-['Roboto'] text-sm">
      {/* Logo */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center bg-emerald-500 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L3 7v10l9 5 9-5V7L12 2zm0 17.65L5 15.68V8.32L12 4.35l7 3.97v7.36l-7 3.97z" />
              <path d="M12 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          </div>
          <span className="font-bold text-gray-900 text-lg">InsureAce</span>
        </div>
      </div>

      {/* Menu */}
      <div className="flex gap-1 items-center bg-gray-100 rounded-[24px] p-1">
        {navItems.map((item) => (
          <button
            key={item.key}
            onClick={() => handleNavClick(item.href)}
            className={`flex items-center gap-2 px-4 py-2 rounded-[24px] transition-colors duration-300
              ${activePath === item.href ? "bg-[#78CC9B] text-white" : "text-gray-700 hover:bg-gray-200"}`}
          >
            <span className="w-4 h-4">{item.icon}</span>
            <span className="font-medium">{t(item.key)}</span>
          </button>
        ))}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
      {/* Profile */}
      <button
        onClick={() => router.push("/profile")}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      </button>

      {/* Language Dropdown */}
      <div className="relative group">
        <button className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors">
          {/* Google Translate Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M20 5h-9.1l-.9-2H4c-1.1 0-2 .9-2 2v2h2V5h4.6l3.6 8H9.24L6 8l-1.8.9L7.48 15H11v2h2v-2h3.52L22 20l-2 2-4.48-4.48L12 10h8v2h2V7c0-1.1-.9-2-2-2z" />
          </svg>
        </button>
        <div className="absolute right-0 top-full mt-2 w-32 bg-white rounded-md shadow-lg py-1 z-50 invisible group-hover:visible transition-all duration-300 transform scale-95 group-hover:scale-100">
          {Object.keys(languageOptions).map((lang) => (
            <button
              key={lang}
              onClick={() => handleLanguageChange(lang)}
              className={`block w-full text-left px-4 py-2 text-sm ${
                activeLanguage === lang
                  ? "text-emerald-600 font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {languageOptions[lang as keyof typeof languageOptions]}
            </button>
          ))}
        </div>
      </div>

      {/* Sign Out */}
      <button
        onClick={handleSignOut}
        className="flex items-center justify-center w-10 h-10 rounded-full transform scale-x-[-1] bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
          <path d="M16 13v-2H7V8l-5 4 5 4v-3h9zm3-10H5c-1.1 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
        </svg>
      </button>
    </div>


    </nav>
  );
}
