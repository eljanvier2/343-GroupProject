import React from 'react'
import Frame1 from './Frame1/frame1'
import Frame2 from './Frame2/frame2'
import Frame3 from './Frame3/frame3'
import Frame4 from './Frame4/frame4'
import CostCalculator from './CostCalculator/costCalculator'

const IndexComponent = (): JSX.Element => {
  return (
    <div className="flex flex-col justify-center uppercase space-y-40">
      <Frame1 />
      <Frame2 />
      <Frame3 />
      <Frame4 />
      <CostCalculator />
    </div>
  )
}

export default IndexComponent
