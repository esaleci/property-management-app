"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  {
    name: "Jan",
    total: 18000,
  },
  {
    name: "Feb",
    total: 19500,
  },
  {
    name: "Mar",
    total: 20000,
  },
  {
    name: "Apr",
    total: 21000,
  },
  {
    name: "May",
    total: 22500,
  },
  {
    name: "Jun",
    total: 24000,
  },
  {
    name: "Jul",
    total: 24500,
  },
  {
    name: "Aug",
    total: 24500,
  },
  {
    name: "Sep",
    total: 24000,
  },
  {
    name: "Oct",
    total: 23500,
  },
  {
    name: "Nov",
    total: 24000,
  },
  {
    name: "Dec",
    total: 24500,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} labelFormatter={(label) => `Month: ${label}`} />
        <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
