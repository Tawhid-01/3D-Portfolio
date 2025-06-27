import React, { useRef } from 'react'; // Added missing useRef import
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
    const projects = [projectRef.current, project1Ref.current, project2Ref.current];
     
    projects.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          y: 50, 
          opacity: 0
        },
        {
          y: 0, 
          opacity: 1, // Changed from 0 to 1 (you probably want to animate to visible)
          duration: 1,
          delay: 0.3 * (index + 1),
          scrollTrigger: {
            trigger: card,
            start: 'top bottom-=100', // Added hyphen for proper ScrollTrigger syntax
            toggleActions: 'play none none none' // Recommended to add this
          }
        }
      );
    });

    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { 
        opacity: 1, 
        duration: 1.5,
        scrollTrigger: { // Added ScrollTrigger for consistency
          trigger: sectionRef.current,
          start: 'top bottom-=100'
        }
      }
    );
  }, []); // Added dependency array

  return (
    <section id='work' ref={sectionRef} className='app-showcase'>
      <div className="w-full">
        <div className="showcaselayout">
          {/*left-side */}
          <div className="first-project-wrapper" ref={projectRef}>
            <div className="image-wrapper">
              <img src="/images/first-project.png" alt="E-commerce" />
            </div>

            <div className="text-content">
              <h2>On-Demand E-commerce Site Made Simple with a Powerful, User-Friendly App called Hecto</h2>
              <p className='text-white-50 md:text-xl'>
                An app built with ReactJs & TailwindCSS for a fast, user-friendly experience.
              </p>
            </div>
          </div>

          {/*right-side */}
          <div className="project-list-wrapper overflow-hidden">
            <div className="project" ref={project1Ref}>
              <div className="image-wrapper bg-[#ffefdb]">
                <img src="/images/project1.png" alt="Designing Agency Platform" />
              </div>
              <h2>Designing Agency Platform</h2>
            </div>
            <div className="project" ref={project2Ref}>
              <div className="image-wrapper bg-[#ffe7eb]">
                <img src="/images/project2.png" alt="Creative Designer Platform" />
              </div>
              <h2>Creative Designer Platform</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ShowcaseSection;