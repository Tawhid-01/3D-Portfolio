import { useRef, useMemo } from "react";
import AnimatedCountter from "../components/AnimatedCountter";
import Button from "../components/Button";
import HeroExperience from "../components/heroModel/HeroExperience";
import { words } from "../consens";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Hero = () => {
  const container = useRef(null);

  // 1. Memoize the words list to prevent unnecessary re-renders of the list items
  const renderedWords = useMemo(() => words.map((word, index) => (
    <span key={`${word.text}-${index}`} className="flex items-center md:gap-3 gap-1 pb-2">
      <img 
        src={word.imgPath}
        alt={word.text} 
        className="xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-white-50"
        loading="eager" // 2. Ensure hero images load immediately
      />
      <span>{word.text}</span>
    </span>
  )), []);

  useGSAP(() => {
    // 3. Select once and reuse for slight performance gain in GSAP
    const titles = gsap.utils.toArray('.hero-text h1');
    
    gsap.fromTo(
      titles,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 1,
        ease: 'power2.inOut',
      }
    );
  }, { scope: container });

  return (
    <section ref={container} id='hero' className='relative overflow-hidden'>
        <div className="absolute top-0 left-0 z-10">
            {/* 4. Optimized background image loading */}
            <img src="/images/bg.png" alt="background" fetchpriority="high" />
        </div>
        
        <div className="hero-layout">
          <header className="flex flex-col justify-center md:w-full w-screen md:px-20 px-5">
            <div className="flex flex-col gap-7">
                <div className="hero-text">
                    <h1>
                        Shaping 
                        <span className="slide">
                            <span className="wrapper">
                                {renderedWords}
                            </span>
                        </span>
                    </h1>
                    <h1>into Real Project</h1>
                    <h1>that Deliver Results</h1>
                </div>
                
                <p className="text-white-50 md:text-xl relative z-10 pointer-events-none">
                    Hi, I’m Tawhid, a developer based in Croatia with a passion for code.
                </p>
                
                <Button
                   className="md:w-80 md:h-16 w-60 h-12 md:mt-0 mt-70 md:mx-0 mx-auto"
                   id="button"
                   text="See my work"
                />
            </div>
          </header>

          <figure>
            <div className="hero-3d-layout h-[300px] md:h-screen pointer-events-none">
                <HeroExperience />
            </div>
          </figure>
        </div>
        
        <AnimatedCountter/>
    </section>
  );
};

export default Hero;