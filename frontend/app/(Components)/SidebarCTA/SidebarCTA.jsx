'use client';

import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import CounselingModal from '../CounselingModal/CounselingModal';

export default function SidebarCTA({ destinationName, apiBaseUrl }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <aside className="lg:col-span-1">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-lg sticky top-28">
          <h3 className="text-xl font-bold mb-2">Apply to {destinationName}</h3>
          <p className="text-sm text-slate-400 mb-6 leading-relaxed">
            Get personalized guidance from our education experts to start your admissions process.
          </p>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 shadow-md cursor-pointer"
          >
            <span>Get Free Counseling</span>
            <ChevronRight size={18} />
          </button>
        </div>
      </aside>

      <CounselingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        destinationName={destinationName}
        apiBaseUrl={apiBaseUrl}
      />
    </>
  );
}