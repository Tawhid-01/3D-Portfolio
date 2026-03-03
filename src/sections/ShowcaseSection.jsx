import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ShowcaseSection = () => {
  const sectionRef = useRef(null);
  const projectRef = useRef(null);
  const project1Ref = useRef(null);
  const project2Ref = useRef(null);

  useGSAP(() => {
    // Array of refs for cleaner mapping
    const projects = [projectRef.current, project1Ref.current, project2Ref.current];
    
    // Animate each card when it enters the viewport
    projects.forEach((card, index) => {
      if (!card) return; // Safety check

      gsap.fromTo(card,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: index * 0.2, // Simplified stagger logic
          scrollTrigger: {
            trigger: card,
            start: 'top bottom-=100',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // Fade in the whole section wrapper
    gsap.fromTo(sectionRef.current,
      { opacity: 0 },
      { 
        opacity: 1, 
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom-=200',
        }
      }
    );
  }, { scope: sectionRef }); // Scope ensures GSAP only looks inside this component

  return (
    <section id='work' ref={sectionRef} className='app-showcase py-10'>
      <div className="container mx-auto px-5">
        <div className="showcaselayout flex flex-col lg:flex-row gap-10">
          
          {/* 1st Project: Fixed image fit for mobile */}
          <div className="first-project-wrapper w-full lg:w-1/2" ref={projectRef}>
            <div className="image-wrapper w-full h-[300px] md:h-[500px] overflow-hidden rounded-xl">
              <img 
                className='w-full h-full object-cover ' 
                src="/images/first-project.png" 
                alt="E-commerce" 
                loading="lazy" 
              />
            </div>

            <div className="text-content mt-6">
              <h2 className="text-2xl font-bold">On-Demand E-commerce Site Made Simple with a Powerful, User-Friendly App called Hecto</h2>
              <p className='text-white-50 md:text-xl mt-4'>
                An app built with ReactJs & TailwindCSS for a fast, user-friendly experience.
              </p>
            </div>
          </div>

          {/* Right Side Projects */}
          <div className="project-list-wrapper w-full lg:w-1/2 flex flex-col gap-10">
            <div className="project" ref={project1Ref}>
              <div className="image-wrapper bg-[#161515b0] h-[250px] overflow-hidden rounded-xl">
                <img className="w-full h-full object-cover" src="/images/project1.png" alt="Designing Agency Platform" />
              </div>
              <h2 className="text-xl mt-4">Designing Agency Platform</h2>
            </div>

            <div className="project" ref={project2Ref}>
              <div className="image-wrapper bg-[#161515b0] h-[250px] overflow-hidden rounded-xl">
                <img className="w-full h-full object-cover" src="/images/project2.png" alt="Creative Designer Platform" />
              </div>
              <h2 className="text-xl mt-4">Creative Designer Platform</h2>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default ShowcaseSection;