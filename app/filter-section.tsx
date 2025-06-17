"use client"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { useState } from 'react'

interface FilterSectionProps {
  title: string
  options?: string[]
  selected?: string[]
  type?: 'checkbox' | 'range'
  min?: number
  max?: number
  values?: number[]
  onChange: (value: any) => void
}

const FilterSection = ({
  title,
  options = [],
  selected = [],
  type = 'checkbox',
  min = 0,
  max = 1000,
  values = [0, 1000],
  onChange,
}: FilterSectionProps) => {
  // Range uchun lokal holat
  const [range, setRange] = useState(values)

  if (type === 'range') {
    return (
      <div className="space-y-4">
        <h3 className="font-semibold">{title}</h3>
        <Slider
          min={min}
          max={max}
          value={range}
          onValueChange={setRange}
          onValueCommit={onChange}
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>${range[0]}</span>
          <span>${range[1]}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <h3 className="font-semibold">{title}</h3>
      <div className="space-y-2">
        {options.map((option) => (
          <div key={option} className="flex items-center gap-2">
            <Checkbox
              id={option}
              checked={selected.includes(option)}
              onCheckedChange={(checked) => {
                const newSelection = checked
                  ? [...selected, option]
                  : selected.filter(item => item !== option)
                onChange(newSelection)
              }}
            />
            <label htmlFor={option} className="text-sm">
              {option}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FilterSection