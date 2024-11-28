'use client'
import React from "react"
import { ServerCog } from 'lucide-react'

export default function ServerStatusIcon(status) {
    const statusClass = status.params
    
  return (
    <div>
      <ServerCog className={statusClass} />
    </div>
  )
};
