// src/components/HomePageClient.tsx
'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';
import type { DecisionMaker } from '@/lib/decision-makers-data';
import { DecisionMakerSlug } from '@/lib/translations';

export default function HomePageClient({ decisionMakers }: { decisionMakers: DecisionMaker[] }) {
  const { t, tDecisionMaker } = useLanguage();

  return (
    <div className="min-h-screen bg-zinc-450">
      {/* Компактная шапка */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-1 py-2 sm:px-6 lg:px-8 flex justify-between items-start">
          <div>
            <h5 className="text-2xl md:text-3xl font-bold text-black leading-tight">
              {t('siteTitle')}
            </h5>
            <p className="mt-1 text-sm md:text-base text-gray-800 leading-snug">
              {t('description')}
            </p>
          </div>
          <LanguageToggle />
        </div>
      </header>

      {/* Основной контент */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {decisionMakers.map((tool) => {
            const id = tool.id as DecisionMakerSlug;

            return (
              <Link key={id} href={`/decision-makers/${id}`} className="block">
                <div className="relative bg-white rounded-lg shadow hover:shadow-md transition-shadow p-4 h-full flex flex-col">
                  {/* Бейдж прогресса (справа сверху) */}
                  {typeof tool.progress === 'number' && (
                    <div
                      className="absolute top-2 right-2 select-none"
                      aria-label={`${tool.progress}% ready`}
                      title={`${tool.progress}%`}
                    >
                      <span
                        className={[
                          'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold',
                          tool.progress >= 75
                            ? 'bg-emerald-100 text-emerald-800'
                            : tool.progress >= 50
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-700',
                        ].join(' ')}
                      >
                        {tool.progress}%
                      </span>
                    </div>
                  )}

                  {/* Заголовок и описание */}
                  <h2 className="text-lg md:text-xl font-semibold text-gray-900 clamp-2">
                    {tDecisionMaker(id, 'name')}
                  </h2>
                  <p className="mt-1 text-sm text-gray-800 clamp-3">
                    {tDecisionMaker(id, 'shortDesc')}
                  </p>

                  {/* Метка «интерактивный или демо» */}
                  <div className="mt-3 pt-1">
                    <span className="inline-block px-3 py-1 text-xs md:text-sm font-bold bg-blue-100 text-blue-800 rounded-full">
                      {tool.interactive ? t('interactiveLabel') : '_______'}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}