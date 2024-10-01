import React from 'react'
import { stats } from './config'
import StatsBox from './StatsBox'

const Frame4 = (): JSX.Element => {
  return (
    <div className="flex flex-col items-center space-y-20 px-10">
      <div className="flex justify-between items-center">
        <div className="text-header2 font-semibold w-1/4">
          {"Still don't get it?"}
        </div>
        <div className="text-end w-1/3">
          {
            'Lorem ipsum odor amet, consectetuer adipiscing elit. Lacinia maximus imperdiet augue dolor tempus. Arcu pulvinar condimentum mattis auctor primis mus; platea vestibulum montes. Aliquet sit aliquet ridiculus parturient luctus commodo suspendisse facilisi sed.'
          }
        </div>
      </div>
      <div className="flex w-full justify-between self-stretch">
        {stats.map((stat, index) => {
          return <StatsBox stat={stat} key={index} />
        })}
      </div>
      <div className="self-end text-black/50 normal-case font-light">
        *ScienceDirect
      </div>
    </div>
  )
}

export default Frame4
