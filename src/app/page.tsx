// src/app/page.tsx
import { decisionMakers, type DecisionMaker } from '@/lib/decision-makers-data';
import HomePageClient from '@/components/HomePageClient';
import { LanguageProvider } from '@/contexts/LanguageContext';

export default function HomePage() {
  return (
    <LanguageProvider>
      <HomePageClient decisionMakers={decisionMakers} />
    </LanguageProvider>
  );
}