import React, { useState, useEffect } from 'react';

const useTypewriter = (texts: string[], speed = 100, pause = 1000) => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentText = texts[textIndex];
    let typingSpeed = isDeleting ? speed / 2 : speed;

    const timer = setTimeout(() => {
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
          setTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [texts, textIndex, charIndex, isDeleting, speed, pause]);

  return displayText;
};

function HeroSection() {
  const text = useTypewriter(
    ['Crack your interviews', 'AI Powered Learning', 'Personalized Learning'],
    100,
    1000
  );

  return (
    <section className="flex  flex-col md:flex-row items-center justify-between w-full max-w-7xl   px-6 py-16  md:py-24 gap-10">
      
      <div className="  flex justify-center">
        <img
          src="https://d3h0owdjgzys62.cloudfront.net/images/43844/live_screenshot/large2x/Freshdesk_actions_freshdesk.png" 
          alt="IntervueAI Preview"
          className="w-screen mx-10 h-3/4 max-w-sm rounded-xl md:max-w-md"
        />
      </div>

      <div className="w-full md:w-full flex flex-col items-center md:items-start text-center md:text-left">
        <h1 className="text-gray-700 text-3xl sm:text-4xl md:text-5xl font-bold flex  gap-2 text-glow">
    <span className="text-[#4285F4]/100 font-extrabold">IntervueAI</span>
        </h1>

        <h2 className="flex font-bold items-center mt-4 text-2xl sm:text-3xl md:text-4xl text-start text-gray-700 text-glow gap-1">
          {text}
          <span className="animate-pulse font-extralight">_</span>
        </h2>

        <p className="mt-6 font-light text-base sm:text-lg md:text-xl text-start text-gray-700 dark:text-gray-400 max-w-xl">
          Master every type of interview with realistic, on-demand practice powered by AI. From behavioral questions to live coding challenges and system design scenarios, IntervueAI helps you sharpen your skills, get instant feedback, and build the confidence to ace your next interview.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button className="cursor-pointer bg-[#4285F4]/100 hover:bg-black  transition-colors font-bold font-mono py-3 px-8 rounded-xl text-white text-lg md:text-lg">
            Contact Us
          </button>
          <button className="cursor-pointer bg-[#4285F4]/100 hover:bg-black  transition-colors font-bold font-mono py-3 px-8 rounded-xl text-white text-lg md:text-lg">
            Learn More
          </button>
        </div>
      </div>
      
    </section>
  );
}

export default HeroSection;
