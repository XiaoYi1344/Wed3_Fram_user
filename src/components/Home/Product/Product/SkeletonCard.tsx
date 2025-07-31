"use client";

export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 animate-pulse">
      <div className="bg-gray-300 h-48 w-full mb-4 rounded-xl"></div>
      <div className="h-4 bg-gray-300 rounded mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-2/3 mb-4"></div>
      <div className="h-8 bg-gray-300 rounded w-full"></div>
    </div>
  );
}
