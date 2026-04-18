
"use client";
import React from "react";
import { AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TokenErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFCFB] p-6">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-500">
            <AlertCircle size={32} />
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Authentication Required
          </h1>
          <p className="text-gray-500 leading-relaxed">
            Please access this application through the Mantra Care portal or using a valid magic link.
          </p>
        </div>

        <div className="pt-4">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-2xl hover:bg-indigo-700 transition-all duration-200"
          >
            <ArrowLeft size={18} />
            Back to Hub
          </Link>
        </div>
      </div>
    </div>
  );
}
