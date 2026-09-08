import React from 'react';

interface MandiRouteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MandiRouteModal: React.FC<MandiRouteModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]">
        <div className="bg-primary text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-fixed text-[24px]">navigation</span>
            <div>
              <h3 className="font-bold text-base leading-tight">Mandi Route & Entry Gate Map</h3>
              <p className="text-xs text-primary-fixed">Karnal Main APMC Yard #04 (4.2 km via GT Road)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-4 text-slate-800 text-xs">
          {/* Visual Schematic Route Diagram */}
          <div className="w-full h-56 bg-slate-900 rounded-xl p-3 relative overflow-hidden flex flex-col justify-between border border-slate-700">
            <div className="flex justify-between items-center text-white z-10">
              <span className="px-2 py-0.5 bg-emerald-700 text-emerald-100 rounded text-[10px] font-bold">
                GPS LIVE ROUTE
              </span>
              <span className="text-slate-400 text-[11px]">Traffic: Moderate (ETA 12 mins)</span>
            </div>

            {/* SVG schematic map */}
            <svg className="absolute inset-0 w-full h-full opacity-80" viewBox="0 0 400 200">
              {/* Roads */}
              <line x1="20" y1="180" x2="160" y2="100" stroke="#475569" strokeWidth="12" strokeLinecap="round" />
              <line x1="160" y1="100" x2="320" y2="60" stroke="#475569" strokeWidth="14" strokeLinecap="round" />
              <line x1="320" y1="60" x2="380" y2="40" stroke="#334155" strokeWidth="8" strokeLinecap="round" />
              
              {/* Route line highlight */}
              <path d="M 20 180 L 160 100 L 300 65" fill="none" stroke="#22c55e" strokeWidth="4" strokeDasharray="6 3" />

              {/* Waypoints */}
              <circle cx="20" cy="180" r="7" fill="#3b82f6" />
              <text x="32" y="185" fill="#e2e8f0" fontSize="10" fontWeight="bold">Taraori Bypass</text>

              <circle cx="160" cy="100" r="6" fill="#f59e0b" />
              <text x="172" y="104" fill="#cbd5e1" fontSize="9">Namaste Chowk Flyover</text>

              {/* APMC Yard Boundary */}
              <rect x="270" y="20" width="120" height="90" rx="8" fill="#14532d" fillOpacity="0.4" stroke="#22c55e" strokeWidth="1.5" />
              <text x="280" y="38" fill="#86efac" fontSize="10" fontWeight="bold">Karnal APMC Yard</text>

              {/* Gates */}
              <circle cx="285" cy="55" r="5" fill="#ef4444" />
              <text x="295" y="58" fill="#fca5a5" fontSize="8">Gate 1 (Packed)</text>

              <circle cx="300" cy="65" r="7" fill="#22c55e" />
              <text x="312" y="70" fill="#4ade80" fontSize="9" fontWeight="bold">Gate 3 (YOUR ENTRY)</text>
              <circle cx="300" cy="65" r="12" fill="none" stroke="#22c55e" strokeWidth="2" opacity="0.6">
                <animate attributeName="r" values="7;16;7" dur="2s" repeatCount="indefinite" />
              </circle>
            </svg>

            <div className="z-10 bg-slate-950/80 backdrop-blur-xs p-2 rounded-lg border border-slate-800 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block">Recommended Lane</span>
                <span className="font-bold text-emerald-400">GT Road Service Lane → Gate No. 3</span>
              </div>
              <span className="px-2 py-1 bg-emerald-600 rounded text-[11px] font-bold">Fast Influx</span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">Gate Instructions for Tractor Trolleys:</h4>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex gap-3 items-start">
              <div className="w-6 h-6 rounded-full bg-primary text-white font-bold flex items-center justify-center shrink-0 text-xs">
                1
              </div>
              <div>
                <strong className="text-slate-900 block">Fast-Tag & RFID Lane (Gate 3)</strong>
                <p className="text-slate-600">
                  Tractors with Token #KQ-8821 must enter via Gate 3 (opposite Kisan Bhawan) to bypass heavy civil truck traffic on Gate 1.
                </p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex gap-3 items-start">
              <div className="w-6 h-6 rounded-full bg-primary text-white font-bold flex items-center justify-center shrink-0 text-xs">
                2
              </div>
              <div>
                <strong className="text-slate-900 block">Direct Weighbridge Platform #2</strong>
                <p className="text-slate-600">
                  Once scanned at Gate 3, follow green ground painted lines directly to Gross Weighbridge 2 for automatic zero-calibration.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 min-h-[40px] bg-primary text-white rounded-xl font-semibold text-xs hover:bg-primary-container transition-colors"
          >
            Got It (समझ गए)
          </button>
        </div>
      </div>
    </div>
  );
};
