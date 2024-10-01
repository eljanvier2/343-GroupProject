import React from 'react'
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectValue
} from '@/components/ui/select'

interface SelectWithTitleProps {
  title: string
  options: string[]
  placeholder: string
  onChange: (value: string) => void
}

const SelectWithTitle = ({
  title,
  options,
  placeholder,
  onChange
}: SelectWithTitleProps): JSX.Element => {
  return (
    <div className="space-y-1.5">
      <div className="font-medium">{title}</div>
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option, index) => {
            return (
              <SelectItem
                key={index}
                value={option}
                onSelect={() => { onChange(option) }}>
                {option}
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>
    </div>
  )
}

export default SelectWithTitle
