/**
 * Tests for storage utilities
 */

import { describe, it, expect, beforeEach } from 'vitest';
import {
  getUserId,
  getCurrentIndex,
  saveCurrentIndex,
  getVotedBreeds,
  saveVote,
  getVoteForBreed,
  clearAllData,
} from './storage';

describe('Storage Utilities', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  describe('getUserId', () => {
    it('should generate a new user ID if none exists', () => {
      const userId = getUserId();
      expect(userId).toBeTruthy();
      expect(userId).toContain('user_');
    });

    it('should return the same user ID on subsequent calls', () => {
      const userId1 = getUserId();
      const userId2 = getUserId();
      expect(userId1).toBe(userId2);
    });
  });

  describe('getCurrentIndex', () => {
    it('should return 0 if no index is stored', () => {
      expect(getCurrentIndex()).toBe(0);
    });

    it('should return the stored index', () => {
      saveCurrentIndex(5);
      expect(getCurrentIndex()).toBe(5);
    });
  });

  describe('saveCurrentIndex', () => {
    it('should save the current index', () => {
      saveCurrentIndex(10);
      expect(getCurrentIndex()).toBe(10);
    });
  });

  describe('getVotedBreeds', () => {
    it('should return an empty object if no votes are stored', () => {
      expect(getVotedBreeds()).toEqual({});
    });

    it('should return stored votes', () => {
      saveVote(1, 1);
      saveVote(2, -1);
      const votes = getVotedBreeds();
      expect(votes).toEqual({ 1: 1, 2: -1 });
    });
  });

  describe('saveVote', () => {
    it('should save a like vote', () => {
      saveVote(1, 1);
      expect(getVoteForBreed(1)).toBe(1);
    });

    it('should save a dislike vote', () => {
      saveVote(2, -1);
      expect(getVoteForBreed(2)).toBe(-1);
    });

    it('should save a super like vote', () => {
      saveVote(3, 2);
      expect(getVoteForBreed(3)).toBe(2);
    });

    it('should update an existing vote', () => {
      saveVote(1, 1);
      saveVote(1, -1);
      expect(getVoteForBreed(1)).toBe(-1);
    });
  });

  describe('getVoteForBreed', () => {
    it('should return undefined if no vote exists', () => {
      expect(getVoteForBreed(1)).toBeUndefined();
    });

    it('should return the vote value if it exists', () => {
      saveVote(1, 1);
      expect(getVoteForBreed(1)).toBe(1);
    });
  });

  describe('clearAllData', () => {
    it('should clear all stored data', () => {
      saveCurrentIndex(5);
      saveVote(1, 1);
      getUserId();

      clearAllData();

      expect(getCurrentIndex()).toBe(0);
      expect(getVotedBreeds()).toEqual({});
      // getUserId will generate a new ID after clearing
      const newUserId = getUserId();
      expect(newUserId).toBeTruthy();
    });
  });
});
