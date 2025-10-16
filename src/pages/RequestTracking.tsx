import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InputSearch } from "@/components/ui/input-search";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Eye } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const requests = [
  {
    id: "REQ-2025-001",
    type: "Onboarding",
    status: "Pending Approval",
    project: "Mobile App Redesign",
    vendor: "TechSolutions Inc.",
    submittedDate: "2025-01-15",
    lastUpdated: "2025-01-16",
    details: "Request for 5 React developers",
  },
  {
    id: "REQ-2025-002",
    type: "Replacement",
    status: "In Progress",
    project: "API Infrastructure",
    vendor: "DevPro Services",
    submittedDate: "2025-01-14",
    lastUpdated: "2025-01-17",
    details: "Replacement for V-12345 due to performance issues",
  },
  {
    id: "REQ-2025-003",
    type: "Rate Card Review",
    status: "Approved",
    project: "Cloud Migration",
    vendor: "CloudExperts Ltd.",
    submittedDate: "2025-01-13",
    lastUpdated: "2025-01-18",
    details: "2 DevOps engineers approved",
  },
  {
    id: "REQ-2025-004",
    type: "Offboarding",
    status: "Completed",
    project: "Data Analytics",
    vendor: "DataVendor Co.",
    submittedDate: "2025-01-12",
    lastUpdated: "2025-01-18",
    details: "Offboarding for V-12348 completed",
  },
];

export default function RequestTracking() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [projectFilter, setProjectFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [selectedRequest, setSelectedRequest] = useState<typeof requests[0] | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState("10");
  const navigate = useNavigate();

  const handleViewDetails = (request: typeof requests[0]) => {
    setSelectedRequest(request);
    setShowDetailsModal(true);
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Request Tracking Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Track all your onboarding, replacement, and offboarding requests
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleBack}
          aria-label="Back to Dashboard"
        >
          Back
        </Button>
      </div>

      {/* Filters */}
      <Card className="shadow-material-md">
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>Filter requests by status, project, or date range</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger aria-label="Filter by status">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending Approval</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Select value={projectFilter} onValueChange={setProjectFilter}>
                <SelectTrigger aria-label="Filter by project">
                  <SelectValue placeholder="All Projects" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">All Projects</SelectItem>
                  <SelectItem value="mobile-app">Mobile App Redesign</SelectItem>
                  <SelectItem value="api">API Infrastructure</SelectItem>
                  <SelectItem value="cloud">Cloud Migration</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : "Start Date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : "End Date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="mt-4">
            <InputSearch
              placeholder="Search by Request ID, Vendor, or Project..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Requests Table */}
      <Card className="shadow-material-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Requests</CardTitle>
              <CardDescription>Complete list of all submitted requests</CardDescription>
            </div>
            <Select value={rowsPerPage} onValueChange={setRowsPerPage}>
              <SelectTrigger className="w-32" aria-label="Rows per page">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="10">10 rows</SelectItem>
                <SelectItem value="25">25 rows</SelectItem>
                <SelectItem value="50">50 rows</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Request ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Type</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Project</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Vendor</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Submitted</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Updated</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Details</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request) => (
                  <tr key={request.id} className="border-b border-border hover:bg-accent/50 transition-base">
                    <td className="py-3 px-4 text-sm font-medium text-foreground">{request.id}</td>
                    <td className="py-3 px-4 text-sm text-foreground">{request.type}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          request.status === "Approved" || request.status === "Completed"
                            ? "bg-success/10 text-success"
                            : request.status === "In Progress"
                            ? "bg-primary/10 text-primary"
                            : "bg-warning/10 text-warning"
                        }`}
                      >
                        {request.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-foreground">{request.project}</td>
                    <td className="py-3 px-4 text-sm text-foreground">{request.vendor}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{request.submittedDate}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{request.lastUpdated}</td>
                    <td className="py-3 px-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewDetails(request)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">
              Showing 1 to {requests.length} of {requests.length} results
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Details Modal */}
      <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Details</DialogTitle>
            <DialogDescription>Complete information for {selectedRequest?.id}</DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Request ID</p>
                  <p className="text-base font-semibold text-foreground">{selectedRequest.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Type</p>
                  <p className="text-base text-foreground">{selectedRequest.type}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      selectedRequest.status === "Approved" || selectedRequest.status === "Completed"
                        ? "bg-success/10 text-success"
                        : selectedRequest.status === "In Progress"
                        ? "bg-primary/10 text-primary"
                        : "bg-warning/10 text-warning"
                    }`}
                  >
                    {selectedRequest.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Project</p>
                  <p className="text-base text-foreground">{selectedRequest.project}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Vendor</p>
                  <p className="text-base text-foreground">{selectedRequest.vendor}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Submitted Date</p>
                  <p className="text-base text-foreground">{selectedRequest.submittedDate}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-medium text-muted-foreground mb-1">Details</p>
                  <p className="text-base text-foreground">{selectedRequest.details}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}