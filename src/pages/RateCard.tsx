import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { CheckCircle, XCircle, Eye, TrendingUp, TrendingDown } from "lucide-react";
import { toast } from "sonner";

const candidates = [
  {
    id: 1,
    name: "Alice Cooper",
    role: "Senior React Developer",
    proposedRate: "$85/hr",
    vendor: "TechSolutions Inc.",
    project: "Mobile App Redesign",
    poNumber: "PO-2025-001",
    fyWorkStream: "FY25-Q3",
    techStack: "React, TypeScript, AWS",
    location: "Remote",
    startDate: "2025-02-01",
    endDate: "2025-08-01",
    justification: "Critical for frontend development",
  },
  {
    id: 2,
    name: "Bob Martinez",
    role: "Backend Engineer",
    proposedRate: "$90/hr",
    vendor: "DevPro Services",
    project: "API Infrastructure",
    poNumber: "PO-2025-002",
    fyWorkStream: "FY25-Q3",
    techStack: "Node.js, PostgreSQL",
    location: "Onsite",
    startDate: "2025-02-15",
    endDate: "2025-09-15",
    justification: "Backend expertise required",
  },
];

export default function RateCard() {
  const [selectedVendor, setSelectedVendor] = useState("all");
  const [selectedProject, setSelectedProject] = useState("all");
  const [selectedCandidate, setSelectedCandidate] = useState<typeof candidates[0] | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const totalBudget = 500000;
  const utilizedBudget = 325000;
  const variance = totalBudget - utilizedBudget;
  const variancePercent = ((variance / totalBudget) * 100).toFixed(1);

  const handleApprove = (candidateId: number) => {
    toast.success("Rate card approved and forwarded to Business Desk");
  };

  const handleReject = (candidateId: number) => {
    toast.error("Rate card rejected. Vendor will be notified.");
  };

  const handleViewProfile = (candidate: typeof candidates[0]) => {
    setSelectedCandidate(candidate);
    setShowProfileModal(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Rate Card & Profile Review</h1>
        <p className="text-muted-foreground mt-1">
          Stage 1 Approval - Review vendor rate cards and candidate profiles
        </p>
      </div>

      {/* Filters */}
      <Card className="shadow-material-md">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Select value={selectedVendor} onValueChange={setSelectedVendor}>
                <SelectTrigger aria-label="Filter by vendor">
                  <SelectValue placeholder="All Vendors" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">All Vendors</SelectItem>
                  <SelectItem value="techsolutions">TechSolutions Inc.</SelectItem>
                  <SelectItem value="devpro">DevPro Services</SelectItem>
                  <SelectItem value="cloudexperts">CloudExperts Ltd.</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Select value={selectedProject} onValueChange={setSelectedProject}>
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
          </div>
        </CardContent>
      </Card>

      {/* Budget Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-material-md">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              ${totalBudget.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">For selected filters</p>
          </CardContent>
        </Card>

        <Card className="shadow-material-md">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Utilized Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              ${utilizedBudget.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {((utilizedBudget / totalBudget) * 100).toFixed(1)}% of total
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-material-md">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Variance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className={`text-2xl font-bold ${variance >= 0 ? "text-success" : "text-destructive"}`}>
                ${Math.abs(variance).toLocaleString()}
              </div>
              {variance >= 0 ? (
                <TrendingUp className="h-5 w-5 text-success" />
              ) : (
                <TrendingDown className="h-5 w-5 text-destructive" />
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {variance >= 0 ? "Within budget" : "Over budget"} ({variancePercent}%)
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Candidates Table */}
      <Card className="shadow-material-md">
        <CardHeader>
          <CardTitle>Pending Rate Card Reviews</CardTitle>
          <CardDescription>
            Approve or reject rate cards. Approved requests will be forwarded to Business Desk.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Candidate</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Role</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Proposed Rate</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Vendor</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Project</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Profile</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map((candidate) => (
                  <tr key={candidate.id} className="border-b border-border hover:bg-accent/50 transition-base">
                    <td className="py-3 px-4 text-sm font-medium text-foreground">{candidate.name}</td>
                    <td className="py-3 px-4 text-sm text-foreground">{candidate.role}</td>
                    <td className="py-3 px-4 text-sm font-semibold text-primary">{candidate.proposedRate}</td>
                    <td className="py-3 px-4 text-sm text-foreground">{candidate.vendor}</td>
                    <td className="py-3 px-4 text-sm text-foreground">{candidate.project}</td>
                    <td className="py-3 px-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewProfile(candidate)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleApprove(candidate.id)}
                          className="bg-success hover:bg-success/90"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleReject(candidate.id)}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Profile Modal */}
      <Dialog open={showProfileModal} onOpenChange={setShowProfileModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Candidate Profile</DialogTitle>
            <DialogDescription>Complete profile details for review</DialogDescription>
          </DialogHeader>
          {selectedCandidate && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Candidate Name</p>
                  <p className="text-base font-semibold text-foreground">{selectedCandidate.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Role</p>
                  <p className="text-base text-foreground">{selectedCandidate.role}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Vendor</p>
                  <p className="text-base text-foreground">{selectedCandidate.vendor}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Proposed Rate</p>
                  <p className="text-base font-semibold text-primary">{selectedCandidate.proposedRate}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Project</p>
                  <p className="text-base text-foreground">{selectedCandidate.project}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">PO Number</p>
                  <p className="text-base text-foreground">{selectedCandidate.poNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">FY Work Stream</p>
                  <p className="text-base text-foreground">{selectedCandidate.fyWorkStream}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Location</p>
                  <p className="text-base text-foreground">{selectedCandidate.location}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Start Date</p>
                  <p className="text-base text-foreground">{selectedCandidate.startDate}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">End Date</p>
                  <p className="text-base text-foreground">{selectedCandidate.endDate}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Tech Stack</p>
                <p className="text-base text-foreground">{selectedCandidate.techStack}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Business Justification</p>
                <p className="text-base text-foreground">{selectedCandidate.justification}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
