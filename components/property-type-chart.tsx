"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { properties } from "@/lib/data"

const getPropertyTypeData = () => {
  const typeCounts = properties.reduce(
    (acc, property) => {
      acc[property.type] = (acc[property.type] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  return Object.entries(typeCounts).map(([type, count]) => ({
    name: type,
    value: count,
  }))
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export function PropertyTypeChart() {
  const data = getPropertyTypeData()

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [`${value} properties`, "Count"]} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
