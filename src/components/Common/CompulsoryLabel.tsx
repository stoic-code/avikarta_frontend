import { Label } from '../ui/label'
import React, { FC, ReactNode } from 'react'

type TCompulsoryLabel = {
  children: ReactNode
}
const CompulsoryLabel: FC<TCompulsoryLabel> = ({ children }) => {
  return (
    <Label>
      {children} <span className="text-red-500">*</span>
    </Label>
  )
}

export default CompulsoryLabel
