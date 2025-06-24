import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { ComplaintTrendsChart } from "@/components/complaint-trends-chart";

export default function AdminDashboardPage() {
  const kpis = [
    { title: "Total Complaints", value: "1,482", icon: Icons.complaints, change: "+20.1% from last month" },
    { title: "Resolved This Month", value: "327", icon: Icons.check, change: "+15.2% from last month" },
    { title: "Pending Complaints", value: "98", icon: Icons.warning, change: "-5.4% from last month" },
    { title: "Active Users", value: "5,723", icon: Icons.user, change: "+180 since last week" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p className="text-xs text-muted-foreground">{kpi.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Complaint Trends</CardTitle>
          <CardDescription>Monthly complaint volume over the last year.</CardDescription>
        </CardHeader>
        <CardContent>
          <ComplaintTrendsChart />
        </CardContent>
      </Card>
    </div>
  );
}
