import InputWithTitle from '@/components/Global/InputWithTitle'
import RoundButton from '@/components/Global/RoundButton'
import SelectWithTitle from '@/components/Global/SelectWithTitle'
import SliderWithTitle from '@/components/Global/SliderWithTitle'
import SwitchWithTitle from '@/components/Global/SwitchWithTitle'
import React, { useState } from 'react'

interface Estimate {
  type: string
  weight: number
  distance: number
  weekEnd: boolean
  night: boolean
}

const CostCalculator = (): JSX.Element => {
  const [switch1Checked, setSwitch1Checked] = useState(true)
  const [switch2Checked, setSwitch2Checked] = useState(false)
  const [cost, setCost] = useState(2)
  const [estimate, setEstimate] = useState<Estimate>({
    type: '',
    weight: 0,
    distance: 0,
    weekEnd: false,
    night: false
  })

  const EstimateCost = (estimate: Estimate): number => {
    let cost = 2
    if (estimate.distance > 2) {
      cost += 0.5 * estimate.distance
    }
    if (estimate.weight > 2) {
      cost += estimate.weight * 0.75
    }
    if (estimate.weekEnd) cost++
    if (estimate.night) cost++
    return cost
  }
  console.log(estimate, cost)
  return (
    <div className="flex flex-col rounded-3xl space-y-8 p-20 bg-white shadow-md">
      <div className="text-header3 text-center font-semibold">
        Cost Calculator
      </div>
      <div className="flex space-x-40">
        <div className="flex flex-col w-1/2 space-y-8">
          <SelectWithTitle
            title="Type of Goods"
            options={['Food', 'Clothes', 'Electronics']}
            placeholder="Type"
            onChange={(value: string) => {
              setEstimate((prev) => ({ ...prev, type: value }))
            }}
          />
          <SliderWithTitle
            title="Distance"
            onChange={(value: number) => {
              setEstimate((prev) => ({ ...prev, distance: value }))
            }}
            defaultValue={0}
            max={10}
            step={0.5}
          />
          {/* <InputWithTitle
            title="Delivered From"
            placeholder="Address"
            onChange={() => {}}
          /> */}
          <div className="space-y-1.5">
            <div className="font-medium">Special Instructions</div>
            <div className="flex space-x-10">
              <SwitchWithTitle
                title="Week-end Delivery"
                onChange={(value: boolean) => {
                  setSwitch1Checked(value)
                  setEstimate((prev) => ({ ...prev, weekEnd: value }))
                }}
                checked={switch1Checked}
              />
              <SwitchWithTitle
                title="Night-time Delivery"
                onChange={(value: boolean) => {
                  setSwitch2Checked(value)
                  setEstimate((prev) => ({ ...prev, night: value }))
                }}
                checked={switch2Checked}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col w-1/2 space-y-8">
          <InputWithTitle
            title="Package weight (kg)"
            placeholder="Weight"
            onChange={(value) => {
              setEstimate((prev) => ({ ...prev, weight: Number(value) }))
            }}
            type="number"
          />
          {/* <InputWithTitle
            title="Delivered To"
            placeholder="Address"
            onChange={() => {}}
          /> */}
        </div>
      </div>
      <div className="self-center">
        <RoundButton
          text="Estimate"
          onClick={() => {
            setCost(EstimateCost(estimate))
          }}
        />
      </div>
    </div>
  )
}

export default CostCalculator
