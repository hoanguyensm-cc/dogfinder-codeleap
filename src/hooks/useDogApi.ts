/**
 * React Query hooks for Dog API
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchBreeds, fetchBreedById, submitVote, fetchVotes } from '../services/dogApi';
import type { VotePayload } from '../types/dog';

export const QUERY_KEYS = {
  breeds: ['breeds'] as const,
  breed: (id: number) => ['breed', id] as const,
  votes: (subId?: string) => ['votes', subId] as const,
};

/**
 * Fetches all dog breeds
 */
export function useBreeds() {
  return useQuery({
    queryKey: QUERY_KEYS.breeds,
    queryFn: fetchBreeds,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Fetches a specific breed by ID
 */
export function useBreed(breedId: number) {
  return useQuery({
    queryKey: QUERY_KEYS.breed(breedId),
    queryFn: () => fetchBreedById(breedId),
    enabled: !!breedId,
  });
}

/**
 * Submits a vote for a dog breed
 */
export function useSubmitVote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: VotePayload) => submitVote(payload),
    onSuccess: () => {
      // Invalidate votes query to refetch updated data
      queryClient.invalidateQueries({ queryKey: ['votes'] });
    },
  });
}

/**
 * Fetches all votes for the current user
 */
export function useVotes(subId?: string) {
  return useQuery({
    queryKey: QUERY_KEYS.votes(subId),
    queryFn: () => fetchVotes(subId),
    staleTime: 1000 * 60, // 1 minute
  });
}
