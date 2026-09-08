import React, { useState } from 'react';

// Moisture Reading Modal
export const MoistureModal: React.FC<{ isOpen: boolean; onClose: () => void; tokenId: string; farmer: string }> = ({
  isOpen, onClose, tokenId, farmer
}) => {
  const [moisture, setMoisture] = useState(11.2);
  const [reTesting, setReTesting] = useState(false);

  if (!isOpen) return null;

  const handleRetest = () => {
    setReTesting(true);
    setTimeout(() => {
      setMoisture(Number((11.1 + Math.random() * 0.4).toFixed(2)));
      setReTesting(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl p-5 shadow-2xl border border-slate-200">
        <div className="flex justify-between items-center border-b pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-2xl">water_drop</span>
            <h3 className="font-bold text-slate-900">NIR Moisture Meter Reader</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="py-4 space-y-3 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl flex justify-between">
            <div>
              <span className="text-slate-500 block">Lot Token ID</span>
              <span className="font-mono font-bold text-slate-900 text-sm">{tokenId}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Farmer</span>
              <span className="font-bold text-slate-900 text-sm">{farmer}</span>
            </div>
          </div>

          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-center">
            <span className="text-emerald-800 text-xs font-semibold block uppercase">Observed Moisture Level</span>
            <div className="text-4xl font-black text-emerald-900 my-1 font-mono">
              {reTesting ? '...' : `${moisture}%`}
            </div>
            <span className="px-2 py-0.5 bg-emerald-200 text-emerald-900 rounded-full font-bold text-[11px]">
              FAQ Limit &lt; 12.00% (APPROVED)
            </span>
          </div>

          <p className="text-slate-600">
            Calibrated at 08:00 AM via Dickey-John GAC2500 bench meter. Temperature compensation applied (28.4°C).
          </p>
        </div>
        <div className="flex gap-2 pt-2 border-t">
          <button
            onClick={handleRetest}
            disabled={reTesting}
            className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold text-xs"
          >
            {reTesting ? 'Sampling Grain...' : 'Re-sample NIR Sensor'}
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2.5 bg-primary text-white rounded-xl font-semibold text-xs hover:bg-primary-container"
          >
            Confirm & Log to HSAMB
          </button>
        </div>
      </div>
    </div>
  );
};

// Tare Approval Modal
export const TareModal: React.FC<{ isOpen: boolean; onClose: () => void; tokenId: string; farmer: string }> = ({
  isOpen, onClose, tokenId, farmer
}) => {
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl p-5 shadow-2xl border border-slate-200">
        <div className="flex justify-between items-center border-b pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-700 text-2xl">scale</span>
            <h3 className="font-bold text-slate-900">Weighbridge Tare & Net Weight</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="py-4 space-y-3 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl flex justify-between">
            <div>
              <span className="text-slate-500 block">Token</span>
              <span className="font-mono font-bold text-slate-900">{tokenId} ({farmer})</span>
            </div>
            <div>
              <span className="text-slate-500 block">Platform</span>
              <span className="font-bold text-slate-900">Weighbridge #1 (Avery India)</span>
            </div>
          </div>

          <div className="space-y-2 border border-slate-200 rounded-xl p-3 bg-slate-50/50">
            <div className="flex justify-between">
              <span className="text-slate-600">Gross Weight (Loaded Tractor):</span>
              <span className="font-mono font-bold text-slate-900">12.40 MT (12,400 kg)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Tare Weight (Empty Trolley):</span>
              <span className="font-mono font-bold text-amber-800">6.40 MT (6,400 kg)</span>
            </div>
            <div className="flex justify-between pt-2 border-t font-bold text-sm text-primary">
              <span>Net Grain Intake:</span>
              <span className="font-mono">6.00 MT (60.00 Quintals)</span>
            </div>
          </div>

          <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-blue-900 text-[11px]">
            Weighbridge load cells verified by Legal Metrology Dept (Stamping valid till Nov 2025).
          </div>
        </div>
        <div className="flex gap-2 pt-2 border-t">
          <button
            onClick={() => {
              setConfirmed(true);
              setTimeout(() => {
                onClose();
              }, 1000);
            }}
            className="w-full py-2.5 bg-primary text-white rounded-xl font-bold text-xs hover:bg-primary-container"
          >
            {confirmed ? 'Tare Approved & Recorded ✓' : 'Approve Tare & Generate Weight Receipt'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Labour Bay Modal
export const BayModal: React.FC<{ isOpen: boolean; onClose: () => void; tokenId: string; farmer: string }> = ({
  isOpen, onClose, tokenId, farmer
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl p-5 shadow-2xl border border-slate-200">
        <div className="flex justify-between items-center border-b pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-2xl">warehouse</span>
            <h3 className="font-bold text-slate-900">Labour Bay Telemetry (Shed B)</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="py-4 space-y-3 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl flex justify-between">
            <div>
              <span className="text-slate-500 block">Lot Token</span>
              <span className="font-mono font-bold text-slate-900">{tokenId} • {farmer}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Assigned Shed</span>
              <span className="font-bold text-emerald-800">Covered Shed B - Bay 4</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 block">Active Labour Gangs</span>
              <span className="font-bold text-slate-900 text-sm">2 Teams (8 Workers)</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 block">Unloading Speed</span>
              <span className="font-bold text-emerald-700 text-sm">18 Bags / min</span>
            </div>
          </div>

          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900">
            Stacking status: Stitched in 50 kg jute gunny bags with official HSAMB barcoded tags.
          </div>
        </div>
        <div className="pt-2 border-t">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-primary text-white rounded-xl font-bold text-xs"
          >
            Acknowledge Stacking
          </button>
        </div>
      </div>
    </div>
  );
};

// Sign J-Form Modal
export const SignJFormModal: React.FC<{ isOpen: boolean; onClose: () => void; tokenId: string; farmer: string }> = ({
  isOpen, onClose, tokenId, farmer
}) => {
  const [signed, setSigned] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl p-5 shadow-2xl border border-slate-200">
        <div className="flex justify-between items-center border-b pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-2xl">draw</span>
            <h3 className="font-bold text-slate-900">Digital J-Form Authorization</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="py-4 space-y-3 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex justify-between mb-1">
              <span className="text-slate-500">Beneficiary Farmer:</span>
              <span className="font-bold text-slate-900">{farmer}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span className="text-slate-500">Quantity Procured:</span>
              <span className="font-bold text-slate-900">50.00 Qtl (Wheat HD-2967)</span>
            </div>
            <div className="flex justify-between mb-1">
              <span className="text-slate-500">Government MSP:</span>
              <span className="font-bold text-slate-900">₹2,275 / Qtl</span>
            </div>
            <div className="flex justify-between pt-2 border-t text-sm font-bold text-primary">
              <span>Total DBT Payable:</span>
              <span className="font-mono">₹1,13,750</span>
            </div>
          </div>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-[11px]">
            Signing will initiate an instantaneous automated clearing push to PFMS / NPCI for direct DBT credit within 48-72 hours.
          </div>
        </div>
        <div className="flex gap-2 pt-2 border-t">
          <button
            onClick={() => {
              setSigned(true);
              setTimeout(() => {
                onClose();
              }, 1200);
            }}
            className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">verified_user</span>
            {signed ? 'J-Form Digitally Signed & DBT Scheduled!' : 'e-Sign with Aadhaar / Mandi DSC Token'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Fraud Audit Logs Modal
export const FraudLogsModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl p-5 shadow-2xl border border-slate-200">
        <div className="flex justify-between items-center border-b pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-red-600 text-2xl">warning</span>
            <div>
              <h3 className="font-bold text-slate-900">Cartel & Fraud Surveillance Incident</h3>
              <p className="text-xs text-red-600">Incident #AF-891 • Split-Bidding Anomaly</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="py-4 space-y-3 text-xs">
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-900">
            <strong>Algorithmic Detection:</strong> Two trading accounts (Arhtiya #14 & Arhtiya #19) submitted complementary bids for Lot #W-412 within 180 milliseconds from identical MAC address subnets.
          </div>

          <div className="border border-slate-200 rounded-xl p-3 bg-slate-50 space-y-1.5">
            <div className="font-bold text-slate-800">Forensic Audit Log:</div>
            <div className="font-mono text-[11px] text-slate-600">
              09:42:11.102 - Bid from Vendor ID A-14 placed at ₹2,180 (Sub-MSP bid flagged)<br />
              09:42:11.282 - Bid from Vendor ID A-19 placed at ₹2,181 (Paired spread)<br />
              09:42:12.000 - APMC AI Shield froze auction room for Lot #W-412.
            </div>
          </div>

          <div className="text-slate-600">
            Action taken: Sub-yard trading licenses temporarily halted for inquiry under Haryana APMC Act Section 37.
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-2 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-primary text-white rounded-xl font-bold text-xs"
          >
            Dismiss & Forward to Vigilance Officer
          </button>
        </div>
      </div>
    </div>
  );
};
