import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useMediaQuery } from 'react-responsive';
import { EffectComposer, Bloom } from '@react-three/postprocessing'; 

import { Room } from './Room';
import HeroLights from './HeroLights';

const HeroExperience = () => {
    const isTablet = useMediaQuery({ query: '(max-width: 1024px)' });
    const isMobile = useMediaQuery({ query: '(max-width-150)' });

    return (
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

export default HeroExperience;