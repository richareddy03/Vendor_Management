import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUp, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import VendorChatbot from "./VendorChatbot";
import VendorSubmitRatecard from "./VendorSubmitRatecard";

interface Request {
  id: string;
  project: string;
  techStack: string;
  startDate: string;
  endDate: string;
  resourcesNeeded: number;
  roles: string;
  status: string;
  fteLead: string;
  businessJustification: string;
}

const requestsData: Request[] = [
  {
    id: "REQ-2025-001",
    project: "Alpha",
    techStack: "React, TypeScript, Node.js",
    startDate: "2025-11-15",
    endDate: "2026-05-15",
    resourcesNeeded: 2,
    roles: "Senior Developer, QA Engineer",
    status: "Pending",
    fteLead: "John Smith",
    businessJustification: "New feature development for mobile app",
  },
  {
    id: "REQ-2025-002",
    project: "Beta",
    techStack: "Angular, Java, PostgreSQL",
    startDate: "2025-12-01",
    endDate: "2026-06-01",
    resourcesNeeded: 1,
    roles: "Full Stack Developer",
    status: "Pending",
    fteLead: "Sarah Johnson",
    businessJustification: "API enhancements for scalability",
  },
  {
    id: "REQ-2025-003",
    project: "Gamma",
    techStack: "Python, Django, AWS",
    startDate: "2025-11-20",
    endDate: "2026-08-20",
    resourcesNeeded: 3,
    roles: "DevOps Engineer, Backend Developer, Cloud Architect",
    status: "Responded",
    fteLead: "John Smith",
    businessJustification: "Cloud infrastructure migration",
  },
  {
    id: "REQ-2025-004",
    project: "Delta",
    techStack: "Vue.js, Express, MongoDB",
    startDate: "2025-12-10",
    endDate: "2026-09-10",
    resourcesNeeded: 2,
    roles: "Frontend Developer, UI/UX Designer",
    status: "Pending",
    fteLead: "Sarah Johnson",
    businessJustification: "UI redesign for analytics platform",
  },
];

const plannedVsActualData = [
  { month: "Jan", plannedHours: 400, actualHours: 380, plannedCost: 40000, actualCost: 38000 },
  { month: "Feb", plannedHours: 450, actualHours: 470, plannedCost: 45000, actualCost: 47000 },
  { month: "Mar", plannedHours: 500, actualHours: 480, plannedCost: 50000, actualCost: 48000 },
  { month: "Apr", plannedHours: 420, actualHours: 440, plannedCost: 42000, actualCost: 44000 },
  { month: "May", plannedHours: 480, actualHours: 490, plannedCost: 48000, actualCost: 49000 },
  { month: "Jun", plannedHours: 510, actualHours: 500, plannedCost: 51000, actualCost: 50000 },
  { month: "Jul", plannedHours: 460, actualHours: 450, plannedCost: 46000, actualCost: 45000 },
  { month: "Aug", plannedHours: 470, actualHours: 465, plannedCost: 47000, actualCost: 46500 },
  { month: "Sep", plannedHours: 490, actualHours: 485, plannedCost: 49000, actualCost: 48500 },
  { month: "Oct", plannedHours: 500, actualHours: 490, plannedCost: 50000, actualCost: 49000 },
];

const activeEmployees = [
  { name: "John Doe", vId: "V-1001", project: "Alpha", role: "Senior Developer", startDate: "2024-01-15", fteLead: "John Smith" },
  { name: "Jane Smith", vId: "V-1002", project: "Beta", role: "UI/UX Designer", startDate: "2024-02-01", fteLead: "Sarah Johnson" },
  { name: "Mike Johnson", vId: "V-1003", project: "Gamma", role: "DevOps Engineer", startDate: "2024-03-10", fteLead: "John Smith" },
  { name: "Sarah Williams", vId: "V-1004", project: "Alpha", role: "QA Lead", startDate: "2024-01-20", fteLead: "John Smith" },
  { name: "Robert Brown", vId: "V-1005", project: "Delta", role: "Full Stack Developer", startDate: "2024-04-01", fteLead: "Sarah Johnson" },
  { name: "Emily Davis", vId: "V-1006", project: "Alpha", role: "Data Analyst", startDate: "2024-05-15", fteLead: "John Smith" },
];

const upcomingOnboardings = [
  { candidate: "Robert Brown", project: "Delta", role: "Full Stack Developer", startDate: "2025-11-01", status: "Scheduled" },
  { candidate: "Emily Davis", project: "Epsilon", role: "Data Analyst", startDate: "2025-11-15", status: "Pending Interview" },
  { candidate: "David Wilson", project: "Beta", role: "Frontend Developer", startDate: "2025-12-01", status: "Rate Card Approved" },
];

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function VendorDashboard() {
  const location = useLocation();
  const [filters, setFilters] = useState({
    project: "all",
    lead: "all",
    workstream: "all",
    manager: "all",
    month: "oct",
  });
  const [filteredData, setFilteredData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("Oct");
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showRateCardModal, setShowRateCardModal] = useState(false);
  const [selectedDetailsRequest, setSelectedDetailsRequest] = useState<Request | null>(null);
  const [selectedRateCardRequest, setSelectedRateCardRequest] = useState<{ requestId: string; project: string } | null>(null);
  const activeEmployeesRef = useRef<HTMLDivElement>(null);
  const resourceRequestsRef = useRef<HTMLDivElement>(null);
  const employeesPerPage = 5;
  const totalPages = Math.ceil(activeEmployees.length / employeesPerPage);
  const paginatedEmployees = activeEmployees.slice(
    (currentPage - 1) * employeesPerPage,
    currentPage * employeesPerPage
  );

  const pendingRequests = requestsData.filter((req) => req.status === "Pending");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("scroll") === "true") {
      window.scrollTo({ top: 100, behavior: "smooth" });
    }
  }, [location]);

  useEffect(() => {
    const monthData = plannedVsActualData.filter((d) => d.month.toLowerCase() === "oct");
    setFilteredData(monthData);
  }, []);

  const handleMonthChange = (val) => {
    setFilters({ ...filters, month: val });
    if (val === "all") {
      setFilteredData(plannedVsActualData);
      setSelectedMonth("All Months");
    } else {
      const monthName = val.charAt(0).toUpperCase() + val.slice(1, 3);
      setSelectedMonth(monthName);
      const monthData = plannedVsActualData.filter((d) => d.month.toLowerCase() === val);
      setFilteredData(monthData);
    }
  };

  const handlePendingRequestsClick = () => {
    if (resourceRequestsRef.current) {
      resourceRequestsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleViewDetails = (request: Request) => {
    setSelectedDetailsRequest(request);
    setShowDetailsModal(true);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Vendor Dashboard</h1>
          <p className="text-muted-foreground mt-1">Overview of your vendor operations</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card
          onClick={() => activeEmployeesRef.current?.scrollIntoView({ behavior: "smooth" })}
          className="cursor-pointer hover:bg-muted/50"
        >
          <CardHeader className="pb-2">
            <CardDescription>Active Employees</CardDescription>
            <CardTitle className="text-3xl">{activeEmployees.length}</CardTitle>
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
        <Card
          onClick={handlePendingRequestsClick}
          className="cursor-pointer hover:bg-muted/50"
        >
          <CardHeader className="pb-2">
            <CardDescription>Pending Requests</CardDescription>
            <CardTitle className="text-3xl">{pendingRequests.length}</CardTitle>
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
            <p className="text-xs text-green-600">+8.2% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Project Grouping</label>
              <Select
                value={filters.project}
                onValueChange={(val) => setFilters({ ...filters, project: val })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">All Projects</SelectItem>
                  <SelectItem value="alpha">Project Alpha</SelectItem>
                  <SelectItem value="beta">Project Beta</SelectItem>
                  <SelectItem value="gamma">Project Gamma</SelectItem>
                  <SelectItem value="delta">Project Delta</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Fiscal Year</label>
              <Select
                value={filters.lead}
                onValueChange={(val) => setFilters({ ...filters, lead: val })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">All Years</SelectItem>
                  <SelectItem value="lead-1">John Smith</SelectItem>
                  <SelectItem value="lead-2">Sarah Johnson</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Project Workstream</label>
              <Select
                value={filters.workstream}
                onValueChange={(val) => setFilters({ ...filters, workstream: val })}
              >
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
              <label className="text-sm font-medium">FTE Reporting Manager</label>
              <Select
                value={filters.manager}
                onValueChange={(val) => setFilters({ ...filters, manager: val })}
              >
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
              <label className="text-sm font-medium">Month</label>
              <Select value={filters.month} onValueChange={handleMonthChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover max-h-48 overflow-y-auto scrollbar-thin">
                  <SelectItem value="all">All Months</SelectItem>
                  {monthNames.slice(0, 10).map((m) => (
                    <SelectItem key={m} value={m.toLowerCase()}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Planned vs Actual Hours ({selectedMonth})</CardTitle>
            <CardDescription>Monthly comparison of planned and actual work hours</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Legend />
                <Bar dataKey="plannedHours" fill="hsl(var(--primary))" name="Planned Hours" />
                <Bar dataKey="actualHours" fill="#f59e0b" name="Actual Hours" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Planned vs Actual Costs ({selectedMonth})</CardTitle>
            <CardDescription>Monthly cost comparison in USD</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Legend />
                <Bar dataKey="plannedCost" fill="hsl(var(--primary))" name="Planned Cost" />
                <Bar dataKey="actualCost" fill="#f59e0b" name="Actual Cost" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Employees, Resource Requests, and Onboardings */}
      <div className="space-y-6">
        <Card ref={activeEmployeesRef} className="relative">
          <CardHeader>
            <CardTitle>Active Employees (Page {currentPage} of {totalPages})</CardTitle>
            <CardDescription>Currently deployed vendor resources</CardDescription>
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2"
              onClick={handleScrollToTop}
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <Table className="table-fixed w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">Name</TableHead>
                  <TableHead className="w-[100px]">V-ID</TableHead>
                  <TableHead className="w-[100px]">Project</TableHead>
                  <TableHead className="w-[150px]">Role</TableHead>
                  <TableHead className="w-[100px]">Start Date</TableHead>
                  <TableHead className="w-[100px]">FTE Lead</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedEmployees.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No employees found
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedEmployees.map((emp) => (
                    <TableRow key={emp.vId} className="hover:bg-muted/50">
                      <TableCell className="font-medium min-w-0">
                        <div className="truncate" title={emp.name}>
                          {emp.name}
                        </div>
                      </TableCell>
                      <TableCell>{emp.vId}</TableCell>
                      <TableCell className="min-w-0">
                        <div className="truncate" title={emp.project}>
                          {emp.project}
                        </div>
                      </TableCell>
                      <TableCell className="min-w-0">
                        <div className="truncate" title={emp.role}>
                          {emp.role}
                        </div>
                      </TableCell>
                      <TableCell>{emp.startDate}</TableCell>
                      <TableCell className="min-w-0">
                        <div className="truncate" title={emp.fteLead}>
                          {emp.fteLead}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
            <div className="flex gap-3 justify-end mt-4">
              <Button
                variant="outline"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card ref={resourceRequestsRef} className="w-full max-w-full relative">
          <CardHeader>
            <CardTitle>Resource Requests ({pendingRequests.length})</CardTitle>
            <CardDescription>Click the eye icon to see details or "Respond" to open the resource form</CardDescription>
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2"
              onClick={handleScrollToTop}
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="w-full max-w-full">
            <Table className="table-fixed w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="cursor-pointer hover:text-foreground w-[150px]">Request ID</TableHead>
                  <TableHead className="cursor-pointer hover:text-foreground w-[100px]">Project</TableHead>
                  <TableHead className="cursor-pointer hover:text-foreground max-w-[200px]">Tech Stack</TableHead>
                  <TableHead className="max-w-[200px]">Roles Required</TableHead>
                  <TableHead className="w-[100px]">Status</TableHead>
                  <TableHead className="text-right w-[150px]">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingRequests.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No pending requests found
                    </TableCell>
                  </TableRow>
                ) : (
                  pendingRequests.map((req) => (
                    <TableRow key={req.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{req.id}</TableCell>
                      <TableCell>{req.project}</TableCell>
                      <TableCell className="max-w-[200px] min-w-0">
                        <div className="truncate" title={req.techStack}>
                          {req.techStack}
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[200px] min-w-0">
                        <div className="truncate" title={req.roles}>
                          {req.roles}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={req.status === "Pending" ? "secondary" : "default"}>
                          {req.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewDetails(req)}
                            aria-label={`View details for request ${req.id}`}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => {
                              setSelectedRateCardRequest({ requestId: req.id, project: req.project });
                              setShowRateCardModal(true);
                            }}
                            aria-label={`Respond to request ${req.id}`}
                          >
                            Respond
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
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
            <Table className="table-fixed w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">Candidate</TableHead>
                  <TableHead className="w-[100px]">Project</TableHead>
                  <TableHead className="w-[100px]">Start Date</TableHead>
                  <TableHead className="w-[150px]">Role</TableHead>
                  <TableHead className="w-[150px]">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcomingOnboardings.map((onb) => (
                  <TableRow key={onb.candidate} className="hover:bg-muted/50">
                    <TableCell className="font-medium min-w-0">
                      <div className="truncate" title={onb.candidate}>
                        {onb.candidate}
                      </div>
                    </TableCell>
                    <TableCell className="min-w-0">
                      <div className="truncate" title={onb.project}>
                        {onb.project}
                      </div>
                    </TableCell>
                    <TableCell>{onb.startDate}</TableCell>
                    <TableCell className="min-w-0">
                      <div className="truncate" title={onb.role}>
                        {onb.role}
                      </div>
                    </TableCell>
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

      {/* Details Modal */}
      <Dialog open={showDetailsModal} onOpenChange={(open) => {
        setShowDetailsModal(open);
        if (!open) setSelectedDetailsRequest(null);
      }}>
        <DialogContent className="sm:max-w-[600px] max-w-[700px] h-[88vh] overflow-y-auto p-0 bg-white rounded-xl shadow-2xl">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">Request Details - {selectedDetailsRequest?.id || "N/A"}</DialogTitle>
            </DialogHeader>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">Request ID</p>
                <p className="text-base font-semibold">{selectedDetailsRequest?.id || "N/A"}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">Project</p>
                <p className="text-base font-semibold">{selectedDetailsRequest?.project || "N/A"}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">Tech Stack</p>
                <p className="text-base">{selectedDetailsRequest?.techStack || "N/A"}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">Roles Required</p>
                <p className="text-base">{selectedDetailsRequest?.roles || "N/A"}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">Start Date</p>
                <p className="text-base">{selectedDetailsRequest?.startDate || "N/A"}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">End Date</p>
                <p className="text-base">{selectedDetailsRequest?.endDate || "N/A"}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">Resources Needed</p>
                <p className="text-base">{selectedDetailsRequest?.resourcesNeeded ?? "N/A"}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">FTE Lead</p>
                <p className="text-base">{selectedDetailsRequest?.fteLead || "N/A"}</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500">Business Justification</p>
              <p className="text-base bg-gray-50 p-3 rounded-lg">{selectedDetailsRequest?.businessJustification || "N/A"}</p>
            </div>
            <div className="flex justify-end">
              <Button
                onClick={() => setShowDetailsModal(false)}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Rate Card Modal */}
      <Dialog open={showRateCardModal} onOpenChange={(open) => {
        setShowRateCardModal(open);
        if (!open) setSelectedRateCardRequest(null);
      }}>
        <DialogContent className="max-w-full w-full sm:max-w-[70vw] h-[90vh] overflow-y-auto">
          <VendorSubmitRatecard
            requestData={selectedRateCardRequest || { requestId: "", project: "" }}
            onClose={() => setShowRateCardModal(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Vendor Chatbot */}
      <VendorChatbot isOpen={isChatbotOpen} onClose={setIsChatbotOpen} />
    </div>
  );
}