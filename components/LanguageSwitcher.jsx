"use client";

import React, { useState, useEffect } from 'react';

// NOTE: Since the Next.js specific imports (usePathname, Link) cannot be resolved
// in this environment, we are replacing them with standard React and HTML logic
// to make the component runnable and testable.

/**
 * Custom hook to simulate usePathname by reading window.location.pathname.
 * This function will only return a value once the component has mounted.
 */
const usePathnameSimulation = () => {
  const [pathname, setPathname] = useState('/');
  
  useEffect(() => {
    // Check if running in a browser environment
    if (typeof window !== 'undefined') {
      setPathname(window.location.pathname || '/');
    }
  }, []);
  
  return pathname;
};

export default function LanguageSwitcher() {
  // Use the simulated pathname hook
  const pathname = usePathnameSimulation();
  
  // Determine the current locale based on whether the path starts with '/ur'
  const currentLocale = pathname.startsWith("/ur") ? "ur" : "en";

  const getPath = (locale) => {
    // If the path is the root, return the root with the new locale prefix
    if (!pathname || pathname === "/") return `/${locale}`;
    
    // Check if the path starts with an existing locale prefix (/en or /ur)
    const hasLocalePrefix = /^\/(en|ur)/.test(pathname);

    if (hasLocalePrefix) {
      // Replace the existing locale prefix (/en/page to /ur/page)
      return pathname.replace(/^\/(en|ur)/, `/${locale}`);
    } else {
      // If there's no prefix (e.g., '/about'), assume the path is for the current locale
      // and prepend the new locale prefix for switching (e.g., '/ur/about')
      // This logic is simplified for a standalone component environment.
      return `/${locale}${pathname}`;
    }
  };

  return (
    // Container: White background with a thick, solid red border, no rounded corners or shadows
    <div className="flex items-center gap-0 bg-white border-2 border-red-700 font-sans">
      
      {/* English Link - Using a standard <a> tag as Link cannot be resolved */}
      <a
        href={getPath("en")}
        className={`
          px-4 py-2 text-base font-extrabold transition-all duration-300 ease-in-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500
          ${
            currentLocale === "en"
              // Active: Bold Red background with crisp White text
              ? "bg-red-700 text-white" 
              // Inactive: Red text on White, with a sharp Red border and subtle hover effect
              : "text-red-700 hover:bg-red-50" 
          }
        `}
      >
        English
      </a>
      
      {/* Urdu Link - Using a standard <a> tag as Link cannot be resolved */}
      <a
        href={getPath("ur")}
        className={`
          px-4 py-2 text-base font-extrabold transition-all duration-300 ease-in-out cursor-pointer 
          focus:outline-none focus:ring-2 focus:ring-red-500
          ${
            currentLocale === "ur"
              // Active: Bold Red background with crisp White text
              ? "bg-red-700 text-white" 
              // Inactive: Red text on White, with a sharp Red border and subtle hover effect
              : "text-red-700 hover:bg-red-50" 
          }
        `}
        // Explicitly setting direction for Urdu for correct rendering
        lang="ur"
        dir="rtl"
      >
        اردو
      </a>
    </div>
  );
}