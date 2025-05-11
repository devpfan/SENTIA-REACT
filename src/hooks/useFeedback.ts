
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { CreateFeedbackDto } from "@/types/feedback";
import {
  getFeedbackTypes,
  getAllFeedback,
  createFeedback,
  deleteFeedback,
} from "@/services/feedbackService";

export const useFeedback = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isAnonymous, setIsAnonymous] = useState(false);

  // Query para obtener tipos de feedback
  const { data: feedbackTypes = [], isLoading: isLoadingTypes } = useQuery({
    queryKey: ['feedbackTypes'],
    queryFn: getFeedbackTypes,
  });

  // Query para obtener todos los feedbacks
  const { data: feedbacks = [], isLoading: isLoadingFeedback } = useQuery({
    queryKey: ['feedbacks'],
    queryFn: getAllFeedback,
  });

  // Mutation para crear feedback
  const { mutate: submitFeedback, isPending: isSubmitting } = useMutation({
    mutationFn: createFeedback,
    onSuccess: () => {
      toast({
        title: "Éxito",
        description: "Feedback enviado correctamente",
      });
      queryClient.invalidateQueries({ queryKey: ['feedbacks'] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Mutation para eliminar feedback
  const { mutate: removeFeedback } = useMutation({
    mutationFn: deleteFeedback,
    onSuccess: () => {
      toast({
        title: "Éxito",
        description: "Feedback eliminado correctamente",
      });
      queryClient.invalidateQueries({ queryKey: ['feedbacks'] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (feedback: Omit<CreateFeedbackDto, 'anonimo'>) => {
    const feedbackData: CreateFeedbackDto = {
      ...feedback,
      anonimo: isAnonymous,
      ...(isAnonymous ? {} : { usuarioId: 1 }), // TODO: Obtener el ID del usuario actual
    };
    submitFeedback(feedbackData);
  };

  return {
    feedbackTypes,
    feedbacks,
    isAnonymous,
    setIsAnonymous,
    handleSubmit,
    removeFeedback,
    isLoadingTypes,
    isLoadingFeedback,
    isSubmitting,
  };
};
