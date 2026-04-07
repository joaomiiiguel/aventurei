'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from '@/contexts/LocaleContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, ShieldCheck, X } from 'lucide-react';

export default function CookieBanner() {
  const t = useTranslations();
  const [showBanner, setShowBanner] = useState(false);
  const [showCustomizer, setShowCustomizer] = useState(false);
  
  const [preferences, setPreferences] = useState({
    ad_storage: 'granted',
    analytics_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted',
  });

  useEffect(() => {
    const savedConsent = localStorage.getItem('googleConsent');
    if (!savedConsent) {
      setShowBanner(true);
    }
  }, []);

  const updateConsent = (newConsent: any) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', newConsent);
    }
    localStorage.setItem('googleConsent', JSON.stringify(newConsent));
    setShowBanner(false);
    setShowCustomizer(false);
  };

  const handleAcceptAll = () => {
    const allGranted = {
      ad_storage: 'granted',
      analytics_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      personalization_storage: 'granted',
      functionality_storage: 'granted',
      security_storage: 'granted',
    };
    updateConsent(allGranted);
  };

  const handleRejectAll = () => {
    const allDenied = {
      ad_storage: 'denied',
      analytics_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      personalization_storage: 'denied',
      functionality_storage: 'denied',
      security_storage: 'granted',
    };
    updateConsent(allDenied);
  };

  const handleSavePreferences = () => {
    updateConsent({
      ...preferences,
      personalization_storage: preferences.ad_personalization,
      functionality_storage: 'granted',
      security_storage: 'granted',
    });
  };

  if (!showBanner) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:max-w-md z-[9999]"
      >
        <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl p-6 overflow-hidden">
          {!showCustomizer ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-primary">
                <ShieldCheck className="w-6 h-6" />
                <h3 className="font-bold text-lg">{t.cookie_banner?.title}</h3>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {t.cookie_banner?.description}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  onClick={handleAcceptAll}
                  className="flex-1 bg-primary hover:bg-primary/90 text-white font-semibold py-2.5 px-4 rounded-xl transition-all active:scale-95"
                >
                  {t.cookie_banner?.accept_all}
                </button>
                <button
                  onClick={handleRejectAll}
                  className="flex-1 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-semibold py-2.5 px-4 rounded-xl transition-all active:scale-95"
                >
                  {t.cookie_banner?.reject_all}
                </button>
              </div>
              <button
                onClick={() => setShowCustomizer(true)}
                className="w-full flex items-center justify-center gap-2 text-sm text-zinc-500 hover:text-primary transition-colors py-1"
              >
                <Settings className="w-4 h-4" />
                {t.cookie_banner?.customize}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg">{t.cookie_banner?.customize}</h3>
                <button 
                  onClick={() => setShowCustomizer(false)}
                  className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-3 pt-2">
                {[
                  { id: 'ad_storage', label: t.cookie_banner?.ad_storage },
                  { id: 'analytics_storage', label: t.cookie_banner?.analytics_storage },
                  { id: 'ad_user_data', label: t.cookie_banner?.ad_user_data },
                  { id: 'ad_personalization', label: t.cookie_banner?.ad_personalization },
                ].map((pref) => (
                  <div key={pref.id} className="flex items-center justify-between py-2 border-b border-zinc-100 dark:border-zinc-800 last:border-0">
                    <span className="text-sm font-medium">{pref.label}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer"
                        checked={preferences[pref.id as keyof typeof preferences] === 'granted'}
                        onChange={(e) => setPreferences({
                          ...preferences,
                          [pref.id]: e.target.checked ? 'granted' : 'denied'
                        })}
                      />
                      <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                    </label>
                  </div>
                ))}
              </div>

              <button
                onClick={handleSavePreferences}
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-2.5 px-4 rounded-xl transition-all active:scale-95 mt-4"
              >
                {t.cookie_banner?.save_preferences}
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
