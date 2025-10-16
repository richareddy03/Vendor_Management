import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Upload, Trash2, Edit } from "lucide-react";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";

interface Resource {
  id: string;
  candidateName: string;
  vendor: string;
  project: string;
  role: string;
  startDate: string;
  endDate: string;
  location: string;
  proposedRate: string;
  poNumber: string;
  techStack: string;
  resume: File | null;
  businessJustification: string;
}

export default function SubmitRateCard() {
  const location = useLocation();
  const requestData = location.state || {};
  
  const [resources, setResources] = useState<Resource[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<Partial<Resource>>({
    vendor: "TechVendor Inc.",
    project: requestData.project || "",
    location: "remote",
  });

  const handleAddResource = () => {
    if (!formData.candidateName || !formData.role || !formData.proposedRate) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newResource: Resource = {
      id: Date.now().toString(),
      candidateName: formData.candidateName || "",
      vendor: formData.vendor || "TechVendor Inc.",
      project: formData.project || "",
      role: formData.role || "",
      startDate: formData.startDate || "",
      endDate: formData.endDate || "",
      location: formData.location || "remote",
      proposedRate: formData.proposedRate || "",
      poNumber: formData.poNumber || "",
      techStack: formData.techStack || "",
      resume: formData.resume || null,
      businessJustification: formData.businessJustification || "",
    };

    if (editingId) {
      setResources(resources.map(r => r.id === editingId ? newResource : r));
      setEditingId(null);
      toast.success("Resource updated successfully");
    } else {
      setResources([...resources, newResource]);
      toast.success("Resource added successfully");
    }

    setFormData({ vendor: "TechVendor Inc.", project: requestData.project || "", location: "remote" });
    setShowAddForm(false);
  };

  const handleEdit = (resource: Resource) => {
    setFormData(resource);
    setEditingId(resource.id);
    setShowAddForm(true);
  };

  const handleDelete = (id: string) => {
    setResources(resources.filter(r => r.id !== id));
    toast.success("Resource removed");
  };

  const handleSubmit = () => {
    if (resources.length === 0) {
      toast.error("Please add at least one resource");
      return;
    }
    setShowConfirmModal(true);
  };

  const confirmSubmission = () => {
    setShowConfirmModal(false);
    toast.success("Rate card submitted successfully! Approval flow: FTE Lead → Business Desk");
    // Reset form
    setResources([]);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Submit Rate Card</h1>
          <p className="text-muted-foreground mt-1">
            {requestData.requestId ? `Responding to request: ${requestData.requestId}` : "Add resources and submit rate card"}
          </p>
        </div>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Resource
        </Button>
      </div>

      {/* Add Resource Form */}
      {showAddForm && (
        <Card className="border-primary/50">
          <CardHeader>
            <CardTitle>{editingId ? "Edit Resource" : "Add New Resource"}</CardTitle>
            <CardDescription>Fill in all required fields to add a resource to the rate card</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="candidateName">Candidate Name *</Label>
                <Input
                  id="candidateName"
                  value={formData.candidateName || ""}
                  onChange={(e) => setFormData({ ...formData, candidateName: e.target.value })}
                  placeholder="Enter candidate name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vendor">Vendor</Label>
                <Input
                  id="vendor"
                  value={formData.vendor}
                  disabled
                  className="bg-muted"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="project">Project *</Label>
                <Select value={formData.project} onValueChange={(val) => setFormData({ ...formData, project: val })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Alpha">Alpha</SelectItem>
                    <SelectItem value="Beta">Beta</SelectItem>
                    <SelectItem value="Gamma">Gamma</SelectItem>
                    <SelectItem value="Delta">Delta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role *</Label>
                <Input
                  id="role"
                  value={formData.role || ""}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="e.g., Senior Developer"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date *</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate || ""}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date *</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate || ""}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Select value={formData.location} onValueChange={(val) => setFormData({ ...formData, location: val })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="onsite">Onsite</SelectItem>
                    <SelectItem value="offsite">Offsite</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="proposedRate">Proposed Rate ($/hr) *</Label>
                <Input
                  id="proposedRate"
                  type="number"
                  value={formData.proposedRate || ""}
                  onChange={(e) => setFormData({ ...formData, proposedRate: e.target.value })}
                  placeholder="85"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="poNumber">PO Number</Label>
                <Input
                  id="poNumber"
                  value={formData.poNumber || ""}
                  onChange={(e) => setFormData({ ...formData, poNumber: e.target.value })}
                  placeholder="Optional"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="techStack">Tech Stack *</Label>
                <Input
                  id="techStack"
                  value={formData.techStack || ""}
                  onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                  placeholder="React, TypeScript, Node.js"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="resume">Resume Upload *</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  {formData.resume ? formData.resume.name : "Drag and drop resume here, or click to browse"}
                </p>
                <Input
                  id="resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={(e) => setFormData({ ...formData, resume: e.target.files?.[0] || null })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessJustification">Business Justification</Label>
              <Textarea
                id="businessJustification"
                value={formData.businessJustification || ""}
                onChange={(e) => setFormData({ ...formData, businessJustification: e.target.value })}
                placeholder="Optional: Explain the business need for this resource"
                rows={3}
              />
            </div>

            <div className="flex gap-3 justify-end">
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowAddForm(false);
                  setEditingId(null);
                  setFormData({ vendor: "TechVendor Inc.", project: requestData.project || "", location: "remote" });
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleAddResource}>
                {editingId ? "Update Resource" : "Add to Rate Card"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Resources Table */}
      {resources.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Rate Card Resources ({resources.length})</CardTitle>
            <CardDescription>Review and edit resources before submission</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Candidate</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Rate</TableHead>
                    <TableHead>Tech Stack</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {resources.map((resource) => (
                    <TableRow key={resource.id}>
                      <TableCell className="font-medium">{resource.candidateName}</TableCell>
                      <TableCell>{resource.project}</TableCell>
                      <TableCell>{resource.role}</TableCell>
                      <TableCell>{resource.startDate}</TableCell>
                      <TableCell>{resource.endDate}</TableCell>
                      <TableCell className="capitalize">{resource.location}</TableCell>
                      <TableCell>${resource.proposedRate}/hr</TableCell>
                      <TableCell className="max-w-xs truncate">{resource.techStack}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(resource)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(resource.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="flex gap-3 justify-end mt-6 pt-6 border-t">
              <Button variant="outline" onClick={() => setResources([])}>
                Clear All
              </Button>
              <Button onClick={handleSubmit}>
                Submit Rate Card
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {resources.length === 0 && !showAddForm && (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4">No resources added yet</p>
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add First Resource
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Confirmation Modal */}
      <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Submission</DialogTitle>
            <DialogDescription>
              You are about to submit a rate card with {resources.length} resource(s).
              This will trigger the approval chain: FTE Lead → Business Desk
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              Once submitted, the rate card will be sent for review and approval.
              You will be notified of the approval status.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmModal(false)}>
              Cancel
            </Button>
            <Button onClick={confirmSubmission}>
              Confirm Submission
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Annotation */}
      <Card className="bg-accent/50 border-primary/20">
        <CardHeader>
          <CardTitle className="text-sm">💡 Interaction Notes</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          <ul className="list-disc list-inside space-y-1">
            <li>Click "Add Resource" button at top right to open the form</li>
            <li>Resume upload shows file name after selection; drag-and-drop supported</li>
            <li>Table displays all added resources with edit/delete actions</li>
            <li>Form validates required fields before allowing submission</li>
            <li>Submission triggers modal confirmation and approval flow notification</li>
            <li>Tech Stack field supports type-ahead (simulated with regular input)</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
