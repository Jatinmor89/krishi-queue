import React, { useState, useEffect } from 'react';
import { initialTenderBidders } from '../data/mockData';
import { TenderBidder } from '../types';

interface LogisticsFleetBiddingProps {
  onBackToHome?: () => void;
}

export const LogisticsFleetBidding: React.FC<LogisticsFleetBiddingProps> = ({ onBackToHome }) => {
  const [secondsRemaining, setSecondsRemaining] = useState(14 * 60 + 32); // 14 mins 32 secs
  const [bidRate, setBidRate] = useState<number>(178);
  const [bidders, setBidders] = useState<TenderBidder[]>(initialTenderBidders);
  const [submitting, setSubmitting] = useState(false);
  const [bidSubmittedToast, setBidSubmittedToast] = useState(false);
  const [activeTab, setActiveTab] = useState<'tenders' | 'active-bids' | 'fleet' | 'earnings'>('tenders');

  // Live countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSecs: number) => {
    const hrs = Math.floor(totalSecs / 3600).toString().padStart(2, '0');
    const mins = Math.floor((totalSecs % 3600) / 60).toString().padStart(2, '0');
    const secs = (totalSecs % 60).toString().padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

  const totalCargoQtl = 420;
  const projectedPayout = bidRate * totalCargoQtl;

  const handleAdjustBid = (delta: number) => {
    setBidRate((prev) => Math.max(160, Math.min(210, prev + delta)));
  };

  const handleSetL1 = () => {
    setBidRate(175);
  };

  const handleSubmitBid = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setBidSubmittedToast(true);

      // Re-order bidders based on new rate
      const updated = bidders.map((b) => (b.isUser ? { ...b, ratePerQtl: bidRate } : b));
      updated.sort((a, b) => a.ratePerQtl - b.ratePerQtl);
      const reRanked = updated.map((b, idx) => ({
        ...b,
        rank: idx + 1,
        badge: idx === 0 ? 'Leading L1 Rate' : b.isUser ? 'YOURS' : `Rank ${idx + 1}`,
        trailingGap: idx > 0 ? b.ratePerQtl - updated[0].ratePerQtl : undefined
      }));
      setBidders(reRanked);

      setTimeout(() => {
        setBidSubmittedToast(false);
      }, 3500);
    }, 800);
  };

  const userRank = bidders.find((b) => b.isUser)?.rank || 2;

  return (
    <div className="w-full max-w-lg mx-auto pb-28 px-4 pt-2 flex flex-col gap-4 animate-in fade-in duration-300">
      {/* Sub-Header Fleet Status */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 shadow-sm flex items-center justify-between border border-slate-800">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold">
            <span className="material-symbols-outlined text-sm">local_shipping</span>
            Logistics Desk • Live Orderbook
          </div>
          <h2 className="text-base font-extrabold text-white mt-0.5">
            Kisan Logistics Fleet
          </h2>
          <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
            <span>TR-9021</span>
            <span>•</span>
            <span>Karnal APMC Hub (Gate 4)</span>
          </div>
        </div>

        <div className="text-right">
          <span className="px-2.5 py-1 bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-bold text-xs rounded-full inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            6/8 Trucks Free
          </span>
        </div>
      </div>

      {/* Active Lifting Request Tender Card */}
      <div className="bg-surface-container-lowest rounded-2xl p-4 md:p-5 shadow-sm border border-outline-variant/30 space-y-3">
        <div className="flex items-center justify-between border-b pb-3">
          <div>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
              ACTIVE LIFTING TENDER
            </span>
            <h3 className="font-extrabold text-base text-slate-900 font-mono">
              #LR-WHEAT-88402
            </h3>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-amber-800 font-bold block uppercase">
              WINDOW CLOSES IN
            </span>
            <span className="font-mono font-black text-amber-900 text-base flex items-center gap-1 justify-end">
              <span className="material-symbols-outlined text-sm text-amber-700 animate-spin">
                timer
              </span>
              {formatTimer(secondsRemaining)}
            </span>
          </div>
        </div>

        {/* Route Details */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-bold text-slate-900">
              <span className="material-symbols-outlined text-emerald-700 text-base">trip_origin</span>
              <span>Karnal APMC Sub-Yard B</span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium">Origin</span>
          </div>

          <div className="pl-2 border-l-2 border-dashed border-slate-300 ml-2 py-0.5 text-slate-500 font-mono text-[11px]">
            58 km Transit Distance (NH-44 Toll Route)
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-bold text-slate-900">
              <span className="material-symbols-outlined text-red-600 text-base">location_on</span>
              <span>FCI Central Silos, Panipat</span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium">Destination</span>
          </div>
        </div>

        {/* Cargo Specs */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 bg-surface-container-low rounded-xl">
            <span className="text-slate-500 text-[10px] block font-medium">TOTAL CONSIGNMENT</span>
            <strong className="text-slate-900 font-bold text-sm">420 Qtl Grade-A Wheat</strong>
            <span className="text-slate-500 text-[10px] block">~840 standard gunny bags</span>
          </div>
          <div className="p-2.5 bg-surface-container-low rounded-xl">
            <span className="text-slate-500 text-[10px] block font-medium">FLEET REQUIREMENT</span>
            <strong className="text-slate-900 font-bold text-sm">2 Trucks (25-Tonner)</strong>
            <span className="text-emerald-700 text-[10px] block font-semibold">Target Load: Today 16:00</span>
          </div>
        </div>

        {/* Benchmark Reference */}
        <div className="flex items-center justify-between text-[11px] text-slate-600 px-1">
          <span>Govt Benchmark Ceiling: <strong>₹210 / Qtl</strong></span>
          <span>Base Tariff: <strong>₹185 / Qtl</strong></span>
        </div>
      </div>

      {/* Live Market Discovery Bidding Ladder */}
      <div className="bg-surface-container-lowest rounded-2xl p-4 md:p-5 shadow-sm border border-outline-variant/30 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-bold text-sm text-slate-900">
            <span className="material-symbols-outlined text-amber-600 text-lg">leaderboard</span>
            Live Market Discovery (Bidding Ladder)
          </div>
          <span className="text-xs text-slate-500">Reverse Auction</span>
        </div>

        <div className="space-y-2">
          {bidders.map((b) => {
            const isLeader = b.rank === 1;
            const isCurrentUser = b.isUser;

            return (
              <div
                key={b.name}
                className={`p-3 rounded-xl border transition-all text-xs flex items-center justify-between ${
                  isCurrentUser && isLeader
                    ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs'
                    : isCurrentUser
                    ? 'bg-amber-50/70 border-amber-400/80'
                    : isLeader
                    ? 'bg-slate-50 border-slate-300'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                      isLeader
                        ? 'bg-emerald-700 text-white'
                        : isCurrentUser
                        ? 'bg-amber-700 text-white'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    #{b.rank}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <strong className="text-slate-900 font-semibold">{b.name}</strong>
                      {isCurrentUser && (
                        <span className="px-1.5 py-0.2 bg-amber-200 text-amber-900 font-extrabold text-[9px] rounded">
                          YOU
                        </span>
                      )}
                    </div>
                    {b.trailingGap ? (
                      <span className="text-[10px] text-red-600 font-medium">
                        Trailing L1 by ₹{b.trailingGap}/Qtl
                      </span>
                    ) : (
                      <span className="text-[10px] text-emerald-700 font-bold">
                        Lowest Competitive Bid (L1)
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-extrabold font-mono text-sm text-slate-900">
                    ₹{b.ratePerQtl}
                    <span className="text-[10px] text-slate-500 font-normal"> /Qtl</span>
                  </span>
                  <span className="text-[10px] text-slate-500 block font-mono">
                    ₹{(b.ratePerQtl * totalCargoQtl).toLocaleString()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Sealed Bid Calculator */}
      <div className="bg-surface-container-low rounded-2xl p-4 md:p-5 border border-outline-variant/30 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <strong className="text-slate-900 font-bold flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-base">gavel</span>
            Place Competitive Sealed Bid
          </strong>
          <span className="text-slate-500 text-[11px]">420 Qtl Consignment</span>
        </div>

        {/* Stepper Controls */}
        <div className="bg-white p-3 rounded-2xl border border-slate-200 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            <button
              onClick={() => handleAdjustBid(-2)}
              className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
              title="-₹2"
            >
              -2
            </button>
            <button
              onClick={() => handleAdjustBid(-1)}
              className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
              title="-₹1"
            >
              -1
            </button>
          </div>

          <div className="text-center flex-1">
            <span className="text-[10px] text-slate-400 block font-semibold">YOUR RATE</span>
            <div className="flex items-center justify-center font-mono font-black text-2xl text-slate-900">
              ₹
              <input
                type="number"
                value={bidRate}
                onChange={(e) => setBidRate(Number(e.target.value))}
                className="w-16 text-center font-mono font-black text-2xl bg-transparent outline-hidden"
              />
              <span className="text-xs text-slate-500 font-normal">/Qtl</span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => handleAdjustBid(1)}
              className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
              title="+₹1"
            >
              +1
            </button>
            <button
              onClick={() => handleAdjustBid(2)}
              className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
              title="+₹2"
            >
              +2
            </button>
          </div>
        </div>

        {/* Projected Payout Summary */}
        <div className="flex items-center justify-between text-xs px-1">
          <div>
            <span className="text-slate-500 block text-[11px]">Total Projected Freight Payout:</span>
            <strong className="text-slate-900 font-mono font-bold text-sm">
              ₹{projectedPayout.toLocaleString('en-IN')}
            </strong>
          </div>

          {userRank > 1 && (
            <button
              onClick={handleSetL1}
              className="px-2.5 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-[11px] font-bold rounded-lg transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[14px]">bolt</span>
              Match ₹175 for L1
            </button>
          )}
        </div>

        {/* Dynamic Toast Feedback */}
        {bidSubmittedToast && (
          <div className="p-3 bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md animate-in slide-in-from-bottom-2">
            <span className="material-symbols-outlined text-lg">check_circle</span>
            <span>Sealed Bid Transmitted to Mandi Portal! Token logged.</span>
          </div>
        )}

        {/* Submit Bid Button */}
        <button
          onClick={handleSubmitBid}
          disabled={submitting}
          className="w-full min-h-[48px] bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all active:scale-98 shadow-sm"
        >
          {submitting ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Broadcasting Cryptographic Bid...
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-base">lock</span>
              Submit Sealed Competitive Bid (₹{projectedPayout.toLocaleString('en-IN')})
            </>
          )}
        </button>
      </div>

      {/* Dispatched Fleet Staging Checklist */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 text-xs space-y-2.5">
        <div className="flex items-center justify-between border-b pb-2">
          <span className="font-bold text-slate-800 flex items-center gap-1">
            <span className="material-symbols-outlined text-base text-primary">local_shipping</span>
            Staged Fleet Ready for Panipat Silos
          </span>
          <span className="text-emerald-700 font-bold text-[10px]">2 TRUCKS ALLOCATED</span>
        </div>

        <div className="space-y-2">
          <div className="p-2.5 bg-slate-50 rounded-xl flex items-center justify-between">
            <div>
              <strong className="text-slate-900 font-mono font-bold">HR-08-AU-4190</strong>
              <span className="text-[11px] text-slate-500 block">
                Driver: Sukhwinder • 25-Ton Multi-Axle
              </span>
            </div>
            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">
              Staged 400m Away
            </span>
          </div>

          <div className="p-2.5 bg-slate-50 rounded-xl flex items-center justify-between">
            <div>
              <strong className="text-slate-900 font-mono font-bold">HR-08-AU-9912</strong>
              <span className="text-[11px] text-slate-500 block">
                Driver: Gurmukh • 25-Ton Multi-Axle
              </span>
            </div>
            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">
              Staged 1.2 km Away
            </span>
          </div>
        </div>
      </div>

      {/* Transporter Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-slate-200 py-2 px-6 flex justify-around items-center z-40 max-w-lg mx-auto">
        <button
          onClick={() => setActiveTab('tenders')}
          className={`flex flex-col items-center text-[10px] font-bold ${
            activeTab === 'tenders' ? 'text-amber-600' : 'text-slate-500'
          }`}
        >
          <span className="material-symbols-outlined text-2xl">gavel</span>
          Tenders (निविदा)
        </button>
        <button
          onClick={() => setActiveTab('active-bids')}
          className={`flex flex-col items-center text-[10px] font-semibold ${
            activeTab === 'active-bids' ? 'text-amber-600' : 'text-slate-500'
          }`}
        >
          <span className="material-symbols-outlined text-2xl">receipt</span>
          Bids (बोलियां)
        </button>
        <button
          onClick={() => setActiveTab('fleet')}
          className={`flex flex-col items-center text-[10px] font-semibold ${
            activeTab === 'fleet' ? 'text-amber-600' : 'text-slate-500'
          }`}
        >
          <span className="material-symbols-outlined text-2xl">directions_boat</span>
          Fleet (बेड़ा)
        </button>
        <button
          onClick={() => setActiveTab('earnings')}
          className={`flex flex-col items-center text-[10px] font-semibold ${
            activeTab === 'earnings' ? 'text-amber-600' : 'text-slate-500'
          }`}
        >
          <span className="material-symbols-outlined text-2xl">account_balance_wallet</span>
          Earnings (आय)
        </button>
      </div>
    </div>
  );
};
