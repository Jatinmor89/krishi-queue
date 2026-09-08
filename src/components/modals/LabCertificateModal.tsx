import React, { useState } from 'react';

interface LabCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  tokenNumber: string;
}

export const LabCertificateModal: React.FC<LabCertificateModalProps> = ({ isOpen, onClose, tokenNumber }) => {
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => {
      setDownloaded(false);
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]">
        {/* Certificate Header */}
        <div className="bg-tertiary-container text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-tertiary-fixed text-[24px]">science</span>
            <div>
              <h3 className="font-bold text-base leading-tight">Grain Testing Certificate</h3>
              <p className="text-xs text-tertiary-fixed">APMC Central Assaying Laboratory • NABL Accredited</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Certificate Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-slate-800 text-xs">
          <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-200">
            <div>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">CERTIFICATE REF</span>
              <div className="font-mono font-bold text-sm text-slate-900">LAB-W-409 / 2024</div>
              <span className="text-[11px] text-slate-600">Sample Linked to Token: <strong>{tokenNumber}</strong></span>
            </div>
            <div className="text-right">
              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full font-bold text-xs inline-flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">check_circle</span>
                PASSED FAQ (A-GRADE)
              </span>
            </div>
          </div>

          {/* Core Quality Parameters Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-2.5">Parameter</th>
                  <th className="p-2.5">Max Standard</th>
                  <th className="p-2.5">Observed Test</th>
                  <th className="p-2.5 text-right">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="p-2.5 font-medium">Moisture Content (नमी)</td>
                  <td className="p-2.5 text-slate-500">≤ 12.00%</td>
                  <td className="p-2.5 font-mono font-bold text-emerald-700">11.80%</td>
                  <td className="p-2.5 text-right text-emerald-700 font-bold">Passed</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium">Foreign Matter (कचरा/मिट्टी)</td>
                  <td className="p-2.5 text-slate-500">≤ 0.75%</td>
                  <td className="p-2.5 font-mono font-bold text-emerald-700">0.05%</td>
                  <td className="p-2.5 text-right text-emerald-700 font-bold">Passed</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium">Damaged / Shriveled Grains</td>
                  <td className="p-2.5 text-slate-500">≤ 4.00%</td>
                  <td className="p-2.5 font-mono font-bold text-emerald-700">1.10%</td>
                  <td className="p-2.5 text-right text-emerald-700 font-bold">Passed</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium">Hectolitre Weight</td>
                  <td className="p-2.5 text-slate-500">≥ 76 kg/hL</td>
                  <td className="p-2.5 font-mono font-bold text-emerald-700">78.4 kg/hL</td>
                  <td className="p-2.5 text-right text-emerald-700 font-bold">Grade-A</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium">Insect Infestation</td>
                  <td className="p-2.5 text-slate-500">NIL</td>
                  <td className="p-2.5 font-mono font-bold text-emerald-700">NIL</td>
                  <td className="p-2.5 text-right text-emerald-700 font-bold">Zero</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-2 gap-3 bg-emerald-50/60 p-3 rounded-xl border border-emerald-200 text-xs">
            <div>
              <span className="text-emerald-800 font-bold block">Assayer Assessment</span>
              <p className="text-emerald-950 mt-0.5">
                Superior quality Sharbati lot. Eligible for 100% full MSP payment without deductions.
              </p>
            </div>
            <div className="text-right flex flex-col items-end justify-center">
              <span className="text-[11px] text-slate-500">MSP Procurement Rate</span>
              <span className="font-bold text-lg text-primary">₹2,275 / Qtl</span>
              <span className="text-[10px] text-emerald-700 font-medium">Zero dockage deduction</span>
            </div>
          </div>

          {/* Signature Badge */}
          <div className="flex justify-between items-center pt-2 border-t border-slate-200">
            <div>
              <span className="text-slate-400 text-[10px] block">Testing Chemist</span>
              <span className="font-bold text-slate-800 text-xs">R. K. Sharma (Senior Assayer)</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-semibold">
              <span className="material-symbols-outlined text-sm">verified_user</span>
              Digital DSC Verified
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex gap-2">
          <button
            onClick={handleDownload}
            className="flex-1 min-h-[44px] bg-tertiary-container hover:bg-tertiary text-white rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-all active:scale-98"
          >
            <span className="material-symbols-outlined text-[18px]">
              {downloaded ? 'check' : 'download'}
            </span>
            {downloaded ? 'Certificate Downloaded (PDF)!' : 'Download Laboratory Slip (PDF)'}
          </button>
          <button
            onClick={onClose}
            className="px-4 min-h-[44px] bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-xl font-semibold text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
