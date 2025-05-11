
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Reward, RewardHistory } from "@/types/reward";
import { getRewards, getRewardsByCategory, getUserRewardHistory, redeemReward, getUserPoints } from "@/services/rewardService";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export const useRewards = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Get user points
  const { data: userPoints = 0, isLoading: isLoadingPoints } = useQuery({
    queryKey: ['userPoints'],
    queryFn: getUserPoints,
  });

  // Get rewards based on selected category
  const { data: rewards = [], isLoading: isLoadingRewards, error: rewardsError } = useQuery({
    queryKey: ['rewards', activeCategory],
    queryFn: () => getRewardsByCategory(activeCategory),
  });

  // Get user's reward history
  const { data: rewardHistory = [], isLoading: isLoadingHistory, error: historyError } = useQuery({
    queryKey: ['rewardHistory'],
    queryFn: getUserRewardHistory,
  });

  // Mutation for redeeming rewards
  const redeemMutation = useMutation({
    mutationFn: (rewardId: string) => redeemReward(rewardId),
    onSuccess: () => {
      // Invalidate and refetch queries after redeeming
      queryClient.invalidateQueries({ queryKey: ['rewardHistory'] });
      queryClient.invalidateQueries({ queryKey: ['rewards'] });
      queryClient.invalidateQueries({ queryKey: ['userPoints'] });
    }
  });

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  const handleRedeem = async (reward: Reward) => {
    if (userPoints < reward.points) {
      toast({
        title: "Puntos insuficientes",
        description: `Necesitas ${reward.points - userPoints} puntos más para canjear esta recompensa.`,
        variant: "destructive",
      });
      return;
    }
    
    try {
      await redeemMutation.mutateAsync(reward.id);
      
      toast({
        title: "¡Recompensa canjeada!",
        description: `Has canjeado "${reward.name}" por ${reward.points} puntos.`,
      });
    } catch (error) {
      toast({
        title: "Error al canjear",
        description: "No se pudo canjear la recompensa. Intenta de nuevo más tarde.",
        variant: "destructive",
      });
    }
  };

  return {
    userPoints,
    rewards,
    rewardHistory,
    activeCategory,
    isLoadingPoints,
    isLoadingRewards,
    isLoadingHistory,
    rewardsError,
    historyError,
    handleCategoryChange,
    handleRedeem,
    isRedeeming: redeemMutation.isPending
  };
};
