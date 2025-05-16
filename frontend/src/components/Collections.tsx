import React from 'react'
import Collection1 from '../assets/About/Frame 35.png'
import Collection3 from '../assets/About/Frame 36.png'
import Collection2 from '../assets/About/Frame 34.png'
export default function Collections() {
  return (
    <div className="grid grid-cols-3 gap-7 max-w-[95%] mx-auto">
        <div className="flex items-center justify-center">
            <img src={Collection1} alt="" className='w-full h-full' />
        </div>
        <div className='col-span-2 flex items-center justify-center'>
            <img src={Collection2} alt="" className='w-full h-full ' />
        </div>
        <div className='col-span-3 flex items-center justify-center'>
            <img src={Collection3} alt="" className='w-full h-full ' />
        </div>
    </div>
  )
}
