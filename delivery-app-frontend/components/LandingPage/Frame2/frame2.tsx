import React from 'react'
import PrecisionDrop from '@/public/images/precision_drop_2.png'
import ParallaxImage from '@/components/Global/ParallaxImage'

const Frame2 = (): JSX.Element => {
  return (
    <div className="flex flex-col items-center space-y-20">
      <div className="flex justify-between items-center">
        <div className="font-semibold text-header2">Our Concept</div>
        <div className="w-1/3 text-end">
          {
            'Lorem ipsum odor amet, consectetuer adipiscing elit. Viverra parturient torquent torquent augue scelerisque. parturient torquent torquent augue scelerisque.'
          }
        </div>
      </div>
      <div className="relative w-full min-h-[200px] max-h-[600px] overflow-hidden rounded-xl">
        <ParallaxImage src={PrecisionDrop} alt="Precision Drop" speed={14} />
        <div className="absolute flex top-1/2 left-1/2 -translate-x-1/2 bg-black/20 h-full justify-center items-center -translate-y-1/2 text-customWhite text-header2 font-semibold w-full">
          Drone delivery
        </div>
      </div>
    </div>
  )
}

export default Frame2
