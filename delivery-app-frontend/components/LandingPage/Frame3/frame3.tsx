import React from 'react'
import { pros } from './config'
import ProsBox from './ProsBox'

const Frame3 = (): JSX.Element => {
  return (
    <div className="flex flex-col items-center space-y-20">
      <div className="text-center w-1/2">
        <div className="text-header2 font-semibold">Why</div>
        <div className="">
          {
            'Lorem ipsum odor amet, consectetuer adipiscing elit. Eu amet dui eros volutpat rhoncus. Quam accumsan euismod aliquam congue facilisi praesent commodo. Efficitur himenaeos habitasse tempus elit auctor sapien.'
          }
        </div>
      </div>
      <div className="flex bg-customGreen rounded-2xl justify-center space-x-16 px-20 py-10">
        {pros.map((pro, index) => {
          return <ProsBox pro={pro} key={index} />
        })}
      </div>
    </div>
  )
}

export default Frame3
