import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
// 👈 New: Import the media query hook and post-processing components
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useMediaQuery } from 'react-responsive'; 

import Computer from "./Coumputer";

const ContactExperience = () => {
  // 🟢 LAG FIX 1: Detect mobile screen size
  const isMobile = useMediaQuery({ maxWidth: 768 }); 
  
  return (
    // 🟢 LAG FIX 2: Limit Device Pixel Ratio (dpr) and set frameloop
    // dpr limits the rendering quality, frameloop="demand" stops constant rendering.
    <Canvas 
      shadows 
      camera={{ position: [0, 3, 7], fov: 45 }}
      dpr={[1, 1.5]} 
      frameloop="demand"
    >
      <ambientLight intensity={0.5} color="#7535ce" />
      <directionalLight position={[5, 5, 3]} intensity={2.5} color="#7535ce" />
      <directionalLight
        position={[5, 9, 1]}
        castShadow
        intensity={2.5}
        color="#ffe4ff"
      />

      <OrbitControls
        enableZoom={false}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2}
      />

      <group scale={[1, 1, 1]}>
        <mesh
          receiveShadow
          position={[0, -1.5, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[30, 30]} />
          <meshStandardMaterial color="#a46b2d" />
        </mesh>
      </group>

      <group scale={0.03} position={[0, -1.49, -2]} castShadow>
        <Computer />
      </group>
      
      {/* 🟢 LAG FIX 3: Conditionally render the expensive EffectComposer 
          (Assume the EffectComposer/Post-Processing is used in this scene for the Bloom effect) */}
      {!isMobile && (
        <EffectComposer>
          <Bloom luminanceThreshold={0.5} mipmapBlur />
          {/* Include any other post-processing effects here */}
        </EffectComposer>
      )}
    </Canvas>
  );
};

export default ContactExperience;