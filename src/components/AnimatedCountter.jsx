import React from 'react'
import { counterItems } from '../consens'

import CountUp from 'react-countup';

const AnimatedCountter = () => {
  return (
    <div id='counter' className='padding-x-lg xl:my-0 mt-32'>
           <div className="mx-auto grid-4-cols">
            {counterItems.map((item) => (
                <div className="bg-zinc-900 rouded-lg flex flex-col justify-center">
                    <div key={counterItems.label} className="counter-number text-white text-5xl font-bold mb-2">
                        <CountUp suffix={item.suffix} end={item.value} />

                    </div>
                    <div className="text-white-50 text-lg">{item.label}</div>
                </div>
            ))}
           </div>
    </div>
  )
}

export default AnimatedCountter