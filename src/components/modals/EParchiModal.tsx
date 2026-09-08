import React from 'react';
import { FarmerProfileData } from '../../types';

interface EParchiModalProps {
  isOpen: boolean;
  onClose: () => void;
  farmer: FarmerProfileData;
}

export const EParchiModal: React.FC<EParchiModalProps> = ({ isOpen, onClose, farmer }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]">
        {/* Pass Header */}
        <div className="bg-primary text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-fixed text-[24px]">verified</span>
            <div>
              <h3 className="font-bold text-base leading-tight">Mandi Electronic Gate Pass</h3>
              <p className="text-xs text-primary-fixed">हरियाणा राज्य कृषि विपणन बोर्ड (HSAMB)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Printable Pass Body */}
        <div className="p-5 overflow-y-auto flex flex-col gap-4 text-slate-800">
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">TOKEN NUMBER</span>
              <div className="font-mono text-2xl font-black text-primary">{farmer.activeToken}</div>
              <span className="text-xs text-slate-600 font-medium">{farmer.gatePassDate}</span>
            </div>
            <div className="w-20 h-20 bg-slate-50 border border-slate-300 rounded-lg p-1 flex items-center justify-center">
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
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-xl border border-slate-200">
            <div>
              <span className="text-slate-500 font-semibold block">Farmer Name</span>
              <span className="font-bold text-slate-900 text-sm">{farmer.name}</span>
              <span className="text-slate-600 block">{farmer.nameHi}</span>
            </div>
            <div>
              <span className="text-slate-500 font-semibold block">Farmer ID</span>
              <span className="font-mono font-bold text-primary">{farmer.id}</span>
            </div>
            <div>
              <span className="text-slate-500 font-semibold block">Crop Variety</span>
              <span className="font-bold text-slate-900">{farmer.registeredCrop}</span>
            </div>
            <div>
              <span className="text-slate-500 font-semibold block">Declared Quantity</span>
              <span className="font-bold text-amber-800">~45.00 Quintals</span>
            </div>
            <div>
              <span className="text-slate-500 font-semibold block">Assigned Gate</span>
              <span className="font-bold text-primary">{farmer.assignedGate}</span>
            </div>
            <div>
              <span className="text-slate-500 font-semibold block">Reporting Wave</span>
              <span className="font-bold text-slate-900">{farmer.slotTime}</span>
            </div>
          </div>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2">
            <span className="material-symbols-outlined text-[18px] text-amber-700 shrink-0">info</span>
            <p>
              Please display this digital pass at <strong>Gate No. 3 Scanner</strong> on arrival. Keep your moisture pre-tested and vehicle registration slip handy.
            </p>
          </div>

          {/* Barcode representation */}
          <div className="flex flex-col items-center py-2 border-t border-slate-200">
            <div className="flex items-center gap-1 h-10 w-full justify-center">
              {[4, 2, 6, 2, 8, 3, 2, 5, 2, 7, 3, 2, 6, 4, 2, 8, 3, 4, 2, 6, 2, 4, 3, 7, 2].map((h, i) => (
                <div key={i} className="bg-slate-900 w-1 rounded-xs" style={{ height: `${h * 4}px` }} />
              ))}
            </div>
            <span className="font-mono text-[11px] text-slate-500 tracking-widest mt-1">HSAMB-KRN-2024-8821-DIGI</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex gap-2">
          <button
            onClick={() => {
              window.print();
            }}
            className="flex-1 min-h-[44px] bg-primary hover:bg-primary-container text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98"
          >
            <span className="material-symbols-outlined text-[18px]">print</span>
            Print / Save Pass
          </button>
          <button
            onClick={onClose}
            className="px-4 min-h-[44px] bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-xl font-semibold text-sm transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
