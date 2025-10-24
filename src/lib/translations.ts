// src/lib/translations.ts

export const translations = {
  ru: {
    siteTitle: 'Q354 Ассистенты в принятии решений',
    description: 'Инструменты поддержки принятия решений.',
    interactiveLabel: 'Интерактивный или демо',
    allTools: 'Все инструменты', // ← новый ключ
    comingSoon: 'Интерактивный инструмент скоро будет доступен!',
    demoWarning: '⚠️ Это статическая демонстрация. Полная версия запускается локально.',
    viewOnGitHub: 'Посмотреть проект на GitHub',
    viewOnYoutube:'Посмотреть проект на Youtube',

    decisionMakers: {
      'gdelt-m': {
        name: 'Ассистент в принятии решений GDELT-M',
        shortDesc: 'Продвинутая поддержка решений на основе мультимодальных данных RSS и GDELT.',
        longDesc: 'Система поддержки принятия решений, использующая RSS потоки данных и GDELT  — с дополнительным анализом NLP и семантики для стратегического анализа и прогнозирования в реальном времени.',
      },
      'gdelt': {
        name: 'Ассистент в принятии решений GDELT',
        shortDesc: 'Мониторинг глобальных событий и аналитика для принятия решений.',
        longDesc: 'Платформа мониторинга глобальных событий на основе открытых данных GDELT для стратегического принятия решений.',
      },
      'vc-founders': {
        name: 'Ассистент в принятии решений для венчурных инвесторов и основателей',
        shortDesc: 'Инструмент для помощи на всех этапах вечнурного инвестирования, для венчурных инвесторов и основателей стартапов.',
        longDesc: 'Инструмент для помощи на всех этапах вечнурного инвестирования, для венчурных инвесторов и основателей стартапов.',
      },
    },
  },
  en: {
    siteTitle: 'Q354 Decision Making Assistants',
    description: 'Decision support tools.',
    interactiveLabel: 'Interactive or demo',
    allTools: 'All Tools', // ← новый ключ
    comingSoon: 'Interactive tool coming soon!',
    demoWarning: '⚠️ This is a static demo. The full version runs locally.',
    viewOnGitHub: 'View project on GitHub →',
    viewOnYoutube:'View project on Youtube →',
    decisionMakers: {
      'gdelt-m': {
        name: 'GDELT-M Decision Making Assistant',
        shortDesc: 'Advanced decision support based on multimodal RSS data and GDELT.',
        longDesc: 'A decision support system utilizing RSS data streams and GDELT, with additional NLP and semantic analysis for strategic analysis and real-time forecasting.',
      },
      'gdelt': {
        name: 'GDELT Decision Making Assistant',
        shortDesc: 'Monitoring global events and analytics for decision making.',
        longDesc: 'A platform for monitoring global events based on open data from GDELT intended for strategic decision-making.',
      },
      'vc-founders': {
        name: 'Decision Making Assistant for Venture Investors and Founders',
        shortDesc: 'A tool to assist at all stages of venture investing for venture investors and startup founders.',
        longDesc: 'A tool to assist at all stages of venture investing for venture investors and startup founders.',
      },
    },
  },
} as const;

// Выводим тип слагов из ключей секции decisionMakers
export type DecisionMakerSlug = keyof typeof translations.en.decisionMakers;