import React from 'react'
import { useState,useEffect } from 'react';
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
          setTextIndex((prev) =>prev*0);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [texts, textIndex, charIndex, isDeleting, speed, pause]);

  return displayText;
};

function HeroSection() {
  const text = useTypewriter(
    [ 'Future of Interview Prep', 'AI Powered Learning','Next-Gen Skill Building','Personalized Learning'],
    100,
    1000
  );

  return (
      <div className="items-center   w-3xl gap-y-4 z-10">
        <div>

        <div className="text-gray-300  text-4xl flex gap-x-4 sm:text-5xl text-glow">Welcome to <span className='text-[#00FF00]'>IntervueAI</span></div>
        <div className="flex text-start  text-[#00FF00] text-4xl sm:text-5xl gap-x-2 text-glow">
          {text}
          <span className="animate-pulse font-extralight">_</span>
        </div>
        <p className="text-lg md:text-xl mt-5 w-full text-gray-600 dark:text-gray-400 mb-8  mx-auto">
          Master every type of interview with realistic, on-demand practice powered by AI.
          From behavioral questions to live coding challenges and system design scenarios,
          IntervueAI helps you sharpen your skills, get instant feedback, and build the confidence
          to ace your next interview.
        </p>
        <div className=' space-x-5 flex'>
          <button className='cursor-pointer hover:bg-gray-400 bg-gray-300 font-bold  font-mono py-3 px-10 rounded-xl text-black text-xl'>Contact Us</button>
          <button className='cursor-pointer bg-gray-300 hover:bg-gray-400 font-bold  font-mono py-3 px-10 rounded-xl text-black text-xl'>Learn More</button>
        </div>
        </div>
      </div>

  );
}

export default HeroSection