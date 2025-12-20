/**
 * Hook for managing breed navigation and voting state
 */

import { useState, useEffect, useCallback } from 'react';
import { useBreeds, useSubmitVote } from './useDogApi';
import {
  getCurrentIndex,
  saveCurrentIndex,
  saveVote,
  getUserId,
  getVoteForBreed,
} from '../utils/storage';
import type { DogBreed, VoteValue } from '../types/dog';

export function useBreedNavigation() {
  const { data: breeds, isLoading, error } = useBreeds();
  const submitVoteMutation = useSubmitVote();
  const [currentIndex, setCurrentIndex] = useState(() => getCurrentIndex());
  const [userId] = useState(() => getUserId());

  const currentBreed = breeds?.[currentIndex];
  const hasNext = breeds ? currentIndex < breeds.length - 1 : false;
  const hasPrevious = currentIndex > 0;

  // Persist current index whenever it changes
  useEffect(() => {
    saveCurrentIndex(currentIndex);
  }, [currentIndex]);

  const goToNext = useCallback(() => {
    if (hasNext) {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [hasNext]);

  const goToPrevious = useCallback(() => {
    if (hasPrevious) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [hasPrevious]);

  const vote = useCallback(
    async (value: VoteValue, breed: DogBreed) => {
      // Get the image ID from the breed
      const imageId = breed.reference_image_id || breed.image?.id;

      if (!imageId) {
        console.error('No image ID available for voting');
        return;
      }

      // Save vote locally
      saveVote(breed.id, value);

      // Submit vote to API
      try {
        await submitVoteMutation.mutateAsync({
          image_id: imageId,
          value,
          sub_id: userId,
        });
      } catch (error) {
        console.error('Failed to submit vote:', error);
      }

      // Move to next breed
      goToNext();
    },
    [userId, submitVoteMutation, goToNext]
  );

  const handleLike = useCallback(() => {
    if (currentBreed) {
      vote(1, currentBreed);
    }
  }, [currentBreed, vote]);

  const handleDislike = useCallback(() => {
    if (currentBreed) {
      vote(-1, currentBreed);
    }
  }, [currentBreed, vote]);

  const handleSuperLike = useCallback(() => {
    if (currentBreed) {
      vote(2, currentBreed);
    }
  }, [currentBreed, vote]);

  const getCurrentVote = useCallback((breedId: number) => {
    return getVoteForBreed(breedId);
  }, []);

  return {
    currentBreed,
    currentIndex,
    totalBreeds: breeds?.length ?? 0,
    hasNext,
    hasPrevious,
    isLoading,
    error,
    goToNext,
    goToPrevious,
    handleLike,
    handleDislike,
    handleSuperLike,
    getCurrentVote,
    isSubmitting: submitVoteMutation.isPending,
  };
}
