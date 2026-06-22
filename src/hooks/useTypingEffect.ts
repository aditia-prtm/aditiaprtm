import { useState, useEffect } from 'react';

/**
 * useTypingEffect
 * Cycles through an array of strings with a typewriter effect.
 */
export function useTypingEffect(strings: string[], typingSpeed = 80, deletingSpeed = 40, pauseMs = 1800) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = strings[currentIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (displayText.length < current.length) {
          setDisplayText(current.slice(0, displayText.length + 1));
        } else {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), pauseMs);
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(current.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentIndex(prev => (prev + 1) % strings.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, currentIndex, isDeleting, strings, typingSpeed, deletingSpeed, pauseMs]);

  return displayText;
}
