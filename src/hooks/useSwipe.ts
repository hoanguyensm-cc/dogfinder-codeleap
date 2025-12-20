/**
 * Hook for handling swipe gestures on touch and mouse devices
 */

import { useRef, useCallback, useState } from 'react';

interface SwipeHandlers {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
}

interface SwipeState {
  isDragging: boolean;
  offsetX: number;
  offsetY: number;
}

const SWIPE_THRESHOLD = 50; // Minimum distance for a swipe to be recognized

export function useSwipe(handlers: SwipeHandlers) {
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const [swipeState, setSwipeState] = useState<SwipeState>({
    isDragging: false,
    offsetX: 0,
    offsetY: 0,
  });

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    setSwipeState({ isDragging: true, offsetX: 0, offsetY: 0 });
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const deltaX = e.touches[0].clientX - touchStartX.current;
    const deltaY = e.touches[0].clientY - touchStartY.current;
    setSwipeState({ isDragging: true, offsetX: deltaX, offsetY: deltaY });
  }, []);

  const handleTouchEnd = useCallback(() => {
    const { offsetX, offsetY } = swipeState;

    // Determine if it's a horizontal or vertical swipe
    const isHorizontal = Math.abs(offsetX) > Math.abs(offsetY);

    if (isHorizontal) {
      if (offsetX > SWIPE_THRESHOLD && handlers.onSwipeRight) {
        handlers.onSwipeRight();
      } else if (offsetX < -SWIPE_THRESHOLD && handlers.onSwipeLeft) {
        handlers.onSwipeLeft();
      }
    } else {
      if (offsetY < -SWIPE_THRESHOLD && handlers.onSwipeUp) {
        handlers.onSwipeUp();
      }
    }

    setSwipeState({ isDragging: false, offsetX: 0, offsetY: 0 });
  }, [swipeState, handlers]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    touchStartX.current = e.clientX;
    touchStartY.current = e.clientY;
    setSwipeState({ isDragging: true, offsetX: 0, offsetY: 0 });
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (swipeState.isDragging) {
        const deltaX = e.clientX - touchStartX.current;
        const deltaY = e.clientY - touchStartY.current;
        setSwipeState({ isDragging: true, offsetX: deltaX, offsetY: deltaY });
      }
    },
    [swipeState.isDragging]
  );

  const handleMouseUp = useCallback(() => {
    if (!swipeState.isDragging) return;

    const { offsetX, offsetY } = swipeState;

    const isHorizontal = Math.abs(offsetX) > Math.abs(offsetY);

    if (isHorizontal) {
      if (offsetX > SWIPE_THRESHOLD && handlers.onSwipeRight) {
        handlers.onSwipeRight();
      } else if (offsetX < -SWIPE_THRESHOLD && handlers.onSwipeLeft) {
        handlers.onSwipeLeft();
      }
    } else {
      if (offsetY < -SWIPE_THRESHOLD && handlers.onSwipeUp) {
        handlers.onSwipeUp();
      }
    }

    setSwipeState({ isDragging: false, offsetX: 0, offsetY: 0 });
  }, [swipeState, handlers]);

  return {
    swipeState,
    handlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
      onMouseDown: handleMouseDown,
      onMouseMove: handleMouseMove,
      onMouseUp: handleMouseUp,
      onMouseLeave: handleMouseUp, // Treat mouse leave as mouse up
    },
  };
}
