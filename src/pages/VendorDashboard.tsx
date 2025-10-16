import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const plannedVsActualData = [
  { month: "Jan", plannedHours: 400, actualHours: 380, plannedCost: 40000, actualCost: 38000 },
  { month: "Feb", plannedHours: 450, actualHours: 470, plannedCost: 45000, actualCost: 47000 },
  { month: "Mar", plannedHours: 500, actualHours: 480, plannedCost: 50000, actualCost: 48000 },
  { month: "Apr", plannedHours: 420, actualHours: 440, plannedCost: 42000, actualCost: 44000 },
  { month: "May", plannedHours: 480, actualHours: 490, plannedCost: 48000, actualCost: 49000 },
  { month: "Jun", plannedHours: 510, actualHours: 500, plannedCost: 51000, actualCost: 50000 },
];

const activeEmployees = [
  { name: "John Doe", vId: "V-1001", project: "Alpha", role: "Senior Developer", startDate: "2024-01-15" },
  { name: "Jane Smith", vId: "V-1002", project: "Beta", role: "UI/UX Designer", startDate: "2024-02-01" },
  { name: "Mike Johnson", vId: "V-1003", project: "Gamma", role: "DevOps Engineer", startDate: "2024-03-10" },
  { name: "Sarah Williams", vId: "V-1004", project: "Alpha", role: "QA Lead", startDate: "2024-01-20" },
];

const upcomingOnboardings = [
  { candidate: "Robert Brown", project: "Delta", role: "Full Stack Developer", startDate: "2025-11-01", status: "Scheduled" },
  { candidate: "Emily Davis", project: "Epsilon", role: "Data Analyst", startDate: "2025-11-15", status: "Pending Interview" },
  { candidate: "David Wilson", project: "Beta", role: "Frontend Developer", startDate: "2025-12-01", status: "Rate Card Approved" },
];

const rateCardSummary = [
  { project: "Alpha", avgRate: "$85/hr", resources: 12, status: "Active" },
  { project: "Beta", avgRate: "$78/hr", resources: 8, status: "Active" },
  { project: "Gamma", avgRate: "$92/hr", resources: 5, status: "Active" },
  { project: "Delta", avgRate: "$80/hr", resources: 3, status: "Pending" },
];

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Vendor Dashboard</h1>
          <p className="text-muted-foreground mt-1">Overview of your vendor operations</p>
        </div>
        <div className="flex gap-3">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Project" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              <SelectItem value="alpha">Alpha</SelectItem>
              <SelectItem value="beta">Beta</SelectItem>
              <SelectItem value="gamma">Gamma</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="current">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Current Month</SelectItem>
              <SelectItem value="last">Last Month</SelectItem>
              <SelectItem value="ytd">Year to Date</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Active Employees</CardDescription>
            <CardTitle className="text-3xl">24</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Across 4 projects</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Avg Lead Time</CardDescription>
            <CardTitle className="text-3xl">12 days</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Request to onboarding</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Pending Requests</CardDescription>
            <CardTitle className="text-3xl">5</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Awaiting response</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>This Month Revenue</CardDescription>
            <CardTitle className="text-3xl">$185K</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground text-green-600">+8.2% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Planned vs Actual Hours</CardTitle>
            <CardDescription>Monthly comparison of planned and actual work hours</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={plannedVsActualData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)"
                  }} 
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="plannedHours" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  name="Planned Hours"
                />
                <Line 
                  type="monotone" 
                  dataKey="actualHours" 
                  stroke="orange" 
                  strokeWidth={2}
                  name="Actual Hours"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Planned vs Actual Costs</CardTitle>
            <CardDescription>Monthly cost comparison in USD</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={plannedVsActualData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)"
                  }} 
                />
                <Legend />
                <Bar dataKey="plannedCost" fill="hsl(var(--primary))" name="Planned Cost" />
                <Bar dataKey="actualCost" fill="orange" name="Actual Cost" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Active Employees</CardTitle>
            <CardDescription>Currently deployed vendor resources</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>V-ID</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Role</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeEmployees.map((emp) => (
                  <TableRow key={emp.vId}>
                    <TableCell className="font-medium">{emp.name}</TableCell>
                    <TableCell>{emp.vId}</TableCell>
                    <TableCell>{emp.project}</TableCell>
                    <TableCell className="text-sm">{emp.role}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Onboardings</CardTitle>
            <CardDescription>Scheduled resource onboardings</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Candidate</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcomingOnboardings.map((onb) => (
                  <TableRow key={onb.candidate}>
                    <TableCell className="font-medium">{onb.candidate}</TableCell>
                    <TableCell>{onb.project}</TableCell>
                    <TableCell>{onb.startDate}</TableCell>
                    <TableCell>
                      <Badge variant={onb.status === "Scheduled" ? "default" : "secondary"}>
                        {onb.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Rate Card Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Rate Card Summary</CardTitle>
          <CardDescription>Overview of rate cards by project</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Average Rate</TableHead>
                <TableHead>Total Resources</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rateCardSummary.map((rc) => (
                <TableRow key={rc.project}>
                  <TableCell className="font-medium">{rc.project}</TableCell>
                  <TableCell>{rc.avgRate}</TableCell>
                  <TableCell>{rc.resources}</TableCell>
                  <TableCell>
                    <Badge variant={rc.status === "Active" ? "default" : "secondary"}>
                      {rc.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
