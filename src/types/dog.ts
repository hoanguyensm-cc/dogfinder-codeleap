/**
 * Type definitions for The Dog API
 * Based on the OpenAPI specification
 */

export interface DogWeight {
  imperial: string;
  metric: string;
}

export interface DogHeight {
  imperial: string;
  metric: string;
}

export interface DogImage {
  id: string;
  width: number;
  height: number;
  url: string;
}

export interface DogBreed {
  id: number;
  name: string;
  bred_for?: string;
  breed_group?: string;
  life_span?: string;
  temperament?: string;
  weight: DogWeight;
  height: DogHeight;
  reference_image_id?: string;
  image?: DogImage;
}

export interface VotePayload {
  image_id: string;
  value: -1 | 1 | 2; // -1: dislike, 1: like, 2: super like
  sub_id?: string; // Optional user identifier
}

export interface VoteResponse {
  message: string;
  id: number;
  image_id: string;
  value: number;
  country_code: string;
}

export interface Vote {
  id: number;
  image_id: string;
  sub_id: string;
  created_at: string;
  value: number;
  country_code: string;
}

export type VoteValue = -1 | 1 | 2;

export interface BreedWithVote extends DogBreed {
  voteValue?: VoteValue;
}
