import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, TrendingDown, DollarSign, Clock } from "lucide-react";

const monthlyData = [
  { month: "Jan", plannedHours: 1600, actualHours: 1550, plannedCost: 120000, actualCost: 115000 },
  { month: "Feb", plannedHours: 1600, actualHours: 1620, plannedCost: 120000, actualCost: 122000 },
  { month: "Mar", plannedHours: 1600, actualHours: 1580, plannedCost: 120000, actualCost: 118000 },
  { month: "Apr", plannedHours: 1600, actualHours: 1600, plannedCost: 120000, actualCost: 120000 },
];

const budgetData = [
  { name: "Spent", value: 450000, color: "hsl(var(--primary))" },
  { name: "Remaining", value: 350000, color: "green" },
];

const pipelineData = {
  onboarding: { pending: 8, approved: 5, inProgress: 12, completed: 25 },
  offboarding: { pending: 3, approved: 2, inProgress: 5, completed: 18 },
};

export default function BusinessDashboard() {
  const [filters, setFilters] = useState({
    project: "all",
    lead: "all",
    workstream: "all",
    manager: "all",
    month: "all",
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Business Desk Dashboard</h1>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="space-y-2">
              <Label>Project Grouping</Label>
              <Select value={filters.project} onValueChange={(val) => setFilters({ ...filters, project: val })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">All Projects</SelectItem>
                  <SelectItem value="project-a">Project Alpha</SelectItem>
                  <SelectItem value="project-b">Project Beta</SelectItem>
                  <SelectItem value="project-c">Project Gamma</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Lead</Label>
              <Select value={filters.lead} onValueChange={(val) => setFilters({ ...filters, lead: val })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">All Leads</SelectItem>
                  <SelectItem value="lead-1">John Smith</SelectItem>
                  <SelectItem value="lead-2">Sarah Johnson</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>FY26 Workstream</Label>
              <Select value={filters.workstream} onValueChange={(val) => setFilters({ ...filters, workstream: val })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">All Workstreams</SelectItem>
                  <SelectItem value="ws-1">Digital Transformation</SelectItem>
                  <SelectItem value="ws-2">Cloud Migration</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>FTE Reporting Manager</Label>
              <Select value={filters.manager} onValueChange={(val) => setFilters({ ...filters, manager: val })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">All Managers</SelectItem>
                  <SelectItem value="mgr-1">Michael Brown</SelectItem>
                  <SelectItem value="mgr-2">Lisa Davis</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Month</Label>
              <Select value={filters.month} onValueChange={(val) => setFilters({ ...filters, month: val })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">All Months</SelectItem>
                  <SelectItem value="jan">January</SelectItem>
                  <SelectItem value="feb">February</SelectItem>
                  <SelectItem value="mar">March</SelectItem>
                  <SelectItem value="apr">April</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Budget Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$800,000</div>
            <p className="text-xs text-muted-foreground mt-1">FY 2025-26</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Spent Budget</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$450,000</div>
            <p className="text-xs text-muted-foreground mt-1">56.25% utilized</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Variance</CardTitle>
            <TrendingDown className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">-$5,000</div>
            <p className="text-xs text-muted-foreground mt-1">Over budget this month</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Planned vs Actual Hours/Costs */}
        <Card>
          <CardHeader>
            <CardTitle>Planned vs Actual Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="plannedHours" fill="hsl(var(--primary))" name="Planned Hours" />
                <Bar dataKey="actualHours" fill="orange" name="Actual Hours" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Budget Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Budget Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={budgetData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: $${value.toLocaleString()}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {budgetData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Pipeline Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Onboarding Pipeline */}
        <Card>
          <CardHeader>
            <CardTitle>Onboarding Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">{pipelineData.onboarding.pending}</div>
                <div className="text-xs text-muted-foreground mt-1">Pending</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">{pipelineData.onboarding.approved}</div>
                <div className="text-xs text-muted-foreground mt-1">Approved</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">{pipelineData.onboarding.inProgress}</div>
                <div className="text-xs text-muted-foreground mt-1">In Progress</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">{pipelineData.onboarding.completed}</div>
                <div className="text-xs text-muted-foreground mt-1">Completed</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Offboarding Pipeline */}
        <Card>
          <CardHeader>
            <CardTitle>Offboarding Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">{pipelineData.offboarding.pending}</div>
                <div className="text-xs text-muted-foreground mt-1">Pending</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">{pipelineData.offboarding.approved}</div>
                <div className="text-xs text-muted-foreground mt-1">Approved</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">{pipelineData.offboarding.inProgress}</div>
                <div className="text-xs text-muted-foreground mt-1">In Progress</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">{pipelineData.offboarding.completed}</div>
                <div className="text-xs text-muted-foreground mt-1">Completed</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
