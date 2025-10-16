import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Check, X, AlertCircle, Eye, TrendingUp, TrendingDown } from "lucide-react";
import { toast } from "sonner";

const mockCandidates = [
  { id: 1, name: "John Doe", role: "Senior Developer", rate: 85, vendor: "TechSolutions", project: "Project Alpha" },
  { id: 2, name: "Jane Smith", role: "DevOps Engineer", rate: 90, vendor: "DevOps Pro", project: "Project Beta" },
  { id: 3, name: "Mike Johnson", role: "Full Stack Developer", rate: 80, vendor: "TechSolutions", project: "Project Alpha" },
  { id: 4, name: "Sarah Williams", role: "QA Engineer", rate: 70, vendor: "Quality First", project: "Project Gamma" },
];

export default function BusinessRateCard() {
  const [filters, setFilters] = useState({ vendor: "all", project: "all" });
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showCRModal, setShowCRModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [crNotes, setCrNotes] = useState("");
  const [budgetAdjustment, setBudgetAdjustment] = useState("");

  const filteredCandidates = mockCandidates.filter(cand => {
    if (filters.vendor !== "all" && cand.vendor !== filters.vendor) return false;
    if (filters.project !== "all" && cand.project !== filters.project) return false;
    return true;
  });

  const totalBudget = 800000;
  const utilizedBudget = filteredCandidates.reduce((sum, c) => sum + (c.rate * 160 * 12), 0);
  const variance = totalBudget - utilizedBudget;

  const handleViewProfile = (candidate: any) => {
    setSelectedCandidate(candidate);
    setShowProfileModal(true);
  };

  const handleApprove = (id: number) => {
    toast.success(`Candidate approved successfully`);
  };

  const handleReject = (id: number) => {
    toast.error(`Candidate rejected`);
  };

  const handleRaiseCR = (candidate: any) => {
    setSelectedCandidate(candidate);
    setShowCRModal(true);
  };

  const submitCR = () => {
    toast.success(`Change Request raised for ${selectedCandidate.name}`);
    setShowCRModal(false);
    setCrNotes("");
    setBudgetAdjustment("");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Final Rate Card Review</h1>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Vendor</Label>
              <Select value={filters.vendor} onValueChange={(val) => setFilters({ ...filters, vendor: val })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">All Vendors</SelectItem>
                  <SelectItem value="TechSolutions">TechSolutions</SelectItem>
                  <SelectItem value="DevOps Pro">DevOps Pro</SelectItem>
                  <SelectItem value="Quality First">Quality First</SelectItem>
                </SelectContent>
              </Select>
            </div>

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
          </div>
        </CardContent>
      </Card>

      {/* Budget Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalBudget.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Utilized Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${utilizedBudget.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {((utilizedBudget / totalBudget) * 100).toFixed(1)}% utilized
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">Variance</CardTitle>
            {variance >= 0 ? <TrendingUp className="h-4 w-4 text-green-600" /> : <TrendingDown className="h-4 w-4 text-destructive" />}
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${variance >= 0 ? 'text-green-600' : 'text-destructive'}`}>
              ${Math.abs(variance).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {variance >= 0 ? 'Under budget' : 'Over budget'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Candidates Table */}
      <Card>
        <CardHeader>
          <CardTitle>Candidate Rate Cards</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Candidate</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Proposed Rate</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Project</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCandidates.map((candidate) => (
                <TableRow key={candidate.id}>
                  <TableCell className="font-medium">{candidate.name}</TableCell>
                  <TableCell>{candidate.role}</TableCell>
                  <TableCell>${candidate.rate}/hr</TableCell>
                  <TableCell>{candidate.vendor}</TableCell>
                  <TableCell>{candidate.project}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleViewProfile(candidate)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="default" onClick={() => handleApprove(candidate.id)}>
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleReject(candidate.id)}>
                        <X className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleRaiseCR(candidate)}>
                        <AlertCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Profile Modal */}
      <Dialog open={showProfileModal} onOpenChange={setShowProfileModal}>
        <DialogContent className="bg-card max-w-2xl">
          <DialogHeader>
            <DialogTitle>Candidate Profile</DialogTitle>
          </DialogHeader>
          {selectedCandidate && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Name</Label>
                  <p className="font-medium">{selectedCandidate.name}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Role</Label>
                  <p className="font-medium">{selectedCandidate.role}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Vendor</Label>
                  <p className="font-medium">{selectedCandidate.vendor}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Proposed Rate</Label>
                  <p className="font-medium">${selectedCandidate.rate}/hr</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Project</Label>
                  <p className="font-medium">{selectedCandidate.project}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Start Date</Label>
                  <p className="font-medium">2025-02-01</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">End Date</Label>
                  <p className="font-medium">2025-12-31</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Location</Label>
                  <p className="font-medium">Remote</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">PO Number</Label>
                  <p className="font-medium">PO-2025-001</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">FY Workstream</Label>
                  <p className="font-medium">Digital Transformation</p>
                </div>
                <div className="col-span-2">
                  <Label className="text-muted-foreground">Tech Stack</Label>
                  <p className="font-medium">React, Node.js, TypeScript, AWS</p>
                </div>
                <div className="col-span-2">
                  <Label className="text-muted-foreground">Business Justification</Label>
                  <p className="font-medium">Critical resource needed for Q1 deliverables</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowProfileModal(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* CR Modal */}
      <Dialog open={showCRModal} onOpenChange={setShowCRModal}>
        <DialogContent className="bg-card">
          <DialogHeader>
            <DialogTitle>Raise Change Request</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cr-notes">Notes</Label>
              <Textarea
                id="cr-notes"
                placeholder="Enter notes for the change request"
                value={crNotes}
                onChange={(e) => setCrNotes(e.target.value)}
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="budget-adjustment">Budget Adjustment (Optional)</Label>
              <Input
                id="budget-adjustment"
                type="number"
                placeholder="Enter budget adjustment amount"
                value={budgetAdjustment}
                onChange={(e) => setBudgetAdjustment(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCRModal(false)}>Cancel</Button>
            <Button onClick={submitCR}>Submit CR</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
