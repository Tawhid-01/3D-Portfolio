import React from 'react';
import { Environment, Float, OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
// 👈 New: Import the post-processing components and the media query hook
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useMediaQuery } from 'react-responsive'; 

const TechIcon = ({ model }) => {
  const scene = useGLTF(model.modelPath);
  
  // 🟢 LAG FIX 1: Detect mobile screen size (768px wide or less)
  const isMobile = useMediaQuery({ maxWidth: 768 }); 

  return (
    // 🟢 LAG FIX 2: Set dpr to limit resolution and 'frameloop' to save battery
    // dpr limits the rendering quality, saving mobile GPU power.
    // frameloop="demand" only renders when interaction or animation occurs.
    <Canvas dpr={[1, 1.5]} frameloop="demand"> 
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Environment preset='city' />
      <OrbitControls enableZoom={false} />

      <Float speed={5.5} rotationIntensity={0.5} floatIntensity={0.9}>
        <group scale={model.scale} rotation={model.rotation}>
          <primitive object={scene.scene} />
        </group>
      </Float>

      {/* 🟢 LAG FIX 3: Conditionally render the expensive post-processing effects */}
      {!isMobile && (
        // The EffectComposer must be where your post-processing is if you have lag.
        // If you still have lag, try removing this entire block.
        <EffectComposer>
          <Bloom 
            // Reducing these values can also improve performance
            luminanceThreshold={0.5} 
            mipmapBlur 
          />
          {/* Add any other post-processing effects you are using here */}
        </EffectComposer>
      )}

    </Canvas>
  );
};

export default TechIcon;