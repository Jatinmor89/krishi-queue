import React, { useState } from 'react';
import { FarmerProfileData } from '../types';
import { LabCertificateModal } from './modals/LabCertificateModal';
import { EParchiModal } from './modals/EParchiModal';

interface TrackStatusProps {
  farmer: FarmerProfileData;
  onBack: () => void;
  onGoHome: () => void;
}

export const TrackStatus: React.FC<TrackStatusProps> = ({ farmer, onBack, onGoHome }) => {
  const [showLabSlip, setShowLabSlip] = useState(false);
  const [showGatePass, setShowGatePass] = useState(false);

  return (
    <div className="w-full max-w-lg mx-auto pb-24 px-4 pt-2 flex flex-col gap-4 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={onBack}
          className="p-2 -ml-2 text-slate-700 hover:text-primary rounded-full hover:bg-slate-100 transition-colors flex items-center gap-1 text-sm font-semibold"
        >
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
          <span>Back (पीछे)</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
            LIVE TRACKING
          </span>
        </div>
      </div>

      {/* Hero Gate Pass Voucher */}
      <div className="bg-gradient-to-br from-[#003b1b] to-[#14532d] text-white rounded-2xl p-4 md:p-5 shadow-lg relative overflow-hidden">
        <div className="flex items-start justify-between relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-emerald-400/20 text-emerald-200 text-[10px] font-bold uppercase tracking-wider">
                MANDI GATE PASS
              </span>
              <span className="text-emerald-200 text-xs font-mono">Gate 2 Entry • 08:12 AM</span>
            </div>
            <div className="text-2xl font-black font-mono mt-1 text-primary-fixed tracking-tight">
              #KQ-2024-8821
            </div>
            <p className="text-sm text-white font-bold mt-0.5">{farmer.name}</p>
          </div>

          <button
            onClick={() => setShowGatePass(true)}
            className="px-3 py-1.5 bg-white text-primary text-xs font-bold rounded-xl hover:bg-emerald-50 transition-colors shadow-sm flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">qr_code</span>
            View QR
          </button>
        </div>

        {/* Commodity & Vehicle Specs */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-white/15 text-xs relative z-10">
          <div className="bg-black/20 p-2 rounded-xl">
            <span className="text-emerald-300 text-[10px] block font-semibold">COMMODITY</span>
            <span className="font-bold text-white text-xs">Wheat Sharbati</span>
          </div>
          <div className="bg-black/20 p-2 rounded-xl">
            <span className="text-emerald-300 text-[10px] block font-semibold">QUANTITY</span>
            <span className="font-bold text-white text-xs">45 Quintals</span>
          </div>
          <div className="bg-black/20 p-2 rounded-xl">
            <span className="text-emerald-300 text-[10px] block font-semibold">TRACTOR NO.</span>
            <span className="font-bold text-white font-mono text-xs">PB 02 AK 4192</span>
          </div>
        </div>
      </div>

      {/* Real-time Alert / Next in Sequence */}
      <div className="bg-amber-50 border border-amber-300/80 rounded-2xl p-4 flex items-start gap-3 shadow-2xs">
        <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
          <span className="material-symbols-outlined text-2xl animate-pulse">hourglass_top</span>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <strong className="text-amber-950 font-bold text-sm">Next: Gross Weighing</strong>
            <span className="px-2 py-0.5 bg-amber-200 text-amber-900 font-extrabold text-xs rounded-full">
              ~18 Mins Wait
            </span>
          </div>
          <p className="text-amber-900/90 text-xs mt-1 leading-relaxed">
            Gross Weighbridge Slot #4 allocation in progress. Please keep tractor engine idling near <strong>Lane 3 Entry Zone</strong>.
          </p>
        </div>
      </div>

      {/* Procurement Journey (6-Stage Real-Time Stepper) */}
      <div className="bg-surface-container-lowest rounded-2xl p-4 md:p-5 shadow-sm border border-outline-variant/30 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[20px]">timeline</span>
            Procurement Journey (प्रक्रिया प्रगति)
          </h3>
          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
            Stage 3 of 6 Active
          </span>
        </div>

        {/* Steps */}
        <div className="space-y-4 relative pl-3">
          {/* Vertical Track line */}
          <div className="absolute left-[19px] top-3 bottom-3 w-0.5 bg-slate-200 pointer-events-none" />

          {/* Stage 1 */}
          <div className="flex items-start gap-3 relative z-10">
            <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-[16px]">check</span>
            </div>
            <div className="flex-1 text-xs">
              <div className="flex items-center justify-between">
                <strong className="text-slate-900 font-bold text-xs">1. Slot Booked</strong>
                <span className="text-slate-400 text-[10px]">23 Oct, 04:30 PM</span>
              </div>
              <p className="text-slate-500 text-[11px]">Confirmed for 24 Oct morning wave.</p>
            </div>
          </div>

          {/* Stage 2 */}
          <div className="flex items-start gap-3 relative z-10">
            <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-[16px]">check</span>
            </div>
            <div className="flex-1 text-xs">
              <div className="flex items-center justify-between">
                <strong className="text-slate-900 font-bold text-xs">2. Arrived at Mandi (Gate In)</strong>
                <span className="text-slate-400 text-[10px]">Today 08:12 AM</span>
              </div>
              <p className="text-slate-500 text-[11px]">RFID Fast-Scan validated at Gate 2.</p>
            </div>
          </div>

          {/* Stage 3 (ACTIVE) */}
          <div className="flex items-start gap-3 relative z-10">
            <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center shrink-0 ring-4 ring-primary/20 shadow-xs">
              <span className="material-symbols-outlined text-[16px] animate-spin">sync</span>
            </div>
            <div className="flex-1 text-xs bg-emerald-50/70 p-3 rounded-xl border border-primary/30">
              <div className="flex items-center justify-between">
                <strong className="text-primary font-bold text-xs">
                  3. Quality Check (Assaying)
                </strong>
                <span className="px-1.5 py-0.5 bg-primary text-white font-bold text-[9px] rounded">
                  IN PROGRESS
                </span>
              </div>
              <p className="text-slate-700 text-[11px] mt-1">
                Moisture: <strong>11.8%</strong> (FAQ standard passed &lt; 12%). Foreign matter: <strong>0.4%</strong>. Assigned to Inspector R. Sharma.
              </p>
              <button
                onClick={() => setShowLabSlip(true)}
                className="mt-2 text-primary font-bold text-[11px] flex items-center gap-1 hover:underline"
              >
                <span className="material-symbols-outlined text-[14px]">science</span>
                View Live Assaying Certificate
              </button>
            </div>
          </div>

          {/* Stage 4 */}
          <div className="flex items-start gap-3 relative z-10">
            <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center shrink-0">
              <span className="text-xs font-bold">4</span>
            </div>
            <div className="flex-1 text-xs opacity-70">
              <div className="flex items-center justify-between">
                <strong className="text-slate-800 font-bold">4. Gross Weighing</strong>
                <span className="text-slate-500 text-[10px]">Next in ~18m</span>
              </div>
              <p className="text-slate-500 text-[11px]">Weighbridge Platform Lane #4.</p>
            </div>
          </div>

          {/* Stage 5 */}
          <div className="flex items-start gap-3 relative z-10">
            <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center shrink-0">
              <span className="text-xs font-bold">5</span>
            </div>
            <div className="flex-1 text-xs opacity-60">
              <strong className="text-slate-800 font-bold">5. J-Form Generation</strong>
              <p className="text-slate-500 text-[11px]">Official MSP procurement slip & tax-free record.</p>
            </div>
          </div>

          {/* Stage 6 */}
          <div className="flex items-start gap-3 relative z-10">
            <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center shrink-0">
              <span className="text-xs font-bold">6</span>
            </div>
            <div className="flex-1 text-xs opacity-60">
              <strong className="text-slate-800 font-bold">6. DBT Payment Disbursal</strong>
              <p className="text-slate-500 text-[11px]">Direct credit to Bank Account (•••• 8842) within 48-72h.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Live Quality Assaying Snapshot Card */}
      <div className="bg-surface-container-low rounded-2xl p-4 border border-outline-variant/30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Circular SVG Quality Score Gauge */}
          <div className="relative w-14 h-14 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-200"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-emerald-600"
                strokeDasharray="92, 100"
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute font-black text-xs text-emerald-900 font-mono">92%</span>
          </div>

          <div>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
              GRAIN QUALITY SCORE
            </span>
            <strong className="text-sm text-slate-900 block">A-Grade Sharbati Lot</strong>
            <span className="text-[11px] text-emerald-700 font-medium">
              Moisture: 11.8% • Foreign: 0.05%
            </span>
          </div>
        </div>

        <button
          onClick={() => setShowLabSlip(true)}
          className="px-3 py-1.5 bg-tertiary-container hover:bg-tertiary text-white font-bold text-xs rounded-xl transition-colors shadow-2xs flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-sm">article</span>
          Lab Slip
        </button>
      </div>

      {/* Support & Dial Actions */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <a
          href="tel:18001801551"
          className="p-3 bg-white rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 font-bold flex items-center justify-center gap-1.5 shadow-2xs"
        >
          <span className="material-symbols-outlined text-amber-600 text-[18px]">support_agent</span>
          Call Helpline
        </a>
        <button
          onClick={onGoHome}
          className="p-3 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-1.5 shadow-2xs hover:bg-primary-container"
        >
          <span className="material-symbols-outlined text-[18px]">home</span>
          Return to Home
        </button>
      </div>

      {/* Modals */}
      <LabCertificateModal
        isOpen={showLabSlip}
        onClose={() => setShowLabSlip(false)}
        tokenNumber="#KQ-2024-8821"
      />
      <EParchiModal
        isOpen={showGatePass}
        onClose={() => setShowGatePass(false)}
        farmer={farmer}
      />
    </div>
  );
};
