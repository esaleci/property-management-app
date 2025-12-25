"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"

const data = [
  { month: "Jan", revenue: 18000, expenses: 5000, profit: 13000 },
  { month: "Feb", revenue: 19500, expenses: 5200, profit: 14300 },
  { month: "Mar", revenue: 20000, expenses: 4800, profit: 15200 },
  { month: "Apr", revenue: 21000, expenses: 5500, profit: 15500 },
  { month: "May", revenue: 22500, expenses: 6000, profit: 16500 },
  { month: "Jun", revenue: 24000, expenses: 5800, profit: 18200 },
  { month: "Jul", revenue: 24500, expenses: 6200, profit: 18300 },
  { month: "Aug", revenue: 24500, expenses: 5900, profit: 18600 },
  { month: "Sep", revenue: 24000, expenses: 5700, profit: 18300 },
  { month: "Oct", revenue: 23500, expenses: 5400, profit: 18100 },
  { month: "Nov", revenue: 24000, expenses: 5600, profit: 18400 },
  { month: "Dec", revenue: 24500, expenses: 5800, profit: 18700 },
]

export function RevenueChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip formatter={(value) => [`$${value}`, ""]} />
        <Legend />
        <Line type="monotone" dataKey="revenue" stroke="#adfa1d" strokeWidth={2} name="Revenue" />
        <Line type="monotone" dataKey="expenses" stroke="#ff6b6b" strokeWidth={2} name="Expenses" />
        <Line type="monotone" dataKey="profit" stroke="#4ecdc4" strokeWidth={2} name="Profit" />
      </LineChart>
    </ResponsiveContainer>
  )
}
