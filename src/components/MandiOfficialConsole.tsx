import React, { useState } from 'react';
import { mockProcurementQueue, mockTransitTrucks } from '../data/mockData';
import {
  MoistureModal,
  TareModal,
  BayModal,
  SignJFormModal,
  FraudLogsModal
} from './modals/MandiConsoleModals';

interface MandiOfficialConsoleProps {
  onBackToHome?: () => void;
}

export const MandiOfficialConsole: React.FC<MandiOfficialConsoleProps> = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGate, setSelectedGate] = useState('all');
  const [cartelAlertDismissed, setCartelAlertDismissed] = useState(false);
  const [activeNavTab, setActiveNavTab] = useState<'queue' | 'yard' | 'transit' | 'fraud' | 'reports'>('queue');

  // Modal states
  const [activeModal, setActiveModal] = useState<{
    type: 'moisture' | 'tare' | 'bay' | 'jform' | 'fraud' | 'gps' | null;
    tokenId?: string;
    farmer?: string;
  }>({ type: null });

  const filteredQueue = mockProcurementQueue.filter((item) => {
    const matchesSearch =
      item.farmerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tokenId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.variety.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesGate =
      selectedGate === 'all' || item.gate.toLowerCase().includes(selectedGate.toLowerCase());

    return matchesSearch && matchesGate;
  });

  return (
    <div className="w-full max-w-7xl mx-auto pb-20 px-3 md:px-6 pt-3 space-y-5 animate-in fade-in duration-300">
      {/* Console Top Header Banner */}
      <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-xs border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-base shadow-xs">
            <span className="material-symbols-outlined text-2xl">admin_panel_settings</span>
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-extrabold text-slate-900 text-lg">
                APMC Mandi Official Operations Console
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                Karnal Yard #04
              </span>
            </div>
            <p className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
              <span>Haryana State Agricultural Marketing Board (HSAMB)</span>
              <span>•</span>
              <span className="text-emerald-700 font-medium flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                WebSockets Stream Synced (38ms ping)
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end md:self-auto text-xs">
          <div className="text-right hidden sm:block">
            <span className="font-bold text-slate-900 block">R. K. Sharma</span>
            <span className="text-slate-500 text-[11px]">Senior Procurement Inspector</span>
          </div>
          <div className="w-9 h-9 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center justify-center font-bold">
            RS
          </div>
        </div>
      </div>

      {/* Navigation Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setActiveNavTab('queue')}
          className={`px-3.5 py-1.5 rounded-xl font-bold text-xs shrink-0 flex items-center gap-1.5 transition-all ${
            activeNavTab === 'queue'
              ? 'bg-primary text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">groups</span>
          Live Intake Queue
          <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-[10px]">342</span>
        </button>

        <button
          onClick={() => setActiveNavTab('yard')}
          className={`px-3.5 py-1.5 rounded-xl font-bold text-xs shrink-0 flex items-center gap-1.5 transition-all ${
            activeNavTab === 'yard'
              ? 'bg-primary text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">warehouse</span>
          Yard & Weighbridge
          <span className="px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 text-[10px]">68%</span>
        </button>

        <button
          onClick={() => setActiveNavTab('transit')}
          className={`px-3.5 py-1.5 rounded-xl font-bold text-xs shrink-0 flex items-center gap-1.5 transition-all ${
            activeNavTab === 'transit'
              ? 'bg-primary text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">local_shipping</span>
          Trucks In-Transit
          <span className="px-1.5 py-0.2 rounded-full bg-blue-100 text-blue-800 text-[10px]">12 Silos</span>
        </button>

        <button
          onClick={() => setActiveNavTab('fraud')}
          className={`px-3.5 py-1.5 rounded-xl font-bold text-xs shrink-0 flex items-center gap-1.5 transition-all ${
            activeNavTab === 'fraud'
              ? 'bg-red-700 text-white shadow-xs'
              : 'bg-white border border-red-200 text-red-700 hover:bg-red-50'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">warning</span>
          Cartel Watch
          <span className="px-1.5 py-0.2 rounded-full bg-red-100 text-red-800 text-[10px]">1 Flag</span>
        </button>
      </div>

      {/* Anti-Fraud Cartel Alert (collapsible/dismissible) */}
      {!cartelAlertDismissed && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-2xs">
          <div className="flex items-start gap-2.5">
            <span className="material-symbols-outlined text-red-600 text-2xl shrink-0 mt-0.5">
              shield_with_heart
            </span>
            <div>
              <div className="flex items-center gap-2">
                <strong className="text-red-900 font-bold text-sm">
                  Anti-Collusion Cartel Alert Active
                </strong>
                <span className="px-2 py-0.5 bg-red-200 text-red-900 rounded font-mono font-bold text-[10px]">
                  #AF-891
                </span>
              </div>
              <p className="text-red-800/90 mt-0.5 leading-relaxed">
                Split-bidding pattern flagged between Arhtiya #14 and #19 on Lot #W-412 within 180ms. Automated lock applied to prevent sub-MSP cartel depression.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
            <button
              onClick={() => setActiveModal({ type: 'fraud' })}
              className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-colors shadow-2xs"
            >
              Review Suspicious Logs
            </button>
            <button
              onClick={() => setCartelAlertDismissed(true)}
              className="px-3 py-1.5 bg-white border border-red-300 text-red-800 font-semibold rounded-xl hover:bg-red-100 transition-colors"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Telemetry Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Metric 1 */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>TODAY'S ARRIVALS</span>
            <span className="material-symbols-outlined text-primary text-base">agriculture</span>
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-slate-900 font-mono">342</span>
            <span className="text-xs text-slate-500 font-medium">Trolleys</span>
          </div>
          <div className="mt-1 flex items-center justify-between text-[11px]">
            <span className="text-emerald-700 font-bold">1,420 MT Intake</span>
            <span className="text-slate-400">+18% vs Yesterday</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>TESTED & CLEARED</span>
            <span className="material-symbols-outlined text-emerald-700 text-base">verified</span>
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-emerald-800 font-mono">286</span>
            <span className="text-xs text-slate-500 font-medium">Lots</span>
          </div>
          <div className="mt-1 flex items-center justify-between text-[11px]">
            <span className="text-slate-600 font-medium">Avg Moisture: 11.4%</span>
            <span className="text-emerald-700 font-bold">98.2% Passed</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>J-FORMS ISSUED</span>
            <span className="material-symbols-outlined text-primary text-base">receipt_long</span>
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-slate-900 font-mono">₹3.22 Cr</span>
          </div>
          <div className="mt-1 flex items-center justify-between text-[11px]">
            <span className="text-emerald-700 font-bold">100% Direct DBT</span>
            <span className="text-slate-400">Zero Commission</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>YARD CONGESTION</span>
            <span className="material-symbols-outlined text-amber-600 text-base">traffic</span>
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-slate-900 font-mono">68%</span>
            <span className="text-xs text-emerald-700 font-bold">Optimal Flow</span>
          </div>
          <div className="mt-1 flex items-center justify-between text-[11px]">
            <span className="text-slate-600">18 min Gate Wait</span>
            <span className="text-slate-400">4 Weighbridges Active</span>
          </div>
        </div>
      </div>

      {/* Mandi Capacity & Grain Intake Flow Architecture */}
      <div className="bg-white rounded-2xl p-4 md:p-5 border border-slate-200 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3">
          <div>
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-base">flowchart</span>
              Intake Flow Telemetry & Silo Buffer
            </h3>
            <span className="text-xs text-slate-500">
              Total Yard Capacity: <strong>8,160 MT / 12,000 MT</strong> (68% Stored)
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1 text-slate-600">
              <span className="w-3 h-3 rounded-xs bg-emerald-600"></span> Covered Warehouses (5,400 MT)
            </span>
            <span className="flex items-center gap-1 text-slate-600">
              <span className="w-3 h-3 rounded-xs bg-amber-500"></span> Open Plinths (2,760 MT)
            </span>
          </div>
        </div>

        {/* Visual Pipeline Schematic */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between mb-1">
              <strong className="text-slate-900 font-bold">STAGE 1: GATE IN</strong>
              <span className="px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded font-bold text-[10px]">
                FAST-TAG
              </span>
            </div>
            <p className="text-slate-500 text-[11px]">RFID scanning at Gate 1, 2, & 3</p>
            <div className="mt-2 text-emerald-700 font-mono font-bold">38 Trolleys in buffer</div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between mb-1">
              <strong className="text-slate-900 font-bold">STAGE 2: WEIGHING</strong>
              <span className="px-1.5 py-0.2 bg-blue-100 text-blue-800 rounded font-bold text-[10px]">
                ACTIVE
              </span>
            </div>
            <p className="text-slate-500 text-[11px]">4 Avery Multi-axle platforms</p>
            <div className="mt-2 text-blue-700 font-mono font-bold">Gross & Tare calibrated</div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between mb-1">
              <strong className="text-slate-900 font-bold">STAGE 3: ASSAYING</strong>
              <span className="px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded font-bold text-[10px]">
                NIR SENSOR
              </span>
            </div>
            <p className="text-slate-500 text-[11px]">Instant moisture & FAQ check</p>
            <div className="mt-2 text-emerald-700 font-mono font-bold">2.4 min avg turn</div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between mb-1">
              <strong className="text-slate-900 font-bold">STAGE 4: UNLOADING</strong>
              <span className="px-1.5 py-0.2 bg-purple-100 text-purple-800 rounded font-bold text-[10px]">
                SHED B
              </span>
            </div>
            <p className="text-slate-500 text-[11px]">18 registered labour gangs</p>
            <div className="mt-2 text-purple-700 font-mono font-bold">320 MT/hr loading rake</div>
          </div>
        </div>
      </div>

      {/* Live Farmer Procurement Queue Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden space-y-3 p-4 md:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-base">format_list_bulleted</span>
              Live Farmer Procurement Queue
            </h3>
            <p className="text-xs text-slate-500">Real-time status of lots undergoing verification</p>
          </div>

          {/* Search and filter controls */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-slate-400 text-sm">
                search
              </span>
              <input
                type="text"
                placeholder="Search token or farmer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:border-primary w-48"
              />
            </div>

            <select
              value={selectedGate}
              onChange={(e) => setSelectedGate(e.target.value)}
              className="py-1.5 px-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-hidden text-slate-700"
            >
              <option value="all">All Gates</option>
              <option value="Gate 1">Gate 1</option>
              <option value="Gate 2">Gate 2</option>
              <option value="Gate 3">Gate 3</option>
              <option value="Counter 2">Counter 2</option>
            </select>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-600 font-semibold border-y border-slate-200">
                <th className="py-2.5 px-3">Token & Lot</th>
                <th className="py-2.5 px-3">Farmer & Crop</th>
                <th className="py-2.5 px-3">Quantity</th>
                <th className="py-2.5 px-3">Intake Stage</th>
                <th className="py-2.5 px-3">Gate / Inspector</th>
                <th className="py-2.5 px-3 text-right">Official Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {filteredQueue.map((item) => (
                <tr key={item.tokenId} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-3">
                    <span className="font-mono font-bold text-primary block">{item.tokenId}</span>
                    <span className="text-[10px] text-slate-400">LOT-2024-W</span>
                  </td>
                  <td className="py-3 px-3">
                    <strong className="font-bold text-slate-900 block">{item.farmerName}</strong>
                    <span className="text-[11px] text-slate-500">{item.crop} ({item.variety})</span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-mono font-bold text-slate-900">{item.weightQtl} Qtl</span>
                    <span className="text-[10px] text-slate-500 block">Grade-A FAQ</span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 inline-block">
                      {item.intakeStage}
                    </span>
                    <span className="text-[11px] text-slate-500 block mt-0.5">{item.officerNote}</span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-semibold text-slate-800 block">{item.gate}</span>
                    <span className="text-[11px] text-slate-500">{item.verificationOfficer}</span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    {item.actionType === 'moisture' && (
                      <button
                        onClick={() => setActiveModal({ type: 'moisture', tokenId: item.tokenId, farmer: item.farmerName })}
                        className="px-2.5 py-1 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-[11px] rounded-lg transition-colors shadow-2xs"
                      >
                        View Moisture Meter
                      </button>
                    )}
                    {item.actionType === 'tare' && (
                      <button
                        onClick={() => setActiveModal({ type: 'tare', tokenId: item.tokenId, farmer: item.farmerName })}
                        className="px-2.5 py-1 bg-amber-700 hover:bg-amber-800 text-white font-bold text-[11px] rounded-lg transition-colors shadow-2xs"
                      >
                        Approve Tare
                      </button>
                    )}
                    {item.actionType === 'bay' && (
                      <button
                        onClick={() => setActiveModal({ type: 'bay', tokenId: item.tokenId, farmer: item.farmerName })}
                        className="px-2.5 py-1 bg-purple-700 hover:bg-purple-800 text-white font-bold text-[11px] rounded-lg transition-colors shadow-2xs"
                      >
                        Monitor Bay
                      </button>
                    )}
                    {item.actionType === 'jform' && (
                      <button
                        onClick={() => setActiveModal({ type: 'jform', tokenId: item.tokenId, farmer: item.farmerName })}
                        className="px-2.5 py-1 bg-primary hover:bg-primary-container text-white font-bold text-[11px] rounded-lg transition-colors shadow-2xs"
                      >
                        Sign Digital J-Form
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Truck In-Transit Evacuation SLA Status */}
      <div className="bg-white rounded-2xl p-4 md:p-5 border border-slate-200 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-base">local_shipping</span>
            Truck In-Transit Logistics & Evacuation SLA
          </h3>
          <span className="text-xs text-slate-500">Live Fast-Tag / GPS Tracking</span>
        </div>

        <div className="space-y-2">
          {mockTransitTrucks.map((truck) => (
            <div
              key={truck.plateNo}
              className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-slate-900 text-sm">{truck.plateNo}</span>
                  <span className="text-slate-500">({truck.transporter})</span>
                  {truck.status === 'on-time' && (
                    <span className="px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      ON-TIME
                    </span>
                  )}
                  {truck.status === 'delayed' && (
                    <span className="px-2 py-0.2 rounded-full bg-red-100 text-red-800 text-[10px] font-bold">
                      DELAYED SLA
                    </span>
                  )}
                  {truck.status === 'delivered' && (
                    <span className="px-2 py-0.2 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold">
                      DELIVERED & VERIFIED
                    </span>
                  )}
                </div>
                <div className="text-slate-600 text-[11px] mt-0.5">
                  Route: <strong>{truck.route}</strong> • Consignment: {truck.consignment}
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center">
                <div className="text-right">
                  <span className="font-bold text-slate-900 block">{truck.eta}</span>
                  <span className="text-[10px] text-slate-500">Speed: {truck.speed}</span>
                </div>
                <button
                  onClick={() => alert(`GPS Telemetry Ping for ${truck.plateNo}: Real-time speed ${truck.speed}, geo-fence intact along NH-44 corridor.`)}
                  className="px-2.5 py-1 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold rounded-lg text-xs"
                >
                  Track GPS
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mandatory Official Modals */}
      <MoistureModal
        isOpen={activeModal.type === 'moisture'}
        onClose={() => setActiveModal({ type: null })}
        tokenId={activeModal.tokenId || 'KQ-8821'}
        farmer={activeModal.farmer || 'Balwinder Singh'}
      />
      <TareModal
        isOpen={activeModal.type === 'tare'}
        onClose={() => setActiveModal({ type: null })}
        tokenId={activeModal.tokenId || 'KQ-8822'}
        farmer={activeModal.farmer || 'Harpreet Kaur'}
      />
      <BayModal
        isOpen={activeModal.type === 'bay'}
        onClose={() => setActiveModal({ type: null })}
        tokenId={activeModal.tokenId || 'KQ-8823'}
        farmer={activeModal.farmer || 'Ram Avtar Yadav'}
      />
      <SignJFormModal
        isOpen={activeModal.type === 'jform'}
        onClose={() => setActiveModal({ type: null })}
        tokenId={activeModal.tokenId || 'KQ-8824'}
        farmer={activeModal.farmer || 'Gurdeep Singh'}
      />
      <FraudLogsModal
        isOpen={activeModal.type === 'fraud'}
        onClose={() => setActiveModal({ type: null })}
      />
    </div>
  );
};
