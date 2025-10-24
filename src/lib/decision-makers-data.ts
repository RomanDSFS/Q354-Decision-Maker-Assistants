// src/lib/decision-makers-data.ts
import { DecisionMakerSlug } from './translations';

export type DecisionMaker = {
  id: DecisionMakerSlug; // ← строго типизировано, как в Foresight Tools
  interactive: boolean;
  progress?: number; // 0–100
};

export const decisionMakers: DecisionMaker[] = [
  { id: 'gdelt-m', interactive: true, progress: 70 },
  { id: 'gdelt', interactive: false, progress: 0 },
  { id: 'vc-founders', interactive: true, progress: 15 },
] satisfies DecisionMaker[];