import { ComplaintForm } from "@/components/complaint-form";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Icons } from "@/components/icons";

export default function SubmitComplaintPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
             <div className="bg-primary/10 text-primary p-3 rounded-lg">
                <Icons.addFile className="h-6 w-6" />
             </div>
             <div>
                <CardTitle className="font-headline text-2xl">File a New Complaint</CardTitle>
                <CardDescription>
                    Please provide as much detail as possible. Fields marked with * are required.
                </CardDescription>
             </div>
          </div>
        </CardHeader>
        <CardContent>
            <ComplaintForm />
        </CardContent>
      </Card>
    </div>
  );
}
