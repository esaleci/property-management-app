"use client"

import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  { month: "Jan", occupancy: 70 },
  { month: "Feb", occupancy: 72 },
  { month: "Mar", occupancy: 75 },
  { month: "Apr", occupancy: 78 },
  { month: "May", occupancy: 80 },
  { month: "Jun", occupancy: 82 },
  { month: "Jul", occupancy: 85 },
  { month: "Aug", occupancy: 83 },
  { month: "Sep", occupancy: 81 },
  { month: "Oct", occupancy: 79 },
  { month: "Nov", occupancy: 77 },
  { month: "Dec", occupancy: 75 },
]

export function OccupancyChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={data}>
        <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip formatter={(value) => [`${value}%`, "Occupancy Rate"]} />
        <Area type="monotone" dataKey="occupancy" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
      </AreaChart>
    </ResponsiveContainer>
  )
}
