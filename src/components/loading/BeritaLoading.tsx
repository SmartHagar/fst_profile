/** @format */

// components/loading/BeritaLoading.tsx
import React from "react";

const BeritaLoading = () => {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex space-x-4">
              <div className="skeleton h-32 w-40 shrink-0 rounded-lg"></div>
              <div className="flex-1 space-y-2">
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-3/4"></div>
                <div className="skeleton h-3 w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BeritaLoading;
