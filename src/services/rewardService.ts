
import { Reward, RewardHistory } from "@/types/reward";
import { Coffee, Book, Monitor, Clock, Calendar, Utensils, Ticket, Pencil, Heart } from "lucide-react";

// Empty arrays - rewards will be loaded later from admin panel
const rewardsData: Reward[] = [];
const rewardHistoryData: RewardHistory[] = [];

// Get user points from API (simulated for now)
export const getUserPoints = async (): Promise<number> => {
  // In a real app, this would be an API call to get the user's points
  // For now, we'll simulate an API call with a promise
  return new Promise((resolve) => {
    setTimeout(() => {
      // Check if there's a stored value in localStorage
      const storedPoints = localStorage.getItem("points");
      // If there's a stored value, use it, otherwise default to 350
      const points = storedPoints ? parseInt(storedPoints, 10) : 350;
      resolve(points);
    }, 300);
  });
};

// In a real app, these would be API calls
export const getRewards = async (): Promise<Reward[]> => {
  // Return empty array since rewards will be loaded later
  return Promise.resolve([]);
};

export const getRewardsByCategory = async (category: string): Promise<Reward[]> => {
  // Return empty array since rewards will be loaded later
  return Promise.resolve([]);
};

export const getUserRewardHistory = async (): Promise<RewardHistory[]> => {
  // Return empty array since reward history will be loaded later
  return Promise.resolve([]);
};

export const redeemReward = async (rewardId: string): Promise<boolean> => {
  // Since there are no rewards to redeem yet, just return true
  return Promise.resolve(true);
};

export const getIconComponent = (iconName: string) => {
  const icons = {
    Coffee,
    Book,
    Monitor,
    Clock,
    Calendar,
    Utensils,
    Ticket,
    Pencil,
    Heart
  };
  
  return icons[iconName as keyof typeof icons] || Coffee;
};
