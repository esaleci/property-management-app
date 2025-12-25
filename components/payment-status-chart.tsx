"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { tenants } from "@/lib/data"

const getPaymentStatusData = () => {
  const statusCounts = tenants.reduce(
    (acc, tenant) => {
      acc[tenant.paymentStatus] = (acc[tenant.paymentStatus] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  return Object.entries(statusCounts).map(([status, count]) => ({
    name: status,
    value: count,
  }))
}

const COLORS = ["#00C49F", "#FF8042", "#FFBB28"]

export function PaymentStatusChart() {
  const data = getPaymentStatusData()

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
        <Tooltip formatter={(value) => [`${value} tenants`, "Count"]} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
