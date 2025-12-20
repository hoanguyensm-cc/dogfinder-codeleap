/**
 * Tests for MainPage component
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MainPage } from './MainPage';
import * as dogApi from '../services/dogApi';

// Mock the API
vi.mock('../services/dogApi');

const mockBreeds = [
  {
    id: 1,
    name: 'Golden Retriever',
    breed_group: 'Sporting',
    weight: { metric: '25-32', imperial: '55-70' },
    height: { metric: '51-61', imperial: '20-24' },
    reference_image_id: 'test-image-1',
  },
  {
    id: 2,
    name: 'Labrador Retriever',
    breed_group: 'Sporting',
    weight: { metric: '25-36', imperial: '55-80' },
    height: { metric: '54-62', imperial: '21-24' },
    reference_image_id: 'test-image-2',
  },
];

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

describe('MainPage', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should render loading state initially', () => {
    vi.mocked(dogApi.fetchBreeds).mockImplementation(() => new Promise(() => {}));

    const queryClient = createTestQueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <MainPage />
        </BrowserRouter>
      </QueryClientProvider>
    );

    expect(screen.getByText('Loading breeds...')).toBeTruthy();
  });

  it('should render breed information when data is loaded', async () => {
    vi.mocked(dogApi.fetchBreeds).mockResolvedValue(mockBreeds);

    const queryClient = createTestQueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <MainPage />
        </BrowserRouter>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Golden Retriever')).toBeTruthy();
    });

    expect(screen.getByText('Sporting')).toBeTruthy();
    expect(screen.getByText('1 / 2')).toBeTruthy();
  });

  it('should render error state when fetch fails', async () => {
    vi.mocked(dogApi.fetchBreeds).mockRejectedValue(new Error('Failed to fetch'));

    const queryClient = createTestQueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <MainPage />
        </BrowserRouter>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Error loading breeds/i)).toBeTruthy();
    });
  });

  it('should render action buttons', async () => {
    vi.mocked(dogApi.fetchBreeds).mockResolvedValue(mockBreeds);

    const queryClient = createTestQueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <MainPage />
        </BrowserRouter>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByLabelText('Like')).toBeTruthy();
      expect(screen.getByLabelText('Dislike')).toBeTruthy();
      expect(screen.getByLabelText('Super Like')).toBeTruthy();
    });
  });
});
