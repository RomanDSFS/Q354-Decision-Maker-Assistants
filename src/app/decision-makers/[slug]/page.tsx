// src/app/decision-makers/[slug]/page.tsx
'use client';

import { decisionMakers } from '@/lib/decision-makers-data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import * as React from 'react';
import LanguageToggle from '@/components/LanguageToggle';
import { useLanguage, LanguageProvider } from '@/contexts/LanguageContext';

// Внутренний компонент с логикой
function DecisionMakerContent({ slug }: { slug: string }) {
  const tool = decisionMakers.find((t) => t.id === slug);
  if (!tool) notFound();

  const { lang, t, tDecisionMaker } = useLanguage();

  let githubUrl = '';
  let demoImage = '';
  let longDescription = '';
  let youtubeUrl = '';

  if (tool.id === 'gdelt-m') {
    githubUrl = 'https://github.com/RomanDSFS/News-Monitoring-Assistant-GDELT-M';
    demoImage = '/images/Streamlit-gdelt-m.png';
    longDescription = tDecisionMaker(tool.id, 'longDesc');
  } else if (tool.id === 'gdelt') {
    longDescription = tDecisionMaker(tool.id, 'longDesc');
  } else if (tool.id === 'vc-founders') {
    githubUrl = 'https://github.com/RomanDSFS/Q354-VC-and-Founders';
    longDescription = tDecisionMaker(tool.id, 'longDesc');
    youtubeUrl = 'https://www.youtube.com/watch?v=sXS6YpkQCN8';
  }

  return (
    <div className="min-h-screen p-4 lg:p-8 max-w-6xl mx-auto">
      <header className="bg-blue-50 border-b border-blue-200 py-2 px-4 mb-6 rounded-t-lg flex justify-between items-center">
        <Link
          href="/"
          className="text-blue-900 hover:text-blue-500 font-bold flex items-center gap-1"
        >
          ⬅️ {t('allTools')}
        </Link>
        <LanguageToggle />
      </header>

      <h1 className="text-3xl font-bold text-gray-200 mb-1">
        {tDecisionMaker(tool.id, 'name')}
      </h1>

      <p className="text-lg text-gray-200 mb-4">{longDescription}</p>

      {/* Блок ссылок (GitHub + YouTube) */}
      {(githubUrl || youtubeUrl) && (
        <div className="flex flex-wrap gap-2 mb-2">
          {githubUrl && (
            <Link
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
            >
              {t('viewOnGitHub')}
            </Link>
          )}
          {youtubeUrl && (
            <Link
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
            >
              {t('viewOnYoutube')}
            </Link>
          )}
        </div>
      )}

      {/* Предупреждение только для НЕ vc-founders */}
      {(tool.id !== 'vc-founders' && tool.id !== 'gdelt') && (
        <p className="text-sm text-gray-200 italic font-bold mb-4">
          {t('demoWarning')}
        </p>
      )}
      
      {/* Скриншот */}
      {demoImage && (
        <>
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden mb-2">
            <div className="relative w-full h-[420px]">
              <Image
                src={demoImage}
                alt={`${tDecisionMaker(tool.id, 'name')} interface`}
                fill
                sizes="(max-width: 768px) 100vw, 640px"
                className="object-cover"
                priority={tool.id === 'gdelt-m'}
              />
            </div>
          </div>
          <p className="text-sm text-gray-200 text-center">
            {lang === 'ru'
              ? 'Пример локального интерфейса Streamlit.'
              : 'Example of the local Streamlit interface.'}
          </p>
        </>
      )}
    </div>
  );
}

// Основной экспорт — обёрнут в LanguageProvider
export default function DecisionMakerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = React.use(params);

  return (
    <LanguageProvider>
      <DecisionMakerContent slug={slug} />
    </LanguageProvider>
  );
}