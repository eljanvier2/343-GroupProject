import React from 'react'
import { Input } from '@/components/ui/input'

interface InputWithTitleProps {
  title: string
  placeholder: string
  type?: 'text' | 'checkbox' | 'radio' | 'number' | 'email' | 'password' | 'url' | 'tel' | 'date' | 'datetime-local' | 'month' | 'week' | 'time' | 'color' | 'file' | 'image' | 'range' | 'search'
  onChange: (value: string) => void
}

const InputWithTitle = ({
  title,
  placeholder,
  onChange,
  type = 'text'
}: InputWithTitleProps): JSX.Element => {
  return (
    <div className="space-y-1.5">
      <div className="font-medium">{title}</div>
      <Input
        type={type}
        placeholder={placeholder}
        onChange={(e) => { onChange(e.target.value) }}
      />
    </div>
  )
}

export default InputWithTitle
