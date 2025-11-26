import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useMediaQuery } from 'react-responsive';
// 👈 New: Import post-processing tools if used in Room or HeroLights
import { EffectComposer, Bloom } from '@react-three/postprocessing'; 

import { Room } from './Room';
import HeroLights from './HeroLights';

const HeroExperience = () => {
    // These are already great checks for performance!
    const isTablet = useMediaQuery({ query: '(max-width: 1024px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    return (
        // 🟢 LAG FIX 1: Limit the Device Pixel Ratio (dpr)
        // This forces the scene to render at a lower resolution on high-density phone screens.
        // 🟢 LAG FIX 2: Set frameloop="demand"
        // This stops the canvas from constantly re-rendering (saving battery/CPU/GPU) unless manually triggered.
        <Canvas 
            camera={{ position: [0, 0, 15], fov: 45 }}
            dpr={[1, 1.5]} 
            frameloop="demand"
        >
            
            <OrbitControls
                enablePan={false}
                enableZoom={!isTablet}
                maxDistance={20}
                minDistance={5}
                minPolarAngle={Math.PI / 5}
                maxPolarAngle={Math.PI / 2}
            />
            
            <HeroLights/>
            
            <group
                scale={isMobile ? 0.7 : 1}
                position={[0, -3.5, 0]}
                rotation={[0, -Math.PI / 4, 0]}
            >
                <Room />
            </group>
            
            {/* 🟢 LAG FIX 3: Conditionally disable expensive post-processing (if used) */}
            {/* Check if you are applying effects like Bloom inside the <Room /> or <HeroLights /> component.
                If so, move them to this file and wrap them like this: */}
            {!isMobile && (
                <EffectComposer>
                    {/* Add the specific effects (like Bloom) here */}
                    {/* <Bloom luminanceThreshold={0.5} mipmapBlur /> */}
                </EffectComposer>
            )}
        </Canvas>
    );
};

export default HeroExperience;