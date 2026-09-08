import React from 'react';
import { FarmerProfileData, Language } from '../types';
import { FARMER_PORTRAIT_URL } from '../data/mockData';

interface FarmerProfileProps {
  farmer: FarmerProfileData;
  language: Language;
  onBackToHome: () => void;
  onToggleLanguage: (lang: Language) => void;
}

export const FarmerProfile: React.FC<FarmerProfileProps> = ({
  farmer,
  language,
  onBackToHome,
  onToggleLanguage
}) => {
  return (
    <div className="w-full max-w-lg mx-auto pb-24 px-4 pt-2 flex flex-col gap-4 animate-in fade-in duration-300">
      {/* Top Bar */}
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={onBackToHome}
          className="p-2 -ml-2 text-slate-700 hover:text-primary rounded-full hover:bg-slate-100 transition-colors flex items-center gap-1 text-sm font-semibold"
        >
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
          <span>Home (मुख्य)</span>
        </button>

        <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
          e-Kharid Verified
        </span>
      </div>

      {/* Profile Header */}
      <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-slate-200 flex items-center gap-4">
        <img
          src={FARMER_PORTRAIT_URL}
          alt={farmer.name}
          className="w-18 h-18 rounded-full object-cover border-4 border-primary-fixed shadow-md shrink-0"
        />
        <div className="min-w-0">
          <h2 className="text-lg font-bold text-slate-900 leading-tight">
            {farmer.name}
          </h2>
          <p className="text-xs text-slate-600 font-medium mt-0.5">{farmer.nameHi} • {farmer.namePa}</p>
          <div className="flex items-center gap-1.5 mt-1.5">
            <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary font-mono text-[11px] font-bold">
              {farmer.id}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">
              ACTIVE
            </span>
          </div>
        </div>
      </div>

      {/* Verified Government Credentials */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3 text-xs">
        <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
          <span className="material-symbols-outlined text-primary text-base">verified_user</span>
          Government Registry & Land Record
        </h3>

        <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
          <div>
            <span className="text-slate-500 block text-[11px]">Registered Land Area</span>
            <strong className="text-slate-900 font-bold">{farmer.landArea}</strong>
          </div>
          <div>
            <span className="text-slate-500 block text-[11px]">Primary Crop</span>
            <strong className="text-emerald-800 font-bold">{farmer.registeredCrop}</strong>
          </div>
          <div>
            <span className="text-slate-500 block text-[11px]">Village / Block</span>
            <strong className="text-slate-900">{farmer.village}</strong>
          </div>
          <div>
            <span className="text-slate-500 block text-[11px]">District / State</span>
            <strong className="text-slate-900">{farmer.district}, {farmer.state}</strong>
          </div>
        </div>
      </div>

      {/* Banking & Direct Benefit Transfer (DBT) */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3 text-xs">
        <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
          <span className="material-symbols-outlined text-primary text-base">account_balance</span>
          Bank Account for Direct DBT Credit
        </h3>

        <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200 space-y-1.5">
          <div className="flex justify-between items-center">
            <span className="font-bold text-emerald-950">{farmer.bankAccount}</span>
            <span className="px-2 py-0.5 bg-emerald-200 text-emerald-900 font-bold text-[10px] rounded-full">
              Aadhaar Linked
            </span>
          </div>
          <div className="text-slate-600 text-[11px]">IFSC: {farmer.ifsc} • PM-KISAN e-KYC: Active</div>
          <p className="text-[10px] text-emerald-800 mt-1">
            All MSP procurement funds are directly credited to this bank account within 48 to 72 hours via Public Financial Management System (PFMS).
          </p>
        </div>
      </div>

      {/* Language Preferences */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3 text-xs">
        <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
          <span className="material-symbols-outlined text-primary text-base">translate</span>
          App Language Preference (भाषा चुनें)
        </h3>

        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => onToggleLanguage('en')}
            className={`py-2 px-3 rounded-xl font-bold text-xs border transition-all ${
              language === 'en'
                ? 'bg-primary text-white border-primary shadow-xs'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            English
          </button>
          <button
            onClick={() => onToggleLanguage('hi')}
            className={`py-2 px-3 rounded-xl font-bold text-xs border transition-all ${
              language === 'hi'
                ? 'bg-primary text-white border-primary shadow-xs'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            हिन्दी
          </button>
          <button
            onClick={() => onToggleLanguage('pa')}
            className={`py-2 px-3 rounded-xl font-bold text-xs border transition-all ${
              language === 'pa'
                ? 'bg-primary text-white border-primary shadow-xs'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            ਪੰਜਾਬੀ
          </button>
        </div>
      </div>
    </div>
  );
};
