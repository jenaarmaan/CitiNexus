import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Icons } from "@/components/icons";

const kpis = [
  { title: "New Complaints", value: "12", icon: Icons.addFile },
  { title: "In Progress", value: "45", icon: Icons.spinner },
  { title: "Overdue", value: "3", icon: Icons.warning },
  { title: "Avg. Response Time", value: "2.1 days", icon: Icons.check },
];

const complaints = [
  { id: "CMP-003", title: "Leaking fire hydrant", urgency: "Critical", status: "Pending", date: "2024-07-28" },
  { id: "CMP-005", title: "Broken water main on 5th Ave", urgency: "Critical", status: "In Progress", date: "2024-07-27" },
  { id: "CMP-008", title: "Low water pressure in downtown area", urgency: "Urgent", status: "Pending", date: "2024-07-26" },
  { id: "CMP-012", title: "Cloudy tap water report", urgency: "Normal", status: "In Progress", date: "2024-07-25" },
  { id: "CMP-015", title: "Water taste complaint", urgency: "Normal", status: "Resolved", date: "2024-07-22" },
];

const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
        case "Critical": return "bg-red-600 text-white";
        case "Urgent": return "bg-orange-500 text-white";
        case "Normal": return "bg-blue-500 text-white";
        default: return "bg-gray-400 text-white";
    }
}


export default function DepartmentDashboardPage() {
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
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Water Department Complaints</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              <TabsTrigger value="resolved">Resolved</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
                <ComplaintTable complaints={complaints} />
            </TabsContent>
             <TabsContent value="pending">
                <ComplaintTable complaints={complaints.filter(c => c.status === 'Pending')} />
            </TabsContent>
            <TabsContent value="in-progress">
                <ComplaintTable complaints={complaints.filter(c => c.status === 'In Progress')} />
            </TabsContent>
             <TabsContent value="resolved">
                <ComplaintTable complaints={complaints.filter(c => c.status === 'Resolved')} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

function ComplaintTable({ complaints }: { complaints: typeof import("./page").complaints }) {
    return (
         <Table>
            <TableHeader>
                <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Urgency</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {complaints.map((c) => (
                <TableRow key={c.id}>
                    <TableCell className="font-medium">{c.id}</TableCell>
                    <TableCell>{c.title}</TableCell>
                    <TableCell>
                        <Badge variant="default" className={getUrgencyColor(c.urgency)}>{c.urgency}</Badge>
                    </TableCell>
                    <TableCell>{c.status}</TableCell>
                    <TableCell>{c.date}</TableCell>
                    <TableCell>
                        <Button variant="outline" size="sm">View Details</Button>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
