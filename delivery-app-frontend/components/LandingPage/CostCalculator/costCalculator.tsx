import InputWithTitle from "@/components/Global/InputWithTitle";
import RoundButton from "@/components/Global/RoundButton";
import SelectWithTitle from "@/components/Global/SelectWithTitle";
import SwitchWithTitle from "@/components/Global/SwitchWithTitle";
import { useState } from "react";
import React from "react";

interface CostCalculatorProps {}

const CostCalculator = ({}: CostCalculatorProps): JSX.Element => {
  const [switch1Checked, setSwitch1Checked] = useState(true);
  const [switch2Checked, setSwitch2Checked] = useState(false);
  return (
    <div className="flex flex-col rounded-3xl space-y-8 p-20 bg-white shadow-md">
      <div className="text-header3 text-center font-semibold">
        Cost Calculator
      </div>
      <div className="flex space-x-40">
        <div className="flex flex-col w-1/2 space-y-8">
          <SelectWithTitle
            title="Type of Goods"
            options={["Food", "Clothes", "Electronics"]}
            placeholder="Type"
            onChange={() => {}}
          />
          <InputWithTitle
            title="Delivered From"
            placeholder="Address"
            onChange={() => {}}
          />
          <div className="space-y-1.5">
            <div className="font-medium">Special Instructions</div>
            <div className="flex space-x-10">
              <SwitchWithTitle
                title="Week-end Delivery"
                onChange={(value: boolean) => {
                  setSwitch1Checked(value);
                }}
                checked={switch1Checked}
              />
              <SwitchWithTitle
                title="Night-time Delivery"
                onChange={(value: boolean) => {
                  setSwitch2Checked(value);
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
            onChange={() => {}}
            type="number"
          />
          <InputWithTitle
            title="Delivered To"
            placeholder="Address"
            onChange={() => {}}
          />
        </div>
      </div>
      <div className="self-center">
        <RoundButton text="Estimate" onClick={() => {}} />
      </div>
    </div>
  );
};

export default CostCalculator;
