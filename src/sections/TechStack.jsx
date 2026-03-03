import React from 'react';
import TitleHeader from '../components/TitleHeader.jsx';
import TechIcon from '../Models/TechLogos/TechIcon.jsx';
import { techStackIcons } from '../consens/index.jsx';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // 1. Don't forget this!

gsap.registerPlugin(ScrollTrigger); // 2. Register it outside the component

const TechStack = () => {
  useGSAP(() => {
    gsap.fromTo('.tech-card', 
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out', // 'out' usually feels snappier for entrance
        stagger: 0.15, // Slightly faster stagger feels more modern
        scrollTrigger: {
          trigger: '#skills',
          start: 'top 85%', // Trigger earlier so the user sees the animation start
          toggleActions: 'play none none reverse', // Optional: replays when scrolling back up
        }
      }
    );
  }, []);

  return (
    <section id='skills' className='section-padding mb-20 overflow-hidden'>
      <div className="container mx-auto px-4 md:px-10">
        <TitleHeader
          title="My Preferred Tech Stack"
          sub="🤝 The Skills I Bring to the Table"
        />

        {/* Updated Grid Logic */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap md:justify-center gap-4 mt-12">
          {techStackIcons.map((icon) => (
            <div 
              key={icon.name} 
              className="tech-card card-border overflow-hidden group xl:rounded-full rounded-lg relative transition-all duration-300 hover:shadow-lg"
            >
              <div className='tech-card-animated-bg'/>
              <div className="tech-card-content p-4 flex flex-col items-center justify-center">
                <div className="tech-icon-wrapper mb-2">
                  <TechIcon model={icon}/>
                </div>
                <div className="w-full text-center">
                  <p className="text-sm md:text-base font-medium"> {icon.name} </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;