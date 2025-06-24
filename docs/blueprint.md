# **App Name**: CityConnect

## Core Features:

- Citizen Authentication: Register and log in using anonymous access, phone OTP, or email with role-based access for Citizen, Department Officer, and Admin.
- Complaint Submission: Submit complaints with Title, Description, Location (GPS or manual), Optional Photo, and Urgency Level (Normal, Urgent, Critical). AI auto-classifies and assigns the complaint to the appropriate department using a tool.
- Complaint Status Tracking: Citizens can view real-time complaint status (Pending, In Progress, Resolved) and track complaint history and updates with timestamps.
- Department Access Panel: Officers can log in and view department-specific complaints, filter by status, urgency, and location, update status with internal notes, and view departmental KPIs (response rate, pending volume).
- AI-Powered Complaint Routing: Integrates Gemini or Genkit as a tool to analyze the description, tag keywords, and categorize by department, including a learning feedback loop from complaint resolution history for smarter routing.
- Notifications & Alerts: Citizens receive SMS / Email / App push notifications on status changes. Departments get alerts for new complaints. Admin gets escalation alerts.
- Admin Control Panel: Manage users, departments, and permissions; oversee unresolved/overdue complaints; train the AI routing engine with labeled data; and download reports and analytics.
- Analytics & Insights: Real-time visual dashboards for complaint trends, department-wise performance, and citizen engagement heatmaps, exportable in CSV/PDF.
- Offline Mode: Store complaints offline and auto-sync once the internet resumes.

## Style Guidelines:

- Primary: #3F51B5 for a trustworthy, official (Dark Blue) feel.
- Accent: #009688 for a modern, vibrant (Teal) touch.
- Background: #F0F2F5 for a clean, neutral (Light Gray) look.
- Success: #28A745 for Resolved / Approved states.
- Error: #DC3545 for Failed / Validation errors.
- Warning: #FFC107 for attention, critical updates.
- Text: #2F2F2F for high contrast readability (Slate Black).
- Font: ‘PT Sans’ (sans-serif) with Headings in Bold and Body in Regular.
- Use consistent hierarchy (H1-H4, body, caption).
- Use clear, minimalist icons for Departments (e.g., water, roads, electricity), Complaint statuses, and Navigation & alerts (e.g., Bell, Exclamation, Checkmark).
- Clean, intuitive navigation with sticky header and tabbed navigation. Mobile-first responsive design. Visual progress bar for complaint flow.
- Subtle transitions for Button hover & press, Form submissions, and Complaint card status changes.
- Optional theme switcher for night workers / accessibility; inverts background/text while preserving brand colors.