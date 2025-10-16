import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { DollarSign, TrendingUp, TrendingDown } from "lucide-react";

const monthlyData = [
  { month: "Jan", plannedCost: 120000, actualCost: 115000, plannedHours: 1600, actualHours: 1550 },
  { month: "Feb", plannedCost: 120000, actualCost: 122000, plannedHours: 1600, actualHours: 1620 },
  { month: "Mar", plannedCost: 120000, actualCost: 118000, plannedHours: 1600, actualHours: 1580 },
  { month: "Apr", plannedCost: 120000, actualCost: 120000, plannedHours: 1600, actualHours: 1600 },
  { month: "May", plannedCost: 120000, actualCost: 125000, plannedHours: 1600, actualHours: 1650 },
];

const budgetData = [
  { name: "Spent", value: 600000, color: "hsl(var(--primary))" },
  { name: "Forecast", value: 120000, color: "hsl(var(--accent))" },
  { name: "Remaining", value: 80000, color: "hsl(var(--muted))" },
];

const projectDetails = [
  { project: "Project Alpha", budget: 300000, spent: 180000, forecast: 50000, variance: 70000 },
  { project: "Project Beta", budget: 250000, spent: 200000, forecast: 40000, variance: 10000 },
  { project: "Project Gamma", budget: 250000, spent: 220000, forecast: 30000, variance: 0 },
];

export default function BudgetManagement() {
  const [filters, setFilters] = useState({
    project: "all",
    lead: "all",
    workstream: "all",
    month: "all",
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Budget Management</h1>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
              <Label>Workstream</Label>
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
                  <SelectItem value="may">May</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$800,000</div>
            <p className="text-xs text-muted-foreground mt-1">Allocated for FY 2025-26</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$600,000</div>
            <p className="text-xs text-muted-foreground mt-1">75% of budget</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Overall Variance</CardTitle>
            <TrendingDown className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">-$20,000</div>
            <p className="text-xs text-muted-foreground mt-1">Over budget this quarter</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Planned vs Actual Costs */}
        <Card>
          <CardHeader>
            <CardTitle>Planned vs Actual Costs</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="plannedCost" fill="hsl(var(--primary))" name="Planned Cost" />
                <Bar dataKey="actualCost" fill="hsl(var(--accent))" name="Actual Cost" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Budget Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Budget Spent vs Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={budgetData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
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

        {/* Hours Trend */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Planned vs Actual Hours Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="plannedHours" stroke="hsl(var(--primary))" name="Planned Hours" strokeWidth={2} />
                <Line type="monotone" dataKey="actualHours" stroke="hsl(var(--accent))" name="Actual Hours" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Project Details Table */}
      <Card>
        <CardHeader>
          <CardTitle>Project Budget Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead className="text-right">Budget</TableHead>
                <TableHead className="text-right">Spent</TableHead>
                <TableHead className="text-right">Forecast</TableHead>
                <TableHead className="text-right">Variance</TableHead>
                <TableHead className="text-right">Variance %</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projectDetails.map((proj) => (
                <TableRow key={proj.project}>
                  <TableCell className="font-medium">{proj.project}</TableCell>
                  <TableCell className="text-right">${proj.budget.toLocaleString()}</TableCell>
                  <TableCell className="text-right">${proj.spent.toLocaleString()}</TableCell>
                  <TableCell className="text-right">${proj.forecast.toLocaleString()}</TableCell>
                  <TableCell className={`text-right ${proj.variance >= 0 ? 'text-green-600' : 'text-destructive'}`}>
                    ${proj.variance.toLocaleString()}
                  </TableCell>
                  <TableCell className={`text-right ${proj.variance >= 0 ? 'text-green-600' : 'text-destructive'}`}>
                    {((proj.variance / proj.budget) * 100).toFixed(1)}%
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
