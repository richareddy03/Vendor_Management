import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CalendarIcon, User, Building2 } from "lucide-react";

const onboardingRequests = [
  { id: "ONB-001", project: "Project Alpha", vendor: "TechSolutions", date: "2025-01-20", status: "pending" },
  { id: "ONB-002", project: "Project Beta", vendor: "DevOps Pro", date: "2025-02-01", status: "approved" },
  { id: "ONB-003", project: "Project Gamma", vendor: "Quality First", date: "2025-01-25", status: "inProgress" },
  { id: "ONB-004", project: "Project Alpha", vendor: "TechSolutions", date: "2025-02-10", status: "pending" },
  { id: "ONB-005", project: "Project Beta", vendor: "DevOps Pro", date: "2025-02-15", status: "completed" },
];

const offboardingRequests = [
  { id: "OFF-001", project: "Project Alpha", vendor: "TechSolutions", date: "2025-03-15", status: "pending" },
  { id: "OFF-002", project: "Project Beta", vendor: "DevOps Pro", date: "2025-03-20", status: "approved" },
  { id: "OFF-003", project: "Project Gamma", vendor: "Quality First", date: "2025-03-25", status: "completed" },
];

export default function PipelineView() {
  const [filters, setFilters] = useState({ project: "all", date: "all" });
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "approved": return "bg-blue-100 text-blue-800 border-blue-300";
      case "inProgress": return "bg-purple-100 text-purple-800 border-purple-300";
      case "completed": return "bg-green-100 text-green-800 border-green-300";
      default: return "";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending": return "Pending";
      case "approved": return "Approved";
      case "inProgress": return "In Progress";
      case "completed": return "Completed";
      default: return status;
    }
  };

  const filterRequests = (requests: any[]) => {
    return requests.filter(req => {
      if (filters.project !== "all" && req.project !== filters.project) return false;
      return true;
    });
  };

  const filteredOnboarding = filterRequests(onboardingRequests);
  const filteredOffboarding = filterRequests(offboardingRequests);

  const groupByStatus = (requests: any[]) => {
    return {
      pending: requests.filter(r => r.status === "pending"),
      approved: requests.filter(r => r.status === "approved"),
      inProgress: requests.filter(r => r.status === "inProgress"),
      completed: requests.filter(r => r.status === "completed"),
    };
  };

  const onboardingByStatus = groupByStatus(filteredOnboarding);
  const offboardingByStatus = groupByStatus(filteredOffboarding);

  const handleCardClick = (request: any) => {
    setSelectedRequest(request);
    setShowModal(true);
  };

  const KanbanCard = ({ request }: { request: any }) => (
    <div
      className="bg-card p-4 rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => handleCardClick(request)}
    >
      <div className="font-semibold text-sm mb-2">{request.id}</div>
      <div className="space-y-2 text-xs">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Building2 className="h-3 w-3" />
          {request.project}
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <User className="h-3 w-3" />
          {request.vendor}
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <CalendarIcon className="h-3 w-3" />
          {request.date}
        </div>
      </div>
    </div>
  );

  const KanbanColumn = ({ title, requests, count }: { title: string; requests: any[]; count: number }) => (
    <div className="flex-1 min-w-[250px]">
      <div className="bg-muted/50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">{title}</h3>
          <Badge variant="outline" className="bg-background">
            {count}
          </Badge>
        </div>
        <div className="space-y-3">
          {requests.map((request) => (
            <KanbanCard key={request.id} request={request} />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Pipeline View</h1>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Project</Label>
              <Select value={filters.project} onValueChange={(val) => setFilters({ ...filters, project: val })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">All Projects</SelectItem>
                  <SelectItem value="Project Alpha">Project Alpha</SelectItem>
                  <SelectItem value="Project Beta">Project Beta</SelectItem>
                  <SelectItem value="Project Gamma">Project Gamma</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Date Range</Label>
              <Select value={filters.date} onValueChange={(val) => setFilters({ ...filters, date: val })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">All Dates</SelectItem>
                  <SelectItem value="this-month">This Month</SelectItem>
                  <SelectItem value="next-month">Next Month</SelectItem>
                  <SelectItem value="this-quarter">This Quarter</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Onboarding Pipeline */}
      <Card>
        <CardHeader>
          <CardTitle>Onboarding Pipeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 overflow-x-auto pb-4">
            <KanbanColumn
              title="Pending"
              requests={onboardingByStatus.pending}
              count={onboardingByStatus.pending.length}
            />
            <KanbanColumn
              title="Approved"
              requests={onboardingByStatus.approved}
              count={onboardingByStatus.approved.length}
            />
            <KanbanColumn
              title="In Progress"
              requests={onboardingByStatus.inProgress}
              count={onboardingByStatus.inProgress.length}
            />
            <KanbanColumn
              title="Completed"
              requests={onboardingByStatus.completed}
              count={onboardingByStatus.completed.length}
            />
          </div>
        </CardContent>
      </Card>

      {/* Offboarding Pipeline */}
      <Card>
        <CardHeader>
          <CardTitle>Offboarding Pipeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 overflow-x-auto pb-4">
            <KanbanColumn
              title="Pending"
              requests={offboardingByStatus.pending}
              count={offboardingByStatus.pending.length}
            />
            <KanbanColumn
              title="Approved"
              requests={offboardingByStatus.approved}
              count={offboardingByStatus.approved.length}
            />
            <KanbanColumn
              title="In Progress"
              requests={offboardingByStatus.inProgress}
              count={offboardingByStatus.inProgress.length}
            />
            <KanbanColumn
              title="Completed"
              requests={offboardingByStatus.completed}
              count={offboardingByStatus.completed.length}
            />
          </div>
        </CardContent>
      </Card>

      {/* Details Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="bg-card">
          <DialogHeader>
            <DialogTitle>Request Details</DialogTitle>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Request ID</Label>
                  <p className="font-medium">{selectedRequest.id}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Status</Label>
                  <Badge variant="outline" className={getStatusColor(selectedRequest.status)}>
                    {getStatusLabel(selectedRequest.status)}
                  </Badge>
                </div>
                <div>
                  <Label className="text-muted-foreground">Project</Label>
                  <p className="font-medium">{selectedRequest.project}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Vendor</Label>
                  <p className="font-medium">{selectedRequest.vendor}</p>
                </div>
                <div className="col-span-2">
                  <Label className="text-muted-foreground">Date</Label>
                  <p className="font-medium">{selectedRequest.date}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
