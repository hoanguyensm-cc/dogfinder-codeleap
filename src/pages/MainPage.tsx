/**
 * Main Page - Displays dog breeds with swipe functionality
 */

import { useNavigate } from 'react-router-dom';
import { useBreedNavigation } from '../hooks/useBreedNavigation';
import { useSwipe } from '../hooks/useSwipe';
import './MainPage.css';

export function MainPage() {
  const navigate = useNavigate();
  const {
    currentBreed,
    currentIndex,
    totalBreeds,
    isLoading,
    error,
    handleLike,
    handleDislike,
    handleSuperLike,
  } = useBreedNavigation();

  const { swipeState, handlers } = useSwipe({
    onSwipeLeft: handleDislike,
    onSwipeRight: handleLike,
    onSwipeUp: handleSuperLike,
  });

  const handleCardClick = () => {
    if (currentBreed && !swipeState.isDragging) {
      navigate(`/breed/${currentBreed.id}`);
    }
  };

  if (isLoading) {
    return (
      <div className="main-page">
        <div className="loading">Loading breeds...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="main-page">
        <div className="error">Error loading breeds. Please check your API key and try again.</div>
      </div>
    );
  }

  if (!currentBreed) {
    return (
      <div className="main-page">
        <div className="no-breeds">
          <h2>No more breeds!</h2>
          <p>You've seen all the breeds. Great job!</p>
        </div>
      </div>
    );
  }

  const imageUrl =
    currentBreed.image?.url ||
    (currentBreed.reference_image_id
      ? `https://cdn2.thedogapi.com/images/${currentBreed.reference_image_id}.jpg`
      : '/placeholder.jpg');

  const cardStyle = {
    transform: swipeState.isDragging
      ? `translate(${swipeState.offsetX}px, ${swipeState.offsetY}px) rotate(${swipeState.offsetX * 0.1}deg)`
      : 'none',
    transition: swipeState.isDragging ? 'none' : 'transform 0.3s ease-out',
  };

  return (
    <div className="main-page">
      <header className="header">
        <h1>DogFinder</h1>
        <p className="progress">
          {currentIndex + 1} / {totalBreeds}
        </p>
      </header>

      <div className="card-container">
        <div className="breed-card" style={cardStyle} {...handlers} onClick={handleCardClick}>
          <div className="breed-image" style={{ backgroundImage: `url(${imageUrl})` }}>
            <div className="breed-info">
              <h2 className="breed-name">{currentBreed.name}</h2>
              {currentBreed.breed_group && (
                <p className="breed-group">{currentBreed.breed_group}</p>
              )}
            </div>
          </div>
        </div>

        {/* Swipe indicators */}
        {swipeState.isDragging && (
          <>
            {swipeState.offsetX > 50 && <div className="swipe-indicator like">LIKE</div>}
            {swipeState.offsetX < -50 && <div className="swipe-indicator dislike">NOPE</div>}
            {swipeState.offsetY < -50 && (
              <div className="swipe-indicator super-like">SUPER LIKE</div>
            )}
          </>
        )}
      </div>

      <div className="actions">
        <button
          className="action-button dislike-button"
          onClick={handleDislike}
          aria-label="Dislike"
        >
          ❌
        </button>
        <button
          className="action-button super-like-button"
          onClick={handleSuperLike}
          aria-label="Super Like"
        >
          ⭐
        </button>
        <button className="action-button like-button" onClick={handleLike} aria-label="Like">
          ✅
        </button>
      </div>
    </div>
  );
}
