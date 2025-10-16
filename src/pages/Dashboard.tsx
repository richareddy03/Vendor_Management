import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, UserPlus, RefreshCw, UserMinus, CheckCircle, Clock, AlertCircle } from "lucide-react";

const stats = [
  {
    title: "Pending Approvals",
    value: "12",
    icon: Clock,
    description: "Rate cards awaiting review",
    color: "text-warning",
  },
  {
    title: "Active Onboarding",
    value: "8",
    icon: UserPlus,
    description: "Onboarding in progress",
    color: "text-primary",
  },
  {
    title: "Replacements",
    value: "5",
    icon: RefreshCw,
    description: "Replacement requests",
    color: "text-accent-foreground",
  },
  {
    title: "Completed",
    value: "45",
    icon: CheckCircle,
    description: "This month",
    color: "text-success",
  },
];

const recentRequests = [
  {
    id: "REQ-2025-001",
    type: "Onboarding",
    vendor: "TechSolutions Inc.",
    status: "Pending Approval",
    date: "2025-01-15",
  },
  {
    id: "REQ-2025-002",
    type: "Replacement",
    vendor: "DevPro Services",
    status: "In Progress",
    date: "2025-01-14",
  },
  {
    id: "REQ-2025-003",
    type: "Rate Card Review",
    vendor: "CloudExperts Ltd.",
    status: "Approved",
    date: "2025-01-13",
  },
  {
    id: "REQ-2025-004",
    type: "Offboarding",
    vendor: "DataVendor Co.",
    status: "Completed",
    date: "2025-01-12",
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back! Here's your overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="shadow-material-md hover:shadow-material-lg transition-smooth">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Requests Table */}
      <Card className="shadow-material-md">
        <CardHeader>
          <CardTitle>Recent Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Request ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Type</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Vendor</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentRequests.map((request) => (
                  <tr key={request.id} className="border-b border-border hover:bg-accent/50 transition-base">
                    <td className="py-3 px-4 text-sm font-medium text-foreground">{request.id}</td>
                    <td className="py-3 px-4 text-sm text-foreground">{request.type}</td>
                    <td className="py-3 px-4 text-sm text-foreground">{request.vendor}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          request.status === "Approved"
                            ? "bg-success/10 text-success"
                            : request.status === "Completed"
                            ? "bg-success/10 text-success"
                            : request.status === "In Progress"
                            ? "bg-primary/10 text-primary"
                            : "bg-warning/10 text-warning"
                        }`}
                      >
                        {request.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{request.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
