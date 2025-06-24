import {
  User,
  Building,
  Shield,
  FilePlus,
  LayoutDashboard,
  Bell,
  CheckCircle,
  XCircle,
  Loader2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  UserCog,
  BarChart3,
  ListTodo,
  FileText,
  MapPin,
  Camera,
  Layers,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';

export type Icon = LucideIcon;

export const Icons = {
  user: User,
  building: Building,
  shield: Shield,
  addFile: FilePlus,
  dashboard: LayoutDashboard,
  notification: Bell,
  check: CheckCircle,
  close: XCircle,
  spinner: Loader2,
  warning: AlertTriangle,
  idea: Lightbulb,
  arrowRight: ArrowRight,
  userCog: UserCog,
  analytics: BarChart3,
  complaints: ListTodo,
  reports: FileText,
  location: MapPin,
  camera: Camera,
  department: Layers,
  ai: Sparkles,
  logo: (props: React.ComponentProps<"svg">) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22V12" />
      <path d="M12 12H2a4 4 0 0 0-2-2V8a4 4 0 0 1 4-4h4" />
      <path d="M12 12H22a4 4 0 0 1 2 2v2a4 4 0 0 1-4 4h-4" />
      <path d="M12 12V2a4 4 0 0 1 2-2h2a4 4 0 0 1 4 4v4" />
    </svg>
  ),
};
