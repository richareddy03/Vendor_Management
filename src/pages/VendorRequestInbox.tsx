import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUp, Eye } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
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

export default function VendorRequestInbox() {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showRateCardModal, setShowRateCardModal] = useState(false);
  const [selectedDetailsRequest, setSelectedDetailsRequest] = useState<Request | null>(null);
  const [selectedRateCardRequest, setSelectedRateCardRequest] = useState<{ requestId: string; project: string } | null>(null);

  const pendingRequests = requestsData.filter((req) => req.status === "Pending");

  const handleViewDetails = (request: Request) => {
    setSelectedDetailsRequest(request);
    setShowDetailsModal(true);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="p-6 space-y-6">
      <Card className="w-full max-w-full relative">
        <CardHeader>
          <CardTitle>Resource Requests ({pendingRequests.length})</CardTitle>
          <CardDescription>Click the eye icon to see details or "Respond" to open the rate card form</CardDescription>
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

      {/* Details Modal */}
      <Dialog open={showDetailsModal} onOpenChange={(open) => {
        setShowDetailsModal(open);
        if (!open) setSelectedDetailsRequest(null);
      }}>
        <DialogContent className="sm:max-w-[600px] max-w-[700px] h-[80vh] overflow-y-auto p-6 bg-white rounded-xl shadow-lg">
          <div className="space-y-4">
            <Card className="bg-gray-50 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-gray-800">Request Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-600">Request ID</p>
                  <p className="text-base font-semibold text-gray-900">{selectedDetailsRequest?.id || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Project</p>
                  <p className="text-base font-semibold text-gray-900">{selectedDetailsRequest?.project || "N/A"}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-50 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-gray-800">Role Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tech Stack</p>
                  <p className="text-base font-semibold text-gray-900">{selectedDetailsRequest?.techStack || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Roles Required</p>
                  <p className="text-base font-semibold text-gray-900">{selectedDetailsRequest?.roles || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Resources Needed</p>
                  <p className="text-base font-semibold text-gray-900">{selectedDetailsRequest?.resourcesNeeded ?? "N/A"}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-50 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-gray-800">Date Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-600">Start Date</p>
                  <p className="text-base font-semibold text-gray-900">{selectedDetailsRequest?.startDate || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">End Date</p>
                  <p className="text-base font-semibold text-gray-900">{selectedDetailsRequest?.endDate || "N/A"}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-50 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-gray-800">Additional Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-600">FTE Lead</p>
                  <p className="text-base font-semibold text-gray-900">{selectedDetailsRequest?.fteLead || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Business Justification</p>
                  <p className="text-base text-gray-900 p-3 bg-white rounded-md">
                    {selectedDetailsRequest?.businessJustification || "N/A"}
                  </p>
                </div>
              </CardContent>
            </Card>
            <div className="flex justify-end">
              <Button
                onClick={() => setShowDetailsModal(false)}
                className="border border-gray-300 hover:bg-gray-100 text-gray-900 px-6 py-2 rounded-md"
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
    </div>
  );
}