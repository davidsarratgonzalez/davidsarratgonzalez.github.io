import React, { useState, useRef, useEffect } from 'react';
import imagesConfig from '../data/images-config.json';

function OptimizedImage({ 
  type = 'profile', 
  size = 'medium', 
  orgKey = null, 
  className = '', 
  style = {},
  alt = '',
  loading = 'lazy',
  circular = null
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [supportsWebP, setSupportsWebP] = useState(false);
  const imgRef = useRef(null);

  // Check WebP support
  useEffect(() => {
    if (!imagesConfig.settings.webpSupport) return;
    
    const webp = new Image();
    webp.onload = webp.onerror = function () {
      setSupportsWebP(webp.height === 2);
    };
    webp.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  }, []);

  const getImageConfig = () => {
    switch (type) {
      case 'profile':
        return imagesConfig.profile;
      case 'logo':
        return orgKey ? imagesConfig.logos.organizations[orgKey] : null;
      default:
        return null;
    }
  };

  const getImagePath = () => {
    const config = getImageConfig();
    if (!config) return null;

    const basePath = imagesConfig.settings.basePath;
    
    if (type === 'profile') {
      const useSizedVersion = size && size !== 'original';
      const extension = supportsWebP && config.formats.includes('webp') ? 'webp' : 'jpeg';
      const filename = useSizedVersion ? 
        `david-${size}.${extension}` : 
        config.source;
      return `${basePath}${filename}`;
    }
    
    if (type === 'logo') {
      return `${basePath}${config.source}`;
    }
    
    return null;
  };

  const getAltText = () => {
    if (alt) return alt;
    
    const config = getImageConfig();
    if (!config) return '';
    
    return config.alt || '';
  };

  const getPlaceholderColor = () => {
    return type === 'profile' ? '#f0f0f0' : '#ffffff';
  };

  const shouldBeCircular = () => {
    if (circular !== null) return circular; // Explicit prop override
    const config = getImageConfig();
    return config?.circular || false; // Default to false if not specified
  };

  const imagePath = getImagePath();
  const altText = getAltText();
  const isCircular = shouldBeCircular();

  if (!imagePath) {
    return (
      <div 
        className={`image-placeholder ${isCircular ? 'circular' : ''} ${className}`}
        style={{
          backgroundColor: getPlaceholderColor(),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#999',
          fontSize: '12px',
          borderRadius: isCircular ? '50%' : '0',
          ...style
        }}
      >
        Image not found
      </div>
    );
  }

  return (
    <div 
      className={`optimized-image-container ${isCircular ? 'circular' : ''} ${className}`} 
      style={style}
    >
      <img
        ref={imgRef}
        src={imagePath}
        alt={altText}
        loading={loading}
        className={`optimized-image ${isLoaded ? 'loaded' : ''} ${hasError ? 'error' : ''} ${isCircular ? 'circular' : ''}`}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        style={{
          opacity: isLoaded && !hasError ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: isCircular ? '50%' : '0'
        }}
      />
      
      {/* Loading placeholder */}
      {!isLoaded && !hasError && (
        <div 
          className={`image-loading-placeholder ${isCircular ? 'circular' : ''}`}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: getPlaceholderColor(),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#999',
            fontSize: '12px',
            borderRadius: isCircular ? '50%' : '0'
          }}
        >
          Loading...
        </div>
      )}
      
      {/* Error placeholder */}
      {hasError && (
        <div 
          className={`image-error-placeholder ${isCircular ? 'circular' : ''}`}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#f5f5f5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#999',
            fontSize: '12px',
            borderRadius: isCircular ? '50%' : '0'
          }}
        >
          Failed to load
        </div>
      )}
    </div>
  );
}

export default OptimizedImage; 