import React, { useState, useEffect } from 'react';

interface VoiceBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRecognized: (slotInfo: { day: number; timeSlot: string }) => void;
}

export const VoiceBookingModal: React.FC<VoiceBookingModalProps> = ({ isOpen, onClose, onRecognized }) => {
  const [stage, setStage] = useState<'listening' | 'processing' | 'confirmed'>('listening');
  const [transcript, setTranscript] = useState<string>('');

  useEffect(() => {
    if (!isOpen) {
      setStage('listening');
      setTranscript('');
      return;
    }

    const t1 = setTimeout(() => {
      setTranscript('"कल सुबह करनाल मंडी के लिए गेहूं की ट्रोली का टोकन निकाल दो..."');
      setStage('processing');
    }, 2400);

    const t2 = setTimeout(() => {
      setStage('confirmed');
    }, 4200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl p-6 flex flex-col items-center text-center">
        <div className="w-full flex justify-end">
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {/* Animated Mic & Audio Waves */}
        <div className="relative my-4 flex items-center justify-center">
          <div className={`w-24 h-24 rounded-full flex items-center justify-center transition-all ${
            stage === 'listening' ? 'bg-primary text-white shadow-lg animate-pulse' :
            stage === 'processing' ? 'bg-amber-500 text-white' : 'bg-emerald-600 text-white'
          }`}>
            <span className="material-symbols-outlined text-4xl">
              {stage === 'confirmed' ? 'check' : 'mic'}
            </span>
          </div>

          {stage === 'listening' && (
            <div className="absolute -inset-3 rounded-full border-2 border-primary/40 animate-ping pointer-events-none" />
          )}
        </div>

        <h3 className="font-bold text-lg text-slate-900 mt-2">
          {stage === 'listening' && 'बोलो, हम सुन रहे हैं...'}
          {stage === 'processing' && 'आवाज़ समझ रहे हैं (Processing)...'}
          {stage === 'confirmed' && 'स्लॉट पहचाना गया!'}
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Speak in Hindi, Punjabi, or English to book slot.
        </p>

        {/* Simulated Waveform */}
        {stage === 'listening' && (
          <div className="flex items-center gap-1.5 h-10 my-4">
            {[16, 28, 44, 20, 36, 48, 22, 38, 14].map((h, i) => (
              <div
                key={i}
                className="w-1.5 bg-primary rounded-full animate-pulse"
                style={{ height: `${h}px`, animationDelay: `${i * 120}ms` }}
              />
            ))}
          </div>
        )}

        {transcript && (
          <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl my-3 text-xs text-slate-700 italic font-medium w-full">
            {transcript}
          </div>
        )}

        {stage === 'confirmed' && (
          <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl my-2 text-xs text-emerald-900 text-left w-full space-y-1">
            <div className="font-bold flex items-center gap-1 text-emerald-800">
              <span className="material-symbols-outlined text-sm">event_available</span>
              Auto-configured Slot Details:
            </div>
            <div>• Date: <strong>Thursday, 24 Oct (Today)</strong></div>
            <div>• Time: <strong>10:30 AM – 12:30 PM (Midday Wave)</strong></div>
            <div>• Gate: <strong>Gate No. 3 (Tractor Influx)</strong></div>
          </div>
        )}

        <div className="w-full mt-4 flex gap-2">
          {stage === 'confirmed' ? (
            <button
              onClick={() => {
                onRecognized({ day: 24, timeSlot: '10:30 AM – 12:30 PM' });
                onClose();
              }}
              className="w-full min-h-[44px] bg-primary text-white rounded-xl font-bold text-xs hover:bg-primary-container transition-colors shadow-md"
            >
              Proceed With This Booking
            </button>
          ) : (
            <button
              onClick={onClose}
              className="w-full min-h-[44px] bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold text-xs transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
