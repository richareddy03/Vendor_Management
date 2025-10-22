import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Upload, Trash2, Edit, Plus, X } from "lucide-react";
import { toast } from "sonner";

interface Resource {
  id: string;
  candidateName: string;
  candidateEmail: string;
  vendor: string;
  project: string;
  role: string;
  startDate: string;
  endDate: string;
  location: string;
  proposedRate: string;
  proposedCostYear: string;
  poNumber: string;
  techStack: string;
  resume: File | null;
  businessJustification: string;
}

interface Props {
  requestData: { requestId?: string; project?: string };
  onClose: () => void;
}

export default function VendorSubmitRatecard({ requestData, onClose }: Props) {
  const [resources, setResources] = useState<Resource[]>([]);
  const [showAddForm, setShowAddForm] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<Resource>>({
    vendor: "TechVendor Inc.",
    project: requestData.project || "",
    location: "remote",
  });

  const handleAddResource = () => {
    if (
      !formData.candidateName ||
      !formData.role ||
      !formData.proposedRate ||
      !formData.proposedCostYear
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newResource: Resource = {
      id: editingId || Date.now().toString(),
      candidateName: formData.candidateName || "",
      candidateEmail: formData.candidateEmail || "",
      vendor: formData.vendor || "TechVendor Inc.",
      project: formData.project || "",
      role: formData.role || "",
      startDate: formData.startDate || "",
      endDate: formData.endDate || "",
      location: formData.location || "remote",
      proposedRate: formData.proposedRate || "",
      proposedCostYear: formData.proposedCostYear || "",
      poNumber: formData.poNumber || "",
      techStack: formData.techStack || "",
      resume: formData.resume || null,
      businessJustification: formData.businessJustification || "",
    };

    if (editingId) {
      setResources(resources.map((r) => (r.id === editingId ? newResource : r)));
      toast.success("Resource updated successfully");
    } else {
      setResources([...resources, newResource]);
      toast.success("Resource added successfully");
    }

    resetForm();
    setEditingId(null);
    setShowAddForm(false);
  };

  const resetForm = () => {
    setFormData({
      vendor: "TechVendor Inc.",
      project: requestData.project || "",
      location: "remote",
      candidateName: "",
      candidateEmail:"",
      role: "",
      startDate: "",
      endDate: "",
      proposedRate: "",
      proposedCostYear: "",
      poNumber: "",
      techStack: "",
      resume: null,
      businessJustification: "",
    });
  };

  const handleEdit = (resource: Resource) => {
    setFormData(resource);
    setEditingId(resource.id);
    setShowAddForm(true);
  };

  const handleDelete = (id: string) => {
    setResources(resources.filter((r) => r.id !== id));
    toast.success("Resource removed");
  };

  const handleSubmit = () => {
    if (resources.length === 0) {
      toast.error("Please add at least one resource");
      return;
    }
    toast.success(
      "Submitted successfully!"
    );
    setResources([]);
    onClose();
  };

  const handleRemoveResume = () => {
    setFormData({ ...formData, resume: null });
  };

  return (
    <div className="space-y-6 max-h-[80vh] overflow-y-auto p-6 bg-gray-50 rounded-xl">
      {/* Add Resource Form */}
      {showAddForm ? (
        <Card className="border border-gray-200 shadow-sm rounded-xl">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-xl">
            <CardTitle className="text-lg font-semibold text-gray-900">
              {editingId ? "Edit Resource" : "Add New Resource"}
            </CardTitle>
            <CardDescription className="text-gray-600">
              Fill all required fields before adding the resource
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label>Candidate Name *</Label>
                <Input
                  value={formData.candidateName || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, candidateName: e.target.value })
                  }
                  placeholder="Enter candidate name"
                />
              </div>

              <div className="space-y-1">
                <Label>Candidate Email *</Label>
                <Input
                  value={formData.candidateEmail || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, candidateEmail: e.target.value })
                  }
                  placeholder="Enter candidate email"
                />
              </div>

              <div className="space-y-1">
                <Label>Vendor</Label>
                <Input value={formData.vendor} disabled className="bg-muted" />
              </div>

              <div className="space-y-1">
                <Label>Project *</Label>
                <Input value={formData.project} disabled className="bg-muted" />
              </div>

              <div className="space-y-1">
                <Label>Role *</Label>
                <Input
                  value={formData.role || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  placeholder="Enter role (e.g., Developer)"
                />
              </div>

              <div className="space-y-1">
                <Label>Start Date</Label>
                <Input
                  type="date"
                  value={formData.startDate || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                />
              </div>

              <div className="space-y-1">
                <Label>End Date</Label>
                <Input
                  type="date"
                  value={formData.endDate || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                />
              </div>

              <div className="space-y-1">
                <Label>Location</Label>
                <Select
                  value={formData.location}
                  onValueChange={(value) =>
                    setFormData({ ...formData, location: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="on-site">On-site</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label>Proposed Rate (USD/hr) *</Label>
                <Input
                  type="number"
                  value={formData.proposedRate || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, proposedRate: e.target.value })
                  }
                  placeholder="Enter hourly rate"
                />
              </div>

              <div className="space-y-1">
                <Label>Proposed Yearly Cost (USD) *</Label>
                <Input
                  type="number"
                  value={formData.proposedCostYear || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      proposedCostYear: e.target.value,
                    })
                  }
                  placeholder="Enter total yearly cost"
                />
              </div>

              <div className="space-y-1">
                <Label>PO Number</Label>
                <Input
                  value={formData.poNumber || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, poNumber: e.target.value })
                  }
                  placeholder="Enter PO number"
                />
              </div>

              <div className="space-y-1">
                <Label>Tech Stack</Label>
                <Input
                  value={formData.techStack || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, techStack: e.target.value })
                  }
                  placeholder="e.g., React, Node.js"
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label>Upload Resume (optional)</Label>
              <label
                htmlFor="resume-upload"
                className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors bg-white"
              >
                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm font-medium text-gray-700 mb-1">Click to upload</p>
                <p className="text-xs text-gray-500">PDF, DOC, or DOCX (max. 5MB)</p>
                {formData.resume && (
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-xs text-blue-600 truncate max-w-[160px]">
                      {formData.resume.name}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.preventDefault();
                        handleRemoveResume();
                      }}
                      className="h-6 w-6 p-0"
                    >
                      <X className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                )}
              </label>
              <Input
                id="resume-upload"
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    resume: e.target.files?.[0] || null,
                  })
                }
              />
            </div>

            <div className="space-y-1">
              <Label>Comments</Label>
              <Textarea
                value={formData.businessJustification || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    businessJustification: e.target.value,
                  })
                }
                placeholder=""
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setShowAddForm(false);
                  setEditingId(null);
                  resetForm();
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleAddResource}>
                {editingId ? "Update Resource" : "Add Resource"}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {/* Resource Table */}
      {!showAddForm && resources.length > 0 ? (
        <Card className="shadow-sm border border-gray-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Resources ({resources.length})</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  resetForm();
                  setEditingId(null);
                  setShowAddForm(true);
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Resource
              </Button>
            </div>
            <CardDescription>
              Review, edit, or remove resources before submission
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Candidate</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Rate</TableHead>
                    <TableHead>Proposed Yearly Cost</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Tech Stack</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {resources.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell>{r.candidateName}</TableCell>
                      <TableCell>{r.candidateEmail}</TableCell>
                      <TableCell>{r.role}</TableCell>
                      <TableCell>${r.proposedRate}/hr</TableCell>
                      <TableCell>${r.proposedCostYear}</TableCell>
                      <TableCell className="capitalize">
                        {r.location}
                      </TableCell>
                      <TableCell className="truncate max-w-[150px]">
                        {r.techStack}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEdit(r)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(r.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
              <Button variant="outline" onClick={() => setResources([])}>
                Clear All
              </Button>
              <Button onClick={handleSubmit}>Submit</Button>
            </div>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}