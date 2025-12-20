/**
 * LocalStorage utilities for persisting application state
 */

const STORAGE_KEYS = {
  CURRENT_INDEX: 'dogfinder_current_index',
  VOTED_BREEDS: 'dogfinder_voted_breeds',
  USER_ID: 'dogfinder_user_id',
} as const;

/**
 * Generates a unique user ID for tracking votes
 */
function generateUserId(): string {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Gets or creates a user ID
 */
export function getUserId(): string {
  let userId = localStorage.getItem(STORAGE_KEYS.USER_ID);
  if (!userId) {
    userId = generateUserId();
    localStorage.setItem(STORAGE_KEYS.USER_ID, userId);
  }
  return userId;
}

/**
 * Gets the current index (last viewed breed)
 */
export function getCurrentIndex(): number {
  const stored = localStorage.getItem(STORAGE_KEYS.CURRENT_INDEX);
  return stored ? parseInt(stored, 10) : 0;
}

/**
 * Saves the current index
 */
export function saveCurrentIndex(index: number): void {
  localStorage.setItem(STORAGE_KEYS.CURRENT_INDEX, index.toString());
}

/**
 * Gets the map of voted breeds
 */
export function getVotedBreeds(): Record<number, -1 | 1 | 2> {
  const stored = localStorage.getItem(STORAGE_KEYS.VOTED_BREEDS);
  return stored ? JSON.parse(stored) : {};
}

/**
 * Saves a vote for a breed
 */
export function saveVote(breedId: number, value: -1 | 1 | 2): void {
  const votedBreeds = getVotedBreeds();
  votedBreeds[breedId] = value;
  localStorage.setItem(STORAGE_KEYS.VOTED_BREEDS, JSON.stringify(votedBreeds));
}

/**
 * Gets the vote value for a specific breed
 */
export function getVoteForBreed(breedId: number): -1 | 1 | 2 | undefined {
  const votedBreeds = getVotedBreeds();
  return votedBreeds[breedId];
}

/**
 * Clears all stored data (useful for debugging/testing)
 */
export function clearAllData(): void {
  Object.values(STORAGE_KEYS).forEach((key) => {
    localStorage.removeItem(key);
  });
}
