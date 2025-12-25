"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"

const data = [
  { month: "Jan", open: 5, inProgress: 3, completed: 8 },
  { month: "Feb", open: 7, inProgress: 4, completed: 6 },
  { month: "Mar", open: 4, inProgress: 2, completed: 9 },
  { month: "Apr", open: 6, inProgress: 5, completed: 7 },
  { month: "May", open: 8, inProgress: 3, completed: 10 },
  { month: "Jun", open: 3, inProgress: 6, completed: 8 },
  { month: "Jul", open: 5, inProgress: 4, completed: 9 },
  { month: "Aug", open: 7, inProgress: 2, completed: 11 },
  { month: "Sep", open: 4, inProgress: 5, completed: 8 },
  { month: "Oct", open: 6, inProgress: 3, completed: 7 },
  { month: "Nov", open: 8, inProgress: 4, completed: 9 },
  { month: "Dec", open: 5, inProgress: 6, completed: 10 },
]

export function MaintenanceChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip />
        <Legend />
        <Bar dataKey="open" fill="#ff6b6b" name="Open" />
        <Bar dataKey="inProgress" fill="#ffd93d" name="In Progress" />
        <Bar dataKey="completed" fill="#6bcf7f" name="Completed" />
      </BarChart>
    </ResponsiveContainer>
  )
}
