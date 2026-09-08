import React, { useState } from 'react';
import { FarmerProfileData, Language } from '../types';
import { FARMER_PORTRAIT_URL } from '../data/mockData';
import { EParchiModal } from './modals/EParchiModal';
import { MandiRouteModal } from './modals/MandiRouteModal';
import { VoiceBookingModal } from './modals/VoiceBookingModal';
import { PastReceiptsModal, YardGuidelinesModal } from './modals/FarmerSupportModals';

interface FarmerHomeProps {
  farmer: FarmerProfileData;
  language: Language;
  onBookSlot: () => void;
  onTrackPass: () => void;
  onOpenBookings: () => void;
  onOpenProfile: () => void;
  onSelectLanguage: (lang: Language) => void;
}

export const FarmerHome: React.FC<FarmerHomeProps> = ({
  farmer,
  language,
  onBookSlot,
  onTrackPass,
  onOpenBookings,
  onOpenProfile,
  onSelectLanguage
}) => {
  const [showParchi, setShowParchi] = useState(false);
  const [showRoute, setShowRoute] = useState(false);
  const [showVoice, setShowVoice] = useState(false);
  const [showReceipts, setShowReceipts] = useState(false);
  const [showGuidelines, setShowGuidelines] = useState(false);

  return (
    <div className="w-full max-w-lg mx-auto pb-24 px-4 pt-3 flex flex-col gap-4 animate-in fade-in duration-300">
      {/* Farmer Profile Card */}
      <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-outline-variant/30 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative shrink-0">
            <img
              src={FARMER_PORTRAIT_URL}
              alt={farmer.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-primary-fixed shadow-xs"
            />
            <div className="absolute -bottom-1 -right-1 bg-primary text-white rounded-full p-0.5" title="Verified Farmer">
              <span className="material-symbols-outlined text-[14px]">check</span>
            </div>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h2 className="text-base font-bold text-slate-900 leading-tight truncate">
                {language === 'hi' ? farmer.nameHi : language === 'pa' ? farmer.namePa : farmer.name}
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold shrink-0">
                प्रमाणित किसान
              </span>
            </div>
            <p className="text-xs text-slate-500 font-mono mt-0.5">ID: {farmer.id}</p>
            <p className="text-xs font-medium text-emerald-800 flex items-center gap-1 mt-0.5">
              <span className="material-symbols-outlined text-[14px]">grain</span>
              {farmer.registeredCrop}
            </p>
          </div>
        </div>

        <button
          onClick={onOpenProfile}
          className="p-2 text-slate-400 hover:text-primary transition-colors shrink-0"
          title="View Complete Profile"
        >
          <span className="material-symbols-outlined text-2xl">chevron_right</span>
        </button>
      </div>

      {/* Voice Assistant & Quick Language Row */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 bg-surface-container-low p-1 rounded-xl border border-outline-variant/30">
          <button
            onClick={() => onSelectLanguage('en')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              language === 'en' ? 'bg-primary text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            English
          </button>
          <button
            onClick={() => onSelectLanguage('pa')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              language === 'pa' ? 'bg-primary text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ਪੰਜਾਬੀ
          </button>
          <button
            onClick={() => onSelectLanguage('hi')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              language === 'hi' ? 'bg-primary text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            हिंदी
          </button>
        </div>

        <button
          onClick={() => setShowVoice(true)}
          className="flex-1 min-h-[38px] bg-secondary-fixed/40 hover:bg-secondary-fixed/60 border border-secondary/30 text-secondary-container-variant text-xs font-bold rounded-xl px-3 flex items-center justify-center gap-1.5 transition-all active:scale-98 shadow-2xs text-[#763300]"
        >
          <span className="material-symbols-outlined text-[18px] text-[#9b4500]">mic</span>
          Speak to Book (बोलकर बुक करें)
        </button>
      </div>

      {/* Active Gate Pass Voucher (Tomorrow's Gate Pass) */}
      <div className="bg-gradient-to-br from-[#003b1b] to-[#14532d] text-white rounded-2xl p-4 md:p-5 shadow-lg relative overflow-hidden">
        {/* Subtle background emblem watermark */}
        <div className="absolute -right-8 -bottom-8 w-40 h-40 opacity-10 pointer-events-none">
          <span className="material-symbols-outlined text-[160px]">local_shipping</span>
        </div>

        <div className="flex items-start justify-between relative z-10">
          <div>
            <span className="px-2 py-0.5 rounded-md bg-emerald-400/20 text-emerald-200 text-[10px] font-bold tracking-wide uppercase">
              CONFIRMED APMC GATE PASS
            </span>
            <div className="text-2xl font-black font-mono mt-1 text-primary-fixed tracking-tight">
              {farmer.activeToken}
            </div>
            <p className="text-xs text-emerald-100 font-medium">{farmer.gatePassDate}</p>
          </div>

          {/* QR Code with animated scanner beam */}
          <div className="w-20 h-20 bg-white rounded-xl p-1.5 relative overflow-hidden shrink-0 shadow-md border border-emerald-300/30">
            <svg className="w-full h-full text-slate-900" viewBox="0 0 100 100" fill="currentColor">
              <rect x="5" y="5" width="28" height="28" rx="2" />
              <rect x="11" y="11" width="16" height="16" fill="#fff" />
              <rect x="15" y="15" width="8" height="8" />
              <rect x="67" y="5" width="28" height="28" rx="2" />
              <rect x="73" y="11" width="16" height="16" fill="#fff" />
              <rect x="77" y="15" width="8" height="8" />
              <rect x="5" y="67" width="28" height="28" rx="2" />
              <rect x="11" y="73" width="16" height="16" fill="#fff" />
              <rect x="15" y="77" width="8" height="8" />
              <rect x="40" y="10" width="8" height="18" />
              <rect x="52" y="24" width="10" height="8" />
              <rect x="40" y="40" width="20" height="20" />
              <rect x="46" y="46" width="8" height="8" fill="#fff" />
              <rect x="68" y="42" width="12" height="6" />
              <rect x="42" y="68" width="8" height="24" />
              <rect x="56" y="74" width="16" height="8" />
              <rect x="78" y="72" width="14" height="20" />
            </svg>
            <div className="absolute left-0 right-0 h-1 bg-emerald-400 shadow-[0_0_8px_#4ade80] scanner-line pointer-events-none" />
          </div>
        </div>

        {/* Gate Details grid */}
        <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-white/15 text-xs relative z-10">
          <div className="bg-black/20 p-2.5 rounded-xl">
            <span className="text-emerald-300 text-[10px] block font-semibold">REPORTING WAVE</span>
            <span className="font-bold text-white text-sm">{farmer.slotTime}</span>
          </div>
          <div className="bg-black/20 p-2.5 rounded-xl">
            <span className="text-emerald-300 text-[10px] block font-semibold">ENTRY GATE</span>
            <span className="font-bold text-white text-sm">{farmer.assignedGate}</span>
          </div>
        </div>

        {/* Action Buttons inside Gate Pass */}
        <div className="grid grid-cols-3 gap-2 mt-3 pt-2 relative z-10">
          <button
            onClick={() => setShowParchi(true)}
            className="min-h-[38px] bg-white text-primary font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm hover:bg-emerald-50 transition-all active:scale-98"
          >
            <span className="material-symbols-outlined text-[16px]">receipt</span>
            e-Parchi (पर्ची)
          </button>
          <button
            onClick={() => setShowRoute(true)}
            className="min-h-[38px] bg-white/15 hover:bg-white/25 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">navigation</span>
            Mandi Route
          </button>
          <button
            onClick={onTrackPass}
            className="min-h-[38px] bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-1 hover:bg-emerald-300 transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-[16px]">timeline</span>
            Track Live
          </button>
        </div>
      </div>

      {/* Nearest Mandi Live Capacity & Book Slot CTA */}
      <div className="bg-surface-container-lowest rounded-2xl p-4 md:p-5 shadow-sm border border-outline-variant/30 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">domain</span>
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 leading-tight">
                Karnal Main APMC Yard
              </h3>
              <span className="text-[11px] text-slate-500">4.2 km • GT Road Bypass</span>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded-full text-[11px] font-semibold">
            <span className="material-symbols-outlined text-[14px] text-amber-600">wb_sunny</span>
            28°C
          </div>
        </div>

        {/* Live Yard Congestion Gauge */}
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1.5">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-slate-600">Live Yard Capacity</span>
            <span className="text-slate-900">68% Full (680 / 1,000 Trolleys)</span>
          </div>
          <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500 w-[68%] rounded-full" />
          </div>
          <div className="flex justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1 text-emerald-700 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
              Moderate Traffic
            </span>
            <span>Avg Gate Wait: ~22 Mins</span>
          </div>
        </div>

        {/* Major Breathing CTA Button */}
        <button
          onClick={onBookSlot}
          className="w-full min-h-[48px] bg-primary hover:bg-primary-container text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-all active:scale-98 shadow-md btn-breathe"
        >
          <span className="material-symbols-outlined text-[20px] text-primary-fixed">calendar_add_on</span>
          Book a Slot (नया स्लॉट बुक करें)
        </button>
      </div>

      {/* Govt MSP Support Card */}
      <div className="bg-surface-container-low rounded-2xl p-4 border border-outline-variant/30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-2xl">currency_rupee</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
              Govt MSP (न्यूनतम समर्थन मूल्य)
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-black text-slate-900">₹2,275</span>
              <span className="text-xs text-slate-600 font-medium">/ Quintal</span>
              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-1 rounded">
                +2.4% YoY
              </span>
            </div>
          </div>
        </div>
        <div className="text-right text-[11px] text-slate-500">
          <span className="block font-semibold text-slate-700">Central RMS Rate</span>
          <span>100% Direct DBT</span>
        </div>
      </div>

      {/* Quick Farmer Resources Grid */}
      <div className="grid grid-cols-2 gap-3 text-xs">
        <button
          onClick={() => setShowReceipts(true)}
          className="p-3 bg-surface-container-lowest rounded-xl border border-slate-200 hover:border-primary/40 hover:bg-slate-50 flex items-center gap-2.5 transition-all text-left"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-lg">receipt_long</span>
          </div>
          <div>
            <strong className="block text-slate-900">Past Receipts</strong>
            <span className="text-[11px] text-slate-500">View J-Forms & Weight</span>
          </div>
        </button>

        <button
          onClick={() => setShowGuidelines(true)}
          className="p-3 bg-surface-container-lowest rounded-xl border border-slate-200 hover:border-primary/40 hover:bg-slate-50 flex items-center gap-2.5 transition-all text-left"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-800 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-lg">menu_book</span>
          </div>
          <div>
            <strong className="block text-slate-900">Yard Guidelines</strong>
            <span className="text-[11px] text-slate-500">Moisture & FAQ rules</span>
          </div>
        </button>
      </div>

      {/* Toll Free Helpline Footer Banner */}
      <div className="bg-slate-900 text-white rounded-xl p-3 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-amber-400 text-xl">support_agent</span>
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">KISAN CALL CENTRE (24x7)</span>
            <span className="font-bold text-white text-sm">1800-180-1551</span>
          </div>
        </div>
        <a
          href="tel:18001801551"
          className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1 transition-colors"
        >
          <span className="material-symbols-outlined text-[14px]">call</span>
          Dial Free
        </a>
      </div>

      {/* Modals */}
      <EParchiModal isOpen={showParchi} onClose={() => setShowParchi(false)} farmer={farmer} />
      <MandiRouteModal isOpen={showRoute} onClose={() => setShowRoute(false)} />
      <VoiceBookingModal
        isOpen={showVoice}
        onClose={() => setShowVoice(false)}
        onRecognized={({ day, timeSlot }) => {
          onBookSlot();
        }}
      />
      <PastReceiptsModal isOpen={showReceipts} onClose={() => setShowReceipts(false)} />
      <YardGuidelinesModal isOpen={showGuidelines} onClose={() => setShowGuidelines(false)} />

      {/* Mobile Sticky Bottom Nav Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-surface/95 backdrop-blur-lg border-t border-outline-variant/30 py-2 px-6 flex justify-around items-center z-40 max-w-lg mx-auto">
        <button
          className="flex flex-col items-center text-primary text-[10px] font-bold"
        >
          <span className="material-symbols-outlined text-2xl">home</span>
          Home (मुख्य)
        </button>
        <button
          onClick={onOpenBookings}
          className="flex flex-col items-center text-slate-500 hover:text-slate-900 text-[10px] font-medium"
        >
          <span className="material-symbols-outlined text-2xl">book_online</span>
          Bookings (बुकिंग)
        </button>
        <button
          onClick={onTrackPass}
          className="flex flex-col items-center text-slate-500 hover:text-slate-900 text-[10px] font-medium"
        >
          <span className="material-symbols-outlined text-2xl">local_shipping</span>
          Track (ट्रैक)
        </button>
        <button
          onClick={onOpenProfile}
          className="flex flex-col items-center text-slate-500 hover:text-slate-900 text-[10px] font-medium"
        >
          <span className="material-symbols-outlined text-2xl">person</span>
          Profile (किसान)
        </button>
      </div>
    </div>
  );
};
