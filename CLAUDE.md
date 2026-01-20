# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build and Development Commands

```bash
npm run dev          # Start development server (http://localhost:5173)
npm run build        # TypeScript check + production build
npm run preview      # Preview production build
npm test             # Run tests in watch mode
npm run test:ui      # Run tests with UI
npm run test:coverage # Run tests with coverage report
npm run lint         # Run ESLint
npm run lint:fix     # Run ESLint with auto-fix
npm run format       # Format code with Prettier
npm run format:check # Check formatting
```

## Environment Setup

Requires `VITE_DOG_API_KEY` environment variable. Get an API key from [The Dog API](https://thedogapi.com/) and add to `.env`:

```
VITE_DOG_API_KEY=your_api_key_here
```

## Architecture Overview

This is a React + TypeScript application built with Vite for finding dog breeds via a Tinder-style swipe interface.

### Data Flow

1. **API Layer** (`src/services/dogApi.ts`): Raw fetch calls to The Dog API with error handling via `DogApiError` class
2. **React Query Hooks** (`src/hooks/useDogApi.ts`): Wraps API calls with caching, query keys defined in `QUERY_KEYS` object
3. **Business Logic Hook** (`src/hooks/useBreedNavigation.ts`): Combines data fetching with navigation state and voting actions
4. **Persistence** (`src/utils/storage.ts`): LocalStorage utilities for current index, votes, and user ID

### Key Patterns

- **Query Keys**: Centralized in `QUERY_KEYS` constant for React Query cache management
- **Vote Values**: `-1` (dislike), `1` (like), `2` (super like) - used throughout the codebase
- **Swipe Hook** (`src/hooks/useSwipe.ts`): Custom gesture handling for touch/mouse swipe interactions
- **Types**: All API types defined in `src/types/dog.ts` with Zod available for runtime validation

### Routes

- `/` - Main swipe interface (`MainPage`)
- `/breed/:breedId` - Breed details page (`DetailsPage`)

### Test Structure

Tests are co-located with source files (`.test.ts`/`.test.tsx` suffix). Vitest with jsdom environment, setup in `src/test/setup.ts`.
