import React, { useState } from 'react';
import { DateSlotOption, SlotTimeWave, FarmerProfileData } from '../types';
import { dateSlotOptions, slotTimeWaves } from '../data/mockData';

interface SlotBookingStepProps {
  farmer: FarmerProfileData;
  onBack: () => void;
  onSlotConfirmed: (bookingDetails: { date: string; timeSlot: string; token: string }) => void;
}

export const SlotBookingStep: React.FC<SlotBookingStepProps> = ({
  farmer,
  onBack,
  onSlotConfirmed
}) => {
  const [selectedDay, setSelectedDay] = useState<number>(24);
  const [selectedWaveId, setSelectedWaveId] = useState<string>('wave-3');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedSuccess, setConfirmedSuccess] = useState(false);

  const activeDateOption = dateSlotOptions.find((d) => d.dayNumber === selectedDay) || dateSlotOptions[0];
  const activeWave = slotTimeWaves.find((w) => w.id === selectedWaveId) || slotTimeWaves[2];

  const handleConfirm = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setConfirmedSuccess(true);
      setTimeout(() => {
        onSlotConfirmed({
          date: activeDateOption.fullDate,
          timeSlot: activeWave.timeRange,
          token: '#KQ-2024-8821'
        });
      }, 1200);
    }, 1000);
  };

  return (
    <div className="w-full max-w-lg mx-auto pb-28 px-4 pt-2 flex flex-col gap-4 animate-in fade-in duration-300">
      {/* Top Header Bar with Back & Step */}
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={onBack}
          className="p-2 -ml-2 text-slate-700 hover:text-primary rounded-full hover:bg-slate-100 transition-colors flex items-center gap-1 text-sm font-semibold"
        >
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
          <span>Back (पीछे)</span>
        </button>

        <div className="flex items-center gap-1.5">
          <span className="px-2.5 py-1 bg-primary/10 text-primary font-bold text-xs rounded-full">
            Step 2 / 3
          </span>
        </div>
      </div>

      <div>
        <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
          Slot Booking Step
        </h1>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mt-0.5">
          <span className="text-primary font-bold">APMC Karnal Yard #04</span>
          <span>•</span>
          <span>Gate #3 Entry</span>
          <span>•</span>
          <span className="text-emerald-700 font-semibold">Wheat Sharbati (FAQ)</span>
        </div>
      </div>

      {/* Weather Advisory Banner */}
      <div className="bg-amber-50 border border-amber-300/80 rounded-2xl p-3.5 flex items-start gap-2.5 text-xs text-amber-900 shadow-2xs">
        <span className="material-symbols-outlined text-amber-700 text-xl shrink-0 mt-0.5">
          thunderstorm
        </span>
        <div>
          <strong className="font-bold text-amber-950 block">
            Weather Advisory: Rain Risk Warning (25 Oct)
          </strong>
          <p className="text-amber-900/90 mt-0.5 leading-relaxed">
            High probability of rain forecast for Friday afternoon. Arriving on <strong>Thursday 24 Oct morning</strong> is strongly advised to avoid moisture rejection at open unloading bays.
          </p>
        </div>
      </div>

      {/* Date Picker Reel */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-800">Select Date (तारीख चुनें)</span>
          <span className="text-slate-500 font-medium">October 2024</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none -mx-1 px-1">
          {dateSlotOptions.map((opt) => {
            const isSelected = selectedDay === opt.dayNumber;
            return (
              <button
                key={opt.dayNumber}
                onClick={() => setSelectedDay(opt.dayNumber)}
                className={`flex flex-col items-center justify-between min-w-[72px] h-[90px] p-2 rounded-2xl border transition-all text-center relative shrink-0 ${
                  isSelected
                    ? 'bg-primary text-white border-primary shadow-md scale-102 ring-2 ring-primary/30'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {opt.tag && (
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase leading-tight ${
                      isSelected
                        ? 'bg-primary-fixed text-on-primary-fixed'
                        : opt.isRainWarning
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {opt.tag}
                  </span>
                )}
                <span className="text-xl font-extrabold font-mono mt-0.5">{opt.dayNumber}</span>
                <span className="text-[11px] font-semibold opacity-90 truncate max-w-full">
                  {opt.dayName}
                </span>
                <span
                  className={`text-[10px] font-medium ${
                    isSelected ? 'text-primary-fixed-dim' : 'text-slate-500'
                  }`}
                >
                  {opt.totalSlots} slots
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Unloading Waves List */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-800">Select Unloading Wave (समय चक्र)</span>
          <span className="text-emerald-700 font-semibold">{activeDateOption.totalSlots} Slots Available</span>
        </div>

        <div className="space-y-2">
          {slotTimeWaves.map((wave) => {
            const isFull = wave.status === 'full';
            const isSelected = selectedWaveId === wave.id;

            return (
              <div
                key={wave.id}
                onClick={() => {
                  if (!isFull) setSelectedWaveId(wave.id);
                }}
                className={`p-3 rounded-2xl border transition-all cursor-pointer relative ${
                  isFull
                    ? 'bg-slate-100 border-slate-200 text-slate-400 opacity-60 cursor-not-allowed'
                    : isSelected
                    ? 'bg-emerald-50/70 border-primary text-slate-900 shadow-sm ring-1 ring-primary'
                    : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                        isFull
                          ? 'border border-slate-300 text-transparent'
                          : isSelected
                          ? 'bg-primary text-white'
                          : 'border-2 border-slate-300 text-transparent'
                      }`}
                    >
                      {isSelected && (
                        <span className="material-symbols-outlined text-[14px]">check</span>
                      )}
                    </div>
                    <span className="font-bold text-sm font-mono tracking-tight text-slate-900">
                      {wave.timeRange}
                    </span>
                  </div>

                  {isFull ? (
                    <span className="px-2 py-0.5 bg-red-100 text-red-800 rounded-md text-[10px] font-bold">
                      FULL भरी हुई
                    </span>
                  ) : wave.tag ? (
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        wave.status === 'optimal'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {wave.tag}
                    </span>
                  ) : null}
                </div>

                <div className="flex items-center justify-between text-xs mt-2 pl-7">
                  <span className="text-slate-600 text-[11px] font-medium truncate">
                    {wave.waveName}
                  </span>
                  {!isFull && (
                    <span className="text-emerald-700 font-bold text-[11px] shrink-0">
                      {wave.slotsRemaining} left • ~{wave.expectedWaitMins}m wait
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Predictive Queue AI Card */}
      <div className="bg-surface-container-low rounded-2xl p-4 border border-outline-variant/30 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 font-bold text-slate-900">
            <span className="material-symbols-outlined text-primary text-[18px]">smart_toy</span>
            Predictive Queue AI (पूर्वानुमान)
          </div>
          <span className="text-[10px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full">
            REAL-TIME YARD TELEMETRY
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-white p-2.5 rounded-xl border border-slate-200">
            <span className="text-slate-500 text-[10px] block">ESTIMATED QUEUE POSITION</span>
            <span className="font-extrabold text-slate-900 text-base font-mono">
              #{activeWave.queuePosition} in Line
            </span>
          </div>
          <div className="bg-white p-2.5 rounded-xl border border-slate-200">
            <span className="text-slate-500 text-[10px] block">EXPECTED UNLOADING WINDOW</span>
            <span className="font-extrabold text-emerald-800 text-base font-mono">
              ~{activeWave.expectedWaitMins} Mins
            </span>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-[11px] text-slate-600 font-medium">
            <span>Yard Congestion Index</span>
            <span className="font-bold text-slate-800">42% (Moderate / सुगम)</span>
          </div>
          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 w-[42%] rounded-full" />
          </div>
        </div>
      </div>

      {/* Verified Mandi Registry Slip Info */}
      <div className="bg-white rounded-2xl p-3.5 border border-slate-200 text-xs space-y-2">
        <div className="flex items-center justify-between border-b pb-2">
          <span className="font-bold text-slate-800 flex items-center gap-1">
            <span className="material-symbols-outlined text-sm text-primary">badge</span>
            Mandi Registry Slip Details
          </span>
          <span className="text-emerald-700 font-bold text-[10px] bg-emerald-50 px-1.5 py-0.5 rounded">
            VERIFIED RC & LAND RECORD
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div>
            <span className="text-slate-500 block">Vehicle / Trolley</span>
            <span className="font-bold text-slate-900">PB-02-AK-4192 (John Deere 5310)</span>
          </div>
          <div>
            <span className="text-slate-500 block">Registered Quantity</span>
            <span className="font-bold text-slate-900">~45.00 Qtl (Wheat Sharbati Grade-A)</span>
          </div>
          <div>
            <span className="text-slate-500 block">Farmer Name</span>
            <span className="font-bold text-slate-900">{farmer.name}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Entry Point</span>
            <span className="font-bold text-primary">Taraori Gate #3 Weighbridge</span>
          </div>
        </div>
      </div>

      {/* Persistent Bottom Confirm Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-slate-200 p-3 z-40 max-w-lg mx-auto">
        <button
          onClick={handleConfirm}
          disabled={isSubmitting || confirmedSuccess}
          className="w-full min-h-[50px] bg-primary hover:bg-primary-container text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-all active:scale-98 shadow-md"
        >
          {isSubmitting ? (
            <>
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Generating Official Gate Pass Token...
            </>
          ) : confirmedSuccess ? (
            <>
              <span className="material-symbols-outlined text-xl text-primary-fixed">verified</span>
              Slot Confirmed! Loading Pass...
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-xl text-primary-fixed">check_circle</span>
              Confirm Slot Booking (स्लॉट पक्का करें)
            </>
          )}
        </button>
      </div>
    </div>
  );
};
