# HealthPass – Health Admin Dashboard

## 1. Overview

**HealthPass** is a health-related admin dashboard inspired by [shadcn-admin](https://shadcn-admin.netlify.app/), built with Next.js 16, shadcn/ui v4, Tailwind CSS v4, and React 19.

The brand emphasizes trust and care through a clean design with **red and white** as primary colors.

---

## 2. Brand Guidelines

### Color Palette

| Role | Color | Hex Code |
|------|-------|----------|
| Primary | Red | `#DC2626` (red-600) |
| Primary Hover | Dark Red | `#B91C1C` (red-700) |
| Secondary | White | `#FFFFFF` |
| Background | Off-White | `#FAFAFA` |
| Surface | White | `#FFFFFF` |
| Text Primary | Dark Gray | `#18181B` (zinc-900) |
| Text Secondary | Gray | `#71717A` (zinc-500) |
| Border | Light Gray | `#E4E4E7` (zinc-200) |
| Success | Green | `#16A34A` (green-600) |
| Warning | Amber | `#D97706` (amber-600) |
| Danger | Red | `#DC2626` (red-600) |

### Typography
- Font Family: Geist Sans (via next/font)
- Headings: Bold, tracking-tight
- Body: Regular weight, relaxed leading

---

## 3. Design System

### Design Tokens (globals.css)

```css
:root {
  --background: 0 0% 98%;
  --foreground: 240 10% 3.9%;
  --primary: 0 84.2% 60.2%; /* Red-600 */
  --primary-foreground: 0 0% 98%;
  --secondary: 0 0% 98%;
  --secondary-foreground: 240 5.9% 10%;
  --muted: 240 4.8% 95.9%;
  --muted-foreground: 240 3.8% 46.1%;
  --accent: 240 4.8% 95.9%;
  --accent-foreground: 240 5.9% 10%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 0 0% 98%;
  --border: 240 5.9% 90%;
  --input: 240 5.9% 90%;
  --ring: 0 84.2% 60.2%;
  --radius: 0.5rem;
}
```

### Component Patterns

Follow shadcn/ui "New York" style with `data-slot` attributes:

```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-red-600 text-white hover:bg-red-700",
        outline: "border border-input bg-white hover:bg-accent",
        secondary: "bg-zinc-100 text-zinc-900 hover:bg-zinc-200",
        ghost: "hover:bg-accent",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

function Button({ className, variant, ...props }: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>) {
  return (
    <button
      data-slot="button"
      className={cn(buttonVariants({ variant, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
```

---

## 4. Pages & Features

### Dashboard (Home)
- Stat cards with icons (patients today, appointments, pending tasks, revenue)
- Area/Line chart for patient visits (7-day trend)
- Donut chart for appointment status distribution
- Recent appointments table
- Quick actions sidebar

### Patients
- Patient list with search, filter, and pagination
- Add/Edit patient form (Dialog)
- View patient details (Sheet)
- Tabs: personal info, medical history, appointments

### Appointments
- Calendar view (month/week/day)
- List view with filters
- Create/Edit appointment
- Status management: scheduled, completed, cancelled, no-show

### Doctors / Staff
- Staff directory with roles
- Doctor availability management
- Department assignment
- Card-based doctor profiles with Avatar

### Medical Records
- Record categories: diagnoses, prescriptions, lab results, imaging
- Document upload (drag & drop)
- Access history log

### Analytics / Reports
- Patient demographics chart
- Appointment trends
- Revenue metrics
- Date range selector
- Export reports (PDF, CSV)

### Settings
- Profile settings
- Clinic/hospital information
- Notification preferences
- User management
- Appearance (light/dark mode)

---

## 5. Layout Structure

### Sidebar Navigation
```
+-----------------------------------------+
|  [Logo]  HealthPass                     |
+-----------------------------------------+
|  Dashboard                              |
|  Patients                               |
|  Appointments                           |
|  Doctors                                |
|  Medical Records                        |
|  Analytics                             |
|  --------------------                    |
|  Settings                               |
+-----------------------------------------+
```

### Header
- Global search (Command palette - Cmd+K)
- Notifications bell
- User avatar with Dropdown Menu
- Dark/light mode toggle

### Main Content
- Breadcrumb
- Page title
- Action buttons
- Content (tables, cards, forms)

---

## 6. Component Inventory

### Navigation
- Sidebar (collapsible, responsive)
- NavigationMenu
- Breadcrumb
- Tabs

### Data Display
- Card
- Table (sorting, filtering, pagination)
- Badge
- Avatar
- Progress
- Skeleton

### Forms
- Input, Textarea
- Select, Checkbox, Radio Group
- Switch, DatePicker
- File Upload
- Form with Zod validation

### Feedback
- Dialog, Sheet
- Toast, Alert, AlertDialog
- Tooltip, Popover

### Layout
- Separator, ScrollArea

---

## 7. Responsive Breakpoints

| Breakpoint | Width | Behavior |
|------------|-------|----------|
| Mobile | < 640px | Collapsed sidebar |
| Tablet | 640-1024px | Collapsible sidebar |
| Desktop | > 1024px | Full sidebar |

---

## 8. Technical Stack

- **Framework:** Next.js 16 (App Router)
- **UI Library:** shadcn/ui v4 (New York style)
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Forms:** React Hook Form + Zod
- **Charts:** Recharts or Tremor
- **HTTP Client:** Axios
- **TypeScript:** Strict mode

### shadcn/ui Components to Install
```bash
npx shadcn@latest add button card table badge avatar input textarea select checkbox
npx shadcn@latest add dialog sheet popover tooltip alert alert-dialog
npx shadcn@latest add navigation-menu tabs breadcrumb command separator scroll-area
npx shadcn@latest add form date-picker calendar dropdown-menu switch
npx shadcn@latest add skeleton progress
```

---

## 9. Operational Features

### OUC01: Operational Admin Login
- Secure login with role-based access

### OUC02: Monitor Daily Operations Dashboard
- Total appointments, pending bookings, bill queue, diagnostics bookings, wallet credits

### OUC03: Review Pending Appointments
- View appointments, check hospital status, escalate issues

### OUC04: Resolve Booking Conflicts
- Detect conflicts, reschedule, notify users

### OUC05: Monitor Bill Upload Queue
- View bills, validate OCR, flag suspicious

### OUC06: Escalate Suspicious Bills
- Detect fraud, flag account, escalate

### OUC07: Manage Wallet Credit Distribution
- Track credits, check limits, pause if needed

### OUC08: Monitor Hospital Performance
- Cancellation rate, completion rate, waiting time

### OUC09: Monitor Diagnostic Center Performance
- Turnaround time, success rate, complaints

### OUC10: Handle User Support Tickets
- Review tickets, assign issues

### OUC11: Resolve Chat Escalations
- Detect SLA breach, resolve chats

### OUC12: Monitor Referral Fraud
- Detect fake referrals, block rewards

### OUC13: Adjust Free Visit Counters
- Modify visits, log actions

### OUC14: Manage Appointment No-Show Cases
- Identify users, apply penalties

### OUC15: Verify Insurance Policy Linking Issues
- Check logs, fix mapping

### OUC16: Manage Credit Budget Utilization
- Monitor usage, adjust credits

### OUC17: Generate Daily Operations Reports
- Bookings, diagnostics, wallet usage

### OUC18: Send Operational Notifications
- Alerts, updates

### OUC19: Handle Emergency Hospital Deactivation
- Disable hospital, reschedule

### OUC20: Escalate Critical System Incidents
- Detect outage, notify team

---

## 10. Non-Functional Requirements

### Performance
- Fast dashboard loading, real-time updates

### Security
- RBAC, Encryption, Audit logs

### Scalability
- Handle large data volumes

### Reliability
- High uptime

---

## 11. Future Enhancements
- AI fraud detection
- Predictive analytics
- Automation
- Telemedicine integration
- Mobile app (React Native)
