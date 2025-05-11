
import { LucideIcon } from "lucide-react";

export type RewardCategory = 'food' | 'time' | 'learning' | 'entertainment' | 'office' | 'charity';

export interface Reward {
  id: string;
  name: string;
  description: string;
  points: number;
  category: RewardCategory;
  icon: string;
  available: number;
  popular?: boolean;
}

export interface RewardHistory {
  id: string;
  rewardId: string;
  rewardName: string;
  icon: string;
  points: number;
  redeemedAt: string;
}
