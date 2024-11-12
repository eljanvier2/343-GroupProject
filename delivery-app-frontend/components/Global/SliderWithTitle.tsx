import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";

interface SliderWithTitleProps {
  title: string;
  onChange: (value: number) => void;
  defaultValue?: number;
  max?: number;
  step?: number;
}

const SliderWithTitle = ({
  title,
  onChange,
  defaultValue = 50,
  max = 100,
  step = 0.5,
}: SliderWithTitleProps): JSX.Element => {
  const [value, setValue] = useState(defaultValue);
  return (
    <div className="space-y-1.5">
      <div className="font-medium">{title}</div>
      <Slider
        max={max}
        step={step}
        defaultValue={[defaultValue]}
        onValueChange={(value: number[]) => {
          onChange(value[0]);
          setValue(value[0])
        }}
      />
      <div>{value}km</div>
    </div>
  );
};

export default SliderWithTitle;
