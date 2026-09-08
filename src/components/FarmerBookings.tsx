import React, { useState } from 'react';
import { FarmerProfileData } from '../types';
import { EParchiModal } from './modals/EParchiModal';

interface FarmerBookingsProps {
  farmer: FarmerProfileData;
  onBookNewSlot: () => void;
  onTrackPass: () => void;
  onBackToHome: () => void;
}

export const FarmerBookings: React.FC<FarmerBookingsProps> = ({
  farmer,
  onBookNewSlot,
  onTrackPass,
  onBackToHome
}) => {
  const [showParchi, setShowParchi] = useState(false);

  return (
    <div className="w-full max-w-lg mx-auto pb-24 px-4 pt-2 flex flex-col gap-4 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={onBackToHome}
          className="p-2 -ml-2 text-slate-700 hover:text-primary rounded-full hover:bg-slate-100 transition-colors flex items-center gap-1 text-sm font-semibold"
        >
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
          <span>Home (मुख्य)</span>
        </button>

        <button
          onClick={onBookNewSlot}
          className="px-3 py-1.5 bg-primary text-white font-bold text-xs rounded-xl flex items-center gap-1 hover:bg-primary-container transition-colors shadow-2xs"
        >
          <span className="material-symbols-outlined text-sm">add</span>
          Book New Slot
        </button>
      </div>

      <div>
        <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
          My Mandi Bookings (मेरी बुकिंग्स)
        </h1>
        <p className="text-xs text-slate-500">
          Scheduled appointments, gate passes, and historical J-Form settlement slips
        </p>
      </div>

      {/* Active Token Card */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
          UPCOMING APPOINTMENT
        </span>

        <div className="bg-gradient-to-br from-[#003b1b] to-[#14532d] text-white rounded-2xl p-4 shadow-md space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <span className="px-2 py-0.5 bg-emerald-400/20 text-emerald-200 text-[10px] font-bold rounded">
                GATE PASS CONFIRMED
              </span>
              <div className="font-mono text-2xl font-black text-primary-fixed mt-1">
                {farmer.activeToken}
              </div>
              <span className="text-xs text-emerald-100 font-medium">{farmer.gatePassDate}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-emerald-300 block font-semibold">GATE & WEIGHBRIDGE</span>
              <span className="font-bold text-white text-xs block">{farmer.assignedGate}</span>
              <span className="text-[11px] text-emerald-200">{farmer.slotTime}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/15">
            <button
              onClick={() => setShowParchi(true)}
              className="py-2 bg-white text-primary font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 hover:bg-emerald-50 transition-colors"
            >
              <span className="material-symbols-outlined text-base">receipt</span>
              e-Parchi (पर्ची)
            </button>
            <button
              onClick={onTrackPass}
              className="py-2 bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 hover:bg-emerald-300 transition-colors"
            >
              <span className="material-symbols-outlined text-base">timeline</span>
              Live Tracking
            </button>
          </div>
        </div>
      </div>

      {/* Past Completed Bookings */}
      <div className="space-y-2.5">
        <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
          COMPLETED DELIVERIES (पिछली आवक)
        </span>

        <div className="space-y-2 text-xs">
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
            <div className="flex justify-between items-center">
              <div>
                <span className="font-mono font-bold text-slate-900 text-sm">#KQ-2024-7712</span>
                <span className="text-slate-500 text-[11px] block">12 Oct 2024 • Karnal APMC Yard</span>
              </div>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold text-[10px] rounded-full">
                DBT SETTLED
              </span>
            </div>
            <div className="flex justify-between text-slate-700 text-[11px] pt-1 border-t border-slate-100">
              <span>Crop: Wheat (PBW-550) • 45.00 Qtl</span>
              <strong className="font-bold text-primary">₹1,02,375 Paid</strong>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
            <div className="flex justify-between items-center">
              <div>
                <span className="font-mono font-bold text-slate-900 text-sm">#KQ-2023-9120</span>
                <span className="text-slate-500 text-[11px] block">04 Nov 2023 • Karnal APMC Yard</span>
              </div>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold text-[10px] rounded-full">
                DBT SETTLED
              </span>
            </div>
            <div className="flex justify-between text-slate-700 text-[11px] pt-1 border-t border-slate-100">
              <span>Crop: Paddy (PR-126) • 70.00 Qtl</span>
              <strong className="font-bold text-primary">₹1,53,600 Paid</strong>
            </div>
          </div>
        </div>
      </div>

      <EParchiModal isOpen={showParchi} onClose={() => setShowParchi(false)} farmer={farmer} />
    </div>
  );
};
