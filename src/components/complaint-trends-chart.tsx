
"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  { name: "Jan", total: Math.floor(Math.random() * 500) + 100 },
  { name: "Feb", total: Math.floor(Math.random() * 500) + 100 },
  { name: "Mar", total: Math.floor(Math.random() * 500) + 100 },
  { name: "Apr", total: Math.floor(Math.random() * 500) + 100 },
  { name: "May", total: Math.floor(Math.random() * 500) + 100 },
  { name: "Jun", total: Math.floor(Math.random() * 500) + 100 },
  { name: "Jul", total: Math.floor(Math.random() * 500) + 100 },
  { name: "Aug", total: Math.floor(Math.random() * 500) + 100 },
  { name: "Sep", total: Math.floor(Math.random() * 500) + 100 },
  { name: "Oct", total: Math.floor(Math.random() * 500) + 100 },
  { name: "Nov", total: Math.floor(Math.random() * 500) + 100 },
  { name: "Dec", total: Math.floor(Math.random() * 500) + 100 },
]

export function ComplaintTrendsChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip
          cursor={{ fill: 'hsl(var(--muted))' }}
          contentStyle={{ 
            backgroundColor: 'hsl(var(--background))',
            borderColor: 'hsl(var(--border))' 
          }}
        />
        <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
