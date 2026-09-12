import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Language, AppMode } from '../types';
import { GOV_EMBLEM_URL } from '../data/mockData';

interface NavigationHeaderProps {
  currentMode: AppMode;
  onSelectMode: (mode: AppMode) => void;
  language: Language;
  onToggleLanguage: (lang: Language) => void;
  onOpenProfile?: () => void;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  currentMode,
  onSelectMode,
  language,
  onToggleLanguage,
  onOpenProfile
}) => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  return (
    <div className="fixed top-0 left-0 right-0 w-full z-50 flex flex-col">
      {/* Top Universal Mode Switcher Ribbon */}
      <div className="bg-[#0f172a] text-white px-3 py-1 text-[12px] flex items-center justify-between border-b border-white/10 shadow-sm">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
          <span className="text-emerald-400 font-bold uppercase text-[10px] tracking-wider shrink-0 mr-1 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            {t('portal_views')}
          </span>
          <button
            onClick={() => onSelectMode('farmer-home')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all shrink-0 flex items-center gap-1 ${
              currentMode === 'farmer-home' || currentMode === 'farmer-booking' || currentMode === 'farmer-track' || currentMode === 'farmer-bookings-list' || currentMode === 'farmer-profile'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white/10 text-slate-300 hover:bg-white/20'
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">agriculture</span>
            {t('nav.farmer_view')}
          </button>
          <button
            onClick={() => onSelectMode('farmer-booking')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all shrink-0 flex items-center gap-1 ${
              currentMode === 'farmer-booking'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white/10 text-slate-300 hover:bg-white/20'
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">calendar_month</span>
            {t('nav.book_slot')}
          </button>
          <button
            onClick={() => onSelectMode('farmer-track')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all shrink-0 flex items-center gap-1 ${
              currentMode === 'farmer-track'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white/10 text-slate-300 hover:bg-white/20'
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">local_shipping</span>
            {t('nav.track_pass')}
          </button>
          <button
            onClick={() => onSelectMode('logistics-tenders')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all shrink-0 flex items-center gap-1 ${
              currentMode === 'logistics-tenders'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white/10 text-slate-300 hover:bg-white/20'
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">gavel</span>
            {t('nav.logistics_bidding')}
          </button>
          <button
            onClick={() => onSelectMode('mandi-console')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all shrink-0 flex items-center gap-1 ${
              currentMode === 'mandi-console'
                ? 'bg-emerald-800 text-white ring-1 ring-emerald-400'
                : 'bg-white/10 text-slate-300 hover:bg-white/20'
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">admin_panel_settings</span>
            {t('nav.mandi_console')}
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-2 shrink-0">
          <span className="text-[11px] text-slate-400">{t('nic_mandi_cloud')}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
        </div>
      </div>

      {/* Primary Brand Header */}
      <header className="w-full h-16 bg-surface/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.06)] border-b border-outline-variant/30 px-3 md:px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div
            className="flex items-center gap-2 cursor-pointer hover:opacity-95 transition-opacity"
            onClick={() => onSelectMode('farmer-home')}
          >
            <img
              src={GOV_EMBLEM_URL}
              alt="KrishiQueue Government Emblem"
              className="h-8 md:h-9 w-auto object-contain shrink-0 drop-shadow-xs"
            />
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="font-bold text-[16px] md:text-[18px] text-primary-container truncate">
                  KrishiQueue
                </span>
                <span className="text-outline text-sm">/</span>
                <span className="font-medium text-[14px] md:text-[15px] text-primary truncate">
                  {t('subtitle')}
                </span>
              </div>
             <div className="flex items-center gap-2 mt-1">
  
               <a href="tel:18001801551"
                 className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-secondary/10 text-secondary font-bold text-[10px] leading-tight shrink-0 hover:bg-secondary/20 transition-colors"
                 >
                  <span className="material-symbols-outlined text-[12px]">call</span>
                  1800-180-1551
                </a>
                <span className="text-outline text-[11px] hidden xs:inline truncate font-medium">
                  • {currentMode === 'mandi-console' ? t('region.admin_portal') : currentMode === 'logistics-tenders' ? t('region.fleet_desk') : t('region.default')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Tools */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Language Switcher Pill */}
          <div className="relative group">
            <button
              type="button"
              className="h-8 px-2.5 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center gap-1 text-on-surface-variant hover:text-on-surface text-xs font-semibold shadow-2xs transition-colors"
            >
              <span className="material-symbols-outlined text-[16px] text-primary">translate</span>
              <span className="uppercase">{t(`language_names.${language}`)}</span>
            </button>
            <div className="absolute right-0 top-full mt-1 hidden group-hover:flex flex-col bg-surface-container-lowest rounded-xl shadow-lg border border-outline-variant/40 py-1 min-w-[100px] z-50">
              <button
                onClick={() => onToggleLanguage('en')}
                className={`px-3 py-1.5 text-left text-xs font-medium hover:bg-surface-container-low transition-colors ${language === 'en' ? 'text-primary font-bold' : 'text-on-surface'}`}
              >
                {t('language_names.en')}
              </button>
              <button
                onClick={() => onToggleLanguage('hi')}
                className={`px-3 py-1.5 text-left text-xs font-medium hover:bg-surface-container-low transition-colors ${language === 'hi' ? 'text-primary font-bold' : 'text-on-surface'}`}
              >
                {t('language_names.hi')}
              </button>
              <button
                onClick={() => onToggleLanguage('pa')}
                className={`px-3 py-1.5 text-left text-xs font-medium hover:bg-surface-container-low transition-colors ${language === 'pa' ? 'text-primary font-bold' : 'text-on-surface'}`}
              >
                {t('language_names.pa')}
              </button>
            </div>
          </div>

          {/* Profile Circle */}
          <button
            onClick={onOpenProfile}
            title={t('profile_title')}
            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary hover:ring-2 hover:ring-primary-fixed shrink-0 shadow-xs transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">person</span>
          </button>
        </div>
      </header>
    </div>
  );
};