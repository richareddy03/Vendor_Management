// import { useState } from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Upload, Trash2, Edit, Calendar as CalendarIcon, Plus } from "lucide-react";
// import { toast } from "sonner";
// import { format } from "date-fns";
// import { cn } from "@/lib/utils";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { Calendar } from "@/components/ui/calendar";

// interface Resource {
//   id: string;
//   candidateName: string;
//   vendor: string;
//   project: string;
//   role: string;
//   startDate: string;
//   endDate: string;
//   location: string;
//   proposedRate: string;
//   proposedCostYear: string;
//   poNumber: string;
//   techStack: string;
//   resume: File | null;
//   businessJustification: string;
// }

// interface Props {
//   requestData: { requestId?: string; project?: string };
//   onClose: () => void;
// }

// export default function VendorSubmitRatecard({ requestData, onClose }: Props) {
//   const [resources, setResources] = useState<Resource[]>([]);
//   const [showAddForm, setShowAddForm] = useState(true);
//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const [editingId, setEditingId] = useState<string | null>(null);

//   const [formData, setFormData] = useState<Partial<Resource>>({
//     vendor: "TechVendor Inc.",
//     project: requestData.project || "",
//     location: "remote",
//   });

//   const handleAddResource = () => {
//     if (
//       !formData.candidateName ||
//       !formData.role ||
//       !formData.proposedRate ||
//       !formData.proposedCostYear
//     ) {
//       toast.error("Please fill in all required fields");
//       return;
//     }

//     const newResource: Resource = {
//       id: editingId || Date.now().toString(),
//       candidateName: formData.candidateName || "",
//       vendor: formData.vendor || "TechVendor Inc.",
//       project: formData.project || "",
//       role: formData.role || "",
//       startDate: formData.startDate || "",
//       endDate: formData.endDate || "",
//       location: formData.location || "remote",
//       proposedRate: formData.proposedRate || "",
//       proposedCostYear: formData.proposedCostYear || "",
//       poNumber: formData.poNumber || "",
//       techStack: formData.techStack || "",
//       resume: formData.resume || null,
//       businessJustification: formData.businessJustification || "",
//     };

//     if (editingId) {
//       setResources(resources.map((r) => (r.id === editingId ? newResource : r)));
//       toast.success("Resource updated successfully");
//     } else {
//       setResources([...resources, newResource]);
//       toast.success("Resource added successfully");
//     }

//     resetForm();
//     setEditingId(null);
//     setShowAddForm(false);
//   };

//   const resetForm = () => {
//     setFormData({
//       vendor: "TechVendor Inc.",
//       project: requestData.project || "",
//       location: "remote",
//       candidateName: "",
//       role: "",
//       startDate: "",
//       endDate: "",
//       proposedRate: "",
//       proposedCostYear: "",
//       poNumber: "",
//       techStack: "",
//       resume: null,
//       businessJustification: "",
//     });
//   };

//   const handleEdit = (resource: Resource) => {
//     setFormData(resource);
//     setEditingId(resource.id);
//     setShowAddForm(true);
//   };

//   const handleDelete = (id: string) => {
//     setResources(resources.filter((r) => r.id !== id));
//     toast.success("Resource removed");
//   };

//   const handleSubmit = () => {
//     if (resources.length === 0) {
//       toast.error("Please add at least one resource");
//       return;
//     }
//     setShowConfirmModal(true);
//   };

//   const confirmSubmission = () => {
//     setShowConfirmModal(false);
//     toast.success(
//       "Rate card submitted successfully! Approval flow: FTE Lead → Business Desk"
//     );
//     setResources([]);
//     onClose();
//   };

//   const DatePicker = ({ value, onChange }: { value: string; onChange: (date: string) => void }) => {
//     const [date, setDate] = useState<Date | undefined>(value ? new Date(value) : undefined);

//     const handleSelect = (newDate: Date | undefined) => {
//       setDate(newDate);
//       onChange(newDate ? format(newDate, "yyyy-MM-dd") : "");
//     };

//     return (
//       <Popover>
//         <PopoverTrigger asChild>
//           <Button
//             variant="outline"
//             className={cn(
//               "justify-start text-left font-normal",
//               !date && "text-muted-foreground"
//             )}
//           >
//             <CalendarIcon className="mr-2 h-4 w-4" />
//             {date ? format(date, "PPP") : <span>Pick a date</span>}
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent className="w-auto p-0">
//           <Calendar mode="single" selected={date} onSelect={handleSelect} initialFocus />
//         </PopoverContent>
//       </Popover>
//     );
//   };

//   return (
//     <div className="space-y-6 max-h-[80vh] overflow-y-auto p-6 bg-gray-50 rounded-xl">
//       {/* Add Resource Form */}
//       {showAddForm ? (
//         <Card className="border border-gray-200 shadow-sm rounded-xl">
//           <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-xl">
//             <CardTitle className="text-lg font-semibold text-gray-900">
//               {editingId ? "Edit Resource" : "Add New Resource"}
//             </CardTitle>
//             <CardDescription className="text-gray-600">
//               Fill all required fields before adding the resource
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4 mt-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-1">
//                 <Label>Candidate Name *</Label>
//                 <Input
//                   value={formData.candidateName || ""}
//                   onChange={(e) =>
//                     setFormData({ ...formData, candidateName: e.target.value })
//                   }
//                   placeholder="Enter candidate name"
//                 />
//               </div>

//               <div className="space-y-1">
//                 <Label>Vendor</Label>
//                 <Input value={formData.vendor} disabled className="bg-muted" />
//               </div>

//               <div className="space-y-1">
//                 <Label>Project *</Label>
//                 <Input value={formData.project} disabled className="bg-muted" />
//               </div>

//               <div className="space-y-1">
//                 <Label>Role *</Label>
//                 <Input
//                   value={formData.role || ""}
//                   onChange={(e) =>
//                     setFormData({ ...formData, role: e.target.value })
//                   }
//                   placeholder="Enter role (e.g., Developer)"
//                 />
//               </div>

//               <div className="space-y-1">
//                 <Label>Start Date</Label>
//                 <DatePicker
//                   value={formData.startDate || ""}
//                   onChange={(date) => setFormData({ ...formData, startDate: date })}
//                 />
//               </div>

//               <div className="space-y-1">
//                 <Label>End Date</Label>
//                 <DatePicker
//                   value={formData.endDate || ""}
//                   onChange={(date) => setFormData({ ...formData, endDate: date })}
//                 />
//               </div>

//               <div className="space-y-1">
//                 <Label>Location</Label>
//                 <Select
//                   value={formData.location}
//                   onValueChange={(value) =>
//                     setFormData({ ...formData, location: value })
//                   }
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select location" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="remote">Remote</SelectItem>
//                     <SelectItem value="on-site">On-site</SelectItem>
//                     <SelectItem value="hybrid">Hybrid</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="space-y-1">
//                 <Label>Proposed Rate (USD/hr) *</Label>
//                 <Input
//                   type="number"
//                   value={formData.proposedRate || ""}
//                   onChange={(e) =>
//                     setFormData({ ...formData, proposedRate: e.target.value })
//                   }
//                   placeholder="Enter hourly rate"
//                 />
//               </div>

//               <div className="space-y-1">
//                 <Label>Proposed Yearly Cost (USD) *</Label>
//                 <Input
//                   type="number"
//                   value={formData.proposedCostYear || ""}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       proposedCostYear: e.target.value,
//                     })
//                   }
//                   placeholder="Enter total yearly cost"
//                 />
//               </div>

//               <div className="space-y-1">
//                 <Label>PO Number</Label>
//                 <Input
//                   value={formData.poNumber || ""}
//                   onChange={(e) =>
//                     setFormData({ ...formData, poNumber: e.target.value })
//                   }
//                   placeholder="Enter PO number"
//                 />
//               </div>

//               <div className="space-y-1">
//                 <Label>Tech Stack</Label>
//                 <Input
//                   value={formData.techStack || ""}
//                   onChange={(e) =>
//                     setFormData({ ...formData, techStack: e.target.value })
//                   }
//                   placeholder="e.g., React, Node.js"
//                 />
//               </div>
//             </div>

//             <div className="space-y-1">
//               <Label>Upload Resume (optional)</Label>
//               <label
//                 htmlFor="resume-upload"
//                 className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors bg-white"
//               >
//                 <Upload className="h-8 w-8 text-gray-400 mb-2" />
//                 <p className="text-sm font-medium text-gray-700 mb-1">Click to upload</p>
//                 <p className="text-xs text-gray-500">PDF, DOC, or DOCX (max. 5MB)</p>
//                 {formData.resume && (
//                   <p className="text-xs text-blue-600 mt-1 truncate max-w-[200px]">
//                     {formData.resume.name}
//                   </p>
//                 )}
//               </label>
//               <Input
//                 id="resume-upload"
//                 type="file"
//                 accept=".pdf,.doc,.docx"
//                 className="hidden"
//                 onChange={(e) =>
//                   setFormData({
//                     ...formData,
//                     resume: e.target.files?.[0] || null,
//                   })
//                 }
//               />
//             </div>

//             <div className="space-y-1">
//               <Label>Business Justification</Label>
//               <Textarea
//                 value={formData.businessJustification || ""}
//                 onChange={(e) =>
//                   setFormData({
//                     ...formData,
//                     businessJustification: e.target.value,
//                   })
//                 }
//                 placeholder="Explain the need for this resource (optional)"
//                 rows={3}
//               />
//             </div>

//             <div className="flex justify-end gap-3 pt-4">
//               <Button
//                 variant="outline"
//                 onClick={() => {
//                   setShowAddForm(false);
//                   setEditingId(null);
//                   resetForm();
//                 }}
//               >
//                 Cancel
//               </Button>
//               <Button onClick={handleAddResource}>
//                 {editingId ? "Update Resource" : "Add Resource"}
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       ) : null}

//       {/* Resource Table */}
//       {!showAddForm && resources.length > 0 ? (
//         <Card className="shadow-sm border border-gray-200">
//           <CardHeader>
//             <div className="flex items-center justify-between">
//               <CardTitle>Resources ({resources.length})</CardTitle>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => {
//                   resetForm();
//                   setEditingId(null);
//                   setShowAddForm(true);
//                 }}
//               >
//                 <Plus className="h-4 w-4 mr-2" />
//                 Add Resource
//               </Button>
//             </div>
//             <CardDescription>
//               Review, edit, or remove resources before submission
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="overflow-x-auto">
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Candidate</TableHead>
//                     <TableHead>Role</TableHead>
//                     <TableHead>Rate</TableHead>
//                     <TableHead>Proposed Yearly Cost</TableHead>
//                     <TableHead>Location</TableHead>
//                     <TableHead>Tech Stack</TableHead>
//                     <TableHead className="text-right">Actions</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {resources.map((r) => (
//                     <TableRow key={r.id}>
//                       <TableCell>{r.candidateName}</TableCell>
//                       <TableCell>{r.role}</TableCell>
//                       <TableCell>${r.proposedRate}/hr</TableCell>
//                       <TableCell>${r.proposedCostYear}</TableCell>
//                       <TableCell className="capitalize">
//                         {r.location}
//                       </TableCell>
//                       <TableCell className="truncate max-w-[150px]">
//                         {r.techStack}
//                       </TableCell>
//                       <TableCell className="text-right">
//                         <div className="flex justify-end gap-2">
//                           <Button
//                             size="sm"
//                             variant="ghost"
//                             onClick={() => handleEdit(r)}
//                           >
//                             <Edit className="h-4 w-4" />
//                           </Button>
//                           <Button
//                             size="sm"
//                             variant="ghost"
//                             onClick={() => handleDelete(r.id)}
//                           >
//                             <Trash2 className="h-4 w-4 text-destructive" />
//                           </Button>
//                         </div>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </div>

//             <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
//               <Button variant="outline" onClick={() => setResources([])}>
//                 Clear All
//               </Button>
//               <Button onClick={handleSubmit}>Submit</Button>
//             </div>
//           </CardContent>
//         </Card>
//       ) : null}

//       {/* Confirmation Modal */}
//       <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
//         <DialogContent className="max-w-xs bg-white rounded-lg shadow-md p-4 border border-gray-100 transition-all duration-200 ease-in-out">
//           <DialogHeader className="space-y-1">
//             <DialogTitle className="text-lg font-semibold text-gray-800 flex items-center gap-1.5">
//               <svg className="h-4 w-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//               </svg>
//               Confirm
//             </DialogTitle>
//             <DialogDescription className="text-xs text-gray-600">
//               Submit <span className="font-medium text-blue-500">{resources.length}</span> resource(s)?
//               Approval: <span className="font-medium">FTE Lead → Desk</span>
//             </DialogDescription>
//           </DialogHeader>
//           <div className="py-2">
//             <p className="text-xs text-gray-500 bg-gray-100 p-1.5 rounded-sm">
//               Verify details before submitting.
//             </p>
//           </div>
//           <DialogFooter className="flex justify-end gap-1.5">
//             <Button
//               variant="outline"
//               onClick={() => setShowConfirmModal(false)}
//               className="border-gray-200 text-gray-600 hover:bg-gray-50 rounded-sm text-xs px-2 py-1"
//             >
//               Cancel
//             </Button>
//             <Button
//               onClick={confirmSubmission}
//               className="bg-blue-500 hover:bg-blue-600 text-white rounded-sm text-xs px-2 py-1 transition-all duration-150"
//             >
//               Submit
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }


// import { useState } from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Upload, Trash2, Edit, Plus } from "lucide-react";
// import { toast } from "sonner";

// interface Resource {
//   id: string;
//   candidateName: string;
//   vendor: string;
//   project: string;
//   role: string;
//   startDate: string;
//   endDate: string;
//   location: string;
//   proposedRate: string;
//   proposedCostYear: string;
//   poNumber: string;
//   techStack: string;
//   resume: File | null;
//   businessJustification: string;
// }

// interface Props {
//   requestData: { requestId?: string; project?: string };
//   onClose: () => void;
// }

// export default function VendorSubmitRatecard({ requestData, onClose }: Props) {
//   const [resources, setResources] = useState<Resource[]>([]);
//   const [showAddForm, setShowAddForm] = useState(true);
//   const [editingId, setEditingId] = useState<string | null>(null);

//   const [formData, setFormData] = useState<Partial<Resource>>({
//     vendor: "TechVendor Inc.",
//     project: requestData.project || "",
//     location: "remote",
//   });

//   const handleAddResource = () => {
//     if (
//       !formData.candidateName ||
//       !formData.role ||
//       !formData.proposedRate ||
//       !formData.proposedCostYear
//     ) {
//       toast.error("Please fill in all required fields");
//       return;
//     }

//     const newResource: Resource = {
//       id: editingId || Date.now().toString(),
//       candidateName: formData.candidateName || "",
//       vendor: formData.vendor || "TechVendor Inc.",
//       project: formData.project || "",
//       role: formData.role || "",
//       startDate: formData.startDate || "",
//       endDate: formData.endDate || "",
//       location: formData.location || "remote",
//       proposedRate: formData.proposedRate || "",
//       proposedCostYear: formData.proposedCostYear || "",
//       poNumber: formData.poNumber || "",
//       techStack: formData.techStack || "",
//       resume: formData.resume || null,
//       businessJustification: formData.businessJustification || "",
//     };

//     if (editingId) {
//       setResources(resources.map((r) => (r.id === editingId ? newResource : r)));
//       toast.success("Resource updated successfully");
//     } else {
//       setResources([...resources, newResource]);
//       toast.success("Resource added successfully");
//     }

//     resetForm();
//     setEditingId(null);
//     setShowAddForm(false);
//   };

//   const resetForm = () => {
//     setFormData({
//       vendor: "TechVendor Inc.",
//       project: requestData.project || "",
//       location: "remote",
//       candidateName: "",
//       role: "",
//       startDate: "",
//       endDate: "",
//       proposedRate: "",
//       proposedCostYear: "",
//       poNumber: "",
//       techStack: "",
//       resume: null,
//       businessJustification: "",
//     });
//   };

//   const handleEdit = (resource: Resource) => {
//     setFormData(resource);
//     setEditingId(resource.id);
//     setShowAddForm(true);
//   };

//   const handleDelete = (id: string) => {
//     setResources(resources.filter((r) => r.id !== id));
//     toast.success("Resource removed");
//   };

//   const handleSubmit = () => {
//     if (resources.length === 0) {
//       toast.error("Please add at least one resource");
//       return;
//     }
//     toast.success(
//       "Resources submitted successfully!"
//     );
//     setResources([]);
//     onClose();
//   };

//   return (
//     <div className="space-y-6 max-h-[80vh] overflow-y-auto p-6 bg-gray-50 rounded-xl">
//       {/* Add Resource Form */}
//       {showAddForm ? (
//         <Card className="border border-gray-200 shadow-sm rounded-xl">
//           <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-xl">
//             <CardTitle className="text-lg font-semibold text-gray-900">
//               {editingId ? "Edit Resource" : "Add New Resource"}
//             </CardTitle>
//             <CardDescription className="text-gray-600">
//               Fill all required fields before adding the resource
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4 mt-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-1">
//                 <Label>Candidate Name *</Label>
//                 <Input
//                   value={formData.candidateName || ""}
//                   onChange={(e) =>
//                     setFormData({ ...formData, candidateName: e.target.value })
//                   }
//                   placeholder="Enter candidate name"
//                 />
//               </div>

//               <div className="space-y-1">
//                 <Label>Vendor</Label>
//                 <Input value={formData.vendor} disabled className="bg-muted" />
//               </div>

//               <div className="space-y-1">
//                 <Label>Project *</Label>
//                 <Input value={formData.project} disabled className="bg-muted" />
//               </div>

//               <div className="space-y-1">
//                 <Label>Role *</Label>
//                 <Input
//                   value={formData.role || ""}
//                   onChange={(e) =>
//                     setFormData({ ...formData, role: e.target.value })
//                   }
//                   placeholder="Enter role (e.g., Developer)"
//                 />
//               </div>

//               <div className="space-y-1">
//                 <Label>Start Date</Label>
//                 <Input
//                   type="date"
//                   value={formData.startDate || ""}
//                   onChange={(e) =>
//                     setFormData({ ...formData, startDate: e.target.value })
//                   }
//                 />
//               </div>

//               <div className="space-y-1">
//                 <Label>End Date</Label>
//                 <Input
//                   type="date"
//                   value={formData.endDate || ""}
//                   onChange={(e) =>
//                     setFormData({ ...formData, endDate: e.target.value })
//                   }
//                 />
//               </div>

//               <div className="space-y-1">
//                 <Label>Location</Label>
//                 <Select
//                   value={formData.location}
//                   onValueChange={(value) =>
//                     setFormData({ ...formData, location: value })
//                   }
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select location" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="remote">Remote</SelectItem>
//                     <SelectItem value="on-site">On-site</SelectItem>
//                     <SelectItem value="hybrid">Hybrid</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="space-y-1">
//                 <Label>Proposed Rate (USD/hr) *</Label>
//                 <Input
//                   type="number"
//                   value={formData.proposedRate || ""}
//                   onChange={(e) =>
//                     setFormData({ ...formData, proposedRate: e.target.value })
//                   }
//                   placeholder="Enter hourly rate"
//                 />
//               </div>

//               <div className="space-y-1">
//                 <Label>Proposed Yearly Cost (USD) *</Label>
//                 <Input
//                   type="number"
//                   value={formData.proposedCostYear || ""}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       proposedCostYear: e.target.value,
//                     })
//                   }
//                   placeholder="Enter total yearly cost"
//                 />
//               </div>

//               <div className="space-y-1">
//                 <Label>PO Number</Label>
//                 <Input
//                   value={formData.poNumber || ""}
//                   onChange={(e) =>
//                     setFormData({ ...formData, poNumber: e.target.value })
//                   }
//                   placeholder="Enter PO number"
//                 />
//               </div>

//               <div className="space-y-1">
//                 <Label>Tech Stack</Label>
//                 <Input
//                   value={formData.techStack || ""}
//                   onChange={(e) =>
//                     setFormData({ ...formData, techStack: e.target.value })
//                   }
//                   placeholder="e.g., React, Node.js"
//                 />
//               </div>
//             </div>

//             <div className="space-y-1">
//               <Label>Upload Resume (optional)</Label>
//               <label
//                 htmlFor="resume-upload"
//                 className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors bg-white"
//               >
//                 <Upload className="h-8 w-8 text-gray-400 mb-2" />
//                 <p className="text-sm font-medium text-gray-700 mb-1">Click to upload</p>
//                 <p className="text-xs text-gray-500">PDF, DOC, or DOCX (max. 5MB)</p>
//                 {formData.resume && (
//                   <p className="text-xs text-blue-600 mt-1 truncate max-w-[200px]">
//                     {formData.resume.name}
//                   </p>
//                 )}
//               </label>
//               <Input
//                 id="resume-upload"
//                 type="file"
//                 accept=".pdf,.doc,.docx"
//                 className="hidden"
//                 onChange={(e) =>
//                   setFormData({
//                     ...formData,
//                     resume: e.target.files?.[0] || null,
//                   })
//                 }
//               />
//             </div>

//             <div className="space-y-1">
//               <Label>Business Justification</Label>
//               <Textarea
//                 value={formData.businessJustification || ""}
//                 onChange={(e) =>
//                   setFormData({
//                     ...formData,
//                     businessJustification: e.target.value,
//                   })
//                 }
//                 placeholder="Explain the need for this resource (optional)"
//                 rows={3}
//               />
//             </div>

//             <div className="flex justify-end gap-3 pt-4">
//               <Button
//                 variant="outline"
//                 onClick={() => {
//                   setShowAddForm(false);
//                   setEditingId(null);
//                   resetForm();
//                 }}
//               >
//                 Cancel
//               </Button>
//               <Button onClick={handleAddResource}>
//                 {editingId ? "Update Resource" : "Add Resource"}
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       ) : null}

//       {/* Resource Table */}
//       {!showAddForm && resources.length > 0 ? (
//         <Card className="shadow-sm border border-gray-200">
//           <CardHeader>
//             <div className="flex items-center justify-between">
//               <CardTitle>Resources ({resources.length})</CardTitle>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => {
//                   resetForm();
//                   setEditingId(null);
//                   setShowAddForm(true);
//                 }}
//               >
//                 <Plus className="h-4 w-4 mr-2" />
//                 Add Resource
//               </Button>
//             </div>
//             <CardDescription>
//               Review, edit, or remove resources before submission
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="overflow-x-auto">
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Candidate</TableHead>
//                     <TableHead>Role</TableHead>
//                     <TableHead>Rate</TableHead>
//                     <TableHead>Proposed Yearly Cost</TableHead>
//                     <TableHead>Location</TableHead>
//                     <TableHead>Tech Stack</TableHead>
//                     <TableHead className="text-right">Actions</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {resources.map((r) => (
//                     <TableRow key={r.id}>
//                       <TableCell>{r.candidateName}</TableCell>
//                       <TableCell>{r.role}</TableCell>
//                       <TableCell>${r.proposedRate}/hr</TableCell>
//                       <TableCell>${r.proposedCostYear}</TableCell>
//                       <TableCell className="capitalize">
//                         {r.location}
//                       </TableCell>
//                       <TableCell className="truncate max-w-[150px]">
//                         {r.techStack}
//                       </TableCell>
//                       <TableCell className="text-right">
//                         <div className="flex justify-end gap-2">
//                           <Button
//                             size="sm"
//                             variant="ghost"
//                             onClick={() => handleEdit(r)}
//                           >
//                             <Edit className="h-4 w-4" />
//                           </Button>
//                           <Button
//                             size="sm"
//                             variant="ghost"
//                             onClick={() => handleDelete(r.id)}
//                           >
//                             <Trash2 className="h-4 w-4 text-destructive" />
//                           </Button>
//                         </div>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </div>

//             <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
//               <Button variant="outline" onClick={() => setResources([])}>
//                 Clear All
//               </Button>
//               <Button onClick={handleSubmit}>Submit</Button>
//             </div>
//           </CardContent>
//         </Card>
//       ) : null}
//     </div>
//   );
// }

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
              <Label>Business Justification</Label>
              <Textarea
                value={formData.businessJustification || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    businessJustification: e.target.value,
                  })
                }
                placeholder="Explain the need for this resource (optional)"
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