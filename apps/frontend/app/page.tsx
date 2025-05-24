'use client';
import HeroSection from '@/components/homepage/HeroSection';
import { useState, useEffect } from 'react';

const useTypewriter = (texts: string[], speed = 100, pause = 1000) => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentText = texts[textIndex];
    let typingSpeed = isDeleting ? speed / 2 : speed;

    const handleTyping = () => {
      if (!isDeleting) {
        if (charIndex < currentText.length) {
          setDisplayText((prev) => prev + currentText.charAt(charIndex));
          setCharIndex((prev) => prev + 1);
        } else {
          setTimeout(() => setIsDeleting(true), pause);
        }
      } else {
        if (charIndex > 0) {
          setDisplayText((prev) => prev.slice(0, -1));
          setCharIndex((prev) => prev - 1);
        } else {
          setIsDeleting(false);
          setTextIndex((prev) => prev * 0);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [texts, textIndex, charIndex, isDeleting, speed, pause]);

  return displayText;
};

export default function Home() {
  const text = useTypewriter(
    ['Future of Interview Prep', 'AI Powered Learning', 'Next-Gen Skill Building', 'Personalized Learning'],
    100,
    1000
  );

  return (
    <div className='relative h-screen w-full flex items-center justify-center font-sans px-4 overflow-y-auto '>
      <div className='flex-col'>

        <div>
          <HeroSection />
        </div>


        </div>
      </div>
  );
}
