import React from 'react'
import { Switch } from '@/components/ui/switch'

interface SwitchWithTitleProps {
  title: string
  onChange: (value: boolean) => void
  checked?: boolean
}

const SwitchWithTitle = ({
  title,
  onChange,
  checked = false
}: SwitchWithTitleProps): JSX.Element => {
  return (
    <div className="flex space-x-2 normal-case font-medium">
      <Switch checked={checked} onCheckedChange={(value) => { onChange(value) }} />
      <div className="">{title}</div>
    </div>
  )
}

export default SwitchWithTitle
