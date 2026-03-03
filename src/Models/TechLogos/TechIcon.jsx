import React from 'react';
import { Environment, Float, OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useMediaQuery } from 'react-responsive'; 

const TechIcon = ({ model }) => {
  const scene = useGLTF(model.modelPath);
  
  const isMobile = useMediaQuery({ maxWidth: 768 }); 

  return (
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
      
        <EffectComposer>
          <Bloom 
        
            luminanceThreshold={0.5} 
            mipmapBlur 
          />
        
        </EffectComposer>
      )}

    </Canvas>
  );
};

export default TechIcon;