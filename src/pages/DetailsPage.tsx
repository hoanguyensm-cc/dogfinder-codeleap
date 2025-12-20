/**
 * Details Page - Displays comprehensive information about a dog breed
 */

import { useParams, useNavigate } from 'react-router-dom';
import { useBreed } from '../hooks/useDogApi';
import './DetailsPage.css';

export function DetailsPage() {
  const { breedId } = useParams<{ breedId: string }>();
  const navigate = useNavigate();
  const { data: breed, isLoading, error } = useBreed(Number(breedId));

  const handleBack = () => {
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="details-page">
        <div className="loading">Loading breed details...</div>
      </div>
    );
  }

  if (error || !breed) {
    return (
      <div className="details-page">
        <div className="error">Error loading breed details. Please try again.</div>
        <button onClick={handleBack} className="back-button">
          Back to Home
        </button>
      </div>
    );
  }

  const imageUrl =
    breed.image?.url ||
    (breed.reference_image_id
      ? `https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg`
      : '/placeholder.jpg');

  return (
    <div className="details-page">
      <button onClick={handleBack} className="back-button" aria-label="Go back">
        ← Back
      </button>

      <div className="details-container">
        <div className="details-image" style={{ backgroundImage: `url(${imageUrl})` }} />

        <div className="details-content">
          <h1 className="details-title">{breed.name}</h1>

          <div className="details-grid">
            {breed.breed_group && (
              <div className="detail-item">
                <span className="detail-label">Breed Group</span>
                <span className="detail-value">{breed.breed_group}</span>
              </div>
            )}

            {breed.bred_for && (
              <div className="detail-item">
                <span className="detail-label">Bred For</span>
                <span className="detail-value">{breed.bred_for}</span>
              </div>
            )}

            {breed.life_span && (
              <div className="detail-item">
                <span className="detail-label">Life Span</span>
                <span className="detail-value">{breed.life_span}</span>
              </div>
            )}

            {breed.weight?.metric && (
              <div className="detail-item">
                <span className="detail-label">Weight</span>
                <span className="detail-value">{breed.weight.metric} kg</span>
              </div>
            )}

            {breed.height?.metric && (
              <div className="detail-item">
                <span className="detail-label">Height</span>
                <span className="detail-value">{breed.height.metric} cm</span>
              </div>
            )}

            {breed.temperament && (
              <div className="detail-item full-width">
                <span className="detail-label">Temperament</span>
                <span className="detail-value temperament">{breed.temperament}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
