import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Icons.logo className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold font-headline text-primary">
            CityConnect
          </h1>
        </div>
        <Button asChild variant="ghost">
          <Link href="/citizen/dashboard">Login</Link>
        </Button>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Report Issues. Get Results.
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    CityConnect is your direct line to city services. Submit and
                    track complaints effortlessly, and help us build a better
                    community together.
                  </p>
                </div>
                <Button asChild size="lg">
                  <Link href="/citizen/submit">
                    <span>
                      File a New Complaint
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </span>
                  </Link>
                </Button>
              </div>
              <div
                className="w-full max-w-md mx-auto"
                data-ai-hint="city skyline"
              >
                <img
                  src="https://placehold.co/600x600.png"
                  alt="Hero"
                  className="mx-auto aspect-square overflow-hidden rounded-xl object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="roles" className="w-full py-12 md:py-24 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl">
                  Access for Everyone
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Tailored dashboards for citizens, department officers, and
                  administrators to ensure efficiency and transparency.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
              <RoleCard
                href="/citizen/dashboard"
                icon={<Icons.user className="h-8 w-8" />}
                title="Citizen Portal"
                description="Submit new complaints, track the status of your existing reports, and view your history."
              />
              <RoleCard
                href="/department/dashboard"
                icon={<Icons.building className="h-8 w-8" />}
                title="Department Login"
                description="View assigned complaints, update their status, and monitor departmental performance."
              />
              <RoleCard
                href="/admin/dashboard"
                icon={<Icons.shield className="h-8 w-8" />}
                title="Admin Dashboard"
                description="Oversee all operations, manage users and departments, and view system-wide analytics."
              />
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-primary text-primary-foreground py-6">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <p>&copy; {new Date().getFullYear()} CityConnect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function RoleCard({
  href,
  icon,
  title,
  description,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Link href={href} className="group">
      <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <CardHeader className="flex flex-row items-center gap-4">
          <div className="bg-primary/10 text-primary p-3 rounded-full">
            {icon}
          </div>
          <CardTitle className="font-headline">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
