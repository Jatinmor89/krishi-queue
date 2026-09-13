import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FarmerProfileData } from '../types';
import { LabCertificateModal } from './modals/LabCertificateModal';
import { EParchiModal } from './modals/EParchiModal';
import { supabase } from '../lib/supabase';
import { getActiveBooking, subscribeToBooking, LiveBooking } from '../lib/booking';

interface TrackStatusProps {
  farmer: FarmerProfileData;
  onBack: () => void;
  onGoHome: () => void;
}

const STAGE_ORDER = ['booked', 'arrived', 'quality_check', 'weighed', 'receipt_generated', 'paid'];

export const TrackStatus: React.FC<TrackStatusProps> = ({ farmer, onBack, onGoHome }) => {
  const { t } = useTranslation();
  const [showLabSlip, setShowLabSlip] = useState(false);
  const [showGatePass, setShowGatePass] = useState(false);
  const [booking, setBooking] = useState<LiveBooking | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cleanupBooking: (() => void) | undefined;

    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const farmerId = session?.user.id;
      if (!farmerId) {
        setLoading(false);
        return;
      }

      const active = await getActiveBooking(farmerId);
      setBooking(active);
      setLoading(false);

      if (active) {
        cleanupBooking = subscribeToBooking(active.id, (updated) => {
          setBooking((prev) => (prev ? { ...prev, ...updated } : prev));
        });
      }
    };

    load();

    return () => {
      if (cleanupBooking) cleanupBooking();
    };
  }, []);

  const currentStageIndex = booking ? STAGE_ORDER.indexOf(booking.stage) : -1;

  return (
    <div className="w-full max-w-lg mx-auto pb-24 px-4 pt-2 flex flex-col gap-4 animate-in fade-in duration-300">
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={onBack}
          className="p-2 -ml-2 text-slate-700 hover:text-primary rounded-full hover:bg-slate-100 transition-colors flex items-center gap-1 text-sm font-semibold"
        >
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
          <span>{t('track.back')}</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
            {t('track.live_tracking')}
          </span>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-10 text-sm text-slate-500">{t('track.loading')}</div>
      ) : !booking ? (
        <div className="text-center py-10 text-sm text-slate-500">
          {t('track.no_booking')}
        </div>
      ) : (
        <>
          <div className="bg-gradient-to-br from-[#003b1b] to-[#14532d] text-white rounded-2xl p-4 md:p-5 shadow-lg relative overflow-hidden">
            <div className="flex items-start justify-between relative z-10">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-emerald-400/20 text-emerald-200 text-[10px] font-bold uppercase tracking-wider">
                    {t('track.mandi_gate_pass')}
                  </span>
                </div>
                <div className="text-2xl font-black font-mono mt-1 text-primary-fixed tracking-tight">
                  #{booking.token_id}
                </div>
                <p className="text-sm text-white font-bold mt-0.5">{farmer.name}</p>
              </div>

              <button
                onClick={() => setShowGatePass(true)}
                className="px-3 py-1.5 bg-white text-primary text-xs font-bold rounded-xl hover:bg-emerald-50 transition-colors shadow-sm flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">qr_code</span>
                {t('track.view_qr')}
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-white/15 text-xs relative z-10">
              <div className="bg-black/20 p-2 rounded-xl">
                <span className="text-emerald-300 text-[10px] block font-semibold">{t('track.gate')}</span>
                <span className="font-bold text-white text-xs">{booking.assigned_gate || '—'}</span>
              </div>
              <div className="bg-black/20 p-2 rounded-xl">
                <span className="text-emerald-300 text-[10px] block font-semibold">{t('track.weighbridge')}</span>
                <span className="font-bold text-white text-xs">{booking.weighbridge || '—'}</span>
              </div>
              <div className="bg-black/20 p-2 rounded-xl">
                <span className="text-emerald-300 text-[10px] block font-semibold">{t('track.slot_date')}</span>
                <span className="font-bold text-white font-mono text-xs">{booking.slot_date}</span>
              </div>
            </div>
          </div>

          {booking.wave && (
            <div className="bg-amber-50 border border-amber-300/80 rounded-2xl p-4 flex items-start gap-3 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                <span className="material-symbols-outlined text-2xl animate-pulse">hourglass_top</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <strong className="text-amber-950 font-bold text-sm">{booking.wave.wave_name}</strong>
                  <span className="px-2 py-0.5 bg-amber-200 text-amber-900 font-extrabold text-xs rounded-full">
                    ~{booking.wave.expected_wait_mins} {t('track.mins_wait')}
                  </span>
                </div>
                <p className="text-amber-900/90 text-xs mt-1 leading-relaxed">
                  {t('track.wave_window')}: <strong>{booking.wave.time_range}</strong> · {t('track.slots_remaining')}: <strong>{booking.wave.slots_remaining}</strong>
                  {booking.queue_position != null && <> · {t('track.queue_position')}: <strong>#{booking.queue_position}</strong></>}
                </p>
              </div>
            </div>
          )}

          <div className="bg-surface-container-lowest rounded-2xl p-4 md:p-5 shadow-sm border border-outline-variant/30 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-[20px]">timeline</span>
                {t('track.procurement_journey')}
              </h3>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                {t('track.stage_of', { current: currentStageIndex + 1, total: STAGE_ORDER.length })}
              </span>
            </div>

            <div className="space-y-4 relative pl-3">
              <div className="absolute left-[19px] top-3 bottom-3 w-0.5 bg-slate-200 pointer-events-none" />

              {STAGE_ORDER.map((stageKey, idx) => {
                const isDone = idx < currentStageIndex;
                const isActive = idx === currentStageIndex;

                let circleClass = 'w-7 h-7 rounded-full flex items-center justify-center shrink-0 shadow-xs ';
                if (isDone) circleClass += 'bg-emerald-600 text-white';
                else if (isActive) circleClass += 'bg-primary text-white ring-4 ring-primary/20';
                else circleClass += 'bg-slate-200 text-slate-500';

                let bodyClass = 'flex-1 text-xs ';
                if (isActive) bodyClass += 'bg-emerald-50/70 p-3 rounded-xl border border-primary/30';
                else if (!isDone) bodyClass += 'opacity-70';

                let titleClass = 'font-bold text-xs ';
                titleClass += isActive ? 'text-primary' : 'text-slate-900';

                return (
                  <div key={stageKey} className="flex items-start gap-3 relative z-10">
                    <div className={circleClass}>
                      {isDone ? (
                        <span className="material-symbols-outlined text-[16px]">check</span>
                      ) : isActive ? (
                        <span className="material-symbols-outlined text-[16px] animate-spin">sync</span>
                      ) : (
                        <span className="text-xs font-bold">{idx + 1}</span>
                      )}
                    </div>
                    <div className={bodyClass}>
                      <div className="flex items-center justify-between">
                        <strong className={titleClass}>
                          {t(`track.stages.${stageKey}.title`)}
                        </strong>
                        {isActive && (
                          <span className="px-1.5 py-0.5 bg-primary text-white font-bold text-[9px] rounded">
                            {t('track.in_progress')}
                          </span>
                        )}
                      </div>
                      <p className="text-slate-500 text-[11px] mt-0.5">{t(`track.stages.${stageKey}.desc`)}</p>
                      {isActive && stageKey === 'quality_check' && (
                        <button
                          onClick={() => setShowLabSlip(true)}
                          className="mt-2 text-primary font-bold text-[11px] flex items-center gap-1 hover:underline"
                        >
                          <span className="material-symbols-outlined text-[14px]">science</span>
                          {t('track.view_assaying_cert')}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      <div className="grid grid-cols-2 gap-2 text-xs">
        
         <a href="tel:18001801551"
          className="p-3 bg-white rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 font-bold flex items-center justify-center gap-1.5 shadow-2xs"
        >
          <span className="material-symbols-outlined text-amber-600 text-[18px]">support_agent</span>
          {t('track.call_helpline')}
        </a>
        <button
          onClick={onGoHome}
          className="p-3 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-1.5 shadow-2xs hover:bg-primary-container"
        >
          <span className="material-symbols-outlined text-[18px]">home</span>
          {t('track.return_home')}
        </button>
      </div>

      <LabCertificateModal
        isOpen={showLabSlip}
        onClose={() => setShowLabSlip(false)}
        tokenNumber={booking ? '#' + booking.token_id : ''}
      />
      <EParchiModal
        isOpen={showGatePass}
        onClose={() => setShowGatePass(false)}
        farmer={farmer}
      />
    </div>
  );
};