/**
 * Dog API Service
 * Handles all API calls to The Dog API
 */

import { API_CONFIG } from '../config/api';
import type { DogBreed, VotePayload, VoteResponse, Vote } from '../types/dog';

class DogApiError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = 'DogApiError';
    this.status = status;
  }
}

/**
 * Fetches all dog breeds with their images
 */
export async function fetchBreeds(): Promise<DogBreed[]> {
  const response = await fetch(`${API_CONFIG.BASE_URL}/breeds?limit=100&page=0`, {
    headers: API_CONFIG.HEADERS,
  });

  if (!response.ok) {
    throw new DogApiError(`Failed to fetch breeds: ${response.statusText}`, response.status);
  }

  return response.json();
}

/**
 * Fetches a specific dog breed by ID
 */
export async function fetchBreedById(breedId: number): Promise<DogBreed> {
  const response = await fetch(`${API_CONFIG.BASE_URL}/breeds/${breedId}`, {
    headers: API_CONFIG.HEADERS,
  });

  if (!response.ok) {
    throw new DogApiError(`Failed to fetch breed: ${response.statusText}`, response.status);
  }

  return response.json();
}

/**
 * Submits a vote (like, dislike, or super like) for a dog breed
 */
export async function submitVote(payload: VotePayload): Promise<VoteResponse> {
  const response = await fetch(`${API_CONFIG.BASE_URL}/votes`, {
    method: 'POST',
    headers: API_CONFIG.HEADERS,
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new DogApiError(`Failed to submit vote: ${response.statusText}`, response.status);
  }

  return response.json();
}

/**
 * Fetches all votes for the current user
 */
export async function fetchVotes(subId?: string): Promise<Vote[]> {
  const url = subId
    ? `${API_CONFIG.BASE_URL}/votes?sub_id=${subId}`
    : `${API_CONFIG.BASE_URL}/votes`;

  const response = await fetch(url, {
    headers: API_CONFIG.HEADERS,
  });

  if (!response.ok) {
    throw new DogApiError(`Failed to fetch votes: ${response.statusText}`, response.status);
  }

  return response.json();
}

/**
 * Fetches an image by ID
 */
export async function fetchImage(imageId: string) {
  const response = await fetch(`${API_CONFIG.BASE_URL}/images/${imageId}`, {
    headers: API_CONFIG.HEADERS,
  });

  if (!response.ok) {
    throw new DogApiError(`Failed to fetch image: ${response.statusText}`, response.status);
  }

  return response.json();
}
