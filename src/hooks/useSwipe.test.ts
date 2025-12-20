/**
 * Tests for useSwipe hook
 */

import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSwipe } from './useSwipe';

describe('useSwipe', () => {
  it('should initialize with default state', () => {
    const { result } = renderHook(() =>
      useSwipe({
        onSwipeLeft: vi.fn(),
        onSwipeRight: vi.fn(),
        onSwipeUp: vi.fn(),
      })
    );

    expect(result.current.swipeState).toEqual({
      isDragging: false,
      offsetX: 0,
      offsetY: 0,
    });
  });

  it('should track touch movement', () => {
    const { result } = renderHook(() =>
      useSwipe({
        onSwipeLeft: vi.fn(),
        onSwipeRight: vi.fn(),
        onSwipeUp: vi.fn(),
      })
    );

    act(() => {
      result.current.handlers.onTouchStart({
        touches: [{ clientX: 100, clientY: 100 }],
      } as unknown as React.TouchEvent);
    });

    expect(result.current.swipeState.isDragging).toBe(true);

    act(() => {
      result.current.handlers.onTouchMove({
        touches: [{ clientX: 150, clientY: 100 }],
      } as unknown as React.TouchEvent);
    });

    expect(result.current.swipeState.offsetX).toBe(50);
    expect(result.current.swipeState.offsetY).toBe(0);
  });

  it('should call onSwipeRight when swiping right beyond threshold', () => {
    const onSwipeRight = vi.fn();
    const { result } = renderHook(() =>
      useSwipe({
        onSwipeRight,
      })
    );

    act(() => {
      result.current.handlers.onTouchStart({
        touches: [{ clientX: 100, clientY: 100 }],
      } as unknown as React.TouchEvent);
    });

    act(() => {
      result.current.handlers.onTouchMove({
        touches: [{ clientX: 200, clientY: 100 }],
      } as unknown as React.TouchEvent);
    });

    act(() => {
      result.current.handlers.onTouchEnd();
    });

    expect(onSwipeRight).toHaveBeenCalled();
  });

  it('should call onSwipeLeft when swiping left beyond threshold', () => {
    const onSwipeLeft = vi.fn();
    const { result } = renderHook(() =>
      useSwipe({
        onSwipeLeft,
      })
    );

    act(() => {
      result.current.handlers.onTouchStart({
        touches: [{ clientX: 200, clientY: 100 }],
      } as unknown as React.TouchEvent);
    });

    act(() => {
      result.current.handlers.onTouchMove({
        touches: [{ clientX: 100, clientY: 100 }],
      } as unknown as React.TouchEvent);
    });

    act(() => {
      result.current.handlers.onTouchEnd();
    });

    expect(onSwipeLeft).toHaveBeenCalled();
  });

  it('should call onSwipeUp when swiping up beyond threshold', () => {
    const onSwipeUp = vi.fn();
    const { result } = renderHook(() =>
      useSwipe({
        onSwipeUp,
      })
    );

    act(() => {
      result.current.handlers.onTouchStart({
        touches: [{ clientX: 100, clientY: 200 }],
      } as unknown as React.TouchEvent);
    });

    act(() => {
      result.current.handlers.onTouchMove({
        touches: [{ clientX: 100, clientY: 100 }],
      } as unknown as React.TouchEvent);
    });

    act(() => {
      result.current.handlers.onTouchEnd();
    });

    expect(onSwipeUp).toHaveBeenCalled();
  });

  it('should not call handlers if swipe is below threshold', () => {
    const onSwipeRight = vi.fn();
    const { result } = renderHook(() =>
      useSwipe({
        onSwipeRight,
      })
    );

    act(() => {
      result.current.handlers.onTouchStart({
        touches: [{ clientX: 100, clientY: 100 }],
      } as unknown as React.TouchEvent);
    });

    act(() => {
      result.current.handlers.onTouchMove({
        touches: [{ clientX: 120, clientY: 100 }],
      } as unknown as React.TouchEvent);
    });

    act(() => {
      result.current.handlers.onTouchEnd();
    });

    expect(onSwipeRight).not.toHaveBeenCalled();
  });
});
