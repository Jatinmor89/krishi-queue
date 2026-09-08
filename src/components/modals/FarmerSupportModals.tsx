import React from 'react';

// Past Receipts Modal
export const PastReceiptsModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-5 border border-slate-200 flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center border-b pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-2xl">receipt_long</span>
            <h3 className="font-bold text-slate-900 text-base">Past Mandi Procurement Receipts</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="py-3 space-y-3 overflow-y-auto text-xs">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <div className="flex justify-between font-bold text-slate-900">
              <span>Token #KQ-2024-7712</span>
              <span className="text-emerald-700">₹1,02,375 Paid</span>
            </div>
            <div className="text-slate-600">Crop: Wheat (PBW-550) • 45.00 Qtl @ ₹2,275 MSP</div>
            <div className="text-[11px] text-slate-400">Date: 12 Oct 2024 • J-Form #JF-980124 (Credited via DBT)</div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <div className="flex justify-between font-bold text-slate-900">
              <span>Token #KQ-2023-9120</span>
              <span className="text-emerald-700">₹1,53,600 Paid</span>
            </div>
            <div className="text-slate-600">Crop: Paddy (PR-126) • 70.00 Qtl @ ₹2,183 MSP</div>
            <div className="text-[11px] text-slate-400">Date: 04 Nov 2023 • J-Form #JF-711920 (Credited via DBT)</div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <div className="flex justify-between font-bold text-slate-900">
              <span>Token #KQ-2023-3419</span>
              <span className="text-emerald-700">₹1,12,875 Paid</span>
            </div>
            <div className="text-slate-600">Crop: Wheat (HD-3086) • 53.10 Qtl @ ₹2,125 MSP</div>
            <div className="text-[11px] text-slate-400">Date: 18 Apr 2023 • J-Form #JF-511029 (Credited via DBT)</div>
          </div>
        </div>

        <div className="pt-3 border-t">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-primary text-white font-bold text-xs rounded-xl hover:bg-primary-container"
          >
            Close Receipts
          </button>
        </div>
      </div>
    </div>
  );
};

// Yard Guidelines Modal
export const YardGuidelinesModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-5 border border-slate-200 flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center border-b pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-2xl">menu_book</span>
            <h3 className="font-bold text-slate-900 text-base">Mandi Yard Guidelines & Standards</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="py-3 space-y-3 overflow-y-auto text-xs text-slate-700">
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
            <strong className="text-emerald-900 block mb-1">1. Moisture Limits (FAQ Standard)</strong>
            <p>Moisture content should strictly be below 12.00%. Grains exceeding 12.00% will require sun drying at the designated Mandi drying plinths before weighing.</p>
          </div>

          <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
            <strong className="text-blue-900 block mb-1">2. Timed Arrival & Token Gate Pass</strong>
            <p>Report to your assigned gate within 30 minutes of your wave start time. Display your QR code on phone or physical printout to the gate scanner.</p>
          </div>

          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
            <strong className="text-amber-900 block mb-1">3. Mandatory Documents</strong>
            <p>Ensure your Meri Fasal Mera Byora / e-Kharid registration is active and bank account is Aadhaar DBT enabled for direct payment without arhtiya delay.</p>
          </div>
        </div>

        <div className="pt-3 border-t">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-primary text-white font-bold text-xs rounded-xl hover:bg-primary-container"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
