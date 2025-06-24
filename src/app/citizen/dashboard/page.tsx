import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const mockComplaints = [
  {
    id: "CMP-001",
    title: "Large Pothole on Main Street",
    status: "Resolved",
    department: "Roads",
    date: "2024-07-15",
  },
  {
    id: "CMP-002",
    title: "Streetlight outage near park",
    status: "In Progress",
    department: "Electricity",
    date: "2024-07-22",
  },
  {
    id: "CMP-003",
    title: "Leaking fire hydrant",
    status: "Pending",
    department: "Water",
    date: "2024-07-28",
  },
   {
    id: "CMP-004",
    title: "Overflowing public trash can",
    status: "Pending",
    department: "Waste Management",
    date: "2024-07-29",
  },
];

const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
        case "Resolved":
            return "default"; // Will be green-ish with custom success color
        case "In Progress":
            return "secondary";
        case "Pending":
            return "outline";
        default:
            return "outline";
    }
}

const getStatusColor = (status: string) => {
    switch (status) {
        case "Resolved":
            return "bg-green-500 text-white";
        case "In Progress":
            return "bg-yellow-500 text-black";
        case "Pending":
            return "bg-gray-500 text-white";
        default:
            return "";
    }
}

export default function CitizenDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-headline">My Complaints</h2>
        <p className="text-muted-foreground">Here is a list of your recent complaints and their status.</p>
      </div>
      <Separator />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockComplaints.map((complaint) => (
          <Card key={complaint.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="font-headline">{complaint.title}</CardTitle>
              <CardDescription>ID: {complaint.id}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>Department</span>
                    <span className="font-medium text-foreground">{complaint.department}</span>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Submitted: {complaint.date}</span>
                <Badge variant={getStatusVariant(complaint.status)} className={getStatusColor(complaint.status)}>
                    {complaint.status}
                </Badge>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
