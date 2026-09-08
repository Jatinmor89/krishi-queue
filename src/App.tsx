import { useState } from 'react';
import { AppMode, Language, FarmerProfileData } from './types';
import { initialFarmerProfile } from './data/mockData';
import { NavigationHeader } from './components/NavigationHeader';
import { FarmerHome } from './components/FarmerHome';
import { SlotBookingStep } from './components/SlotBookingStep';
import { TrackStatus } from './components/TrackStatus';
import { LogisticsFleetBidding } from './components/LogisticsFleetBidding';
import { MandiOfficialConsole } from './components/MandiOfficialConsole';
import { FarmerBookings } from './components/FarmerBookings';
import { FarmerProfile } from './components/FarmerProfile';

export default function App() {
  const [currentMode, setCurrentMode] = useState<AppMode>('farmer-home');
  const [language, setLanguage] = useState<Language>('hi');
  const [farmer, setFarmer] = useState<FarmerProfileData>(initialFarmerProfile);
  const [notification, setNotification] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const handleSlotConfirmed = (details: { date: string; timeSlot: string; token: string }) => {
    setFarmer((prev) => ({
      ...prev,
      activeToken: details.token,
      gatePassDate: details.date,
      slotTime: details.timeSlot
    }));
    showToast(`Slot Confirmed! Token ${details.token} assigned for ${details.date}`);
    setCurrentMode('farmer-track');
  };

  return (
    <div className="min-h-screen bg-[#f9f9ff] text-[#111c2d] flex flex-col selection:bg-emerald-200 selection:text-emerald-950 font-sans">
      {/* Universal Fixed Header with Portal Switcher Ribbon */}
      <NavigationHeader
        currentMode={currentMode}
        onSelectMode={(mode) => setCurrentMode(mode)}
        language={language}
        onToggleLanguage={(lang) => setLanguage(lang)}
        onOpenProfile={() => setCurrentMode('farmer-profile')}
      />

      {/* Floating System Notification Toast */}
      {notification && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-2xl shadow-xl text-xs font-semibold flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-top-2 max-w-sm w-full mx-4">
          <span className="material-symbols-outlined text-emerald-400 text-base">check_circle</span>
          <span className="flex-1">{notification}</span>
          <button onClick={() => setNotification(null)} className="text-slate-400 hover:text-white">
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      )}

      {/* Main Content View Container with top spacing for double navbar */}
      <main className="flex-1 pt-24 w-full">
        {currentMode === 'farmer-home' && (
          <FarmerHome
            farmer={farmer}
            language={language}
            onBookSlot={() => setCurrentMode('farmer-booking')}
            onTrackPass={() => setCurrentMode('farmer-track')}
            onOpenBookings={() => setCurrentMode('farmer-bookings-list')}
            onOpenProfile={() => setCurrentMode('farmer-profile')}
            onSelectLanguage={(lang) => setLanguage(lang)}
          />
        )}

        {currentMode === 'farmer-booking' && (
          <SlotBookingStep
            farmer={farmer}
            onBack={() => setCurrentMode('farmer-home')}
            onSlotConfirmed={handleSlotConfirmed}
          />
        )}

        {currentMode === 'farmer-track' && (
          <TrackStatus
            farmer={farmer}
            onBack={() => setCurrentMode('farmer-home')}
            onGoHome={() => setCurrentMode('farmer-home')}
          />
        )}

        {currentMode === 'farmer-bookings-list' && (
          <FarmerBookings
            farmer={farmer}
            onBookNewSlot={() => setCurrentMode('farmer-booking')}
            onTrackPass={() => setCurrentMode('farmer-track')}
            onBackToHome={() => setCurrentMode('farmer-home')}
          />
        )}

        {currentMode === 'farmer-profile' && (
          <FarmerProfile
            farmer={farmer}
            language={language}
            onBackToHome={() => setCurrentMode('farmer-home')}
            onToggleLanguage={(lang) => setLanguage(lang)}
          />
        )}

        {currentMode === 'logistics-tenders' && (
          <LogisticsFleetBidding
            onBackToHome={() => setCurrentMode('farmer-home')}
          />
        )}

        {currentMode === 'mandi-console' && (
          <MandiOfficialConsole
            onBackToHome={() => setCurrentMode('farmer-home')}
          />
        )}
      </main>
    </div>
  );
}
